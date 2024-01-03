document.addEventListener('DOMContentLoaded', function () {
    //Get references to the required elemtents in the DOM
    var loginForm = document.getElementById('user-login');
    var loginLogoutLinkDesktop = document.getElementById('loginlogout');
    var loginLogoutLinkMobile = document.getElementById('loginlogout-mobile');

    //Update UI based on login status when page loads
    updateLoginLogoutUI();

    //Add event listener to the login button
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            //Prevent default form submission behaviour
            event.preventDefault();
            //Call the loginUser function when login button is clicked
            loginUser();
        });
    }

    //Add event listener to the logout element in the navbar
    function addLogoutEventListener(element) {
        if (element) {
            //Add click event listener
            element.addEventListener("click", function (event) {
                //Check if the user is logged in
                if (localStorage.getItem('loggedIn') === '1') {
                    //Prevent default link behaviour
                    event.preventDefault();
                    //Call the logoutUser function
                    logoutUser();
                }
            });
        }
    }

    //Add logout event listeners to both desktop and mobile logout links
    addLogoutEventListener(loginLogoutLinkDesktop);
    addLogoutEventListener(loginLogoutLinkMobile);
});

//Function to login user
function loginUser() {
    //Get user input from the form
    var email = document.getElementById('emailID').value;
    var password = document.getElementById('passwordID').value;
    //Error message element
    var errorElement = document.getElementById("loginerror");

    //Checks the inputted data to harcoded login values
    if (email === "wmitty@email.com" && password === "password1") {
        //Set loggedIn in local storage to 1
        localStorage.setItem('loggedIn', '1');
        //Redirect to homepage
        window.location.href = "index.html";
        //No error message is shown
        errorElement.classList.add("d-none");
    } else {
        //Set loggedIn in local storage to 0
        localStorage.setItem('loggedIn', '0');
        //Show error message
        errorElement.classList.remove("d-none");
    }
    //Update UI based on login status
    updateLoginLogoutUI();
}

//Function to logout user
function logoutUser() {
    //Set loggedIn in local storage to 0
    localStorage.setItem('loggedIn', '0');
    //Redirect to homepage
    window.location.href = "index.html";
    //Update UI based on the login status
    updateLoginLogoutUI();
}

//Function to update the UI based on login status
function updateLoginLogoutUI() {
    //Get references to the required elements in the DOM
    var loginLogoutLinkDesktop = document.getElementById('loginlogout');
    var loginLogoutLinkMobile = document.getElementById('loginlogout-mobile');
    //Get the user details link container
    var userDetailsLinkContainer = document.getElementById('userDetailsLink');

    //Check local storage to see if user is logged in
    if (localStorage.getItem('loggedIn') === '1') {
        //Update desktop and mobile links to show Logout
        if (loginLogoutLinkDesktop) {
            loginLogoutLinkDesktop.textContent = 'Logout';
            loginLogoutLinkDesktop.href = 'index.html';
        }
        if (loginLogoutLinkMobile) {
            loginLogoutLinkMobile.textContent = 'Logout';
            loginLogoutLinkMobile.href = 'index.html';
        }

        //Show the user details link on all pages
        if (userDetailsLinkContainer) {
            userDetailsLinkContainer.innerHTML = '<a class="nav-item nav-link" href="user-details.html">User Details</a>';
        }
    } else {
        //Update desktop and mobile links to show Login
        if (loginLogoutLinkDesktop) {
            loginLogoutLinkDesktop.textContent = 'Login';
            loginLogoutLinkDesktop.href = 'login.html';
        }
        if (loginLogoutLinkMobile) {
            loginLogoutLinkMobile.textContent = 'Login';
            loginLogoutLinkMobile.href = 'login.html';
        }

        //Remove the user details link from all pages
        if (userDetailsLinkContainer) {
            userDetailsLinkContainer.innerHTML = '';
        }
    }
}
