window.addEventListener("DOMContentLoaded", getPage);
window.addEventListener("hashchange", getPage);

function getPage() {
    handleNavBtns();
    search.value = "";
    let hash = location.hash.slice(1);
    switch (hash) {
        case "":
            if(handler.getUser()) {
                loadHomePage();
            } else {
                window.location.hash = "#login";
            }
            break;
        case "login":
            loadLoginPage();
            break;
        case "register":
            loadRegisterPage();
            break;
        case "logout":
            handler.logout();
            break;
        case "followed":
            loadFollowedPage();
            break;    
        default:
            if(hash.includes("details/")) {
                let country = hash.split("/")[1];
                fetchCountry(country)
                    .then(data => showForecast(data[0]))
                    .catch(err => showErrorPage(err));
            }
            break;
    }
}