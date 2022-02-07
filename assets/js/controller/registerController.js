function loadRegisterPage() {
    fetch(`./assets/view/register.hbs`)
        .then(res => res.text()) 
        .then(html => {
            content.innerHTML = html;
            handleRegister();
        })
        .catch(err => console.log(err));
}

function handleRegister() {
    const form = getById("regForm");
    const name = getById("regUsername");
    const pass = getById("regPass");
    const confirm = getById("confirm");
    const link = getById("linkToLogin");
    const err = getByClass("alert-danger")[0];
    const success = getByClass("alert-success")[0];

    err.style.display = "none";
    success.style.display = "none";
    link.style.display = "block";
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        const username = name.value.trim();
        const password = pass.value.trim();
        const cpass = confirm.value.trim();
        if(username.length > 2 && password.length > 2 && cpass.length > 2) {
            if(!handler.exists(username)) {
                if(password === cpass) {
                    handler.register(username, password);
                    success.style.display = "block";
                    link.style.display = "none";
                    err.style.display = "none";
                    name.value = "";
                    pass.value = "";
                    confirm.value = "";
                } else {
                    err.innerHTML = "Password missmatch!"
                    err.style.display = "block";
                }
            } else {
                err.innerHTML = "Username already taken!"
                err.style.display = "block";
            }
        } else {
            err.innerHTML = "All fields must contain at least 3 characters!"
            err.style.display = "block";
        }
    })
}