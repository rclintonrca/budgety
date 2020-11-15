var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, desc, val) {
            var newItem;
            //create id
            var ID = (data.allItems[type].length === 0) ? 1 : data.allItems[type][data.allItems[type].length - 1].id + 1;

            //create new item
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            //push into data struct
            data.allItems[type].push(newItem);

            // return element
            return newItem;
        },
        testing: function () { // remove this later, this is only to see the private data structures.
            console.log(data);
        }
    };

})();


var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },
        addListItem: function (obj, type) {
            // 1. create html string with placeholder text
            var html;
            if (type === 'inc') {
                listElement = DOMStrings.incomeList;
                html = '<div class="item clearfix" id="income-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">+ %VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                listElement = DOMStrings.expenseList;
                html = '<div class="item clearfix" id="expense-%ID%"><div class="item__description">%DESC%</div><div class="right clearfix"><div class="item__value">- %VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // 2. replace plaxeholder with obj text
            var newHtml = html.replace("%ID%", obj.id).replace("%VALUE%", obj.value).replace("%DESC%", obj.description);
            // 3. insert html into DOM
            document.querySelector(listElement).insertAdjacentHTML('beforebegin', newHtml);

            return;
        },
        getDOMstrings: function () {
            return DOMStrings;
        },
        clearFields: function () {
            var fields = document.querySelectorAll(DOMStrings.inputDesc + ',' + DOMStrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (currValue, indexNum, arr) {
                currValue.value = '';
            });
            fieldsArr[0].focus();
        }
    };
})();

var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudge = function () {
        // 1. calc new budget
        // 2. display budget
        // 3. return budget in ui

    };

    var ctrlAddItem = function () {
        // 1. get input data
        var input = UICtrl.getInput();
        if (input.description !== "" && input.value > 0) {
            // 2. add data to budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // console.log(newItem);

            // 3. add new item to ui
            UICtrl.addListItem(newItem, input.type);

            // clear the fields
            UICtrl.clearFields();

            // 4. calc new budget
            // 5. display budget in ui
            updateBudge();
        }
        // to make public we return it in an obj

    };


    return {
        init: function () {
            console.log("starting app...");
            setupEventListeners();
        }
    };

})(budgetController, UIController);




controller.init();
