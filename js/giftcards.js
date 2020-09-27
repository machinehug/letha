//Victoria Pettersen > github.com/machinehug & machinehug.com

const giftcardAmountInput = document.querySelector("#giftcard-amount");
const hidden = document.querySelectorAll(".hidden");
const required = document.querySelectorAll(".required");

giftcardAmountInput.addEventListener("keydown", openGiftCardOptions);

function openGiftCardOptions(key) {

    //13 is enter key
    if (key.keyCode === 13 && giftcardAmountInput.value >= 100 && giftcardAmountInput.value <= 10000) {

        hidden.forEach(className => {
            className.classList.remove("hidden");
        });

        required.forEach(className => {
            className.required = true;
        });

        continueButton.classList.add("hidden");
    };
};

const continueButton = document.querySelector(".continue-button");

continueButton.addEventListener("click", onContinueButtonClick);

function onContinueButtonClick() {

    const errorAmount = document.querySelector(".error-amount");

    if (this && giftcardAmountInput.value >= 100 && giftcardAmountInput.value <= 10000) {
        hidden.forEach(className => {
            className.classList.remove("hidden");
        });

        required.forEach(className => {
            className.required = true;
        });

        errorAmount.style.color = "#212529";

        continueButton.classList.add("hidden");
    } else {
        errorAmount.style.color = "red";
    };
};