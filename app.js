const btnBillInput = document.querySelector("#btn-bill-input");
const billAmount = document.querySelector("#txt-bill-input");

const errorMessage = document.querySelector("#error-message");

const returnAmountCaption = document.querySelector("#return-amount-caption");

const btnCashInput = document.querySelector("#btn-cash-input");
const cashAmount = document.querySelector("#txt-cash-input");
const divCashInput = document.querySelector(".cash-given-container");

const cashReturnDiv = document.querySelector("#cash-return-container");
const noOfNotesTable = document.querySelectorAll(".no-of-notes");

const outputCashReturn = document.querySelector("#output-cash-return");

const notesAvailable = [2000,500,100,20,10,5,1];

divCashInput.style.display = 'none';
errorMessage.style.display = "none";
cashReturnDiv.style.display = "none";

function clickHandlerBillAmount() {
    if(billAmount.value == "" || billAmount.value <= 0) {
        console.log(billAmount.value);
        
    } else {
        errorMessage.style.display = 'none';
        divCashInput.style.display = 'block';
    }
}

function calculateNoteChange(amountToBeReturned) {
    cashReturnDiv.style.display = "block";
    for(var i=0; i<notesAvailable.length; i++) {

            const numberOfNotes = Math.trunc(amountToBeReturned/notesAvailable[i]);
            amountToBeReturned %= notesAvailable[i];
            noOfNotesTable[i].innerText = numberOfNotes;
        
    }

}


function hideErrorMessage() {
    errorMessage.style.display = "none";
}

function showErrorMessage(message) {
    console.log(message);
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

btnBillInput.addEventListener("click",clickHandlerBillAmount);

btnCashInput.addEventListener("click", function clickHandlerCashGiven() {
        if(cashAmount.value > 0) {
            if(cashAmount.value > billAmount.value) {
                hideErrorMessage();
            
                const returnAmount = cashAmount.value - billAmount.value;
                console.log("Amount to return: ", returnAmount);
                
                returnAmountCaption.innerText = "Return amount: " + returnAmount;
                
                calculateNoteChange(returnAmount);
                
            } else if(cashAmount.value == billAmount.value) {
            console.log("exact cash given");
            errorMessage.style.display = 'none';
            } else {
                showErrorMessage("Cash amount entered is less than the bill amount! Please enter proper cash amount.");
            }
        } else {
            showErrorMessage("Enter proper cash amount!")
        }
        
});