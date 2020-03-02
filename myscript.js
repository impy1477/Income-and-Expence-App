budgetController = (function(){
    var expense =function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        allItems: {
            exp:[],
            inc:[]
        },
        totoalAmaount: {
            exp: 0,
            inc: 0
        },
        totalBudget: 0,
        persentage: -1
    }
    
    return {
        budgetCalculater: function(type){
            var sum;
            sum = 0;
            data.allItems[type].forEach(function(item){
                sum += item.value;
            });
            data.totoalAmaount[type] = sum;
            data.totalBudget = data.totoalAmaount.inc - data.totoalAmaount.exp;
            data.persentage = Math.round((data.totoalAmaount.exp / data.totoalAmaount.inc) *100);
                
        },
        addItem: function(type, description, value) {
            var newitem, ID;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
            } else {
                ID = 0;
            }
            if (type === "inc") {
                newitem = new income(ID, description, value);
            } else {
                newitem = new expense(ID, description, value);
            }
            data.allItems[type].push(newitem);
        },
        idReturner:data,
    }
    
    
})();

UIController = (function(){
    /*clearFiealds : function() {

            var fields , fieldsArr;

             fields = document.querySelectorAll(DOMstrings.inputValue + "," + DOMstrings.inputDescription);
             fieldsArr = Array.prototype.slice.call(fields);
             
            fieldsArr.forEach(function (element , index , array) {
                element.value = "";
            });
            fieldsArr[0].focus();

        },*/
    var domStrings = {
        type: ".add__type",
        description: ".add__description",
        value: ".add__value",
        addButton: ".add__btn",
        incomeContainer: ".income__list", 
        expensesContainer: ".expenses__list",
        expensesbudget: ".budget__expenses--value",
        incomebudget: ".budget__income--value",
        totalbudget: ".budget__value",
        percentagebudget:".budget__expenses--percentage",
    }
    var theUIValues = function() {
        return {
            typeValue: document.querySelector(domStrings.type).value,
            descriptionValue: document.querySelector(domStrings.description).value,
            valueValue: parseFloat(document.querySelector(domStrings.value).value),
            
        }
    }
    var UIaddItem = function(type, description, value) {
        var html, newhtml, element, ID;
        if (type === "inc") {
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            element = domStrings.incomeContainer;
            
        } else {
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            element = domStrings.expensesContainer;
        }
        ID = budgetController.idReturner.allItems[type][budgetController.idReturner.allItems[type].length - 1].id;
        
        newhtml = html.replace('%id%',ID+"$");
        newhtml = newhtml.replace('%description%',description);
        newhtml = newhtml.replace('%value%',value+"$");
        document.querySelector(element).insertAdjacentHTML("beforeend",newhtml);
        
    }
    
    return {
        UITotalbudget:function() {
            document.querySelector(domStrings.incomebudget).textContent = budgetController.idReturner.totoalAmaount.inc+"$";
            document.querySelector(domStrings.expensesbudget).textContent = budgetController.idReturner.totoalAmaount.exp+"$";
            document.querySelector(domStrings.totalbudget).textContent = budgetController.idReturner.totalBudget+"$";
            document.querySelector(domStrings.percentagebudget).textContent = budgetController.idReturner.persentage+"%";
        },
        thevalues: function(){
            return theUIValues();
        },
        thedomStrings: function () {
            return domStrings;
        },
        UIadditem: function(){
        return UIaddItem(theUIValues().typeValue, theUIValues().descriptionValue, theUIValues().valueValue);
    }
    };
})();

var eventController = (function(budgetCrtl, UICrtl) {
    
    var DOMStrings = UICrtl.thedomStrings();
    
    var inClick = function() {
        budgetCrtl.addItem(UICrtl.thevalues().typeValue, UICrtl.thevalues().descriptionValue, UICrtl.thevalues().valueValue);
        UICrtl.UIadditem();
        budgetCrtl.budgetCalculater("exp");
        budgetCrtl.budgetCalculater("inc");
        UICrtl.UITotalbudget();
        document.querySelector(DOMStrings.description).value = "";
        document.querySelector(DOMStrings.value).value = "";
        document.querySelector(DOMStrings.description).focus();
    }
    
    var init = function() {
        document.querySelector(DOMStrings.addButton).addEventListener("click", function() {
            inClick();
        })
    }
    
    return {
        inity: function() {
            return init();
        },
    }
    
})(budgetController, UIController);
eventController.inity();
    
    