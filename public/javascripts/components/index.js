/*!
 * Matcha test UI 
 * 
 * author Jun
 * Github https://github.com/Delete540 
 */

'use script';

var Matcha = {};

(function (window) {

    var $doc;

    if (window.Package) {
        Matcha = {};
    } else {
        window.Matcha = {};
    }


    if (window.document) {
        $doc = window.document;
    }

    Matcha = {
        fn: function (elements, selector, callback) {

            this.elements = elements;
            this.selector = selector;
            if (callback) {
                this.callback = callback(this);
            }

            return this;
        },

        init: function () {

            var arg = [],
                props;

            if (arguments[0] === undefined || typeof arguments[0] != 'object' || arguments[0].length <= 0) {
                return;
            }

            arg[0] = arguments[0];

            if (arguments[1] && typeof arguments[1] === 'string') {
                arg[1] = arguments[1];
            }

            if (arguments[2] && typeof arguments[2] === 'function') {
                arg[2] = arguments[2];
            }

            Matcha.fn.prototype = {
                eq: function (num) {
                    var object;
                    object = (new Matcha.fn(arg[0][num], arg[1]));
                    return object;
                },
                addClass: function (className) {
                    for (var i = 0; i < this.elements.length; i++) {
                        this.elements[i].classList.add(className);
                    }
                    return this;
                },
                removeClass: function (className) {
                    for (var i = 0; i < this.elements.length; i++) {
                        this.elements[i].classList.remove(className);
                    }
                },
                attr: function (attr1, attr2) {
                    var object = new Matcha.fn(arg[0][0], arg[1]).elements;
                    if (attr2) {
                        object.setAttribute(attr1, attr2);
                    }
                    return object.getAttribute(attr1);
                },
                css: function (object) {

                    if (object && typeof object == 'object') {
                        for (var i = 0; i < this.elements.length; i++) {
                            var style = '';
                            for (var key in object) {
                                style = style + key + ':' + object[key] + ';';
                            }
                            this.elements[i].setAttribute('style', style);
                        }
                    }
                    return this;
                },
                click: function (callback) {
                    var elements = this.elements;

                    function clickUtils(e) {
                        var event = e ? e : window.event,
                            target = e.target || e.srcElement,
                            flag = false;
                        for (var i = 0; i < elements.length; i++) {

                            if (target.className.indexOf(elements[i].className) != -1) {
                                flag = true;
                            } else if (target.parentElement !== null && target.parentElement.className.indexOf(elements[i].className) != -1) {
                                flag = true;
                                target = target.parentElement;
                            }
                        }
                        if (flag) {
                            callback(event, target);
                        }
                    }
                    $doc.addEventListener('touchstart', function (e) {
                        clickUtils(e);
                    }, false);

                    $doc.addEventListener('click', function (e) {
                        clickUtils(e);
                    }, false);
                }
            };

            props = new Matcha.fn(arg[0], arg[1]);

            return props;
        },

        find: function (selector) {
            return Matcha.init($doc.querySelectorAll(selector), selector);
        },

        createMask: function () {
            var mask = document.createElement('div');
            mask.className = 'action-mask mask';
            $doc.body.appendChild(mask);
        },

        stopEventBubbling: function (event) {
            if (event) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else {
                    event.cancelBubble = true;
                }
            }
        },
        isFunction: function (func) {
            return func ? ((typeof func === 'function') ? true : false) : false;
        },
        initEvent: function (callback) {
            $doc.addEventListener('DOMContentLoaded', function () {
                if (Matcha.isFunction(callback)) {
                    callback();
                }
            }, false);
        },
        isMobile: {
            Android: function () {
                return navigator.userAgent.match(/Android/i) ? true : false;
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i) ? true : false;
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i) ? true : false;
            },
            any: function () {
                return (Matcha.isMobile.Android() || Matcha.isMobile.BlackBerry() || Matcha.isMobile.iOS() || Matcha.isMobile.Windows());
            }
        }

    };

    Matcha.initEvent(function () {
        Matcha.createMask();
    });



})(window);

