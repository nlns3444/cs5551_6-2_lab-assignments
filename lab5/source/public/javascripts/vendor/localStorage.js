"use strict";
    function storage () {
        return {
            /**
             * function that checks if the browser supports HTML5
             * local storage
             *
             * @returns {boolean}
             */
            supportsHTML5Storage: function () {
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    console.error(e.toString());
                    return false;
                }
            },
            /**
             * This data will be safe by the web app
             * @returns {boolean}
             * @parameter {json}
             */
            setItem: function (items) {
                if (!this.supportsHTML5Storage()) {
                    return false;
                }

                if (typeof items === 'object' && typeof items !== "undefined" && items !== null) {
                    $.each(items, function () {
                        $.each(this, function (name, value) {
                            localStorage.setItem(name, value);
                        });
                    });
                } else {
                    return false;
                }
            },
            /**
             * Function that gets the data of the localStorage
             * A not existing key in localstorage return null
             *
             */
            getItem: function (callback, key) {
                var item = localStorage.getItem(key);
                callback(item);
            },
            clear: function () {
                localStorage.clear();
            }
        }
    }