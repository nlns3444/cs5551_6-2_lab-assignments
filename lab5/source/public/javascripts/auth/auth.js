"use strict";
function auth () {
    return {
        /**
         * Function that call on the page init
         */
        init: function () {
            var $inputEmail = $("#email");
            var $inputPassword = $("#password");
            var $this = this;

            // Case the email input not hide set focus, else set focus on
            // input password
            if (!$inputEmail.is(":visible")) {
                $inputEmail.focus();
            } else {
                $inputPassword.focus();
            }

            // If not have any profile, clear localStorage
            if (this.supportsHTML5Storage()) {
                if (!this.isSetProfileLocalStorage())
                    this.clearProfileLocalStorega();
            }

            // Delegate the {a#profile-disconnect} because
            // this not is create yet
            // this link is create when have a profile in localStorage
            var $formSignin = $(".form-signin");
            $formSignin.delegate("a#profile-disconnect", "click", function(){
                if ($this.supportsHTML5Storage()) {
                    if ($this.isSetProfileLocalStorage()) {
                        $this.clearProfileLocalStorega();
                        $this.loadProfile();
                    }
                }
            });
        },
        /**
         * Main function that load the profile if exists
         * in localstorage
         */
        loadProfile: function() {
            var $profileName = $("#profile-name"),
                $reauthEmail = $("#reauth-email"),
                $email       = $("#email"),
                $password    = $("#password"),
                $remember    = $(".remember_me");

            // If not supports Storage return false
            if (!this.supportsHTML5Storage()) { return false }

            // Check if same profile is set
            if (this.isSetProfileLocalStorage()) {
                // Get the profile from localStorage
                this.getLocalProfile(function (profileName, profileReAuthEmail) {
                    //Change the UI
                    $profileName.html(profileName);
                    $reauthEmail.html("Welcame back, " + profileReAuthEmail + "<a id=\"profile-disconnect\" title=\"Remove this account.\" class=\"pull-right\" href=\"javascript:;\" style=\"color: red;\">x</a>");

                    // Set the {profileReAuthEmail} to input email,
                    // because this field have required tag if you not set this
                    // will give an error
                    $email.val(profileReAuthEmail);

                    $email.hide();
                    $remember.hide();
                    $password.focus();
                });
            } else {
                //Change the UI
                $profileName.html("");
                $reauthEmail.html("");

                // Set empty value to input email
                $email.val("");

                $email.show();
                $email.focus();
                $remember.show();
            }
        },
        /**
         * Function that gets the data of the profile in case
         * thar it has already saved in localstorage. Only the
         * UI will be update in case that all data is available
         *
         * A not existing key in localstorage return null
         *
         */
        getLocalProfile: function(callback) {
            var profileName        = localStorage.getItem("PROFILE_NAME");
            var profileReAuthEmail = localStorage.getItem("PROFILE_REAUTH_EMAIL");

            if(profileName !== null
                && profileReAuthEmail !== null) {
                callback(profileName, profileReAuthEmail);
            }
        },
        /**
         * function that checks if the browser supports HTML5
         * local storage
         *
         * @returns {boolean}
         */
        supportsHTML5Storage: function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e) {
                console.error(e.toString());
                return false;
            }
        },
        /**
         * This data will be safe by the web app
         * in the first successful login of a auth user.
         * To Test the scripts, delete the localstorage data
         * and comment this call.
         *
         * @returns {boolean}
         */
        setProfileLocalStorageData:  function (profileName, profileReAuthEmail) {
            if(!this.supportsHTML5Storage()) { return false; }
            localStorage.setItem("PROFILE_NAME", profileName);
            localStorage.setItem("PROFILE_REAUTH_EMAIL", profileReAuthEmail);

            this.loadProfile();
        },

        isSetProfileLocalStorage: function () {
            if (!this.supportsHTML5Storage()) { return false; }
            if (localStorage.length > 0) {
                if ((localStorage.getItem("PROFILE_NAME") !== null
                    && localStorage.getItem("PROFILE_NAME") !== "")
                    || (localStorage.getItem("PROFILE_REAUTH_EMAIL") !== null
                    && localStorage.getItem("PROFILE_REAUTH_EMAIL") !== ""))
                return true;
            } else {
                return false;
            }
        },

        clearProfileLocalStorega: function () {
            localStorage.clear();
        }
    };
}