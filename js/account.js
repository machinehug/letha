const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", validateContactForm);

function validateContactForm(input) {

    input.preventDefault();

    const firstName = document.querySelector("#firstName");
    const firstNameValue = firstName.value;
    const firstNameError = firstName.nextElementSibling;
    const firstNameValidated = valueIsNotEmpty(firstNameValue);

    if (firstNameValidated) {
        firstNameError.setAttribute("style", "display: none;");
    } else {
        firstNameError.setAttribute("style", "display: block;");
    };

    const lastName = document.querySelector("#lastName");
    const lastNameValue = lastName.value;
    const lastNameError = lastName.nextElementSibling;
    const lastNameValidated = valueIsNotEmpty(lastNameValue);

    if (lastNameValidated) {
        lastNameError.setAttribute("style", "display: none;");
    } else {
        lastNameError.setAttribute("style", "display: block;");
    };

    const email = document.querySelector("#email");
    const emailValue = email.value;
    const emailError = email.nextElementSibling;
    const emailNotValidError = emailError.nextElementSibling;
    const emailValidated = valueIsNotEmpty(emailValue);
    const emailFormatValidated = isValidEmailFormat(emailValue);

    if (emailValidated) {
        emailError.setAttribute("style", "display: none;");
    } else {
        emailError.setAttribute("style", "display: block;");
    };

    if (emailFormatValidated) {
        emailNotValidError.setAttribute("style", "display: none;");
    } else {
        emailNotValidError.setAttribute("style", "display: block;");
    };

    //PHONE
    const phone = document.querySelector("#phone");
    const phoneValue = phone.value;
    const phoneError = phone.nextElementSibling;
    const phoneNotValidError = phoneError.nextElementSibling;
    const phoneValidated = valueIsNotEmpty(phoneValue);
    const phoneFormatValidated = isNumber(phoneValue);
    const phoneIs8Digits = is8Digits(phoneValue);

    if (phoneValidated) {
        phoneError.setAttribute("style", "display: none;");
    } else {
        phoneError.setAttribute("style", "display: block;");
    };

    if (phoneFormatValidated && phoneIs8Digits) {
        phoneNotValidError.setAttribute("style", "display: none;");
    } else {
        phoneNotValidError.setAttribute("style", "display: block;");
    };

    //ADDRESS
    const address = document.querySelector("#address");
    const addressValue = address.value;
    const addressError = address.nextElementSibling;
    const addressValidated = valueIsNotEmpty(addressValue);

    if (addressValidated) {
        addressError.setAttribute("style", "display: none;");
    } else {
        addressError.setAttribute("style", "display: block;");
    };

    //COUNTRY
    const country = document.querySelector("#country");
    const countryValue = country.value;
    const countryError = country.nextElementSibling;
    const countryValidated = valueIsNotEmpty(countryValue);

    if (countryValidated) {
        countryError.setAttribute("style", "display: none;");
    } else {
        countryError.setAttribute("style", "display: block;");
    };

    //CITY
    const city = document.querySelector("#city");
    const cityValue = city.value;
    const cityError = city.nextElementSibling;
    const cityValidated = valueIsNotEmpty(cityValue);

    if (cityValidated) {
        cityError.setAttribute("style", "display: none;");
    } else {
        cityError.setAttribute("style", "display: block;");
    };

    //ZIP CODE
    const zipCode = document.querySelector("#zip-code");
    const zipCodeValue = zipCode.value;
    const zipCodeError = zipCode.nextElementSibling;
    const zipCodeNotValidError = zipCodeError.nextElementSibling;
    const zipCodeValidated = valueIsNotEmpty(zipCodeValue);
    const zipCodeFormatValidated = isNumber(zipCodeValue);
    const zipCodeIs4Digits = is4Digits(zipCodeValue);

    if (zipCodeValidated) {
        zipCodeError.setAttribute("style", "display: none;");
    } else {
        zipCodeError.setAttribute("style", "display: block;");
    };

    if (zipCodeFormatValidated && zipCodeIs4Digits) {
        zipCodeNotValidError.setAttribute("style", "display: none;");
    } else {
        zipCodeNotValidError.setAttribute("style", "display: block;");
    };

    if (firstNameValidated &&
        lastNameValidated &&
        addressValidated &&
        countryValidated &&
        cityValidated &&
        emailValidated &&
        emailFormatValidated &&
        phoneValidated &&
        phoneFormatValidated &&
        phoneIs8Digits &&
        zipCodeValidated &&
        zipCodeFormatValidated &&
        zipCodeIs4Digits) {

        const validationSuccessTag = document.createElement("p");
        const validationSuccessMessage = document.createTextNode("Your contact information was updated.");
        validationSuccessTag.appendChild(validationSuccessMessage);

        const container = document.querySelector(".account-contact-container");
        container.insertBefore(validationSuccessTag, contactForm);

        document.querySelector(".save-button").disabled = true;
    };
};

function valueIsNotEmpty(input) {

    if (input.trim().length > 0) {
        return true;
    };
};

function isValidEmailFormat(input) {

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(input);
};

function isNumber(input) {

    if (isNaN(input)) {
        return false;
    } else {
        return true;
    };
};

function is4Digits(input) {
    if (input.length === 4) {
        return true;
    } else {
        return false;
    };
};

function is8Digits(input) {
    if (input.length === 8) {
        return true;
    } else {
        return false;
    };
};