function loadLoginPage() {
    fetch(`./assets/view/login.hbs`)
        .then(res => res.text())
        .then(html => {
            content.innerHTML = html;
            handleLogin();
        })
        .catch(err => console.log(err));
}

function handleLogin(){
    const form = getById("loginForm");
    const name = getById("loginUsername");
    const pass = getById("loginPass");
    const err = getByClass("alert-danger")[0];
    err.style.display = "none";
    form.addEventListener("submit", e => {
        e.preventDefault();
        const username = name.value.trim();
        const password = pass.value.trim();
        if(handler.login(username, password)) {
            location.hash = "";
        } else {
            err.style.display = "block";
        }  
    })
}