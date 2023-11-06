/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/                              version 2.37.2
 *
 * This file is part of jQuery Terminal. https://terminal.jcubic.pl
 *
 * Copyright (c) 2010-2023 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 */
/* global jQuery */
(function () {
    function get(url) {
        var element
        if (url.match(/css$/)) {
            element = document.createElement('link')
            element.setAttribute('href', url)
            element.setAttribute('rel', 'stylesheet')
        } else if (url.match(/js$/)) {
            element = document.createElement('script')
            element.setAttribute('src', url)
        }
        console.log(element)
        return new Promise(function (resolve, reject) {
            console.log(element)
            if (element) {
                element.onload = resolve
                var head = document.querySelector('head')
                head.appendChild(element)
            } else {
                reject()
            }
        })
    }
    if (typeof jQuery === 'undefined') {
        get('js/jquery.js').then(function () {
            Promise.all([
                get('js/jquery.mousewheel-min.js'),
                get('js/jquery.terminal.js'),
                get('js/jquery-ui.js'),
                get("css/jquery-ui/jquery-ui.css"),
                get("css/jquery-ui/jquery-ui.structure.css"),
                get("css/jquery-ui/jquery-ui.theme.css"),
                get("css/font-awesome/font-awesome.css"),
                get("css/hack/hack.css"),
                get('css/jquery-terminal/jquery.terminal.css'),
                get('terminal-ui-test.js')
            ])
        })
    }
})()