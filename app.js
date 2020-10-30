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
        addItem: function(type, desc, val) {
            var newItem;
            //create id
            var ID =  (data.allItems[type].length === 0) ? 1 : data.allItems[type][data.allItems[type].length - 1].id + 1;

            //create new item
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type ==='inc') {
                newItem = new Income(ID, desc, val);
            }

            //push into data struct
            data.allItems[type].push(newItem);

            // return element
            return newItem;
        },
        testing: function() { // remove this later, this is only to see the private data structures.
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
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
        },
        getDOMstrings: function () {
            return DOMStrings
        }
    }
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


    var ctrlAddItem = function () {
        // 1. get input data
        var input = UICtrl.getInput();
        // console.log(input);

    // 2. add data to budget controller
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // console.log(newItem);

    // 3. add new item to ui

    // 4. calc new budget

    // 5. display budget in ui

    // to make public we return it in an obj

};
    return {
        init: function () {
            console.log("starting app...")
            setupEventListeners()
        }
    }

})(budgetController, UIController);




controller.init();
