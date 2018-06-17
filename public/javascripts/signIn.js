function onSignIn(e) {
    alert( "Handler for .submit() called." );

    const username = $("#username").val();
    const password = $("#password").val();
    console.log(username)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/auth/signin', {
            username: username,
            password: password
        
    })
    .then(user => {
        console.log(user, 'we logged in');
        window.location.replace('/');
    })
    .catch(err => {
        console.log(err);
        $("#error").html("some error");
    })

}

$(document).ready(() => {
    $("#signin-button").click(onSignIn);
})


function test() {
}