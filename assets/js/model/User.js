let handler = (function (){
    
    class User {
        constructor(username, password) {
            this.username = username;
            this.password = password;
            this.followed = [];
        }
    }

    class UserStorage {
        constructor () {
            if(!localStorage.getItem("users")) {
                this.users = [];
                localStorage.setItem("users", JSON.stringify(this.users));
            }
            this.users = JSON.parse(localStorage.getItem("users"))
        }

        getUser() {
            let loggedUser = localStorage.getItem("logged");
            if(loggedUser) {
                return this.users.find(u => u.username === loggedUser);
            }
        }
        exists(username) {
            if(this.users.some(u => u.username === username)) {
                return true;
            }
        }
        validate(username, password) {
            if(this.users.some(u => u.username === username && u.password === password)) {
                return true;
            }
        }
        login(username, password) {
            if(this.validate(username, password)) {
                localStorage.setItem("logged", username);
                return true;
            }
        }
        logout() {
            localStorage.removeItem("logged");
            window.location.hash = "#login";
        }
        register(username, password) {
            if(!this.exists(username)) {
                this.users.push(new User(username, password));
                localStorage.setItem("users", JSON.stringify(this.users));
            }
        }
        follow(item) {
            let user = this.getUser();
            if(user.followed.indexOf(item) === -1) {
                user.followed.unshift(item);
                localStorage.setItem("users", JSON.stringify(this.users));
            }
        }
        unfollow(item) {
            let user = this.getUser();
            let i = user.followed.indexOf(item);
            if(i > -1) {
                user.followed.splice(i, 1);
                localStorage.setItem("users", JSON.stringify(this.users));
            }
        }
        isFollowed(item) {
            let user = this.getUser();
            if(user.followed.indexOf(item) > -1) { 
                return true;
            }
        }
    }
    return new UserStorage();
})();