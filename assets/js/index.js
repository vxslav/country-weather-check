function showErrorPage(err) {
    content.innerHTML = `<h2>${err.message}</h2>`;
}
function handleNavBtns() {
    const home = getById("home");
    const followed = getById("followed");
    const login = getById("login");
    const register = getById("register");
    const logout = getById("logout");

    if(!handler.getUser()) {
        home.style.display = "none";
        followed.style.display = "none";
        login.style.display = "inline-flex";
        register.style.display = "inline-flex";
        logout.style.display = "none";
    }  else {
        home.style.display = "inline-flex";
        followed.style.display = "inline-flex";
        login.style.display = "none";
        register.style.display = "none";
        logout.style.display = "inline-flex";
    }
}
function handleBtnEvents() {
    let detailsBtns = Array.from(getByClass("details"));
    let followBtns = Array.from(getByClass("follow"));
    let countryNames = Array.from(getByClass("card-title"));
    let countries = countryNames.map(item => item.innerText);
    
    detailsBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            location.hash = "#details/" + countries[i];
        })
    })
    
    followBtns.forEach((btn, i) => {
        if(handler.getUser()) {
            btn.removeAttribute("disabled")
            btn.addEventListener("click", () => {
                if(handler.isFollowed(countries[i])) {
                    handler.unfollow(countries[i]);
                    if(location.hash === "#followed") {
                        loadFollowedPage();
                    } else {
                        btn.innerText = "Add to favourites";
                    }
                } else {
                    handler.follow(countries[i]);
                    btn.innerText = "Unfollow";
                }
            })
        } else {
            btn.setAttribute("disabled", true);
        }
    })
}