const content = getById("content");
const search = getById("search");

function getById(id) {
    return document.getElementById(id);
}
function getByClass(className) {
    return document.getElementsByClassName(className);
}
Handlebars.registerHelper('isFav', function (name) {
    let user = handler.getUser();
    if(user) {
        return user.followed.indexOf(name) > -1 ? true : false;
    } else return false;  
})
function delay(fn, ms = 0) {
    let timer = 0;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms);
    }
}
function fetchData(url) {
    return fetch(url) 
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
}
function fetchHTML(data) {
    fetch(`./assets/view/home.hbs`)
        .then(res => res.text())
        .then(html => {
            let template = Handlebars.compile(html);
            let finished = template(data);
            content.innerHTML = finished;
            handleBtnEvents();
        })
        .catch(err => showErrorPage(err));
}
function fetchCountry(country) {
    return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    })
}