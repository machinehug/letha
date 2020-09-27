//Victoria Pettersen > github.com/machinehug & machinehug.com

fetch("json/shoes.json")
    .then(handleResponse)
    .then(getCartDetails)
    .catch(handleError);

function handleResponse(response) {
    return response.json();
};

function handleError() {
    document.location.href = "index.html";
};

function getCartDetails(json) {

    let queryString = document.location.search;
    const params = new URLSearchParams(queryString);

    const cartItemsContainer = document.querySelector(".cart-items-container");
    const totalSumContainer = document.querySelector(".cart-total-sum-container");

    //GET GIFTCARD INPUT
    let message;
    if (params.has("giftcard-message")) {
        message = params.get("giftcard-message");
    };

    let amount;
    if (params.has("giftcard-amount")) {
        amount = params.get("giftcard-amount");
    };

    let customerEmail;
    if (params.has("giftcard-customer-email")) {
        customerEmail = params.get("giftcard-customer-email");
    };

    let recepientEmail;
    if (params.has("giftcard-recipient-email")) {
        recepientEmail = params.get("giftcard-recipient-email");

        if (recepientEmail === customerEmail) {
            recepientEmail = customerEmail;
        };
    };

    let activationDate;
    if (params.has("giftcard-activation-date")) {
        activationDate = params.get("giftcard-activation-date");
    };

    let activationTime;
    if (params.has("giftcard-activation-time")) {
        activationTime = params.get("giftcard-activation-time");
    };

    //IF GIFTCARD
    if (amount && customerEmail && recepientEmail && activationDate && activationTime) {

        const emptyCartContainer = document.querySelector(".empty-cart-container");
        emptyCartContainer.style.display = "none";

        cartItemsContainer.innerHTML = `
                    <div class="cart-items-container-inner make-flex-row-wrap giftcard-cart-wrapper">
                        <div class="cart-giftcard-container-left make-flex-row-wrap">
                            <div class="cart-shoe-name">
                                <i class="icon-bigger fas fa-gift"></i>
                                <br />
                                <span class="giftcard-cart-title">Giftcard</span>
                            </div>
                            <div type="button" class="cart-remove make-flex-column-wrap"><i class="fas fa-trash-alt giftcard-quantity"></i></div>
                            <select class="cart-choose giftcard-quantity dropdown-style straight-dropdown cart-input cart-no-icon">
                                <option>1 &nbsp; &nbsp;+</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div class="make-flex-column-wrap giftcard-cart-info-wrapper">
                            <div class="text-align-left cart-remove">The giftcard will be sent at: <br /> <br /> <strong>${activationDate} ${activationTime}</strong></div>
                            <div class="text-align-left cart-remove"><strong class="mobile-stretch">Your email:</strong> ${customerEmail}</div>
                            <div class="cart-remove text-align-left"><strong class="mobile-stretch">The recepient's email:</strong> ${recepientEmail}</div>
                        </div>
                        <hr />
                        <div class="cart-remove text-align-left hidemessage message-txt"><strong>Your message:</strong> <br /> "${message}"</div>
                    </div>
                    `;

        if (message === "") {
            const hideMessage = document.querySelector(".hidemessage");
            hideMessage.classList.add("hidden");
        };

        totalSumContainer.innerHTML = `
                    <div class="cart-giftcard-container-right">
                        <div>
                            <div  class="make-flex-column-wrap total-sum-container">
                                <h1 class="cart-total-sum-text">TOTAL SUM</h1>
                                    <div class="make-flex-row-wrap space-top">
                                        <h2 class="cart-subheading heading">Giftcard</h2>
                                        <span class="cart-prices">${amount},-</span>
                                    </div>
                            </div>
                            <h3 class="cart-subheading space-top cart-total-sum-text cart-total-sum-text-bottom">Total sum <span class="cart-total-sum">${amount}</span>,-</h3>
                        </div>
                        <div class="make-flex-column-wrap product-information-button-container">
                            <div class="supported-payment-container">
                                <h6 class="supported-payment-text cart-subheading">We accept</h6>
                                <div class="supported-payment-img"></div>
                            </div>
                            <button class="product-information-button" type="submit" value="submit">CHECKOUT</button>
                        </div>
                    </div>
                    `;
    };

    //MEMBERSHIP STATUS
    const cartTopContainer = document.querySelector(".cart-top-container");

    cartTopContainer.innerHTML = `
                    <button class="member">I'm a member.</button>
                    <button class="new">I'm new here.</button>
                    <button class="guest">I'm a guest.</button>
                    `;

    const memberstatusDropdownContainer = document.querySelector(".member-dropdown");
    const member = document.querySelector(".member");
    member.addEventListener("click", logInDropdown);

    function logInDropdown() {
        memberstatusDropdownContainer.classList.toggle("hidden");
        noneMemberDropdown.classList.add("hidden");
    };

    const noneMemberDropdown = document.querySelector(".nonemember-dropdown");
    const noneMember = document.querySelector(".new");
    noneMember.addEventListener("click", signUpDropdown);

    function signUpDropdown() {
        noneMemberDropdown.classList.toggle("hidden");
        memberstatusDropdownContainer.classList.add("hidden");
    };

    const guest = document.querySelector(".guest");
    guest.addEventListener("click", continueAsGuest);

    function continueAsGuest() {
        noneMemberDropdown.classList.add("hidden");
        memberstatusDropdownContainer.classList.add("hidden");
    };

    const loader = document.querySelector(".loader");
    loader.classList.add("hidden");

    //IF SHOES
    if (params.has("id")) {

        const emptyCartContainer = document.querySelector(".empty-cart-container");
        emptyCartContainer.style.display = "none";

        cartItemsContainer.style.border = "1px solid rgba(170, 170, 170, 0.486)";

        let id = params.get("id");

        let foundShoe = json.results.find(function findShoeId(shoe) {

            if (id == shoe.id) {
                return true;
            } else {
                return false;
            };
        });

        cartItemsContainer.innerHTML = `
                        <div class="cart-items-container-inner make-flex-row-wrap cart-mobile">
                            <div class="cart-items-container-flex">
                                <a href="${"product-information.html?id=" + id}" class="go-back-to-shoe-page">
                                    <img class="cart-picture" src="${foundShoe.path}" alt="${foundShoe.name}">
                                </a>
                                <div class="cart-shoe-name">${foundShoe.name}</div>
                                <div type="button" class="cart-remove cart-input cart-margin"><i class="fas fa-trash-alt"></i></div>
                            </div>
                            <div class="cart-mobile-dropdown-wrapper">
                                <select class="dropdown-icon cart-choose cart-shoe-color-container dropdown-style straight-dropdown cart-input cart-margin"></select>
                                <select class="dropdown-icon cart-choose cart-shoe-size-container dropdown-style straight-dropdown cart-input cart-margin"></select>
                                <select class="cart-choose dropdown-style straight-dropdown cart-input cart-no-icon">
                                    <option>1 &nbsp; &nbsp;+</option>
                                    <option>2</option>
                                </select>
                                <div class="cart-choose cart-item-price cart-input">${foundShoe.price + ",-"}</div>
                            </div>
                        </div>
                        <div class="cart-desktop">
                            <a href="${"product-information.html?id=" + id}" class="go-back-to-shoe-page">
                                <img class="cart-picture" src="${foundShoe.path}" alt="${foundShoe.name}">
                            </a>
                            <div class="cart-shoe-name">${foundShoe.name}</div>
                            <div type="button" class="cart-remove cart-input"><i class="fas fa-trash-alt"></i></div>
                            <select class="cart-choose cart-shoe-color-container dropdown-style straight-dropdown cart-input"></select>
                            <select class="dropdown-icon cart-choose cart-shoe-size-container dropdown-style straight-dropdown cart-input cart-desktop-choose-size"></select>
                            <select class="cart-choose dropdown-style straight-dropdown cart-input cart-no-icon">
                                <option>1 &nbsp; &nbsp;+</option>
                                <option>2</option>
                            </select>
                            <div class="cart-choose cart-item-price cart-input">${foundShoe.price + ",-"}</div>
                        </div>
                        `;

        totalSumContainer.innerHTML = `
                        <div>
                            <div class="make-flex-column-wrap total-sum-container">
                                <h1 class="cart-total-sum-text">TOTAL SUM</h1>
                                    <div class="make-flex-row-wrap space-top">
                                        <h2 class="cart-subheading heading">Shoes</h2>
                                        <span class="cart-prices">${foundShoe.price + ",-"}</span>
                                    </div>
                                <div class="make-flex-row-wrap total-sum-shipping">
                                    <h3 class="cart-subheading heading">Shipping</h3>
                                    <span>FREE</span>
                                </div>
                            </div>
                            <h4 class="cart-subheading space-top cart-total-sum-text cart-total-sum-text-bottom">Total sum (25% tax) <span class="cart-total-sum">${foundShoe.price}</span>,-</h4>
                        </div>
                        <div class="make-flex-column-wrap product-information-button-container">
                            <div class="supported-payment-container">
                                <h5 class="supported-payment-text cart-subheading">We accept</h5>
                                <div class="supported-payment-img"></div>
                            </div>
                            <button class="product-information-button" type="submit" value="submit">CHECKOUT</button>
                            <input class="cart-giftcard-code" type="text" name="cart-giftcard-code" id="cart-giftcard-code" placeholder="Add a giftcard code (optional)...">
                        </div>
                        `;

        //GET COLORS
        const cartColors = foundShoe.colors;
        let htmlCartColors = "";
        const cartShoeColor = document.querySelectorAll(".cart-shoe-color-container");

        cartColors.forEach(color => {
            htmlCartColors += `
                        <option>${color.color.color}</option>
                        `;
        });

        cartShoeColor.forEach(color => {
            color.innerHTML = htmlCartColors;
        });

        //GET SIZES
        const cartSize = foundShoe.sizes;
        let htmlCartSizes = "";
        const cartShoeSize = document.querySelectorAll(".cart-shoe-size-container");

        cartSize.forEach(size => {
            htmlCartSizes += `
                    <option>${size.size.size}</option>
                    `;
        });

        cartShoeSize.forEach(size => {
            size.innerHTML = htmlCartSizes;
        });
    };

    if (params.has("id") || amount && customerEmail && recepientEmail && activationDate && activationTime) {

        //REMOVE FROM CART
        const removeButton = document.querySelectorAll(".cart-remove");

        removeButton.forEach(button => {
            button.addEventListener("click", removeFromCart);
        });

        function removeFromCart() {
            document.location.href = "cart.html";
        };
    };

    if (!queryString) {
        guest.classList.add("hidden");
    };
};