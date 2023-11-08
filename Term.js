// ==UserScript==
// @name         CyberTerminal
// @version      4.2
// @author       @LordGoober
// @match        https://rcs00-portal.pcte.mil/
// @updateURL    https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/Term.js
// @downloadURL  https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/Term.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// @require      https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/js/jquery.js
// @require      https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/js/jquery-ui.js
// @require      https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/js/jquery.terminal.js
// @resource     jqueryui_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-ui/jquery-ui.css
// @resource     jquerys_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-ui/jquery-ui.structure.css
// @resource     juqeryt_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-ui/jquery-ui.theme.css
// @resource     fontawesome_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/font-awesome/font-awesome.css
// @resource     hack_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/hack/hack.css
// @resource     terminal_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-terminal/jquery.terminal.css
// ==/UserScript==

// require('jquery')
// require('jquery-ui')
// require('jquery.terminal')

const unicodeToVscan = {
    "13": 28,
    "32": 57,
    "33": 2,
    "34": 40,
    "35": 4,
    "36": 5,
    "37": 6,
    "38": 8,
    "39": 40,
    "40": 10,
    "41": 11,
    "42": 9,
    "43": 13,
    "44": 51,
    "45": 12,
    "46": 52,
    "47": 53,
    "48": 11,
    "49": 2,
    "50": 3,
    "51": 4,
    "52": 5,
    "53": 6,
    "54": 7,
    "55": 8,
    "56": 9,
    "57": 10,
    "58": 39,
    "59": 39,
    "60": 51,
    "61": 13,
    "62": 52,
    "63": 53,
    "64": 3,
    "65": 30,
    "66": 48,
    "67": 46,
    "68": 32,
    "69": 18,
    "70": 33,
    "71": 34,
    "72": 35,
    "73": 23,
    "74": 36,
    "75": 37,
    "76": 38,
    "77": 50,
    "78": 49,
    "79": 24,
    "80": 25,
    "81": 16,
    "82": 19,
    "83": 31,
    "84": 20,
    "85": 22,
    "86": 47,
    "87": 17,
    "88": 45,
    "89": 21,
    "90": 44,
    "91": 26,
    "92": 43,
    "93": 27,
    "94": 7,
    "95": 12,
    "96": 41,
    "97": 30,
    "98": 48,
    "99": 46,
    "100": 32,
    "101": 18,
    "102": 33,
    "103": 34,
    "104": 35,
    "105": 23,
    "106": 36,
    "107": 37,
    "108": 38,
    "109": 50,
    "110": 49,
    "111": 24,
    "112": 25,
    "113": 16,
    "114": 19,
    "115": 31,
    "116": 20,
    "117": 22,
    "118": 47,
    "119": 17,
    "120": 45,
    "121": 21,
    "122": 44,
    "123": 26,
    "124": 43,
    "125": 27,
    "126": 41
}

const stupid_css_override = `
    #mainCanvas {
        position: relative !important;
    }
    #terminal {
        z-index: 999 !important;
    }

`

const html = `
<div id="rework-container">
    <div id="terminal">
        <div id="terminal-tools">
            <div id='checkbox-tools'>
            </div>
            <div id="vm-name"></div>
            <div id="button-tools">
            </div>
            <div id="select-tools"></div>
        </div>
            <div id='terminal-console'>
        </div>
    </div>
</div>
<div id="upload-overlay">
    <div id='dropArea' style="color:inherit;border:1px dashed rgba(211, 211, 211, 0.514);background-color:rgba(211, 211, 211, 0.233);">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <i class="fa fa-upload" style="font-size: 50px;"></i>
            <p>Drop file to upload</p>
        </div>
    </div>
</div>

`

