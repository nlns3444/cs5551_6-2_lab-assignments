window.fbAsyncInit = function () {
    FB.init({
        appId: '148913242462028',
        xfbml: true,
        version: 'v2.10'
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function fbLogin() {
    FB.login(function (response) {
        console.log(response);
            if (response.authResponse) {
                getInformation();
            } else {
                console.log('Login cancelled by user');
            }
        }, {scope: 'email'}
    );
}
function navigate() {
    var str = document.getElementById('status').value;
    document.getElementById('home').innerHTML = str.toString();
    window.location.href = 'main.html';
}
function Logout() {
    FB.logout(function () {
        document.location.reload();
    });
}
function getInformation() {
    FB.api('/me', function (response) {
            console.log(response.name.toString());
            var string = "<b>Name</b> : " + response.name + "<br>";
        string += "<b>Link: </b>" + response.link + "<br>";
        string += "<b>Username:</b> " + response.username + "<br>";
        string += "<b>id: </b>" + response.id + "<br>";
        string += "<b>Email:</b> " + response.email + "<br>";
        string += "<input type='button' value='Get Photo' onclick='getPhoto();'/>";
        string += "<input type='button' value='Logout' onclick='Logout();'/>";
            document.getElementById('status').innerHTML = "Connected";
            var name = response.name;
            console.log(name)
            localStorage.setItem("Name", name);
        }
    );
    //document.getElementById('home').innerHTML =  document.getElementById('status').value;
    window.location.href = 'main.html';
}
