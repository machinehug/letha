fetch("json/shoes.json")
    .then(handleResponse)
    .then(getShoes)
    .catch(handleError);

function handleResponse(response) {
    return response.json();
};

function handleError() {
    document.location.href = "index.html";
};

function getShoes(json) {

    const loader = document.querySelector(".loader");
    loader.classList.add("hidden");

    const results = json.results;

    const container = document.querySelector(".browse-results-container");

    let html = "";

    results.forEach(shoe => {

        html += `
                <div class="browse-result">
                    <a href="product-information.html?id=${shoe.id}">
                        <img class="browse-result-img" src="${shoe.path}" alt="image of a Letha shoe called ${shoe.name}">
                        <p class="browse-shoe-name">${shoe.name}</p>
                        <div class="make-flex-row-wrap browse-result-buttons">
                            <button>${shoe.stock} left</button>
                            <button class="shoe-price-btn">${shoe.price},-</button>
                        </div>
                    </a>
                </div>
                    `;
    });
    container.innerHTML = html;
};