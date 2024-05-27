let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerE1 = document.getElementById("spinner");

function gettingTheResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    searchResultsEl.appendChild(resultContainer);

    let titleEl = document.createElement("a");
    titleEl.classList.add("title-element");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    resultContainer.appendChild(titleEl);

    let breakLineEl = document.createElement("br");
    resultContainer.appendChild(breakLineEl);

    let linkEl = document.createElement("a")
    linkEl.target = "_blank";
    linkEl.classList.add("result-url")
    linkEl.textContent = link;
    linkEl.href = link;
    resultContainer.appendChild(linkEl);

    let breakLineE2 = document.createElement("br");
    resultContainer.appendChild(breakLineE2);

    let descriptionEl = document.createElement("a");
    descriptionEl.textContent = description;
    resultContainer.appendChild(descriptionEl);

}

function accessTheArray(searchResults) {
    spinnerE1.classList.add("d-none");
    for (let result of searchResults) {
        gettingTheResult(result);
    }
}


function getData(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerE1.classList.remove("d-none");
        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let Options = {
            method: "GET"
        }
        fetch(url, Options)
            .then(function(response) {
                return response.json()
            })
            .then(function(responseData) {
                console.log(JSON.stringify(responseData))
                let {
                    search_results
                } = responseData;
                accessTheArray(search_results)
            })
    }
}

searchInputEl.addEventListener("keydown", getData)
