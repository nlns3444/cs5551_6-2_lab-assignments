function index() {
    return {
        init: function(auth) {
            auth = auth || {};
            this.components(auth);

            if (auth.supportsHTML5Storage()) {
                if (auth.isSetProfileLocalStorage()) {
                    var $email  = $("#email");

                    auth.getLocalProfile(function (profileName, profileReAuthEmail) {
                        // Set the {profileReAuthEmail} to input email,
                        // because this field have required tag if you not set this
                        // will give an error
                        $email.val(profileReAuthEmail);
                    });
                }
            }
        },
        components: function (auth) {
            var $formsignIn                 = $("#form-index");
            var $email                      = $("#email");
            var $uploadButton               = $("#uploadInput");
            var $inputUploadNewBackground   = $("#inputUploadNewBackground");


            $formsignIn.submit(function () {
                if ($email.val() !== "") {
                    if (auth.supportsHTML5Storage()) {
                        auth.clearProfileLocalStorega();
                        auth.setProfileLocalStorageData("", $email.val());
                    }
                }
            });

            $uploadButton.click(function() {
                $inputUploadNewBackground.click();
            });
        }
    };
}