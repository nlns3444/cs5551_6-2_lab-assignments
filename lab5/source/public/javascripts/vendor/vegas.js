"use strict";
function background () {
    return {
        /**
         * Function that call on the page init
         */
        init: function (items) {
            if (typeof items !== 'object' || typeof items === "undefined" || items === null) {
                items = [
                    { 'src': './images/backgrounds/341.jpg' },
                    { 'src': './images/backgrounds/342.jpg' },
                    { 'src': './images/backgrounds/343.jpg' },
                    { 'src': './images/backgrounds/344.jpg' }
                ];
            }

            $('body').vegas({
                delay: 7000,
                timer: false,
                shuffle: true,
                transitionDuration: 2000,
                overlay: "./images/vendor/vegas/overlays/06.png",
                slides: items
            });
        }
    };
}