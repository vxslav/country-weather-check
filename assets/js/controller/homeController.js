search.addEventListener("input", delay(searchCountry, 500));
function loadHomePage() {
    fetchData(`https://restcountries.com/v3.1/all`)
        .then(data => fetchHTML(data))
        .catch(err => showErrorPage(err));
}
function searchCountry() {
    let input = search.value.trim();
    if(input.length > 0) {
        let url = `https://restcountries.com/v3.1/name/${input}`
        fetchData(url)
        .then(data => fetchHTML(data))
        .catch(err => showErrorPage(err));
    } else {
        getPage();
    }
}
