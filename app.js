const billAmount = document.querySelector("#bill-amount");
const nextBtn = document.querySelector("#btn-bill-amount");
const cashGiven = document.querySelector("#cash-amount");
const checkButton = document.querySelector("#btn-cash-amount");

const noOfNotes = document.querySelectorAll(".no-of-notes");
const message = document.querySelector("#error-message");
const showReturnAmount = document.querySelector("#return-amount-caption");

var cashView = document.querySelector(".cash-given-container");
var notesView = document.querySelector(".cash-return-container");


const availableNotes = [500, 200, 100, 50, 20, 10, 5, 2, 1];

cashView.style.display = "none";
notesView.style.display = "none";

nextBtn.addEventListener("click", function showCashEntryBox() {
    if (billAmount.value ==="" || billAmount < 0) {
        showMessage("Please enter a valid bill amount!");
    } else if(billAmount.value ==0) {
        showMessage("🤨Bill amount cannot be 0!")
    }
     else {
        hideMessage();
        cashView.style.display = "block";
    cashGiven.value = "";
    notesView.style.display = "none"
    }
    ;
});

checkButton.addEventListener("click", function clickCheckButtonHandler() {
    hideMessage();
    notesView.style.display = 'none';
    const cashGivenAmount = Number(cashGiven.value);
    const billedAmount = Number(billAmount.value);
    if (isNaN(billAmount.value) || isNaN(cashGiven.value)) {
        showMessage("Please enter a valid bill and cash amount !");
    } else {
        if (billedAmount > 0) {
            if (cashGivenAmount >= billedAmount) {
                const amountToBeReturned = cashGiven.value - billAmount.value;

                if (amountToBeReturned == 0) {
                    notesView.style.display = "none";
                    showMessage("Cash given is equal to Bill Amount, so no need to return any change😊")
                } else {
                    calculateChange(amountToBeReturned);
                }
            } else {
                showMessage("😕Cash amount given is less than bill amount. Please give adequate cash amount or get ready to wash plates😉");
            }

        } else {
            showMessage("🤨Bill amount should be greater than 0!");
        }
    }
});

function calculateChange(amountToBeReturned) {
    notesView.style.display = "block";
    showReturnAmount.innerHTML = "Amount to be returned: &#x20b9; " + amountToBeReturned;
    for (let i = 0; i < availableNotes.length; i++) {
        const numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);
        amountToBeReturned %= availableNotes[i];
        noOfNotes[i].innerText = numberOfNotes;
    }
}

function hideMessage() {
    message.style.display = "none";
}

function showMessage(msg) {
    message.style.display = "block";
    message.innerText = msg;
}

billAmount.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        nextBtn.click();
        cashGiven.focus();
    }
});

cashGiven.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        checkButton.click();
    }
});