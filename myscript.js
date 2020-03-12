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
        deletingItem: function(type, id) {
            var ids, index, t;
            if (type === "income") {
                t = "inc";
            } else {
                t = "exp";
            }
            ids = data.allItems[t].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if(index !== -1) {
                data.allItems[t].splice(index, 1);
            }
        },
        testing: function(){
            console.log(data.allItems.exp);
            console.log(data.allItems.inc);
        }
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
        container:".container"
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
        
        newhtml = html.replace('%id%',ID);
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
    },
        UIDeletingItem: function(id) {
            var idx = document.getElementById(id);
            idx.parentNode.removeChild(idx);
        }
    };
})();

var eventController = (function(budgetCrtl, UICrtl) {
    
    var DOMStrings = UICrtl.thedomStrings();
    
    const essetials = () => {
        let monthname, monthnum;
        monthnum = new Date().getMonth();
        switch (monthnum) {
            case 0 : {
                monthname = 'January';
                break;
            }
            case 1 : {
                monthname = "February";
                break;
            }
            case 2 : {
                monthname = "March";
                break;
            }
            case 3 : {
                monthname = "April";
                break;
            }
            case 4 : {
                monthname = 'May';
                break;
            }
            case 5 : {
                monthname = 'June';
                break;
            }
            case 6 : {
                monthname = 'July';
                break;
            }
            case 7 : {
                monthname = 'August';
                break;
            }
            case 8 : {
                monthname = 'September';
                break;
            }
            case 9 : {
                monthname = 'October';
                break;
            }
            case 10 : {
                monthname = 'November';
                break;
            }
            case 11 : {
                monthname = 'December';
                break;
            }
        }
        document.querySelector(".budget__title--month").textContent = `${monthname}/${new Date().getFullYear()}`;
        document.querySelector(DOMStrings.description).value = "";
        document.querySelector(DOMStrings.value).value = "";
        document.querySelector(DOMStrings.description).focus();
    }
    
    var inClick = function() {
        budgetCrtl.addItem(UICrtl.thevalues().typeValue, UICrtl.thevalues().descriptionValue, UICrtl.thevalues().valueValue);
        UICrtl.UIadditem();
        budgetCrtl.budgetCalculater("exp");
        budgetCrtl.budgetCalculater("inc");
        UICrtl.UITotalbudget();
        essetials();
    }
    
    var init = function() {
        document.querySelector(DOMStrings.addButton).addEventListener("click", function() {
            inClick();
        });
        document.addEventListener("keypress", function(e){
            if(e.keyCode === 13 || e.which === 13) {
                inClick();
            }
        });
        document.querySelector(DOMStrings.container).addEventListener("click",function(e){
            var deletingItem, item, idd; 
            deletingItem = e.target.parentNode.parentNode.parentNode.parentNode.id;
            deletingItem = deletingItem.split("-");
            item = deletingItem[0];
            idd = parseInt(deletingItem[1]);
            budgetCrtl.deletingItem(item, idd);
            UICrtl.UIDeletingItem(e.target.parentNode.parentNode.parentNode.parentNode.id);
            budgetCrtl.budgetCalculater("exp");
            budgetCrtl.budgetCalculater("inc");
            UICrtl.UITotalbudget();
        });
    }
    
    return {
        inity: function() {
            essetials();
            return init();
        },
    }
    
})(budgetController, UIController);
eventController.inity();
    
    
