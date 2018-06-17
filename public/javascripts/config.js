$(document).ready(() => {
    
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/find-me')
        .then(data => {
            if (window.location.pathname === "/auth/signin" ||
                window.location.pathname === "/auth/signup") {
                    window.location.replace("/")
                }
            console.log(data, 'this is user');
            username = data.data.username;
            window.ID = data.data._id;
            let information = $("#information > span");
            if (information.length) {
                information.text("Welcome, " + username);
            }
            $('#login-container').css("display", "none")


        })
        .catch(err => {
            console.log('error!', err)
            $("#logout-container").css("display", "none");
            console.log(window.location.pathname, 'this is the pathnams')
            console.log(window.location.pathname !== "/auth/signin" && window.location.pathname !== "/auth/signup")
            if (window.location.pathname !== "/auth/signin" && window.location.pathname !== "/auth/signup")
                window.location.replace('/auth/signin');
        })
})

