function loadFollowedPage() {
    let user = handler.getUser();
    let countries = user.followed.map(item => fetch(`https://restcountries.com/v3.1/name/${item}`));
    Promise.all(countries)
        .then(res => Promise.all(res.map(i => i.json())))
        .then(data => fetchHTML(data.flat()))
        .catch(err => showErrorPage(err));
}