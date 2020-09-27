//Victoria Pettersen > github.com/machinehug & machinehug.com

fetch("json/shoes.json")
    .then(handleResponse)
    .then(getShoeDetails)
    .catch(handleError);

function handleResponse(response) {
    return response.json();
};

function handleError() {
    document.location.href = "browse.html";
};

function getShoeDetails(json) {

    const loader = document.querySelector(".loader");
    loader.classList.add("hidden");

    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);

    let id = params.get("id");

    let foundShoe = json.results.find(function findShoeId(shoe) {

        if (id == shoe.id) {
            return true;
        } else {
            return false;
        };
    });

    const container = document.querySelector(".product-information-container");

    container.innerHTML = `
    
<div class="max-width-desktop">

    <nav class="breadcrumbs">
        <ol>
            <li><a href="index.html">Home</a> > </li>
            <li><a href="browse.html">Browse</a> > </li>
            <li class="active-shoe">${foundShoe.name}</li>
        </ol>
    </nav>

    <div class="product-information-shoe-name-star-container">
        <h1 class="heading product-information-shoe-name">
            ${foundShoe.name}
        </h1>
        <span class="star-cursor">
            <i class="product-information-star-icon far fa-star"></i>
            <span class="product-information-star-icon-text">${foundShoe.stars}</span>
        </span>
    </div>

    <div class="make-flex-row-wrap desktop-product-information-wrapper">

        <div class="make-flex-row-wrap all-pics-container">
            <div class="product-information-shoe-picture-large" style="background: url(${foundShoe.path}) no-repeat center; background-size: cover;"></div>
            <div class="product-information-more-shoe-pictures-container">
                <div class="product-information-more-shoe-pictures-results"></div>
            </div>
        </div>

        <div class="make-flex-column-wrap desktop-product-information-divs padding-product-information padding-left-right">

            <div class="product-information-title-container">
                <h2 class="heading product-information-title-price">${foundShoe.price + ",-"}</h2>
                <h3 class="heading product-information-title-days">1-2 days <br /> shipping time</h3>
                <h4 class="heading product-information-title-stock">${foundShoe.stock + " left"}</h4>
                <div class="heading product-information-title-stock"><i class="fas heart fa-heart"></i></div>
            </div>

            <div class="make-flex-column-wrap product-information-button-container product-information-divs-right" >
                <div class="make-flex-row-wrap desktop-dropdown dropdown-wrapper-mobile">
                    <div class="mobile-dropdown">
                        <h5 class="subheading text-align-right">Size</h5>
                        <select class="dropdown-icon cart-choose cart-shoe-size-container dropdown-style straight-dropdown cart-input size-container margin-bottom"></select>
                    </div>
                    <div class="mobile-dropdown">
                        <h6 class="subheading text-align-right">Color</h6>
                        <select class="dropdown-icon cart-choose cart-choose-color cart-shoe-color-container dropdown-style straight-dropdown cart-input color-container margin-bottom"></select>
                    </div>
                </div>
                <div class="link-container">
                    <span class="fake-link float-right" ><a href="customer-service.html">Purchase information</a></span>
                </div>
                <a class="buy-shoe-now" href="${"cart.html?id=" + id}">
                    <button class="product-information-button">BUY NOW</button></a>
                <button class="product-information-button">ADD TO CART</button>
            </div>
        </div>
        
        <div class="about-shoe-container desktop-product-information-divs product-information-divs-right">

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="about-tab" data-toggle="tab" href="#about"
                        role="tab" aria-controls="about" aria-selected="true">About:</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="size-tab" data-toggle="tab" href="#sizechart" role="tab"
                        aria-controls="size" aria-selected="false">Size chart:</a>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent" style="height: 100%;">
                <div class="tab-pane fade show active text-align-left" id="about" role="tabpanel"
                    aria-labelledby="about-tab">
                    <p class="about-the-shoe">${foundShoe.description}</p>
                </div>
                <div class="tab-pane fade" id="sizechart" role="tabpanel"
                    aria-labelledby="size-tab">
                    <br />
                    <table>
                        <tr>
                            <th>EU</th>
                            <th>US</th>
                            <th>UK</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>40</td>
                            <td>8</td>
                            <td>7</td>
                            <td>254mm</td>
                        </tr>
                        <tr>
                            <td>41</td>
                            <td>8.5</td>
                            <td>7.5</td>
                            <td>258mm</td>
                        </tr>
                        <tr>
                            <td>42</td>
                            <td>9</td>
                            <td>8</td>
                            <td>262mm</td>
                        </tr>
                        <tr>
                            <td>43</td>
                            <td>10</td>
                            <td>9</td>
                            <td>271mm</td>
                        </tr>
                        <tr>
                            <td>44</td>
                            <td>10.5</td>
                            <td>9.5</td>
                            <td>275mm</td>
                        </tr>
                        <tr>
                            <td>45</td>
                            <td>11.5</td>
                            <td>10.5</td>
                            <td>283mm</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

    //GET MORE SHOE PICTURES
    const getMoreShoePicturesContainer = document.querySelector(".product-information-more-shoe-pictures-results");
    const getMoreShoePictures = foundShoe.picturecollection;
    let htmlMoreShoePictures = "";

    getMoreShoePictures.forEach(picture => {
        htmlMoreShoePictures +=
            `
            <img class="product-information-more-shoe-picture" src="${picture.picture.path}" alt="image of a Letha shoe called ${foundShoe.name}">
        `;
    });
    getMoreShoePicturesContainer.innerHTML = htmlMoreShoePictures;

    //CHANGE PHOTO ON CLICK
    let largeShoePicture = document.querySelector(".product-information-shoe-picture-large");
    let anotherShoePicture = document.querySelectorAll(".product-information-more-shoe-picture");

    for (let i = 0; i < anotherShoePicture.length; i++) {

        let image = anotherShoePicture[i];

        image.addEventListener("click", function () {
            largeShoePicture.style.backgroundImage = "url(" + image.src + ")";
        })
    };

    //GET SIZES
    const sizeContainer = document.querySelector(".size-container");
    const getSizes = foundShoe.sizes;
    let htmlSizes = "";

    getSizes.forEach(size => {
        htmlSizes +=
            `
            <option>${size.size.size}</option>
        `;
    });
    sizeContainer.innerHTML = htmlSizes;

    //GET COLORS
    const colorContainer = document.querySelector(".color-container");
    const getColor = foundShoe.colors;
    let htmlColors = "";

    getColor.forEach(color => {
        htmlColors +=
            `
            <option>${color.color.color}</option>

            `;
    });
    colorContainer.innerHTML = htmlColors;
};