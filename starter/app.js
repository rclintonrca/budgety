var budgetController = (function () {
    /// 
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
    };




    // 2. add data to budget controller

    // 3. add new item to ui

    // 4. calc new budget

    // 5. display budget in ui

    // to make public we return it in an obj
    return {
        init: function() {
            console.log("starting app...")
            setupEventListeners()
        }
    }
    
}) (budgetController, UIController);




controller.init();