function init(data) {
    // Captured WMKS instance
    var wmks = {
        _wmks: data.data,
        set wmks(value) {
            this._wmks = value
        },
        get wmks() {
            try {
                return this._wmks
            } catch (e) {
                this._wmks = getWMKS()
                return this._wmks
            }
        }
    }

    const rebase_css = {
        height: '100vh',
        width: '100vw',
        margin: '0px',
        padding: '0px',
    }

    const css = `
    #rework-container {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        font-family: Hack, "Segoe UI";
        color: white;
        font-size: 10px;
        background-color: #080808;
    }

    #divider {
        z-index: 99999;
        width: 100%;
        height: 2px;
        cursor: none;
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
        background-color: #404040;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    }

    #divider-handle {
        position: relative;
        top: -5px;
        min-width: 50px;
        min-height: 10px;
        cursor: row-resize;
        background-color: #404040;
        border-radius: 3px;
    }

    #vmware-interface {
        position: relative;
        flex: 0 0 auto;
        max-width: 100%;
        height: 100%;
        background-color: #080808;
    }

    #mainCanvas {
        z-index: 999;
    }

    #terminal {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        width: 100%;
        height: 20%;
        background-color: #000;
    }

    #terminal-tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        gap: 10px;
        padding: 0 10px;
        background-color: #222222;
    }

    #checkbox-tools {
        display: flex;
        gap: 5px;
        position: relative;
    }

    #selection-tools {
        display: flex;
        position: relative;
        height: 24px;
    }

    #button-tools {
        display: flex;
        gap: 10px;
        position: relative;
        margin-left: auto;
    }

    #tool-item-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #terminal-console {
        background-color: #000;
    }

    input[type="checkbox"] {
        background-color: #222222;
        width: 15px;
        height: 15px;
        margin: 5px;
        padding: 0px;
        border-radius: 5px;
        accent-color: #222222;
    }

    input[type="button"] {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: transparent;
        border-color: #717171;
        height: 30px;
        width: 30px;
        transition: all 0.2s ease-in-out;
        background-color: #222222;
    }

    select {
        min-width: 200px;
        height: 30px;
        border-radius: 3px;
        border: none;
        background-color: #222222;
    }

    #new-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        border-radius: 50%;
        z-index: 999;
        height: 30px;
        width: 30px;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.35);
    }

    #upload-overlay {
        display: grid;
        position: absolute;
        z-index: 999;
        place-items: center;
        margin: 0px;
        color: rgba(211, 211, 211, 0.514);
        background-color: #242424ad;
}
    `



    class IconCheckboxContainer extends HTMLDivElement {
        constructor(props) {
            super(props)
            if (props.data) {
                Object.entries(props.data).forEach((key) => {
                    this.setAttribute(`data-${key[0]}`, key[1])
                })
            }
            this.id = `${props.id}-checkbox-container`

            let input = new IconCheckbox(props)
            this.appendChild(input)

            const label = document.createElement('label')
            label.setAttribute('for', `#${input.id}`)
            label.textContent = props.id

            this.appendChild(label)

            // $(this).css(toolItemContainerStyles)
            //TODO init tooltips..
        }
    }
    class IconCheckbox extends HTMLInputElement {
        constructor(props) {
            super()

            this.id = `${props.id}-checkbox`
            // $(this).css(inputStyles.checkbox)
            this.type = props.type
            props.checked && this.setAttribute('checked', true)
            function clicked(e) {
                try {
                    props.onClick.bind(this)(e)
                } catch (e) {
                    console.error(e)
                }
            }
            this.addEventListener('click', clicked)
        }
    }

    class IconButton extends HTMLAnchorElement {
        constructor(props) {
            super()
            if (props.data) {
                Object.entries(props.data).forEach((key) => {
                    this.setAttribute(`data-${key[0]}`, key[1])
                })
            }
            this.id = `${props.id}-btn`
            const icon = document.createElement('i')
            $(icon).css({
                color: "#1e87f0",
                fontSize: '16px'
            })
            icon.classList = props.icon
            this.append(icon)

            // props.style ? $(this).css(props.style) : $(this).css(inputStyles.button)
            function clicked(e) {
                try {
                    props.onClick.bind(this)(e)
                } catch (e) {
                    console.error(e)
                }
            }
            this.addEventListener('click', clicked)
        }
    }

    class IconSelection extends HTMLSelectElement {
        constructor(props) {
            super()
            if (props.data) {
                Object.entries(props.data).forEach((key) => {
                    this.setAttribute(`data-${key[0]}`, key[1])
                })
            }
            this.id = `${props.id}-select`
            function clicked(e) {
                try {
                    props.onClick.bind(this)(e)
                } catch (e) {
                    console.error(e)
                }
            }
            this.addEventListener('change', clicked)

            // $(this).css(inputStyles.select)
            if (props.preload) {
                try {
                    props.preload()
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    customElements.define('input-container', IconCheckboxContainer, { extends: 'div' })
    customElements.define('icon-button', IconButton, { extends: 'a' })
    customElements.define('icon-selection', IconSelection, { extends: 'select' })
    customElements.define('icon-checkbox', IconCheckbox, { extends: 'input' })


    const toggles = {
        closings: false,
        newline: true,
        adjust_resolution: true,
    }

    function toggleInterface() {
        console.log('interface toggle clicked')
        if ($('#content-wrapper').css('display') == 'none') {
            $('#content-wrapper').show()
            $("#vmware-interface").appendTo('.interface:first-child')
            $('#rework-container').hide()
            $('#new-btn').show()
        } else {
            $('#rework-container').show()
            $("#vmware-interface").prependTo('#rework-container')
            $('#content-wrapper').hide()
            $('#new-btn').hide()
        }
    }

    //
    // INTERFACE ELEMENTS
    //
    const interfaceElements = [{
        id: "open-terminal",
        type: 'button',
        data: { tooltip: "Open Terminal", },
        classs: "icon-btn",
        icon: "fa fa-terminal",
        onClick: function () {
            wmks.wmks.getLegacyKeyboardManager().sendKey(26)
        },
    }, {
        id: "cad",
        type: 'button',
        data: {
            tooltip: "Send Ctrl + Alt + Del to the VM.",
        },
        classs: "icon-btn",
        icon: "fa fa-keyboard-o",
        onClick: function () {
            wmks.wmks._keyboardManager.sendVScanKey([29, 56, 83])
        }
    },
    {
        id: "popout",
        type: 'button',
        data: { tooltip: "Popout terminal into seperate window. (Experimental)", },
        classs: "icon-btn",
        icon: "fa fa-eject",
        onClick: () => { },
    },
    {
        id: "fullscreen",
        type: 'button',
        data: { tooltip: "Fullscreen", },
        classs: "icon-btn",
        icon: "fa fa-tv",
        onClick: function () {
            console.log('fullscreen clicked')
            // fullscreen()
        },
    }, {
        id: "old",
        type: 'button',
        data: { tooltip: "Switch back to old interface.", },
        classs: "icon-btn",
        icon: "fa fa-trash-o",
        onClick: toggleInterface
    }, {
        id: "closings",
        type: 'checkbox',
        data: { tooltip: "Check for closing partners for all brackets, paraenes, quotes, and back ticks (`). Prints what is missing, if any are found. Will not trip-up on escaped characters.", },
        checked: toggles.closings,
        onClick: (e) => {
            toggles.closings = e.target.checked
        }
    }, {
        id: "newline",
        type: 'checkbox',
        data: { tooltip: "Submit command to VM rather than just paste to VM.", },
        onClick: (e) => {
            toggles.newline = e.target.checked
        },
        checked: toggles.newline
    }, {
        id: "adjust-resolution",
        type: 'checkbox',
        data: { tooltip: "When the VM Console is resized the VM with adjust its resolution to match the new console side. Reccommened use with rescale.", },
        checked: toggles.adjust_resolution,
        onClick: (e) => {
            toggles.adjust_resolution = e.target.checked
            setMargins()
            wmks.wmks._setOption('rescale', e.target.checked)
            wmks.wmks._setOption('changeResolution', e.target.checked)
            wmks.wmks.rescaleOrResize()
        },
    }, {
        id: 'vm',
        type: 'select',
        data: { tooltip: "Select VM to connect to." },
        preload: (e) => {
            // Get list of VMs for connected range
            let host = window.location.host
            let id = window.location.href.split("/")[8]
            $.get(`https://${host}/api/range-server/events/${id}/range-info/vm-names-consoles`)
                .then((data) => {
                    $.each(data.vms, (idx, value) => {
                        let option = $(`<option key=${value.key.index} data-repetitionGroup="${value.key.repetitionGroup}" value="${value.val}">${value.val}</option>`)
                        window.location.href.split("vmName=")[1] == value.val ? option.prop('selected', true) : null
                        $('#vm-select').append(option)
                    })

                })
        },
        onClick: (e) => {
            if ($('#mainCanvas').length <= 0) return
            $('#vmware-interface').remove()
            let host = window.location.host
            let urlParts = window.location.href.split("/")
            let selected = $(e.currentTarget).find(':selected')
            let key = selected.attr('key')
            let repetitionGroup = selected.attr('data-repetitionGroup')
            let vmName = selected.val()
            let connectUrl = `https://${host}/#/app/range/console/live-action/${urlParts[8]}/${urlParts[9]}/${repetitionGroup}/${key}?vmName=${vmName}`
            window.location.href = connectUrl

            setTimeout(() => {
                $('#vmware-interface').prependTo('#rework-container')
            }, 1000)
        }
    },
    ]


    const staticButtons = [{
        parent: 'body',
        // style: inputStyles.newButton,
        id: "new",
        type: 'button',
        data: { tooltip: "Switch back to old interface.", },
        classs: "icon-btn",
        icon: "fa fa-chevron-circle-left",
        onClick: toggleInterface,
        onLoad: $(this).hide

    }]

    //
    // TERMINAL SETTINGS
    //
    const terminalPrompts = {
        default: ' ' + window.name.split(':')[0] + '> ',
    }
    const terminalEvents = {
        onResize: function () {
            this.scroll_to_bottom()
        },
    }
    const terminalKeymap = {
        keymap: {
            ENTER: function (e, original) {
                let command = this.get_command()
                command = toggles.newline ? `${command}\n` : command
                wmks.wmks.sendInputString(command)
                original()
            },
        },
    }
    const terminalCommands = {
        commands: function (command) {
            this.scroll_to_bottom()
            return ""
        }
    }
    const terminalOptions = {
        ...terminalKeymap,
        ...terminalEvents,
        greetings: false,
        prompt: terminalPrompts.default,
        height: $('#terminal').height(),
    }

    const jqueryui_css = GM_getResourceText("jqueryui_css")
    const jquerys_css = GM_getResourceText("jquerys_css")
    const juqeryt_css = GM_getResourceText("juqeryt_css")
    const fontawesome_css = GM_getResourceText("fontawesome_css")
    const hack_css = GM_getResourceText("hack_css")
    const terminal_css = GM_getResourceText("terminal_css")

    GM_addStyle(jqueryui_css)
    GM_addStyle(jquerys_css)
    GM_addStyle(juqeryt_css)
    GM_addStyle(terminal_css)
    GM_addStyle(fontawesome_css)
    GM_addStyle(hack_css)


    // Append skeleton html for the new interface
    $('body').append(html)

    const vmInterface = $('#vmware-interface')
    const terminalContainer = $('#terminal')
    const terminalTools = $('#terminal-tools')

    const divider = $("<div id='divider' class='ui-resizable-handle ui-resizable-s'></div>")
    const dividerHandle = $("<span id='divider-handle' class='resizable-handle'></span>")
    divider.append(dividerHandle)
    vmInterface.append(divider)

    // Add the CSS-in-JS objects back to the jQuery items to retain their original stylings
    $('html').css(rebase_css)
    $('body').css(rebase_css)

    // reworkContainer.css(reworkContainerStyles)
    // mainCanvas.css(mainCanvasStyles)
    // divider.css(dividerStyles)
    // dividerHandle.css(dividerHandleStyles)
    // vmInterface.css(vmInterfaceStyles)
    // terminalContainer.css(terminalContainerStyles)
    // terminalTools.css(terminalToolsStyles)
    // terminalCheckboxes.css(terminalCheckboxesStyles)
    // terminalSelections.css(terminalSelectionsStyles)
    // terminalButtons.css(terminalButtonsStyles)
    // terminalConsole.css(terminalConsoleStyles)
    // uploadOverlay.css(uploadOverlayStyles)

    // Add custom CSS to override the stupid wkms resizing listener thats more elusive in the DOM than bigfoot is in the woods...
    GM_addStyle(stupid_css_override)
    GM_addStyle(css)

    // Create interface elements and functionallity
    $(interfaceElements).each((idx, props) => {
        if (props) {
            let element
            console.info(`Item inserted into #${props.type}-tools`)
            switch (props.type) {
                case 'button':
                    element = new IconButton(props)
                    $(`#${props.type}-tools`).append(element)
                    break
                case 'select':
                    element = new IconSelection(props)
                    $(`#${props.type}-tools`).append(element)
                    break
                case 'checkbox':
                    element = new IconCheckboxContainer(props)
                    break
            }
            $(`#${props.type}-tools`).append(element)
        }
    })

    // Add static buttons
    $(staticButtons).each((idx, props) => {
        if (props) {
            console.info(`Item inserted into #${props.type}-tools`)
            let element = new IconButton(props)
            $(props.parent).append(element)
            props.onLoad.bind($(element))()
        }
    })

    // Add expand and collapse buttons to the terminal
    const expand = $("<a id='expand' class='icon-btn' hidden><i class='fa fa-arrow-up'></i></a>")
    const collapse = $("<a id='collapse' class='icon-btn'><i class='fa fa-arrow-down'></i></a>")
    terminalTools.prepend(expand)
    terminalTools.prepend(collapse)

    // Hide feedback container from showing at every resize of the terminal
    $('.feedback-container.cursor-icon-shadow').hide()

    // Finally show new interface
    toggleInterface()

    // Init tooltips
    $('#terminal').tooltip({
        items: "[data-tooltip]",
        content: function () {
            var element = $(this)
            if (element.is("[data-tooltip]")) {
                var text = element.data("tooltip")
                return $("<p>").text(text)
            }
        },
        position: {
            collision: "flipfit",
        },
    })

    // Initialize the jQuery Terminal
    $('#terminal-console').terminal(terminalCommands, {
        ...terminalOptions,
    })

    // set minimum height for terminal so the slider dosen't completly hide the element
    terminalContainer.css('min-height', $('#terminal-tools').height())

    // Add expand and collpase functionality
    $('#expand').on('click', function () {
        let height = localStorage.getItem('terminal_height', '100%')

        // set #vmware-interface to flex: 1 1 auto
        $('#vmware-interface').css('flex', '0 0 auto')


        $('#terminal').animate({ height: height }, 500)
        $('#terminal').css('flex', '1 1 auto')


        $('#expand').hide()
        $('#collapse').show()
    })

    $('#collapse').on('click', function () {
        localStorage.setItem('terminal_height', terminalContainer.height())
        height = $('#terminal-tools').height()

        // set #vmware-interface to flex: 1 1 auto
        $('#vmware-interface').css('flex', '1 1 auto')
        $('#terminal').css('flex', '0 0 auto')

        // animate resize
        $('#terminal').animate({ height: 0 }, 500)
        $('#expand').show()
        $('#collapse').hide()
    })

    // terminal drang and drop events
    function dragOver(e) {
        e.preventDefault()
        e.stopPropagation()

        let position = {
            top: $('#terminal').offset().top,
            left: $('#terminal').offset().left,
            right: 0,
            bottom: 0
        }

        $('#upload-overlay').css(position)
        $('#dropArea').css(position)
        $('#upload-overlay').show()
    }

    function getFileContents(e) {
        let contents = e.target.result
        let lines = contents.split('\n')

        for (var line = 0; line < lines.length; line++) {
            lines[line] = line == lines.length - 1 ? lines[line] + '\r' : lines[line]
            setTimeout(function (lines, line) {
                wmks.wmks.sendInputString(lines[line])
            }(lines, line), 100 * line)
        }
    }
    function dragDrop(e) {
        e.preventDefault()
        e.stopPropagation()

        let selectedFile = e.originalEvent.dataTransfer.files[0]

        // Read and display the text content of the dropped file
        let reader = new FileReader()
        reader.onload = getFileContents
        reader.readAsText(selectedFile)
        $('#upload-overlay').hide()
    }

    // Add drag and drop events to terminal
    $('#terminal').on('dragover', dragOver)
    $('#upload-overlay').on('dragleave', () => { $('#upload-overlay').hide() })
    $('#upload-overlay').on('dragover', dragOver)
    $('#upload-overlay').on('drop', dragDrop)
    $('#dropArea').on('drop', dragDrop)

    // Make the VMWare console resizable
    setTimeout(() => {
        $("#vmware-interface").resizable({
            handles: {
                's': "#divider",
            },
            ghost: true,
            start: function (event, ui) {
                $('#expand').hide()
                $('#collapse').show()
            },
            stop: function (event, ui) {
                if (toggles.adjust_resolution) {
                    wmks.wmks._setOption('changeResolution', true)
                    wmks.wmks._setOption('rescale', true)
                    $('#mainCanvas').css('height', `${$('#vmware-interface').height()}px !important`)

                }
                $('#vmware-interface').css('flex', '0 0 auto')
                $('#terminal').css('flex', '1 1 auto')
                setMargins()
            },
            maxHeight: window.innerHeight - $('#terminal-tools').outerHeight(),
        })

    }, 1000)


    // const targetNode = document.getElementById('vmware-interface')

    // const observer = new MutationObserver(mutations => {
    //     mutations.forEach(mutation => {
    //         if (mutation.type === 'childList') {
    //             console.log('A child node has been added or removed.')
    //         } else if (mutation.type === 'attributes') {
    //             console.log('An attribute has been modified.')
    //         }
    //     })
    // })

    // const config = {
    //     childList: true,
    //     attributes: true,
    //     subtree: true
    // }

    // observer.observe(targetNode, config)
}

function setMargins() {
    function getMargin() {
        // get scale factor with regex, becasue jquery dosen't support 'scale' css property

        if ($('#mainCanvas').css('transform') == 'none') return
        let scaleFactor = parseFloat($('#mainCanvas').css('transform').match(/matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/)[1])
        let mainCanvasWidth = $('#mainCanvas').width() * scaleFactor
        let screenWidth = $('#vmware-interface').width()
        return ((screenWidth - mainCanvasWidth) / 2)
    }

    $('#mainCanvas').css('margin', `0 ${getMargin}px`)
}

function getWMKS() {
    let target = document.querySelector("#vmware-interface")
    for (const key in target) {
        if (key.includes('jQuery')) {
            return target[key].wmksNwmks
        }
    }
    return undefined
}

function wait() {
    setTimeout(() => {
        if ($('#vmware-interface').length > 0) {

            // Starts listener for when wmks api object has been captured and stored in the DOM
            $(document).on('wmks-loaded', function (event, data) {
                init(data)
            })

            console.log("vmware-interface added")

            let wmks = getWMKS()

            $(document.body).trigger('wmks-loaded', { data: wmks })
        } else {
            wait()
        }
    }, 1000)
}

wait()
