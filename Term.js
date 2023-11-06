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
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js
// @require      https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/js/jquery.terminal.js
// @resource     jqueryui_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-ui/jquery-ui.css
// @resource     jquerys_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-ui/jquery-ui.structure.css
// @resource     juqeryt_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-ui/jquery-ui.theme.css
// @resource     fontawesome_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/font-awesome/font-awesome.css
// @resource     hack_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/hack/hack.css
// @resource     terminal_css https://raw.githubusercontent.com/GooberFromHell/CyberTerminal/main/css/jquery-terminal/jquery.terminal.css
// @require      file://D:/Code/js/CYBERTerminal/Term.js
// ==/UserScript==


const html = `
<div id="rework-container">
<div id="divider" class="ui-resizable-handle"><span class="resizable-handle"></span></div>
    <div id="terminal">
        <div id="terminal-tools">
            <div id='checkbox-tools'>
            </div>
            <div id="button-tools">
            </div>
            <div id="select-tools"></div>

        </div>
        <div id='terminal-console'>
        </div>
    </div>
    </div>
    <div id="upload-overlay" class="d-none">
    <div id='dropArea'
        style="color:inherit;border:1px dashed rgba(211, 211, 211, 0.514);background-color:rgba(211, 211, 211, 0.233); padding: 5px;">
        <div>
            <span class='fa fa-cloud-upload' </span>
                <span>Dropping file here or</span>
                <div>
                    <input id='upload-file' type="file">
                    <a>select one</a>
                </div>
        </div>
    </div>
    <a id='close-over' class="icon-btn"><i class="fa fa-close"></i></a>
</div>`

const resizer_css = `
position: relative;
z-index: 99999;
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

    const style = {
        flex: {
            display: 'flex',
        },
        flexCenter: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        flexColumn: {
            flexDirection: 'column',
        },
        flexCenterColumn: {
            ...this.flexCenter,
            ...this.flexColumn,
        }
    }

    const reworkContainerStyles = {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Hack, "Segoe UI"',
        color: 'white',
        fontSize: '10px',
    }

    const vmInterfaceStyles = {
        flex: '0 0 auto',
        maxWidth: '100%',
        height: '100%',
        backgroundColor: '#080808', // Changed property name to camelCase
    }

    const terminalContainerStyles = {
        ...style.flex,
        ...style.flexColumn,
        flex: ' 1 1 auto',
        backgroundColor: '#eee',
        width: '100%',
        height: '20%',
        borderTop: '4px solid #404040',
        boxShadow: 'inset 0px 0px 10px 2px rgba(0,0,0,0.75)',
        backgroundColor: '--terminal-background-color', // Added a custom property

    }

    const terminalToolsStyles = {
        ...style.flex,
        ...style.row,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        gap: '10px',
        padding: '0 10px',
        backgroundColor: '#222222',
    }

    const terminalCheckboxesStyles = {
        ...style.flex,
        gap: "5px",
        position: 'relative',

    }

    const terminalSelectionsStyles = {
        ...style.flex,
        position: 'relative',
    }

    const terminalButtonsStyles = {
        ...style.flex,
        gap: "10px",
        position: 'relative',
        marginLeft: 'auto',
    }

    const toolItemContainerStyles = {
        ...style.flex,
        ...style.flexCenter
    }

    const inputStyles = {
        checkbox: {
            width: '15px',
            height: '15px',
            margin: '5px',
            padding: '0px',
            borderRadius: '5px',
        },
        button: {
            ...style.flex,
            ...style.flexCenter,
            borderRadius: '50%',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            height: '26px',
            width: '26px',
            transition: 'all 0.2s ease-in-out',
        },
        select: {
            minWidth: '200px',
        }
    }

    const uploadOverlayStyles = {
        display: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 999,
        placeItems: 'center',
        margin: '0px',
        color: 'rgba(211, 211, 211, 0.514)',
        backgroundColor: '#242424ad',
    }
    class IconCheckbox extends HTMLInputElement {
        constructor(props) {
            super()
            this.id = `${props.id}-checkbox`
            $(this).css(inputStyles.checkbox)
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
    class IconCheckboxContainer extends HTMLDivElement {
        constructor(props) {
            super(props)
            this.setAttribute('data-tooltip', props.tooltip)
            this.setAttribute('data-type', props.type)

            this.id = `${props.id}-checkbox-container`

            let input = new IconCheckbox(props)
            this.appendChild(input)

            const label = document.createElement('label')
            label.setAttribute('for', `#${input.id}`)
            label.textContent = props.id

            this.appendChild(label)

            $(this).css(toolItemContainerStyles)
            //TODO init tooltips..
        }
    }
    class IconButton extends HTMLAnchorElement {
        constructor(props) {
            super()
            this.id = `${props.id}-btn`

            const icon = document.createElement('i')
            icon.classList = props.icon
            this.append(icon)

            $(this).css(inputStyles.button)

            this.setAttribute('data-tooltip', props.tooltip)
            this.setAttribute('data-type', props.type)
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
            this.id = `${props.id}-select`
            this.setAttribute('data-tooltip', props.tooltip)
            this.setAttribute('data-type', props.type)
            function clicked(e) {
                try {
                    props.onClick.bind(this)(e)
                } catch (e) {
                    console.error(e)
                }
            }
            this.addEventListener('click', clicked)

            $(this).css(inputStyles.select)
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
        adjust_resolution: false,
    }

    //
    // INTERFACE ELEMENTS
    //
    const interfaceElements = {
        open_terminal: {
            type: 'button',
            tooltip: "Open Terminal",
            classs: "icon-btn",
            icon: "fa fa-terminal",
            onClick: function () {
                openTerminal('windows')
            },
        },
        cad: {
            type: 'button',
            tooltip: "Send Ctrl + Alt + Del to the VM.",
            classs: "icon-btn",
            icon: "fa fa-keyboard-o",
            onClick: function () {
                wmks.wmks.sendCAD()
            }
        },
        popout: {
            type: 'button',
            tooltip: "Popout terminal into seperate window. (Experimental)",
            classs: "icon-btn",
            icon: "fa fa-eject",
            onClick: () => { },
        },
        fullscreen: {
            type: 'button',
            tooltip: "Fullscreen",
            classs: "icon-btn",
            icon: "fa fa-tv",
            onClick: function () {
                fullscreen()
            },
        },
        old: {
            type: 'button',
            tooltip: "Switch back to old interface.",
            classs: "icon-btn",
            icon: "fa fa-trash-o",
            onClick: function (e) {
                toggleInterface()
            },
        },
        closings: {
            type: 'checkbox',
            tooltip: "Check for closing partners for all brackets, paraenes, quotes, and back ticks (`). Prints what is missing, if any are found. Will not trip-up on escaped characters.",
            checked: toggles.closings,
            onClick: (e) => {
                toggles.closings = e.target.checked
            }
        },
        newline: {
            type: 'checkbox',
            tooltip: "Submit command to VM rather than just paste to VM.",
            onClick: (e) => {
                toggles.newline = e.target.checked
            },
            checked: toggles.newline
        },
        adjust_resolution: {
            type: 'checkbox',
            tooltip: "When the VM Console is resized the VM with adjust its resolution to match the new console side. Reccommened use with rescale.",
            checked: toggles.adjust_resolution,
            onClick: (e) => {
                toggles.adjust_resolution = e.target.checked
                wmks.wmks._setOption('changeResolution', e.target.checked)
                wmks.wmks._setOption('rescale', e.target.checked)
                setMargins()
            },
        },
        vm: {
            type: 'select',
            tooltip: "Select VM to connect to.",
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
        [Symbol.iterator]: function () {
            const properties = Object.keys(this)
            let index = 0
            return {
                next: () => {
                    if (index < properties.length) {
                        const key = properties[index]
                        const value = this[key]
                        index++

                        const getInput = (props) => {
                            switch (props.type) {
                                case 'button':
                                    return new IconButton(props)
                                case 'select':
                                    return new IconSelection(props)
                                case 'checkbox':
                                    return new IconCheckboxContainer(props)
                            }
                        }

                        return { index: index, value: getInput({ id: key, ...value }) }
                    } else {
                        return { done: true }
                    }
                },
            }
        },
    }
    const staticButtons = {
        new: {
            tooltip: "Switch back to old interface.",
            class: "icon-btn",
            icon: "fa fa-chevron-circle-left",
            action: function (e) {
                this._showNewInterface()
            },
        }
    }

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

    const reworkContainer = $('#rework-container')
    const vmInterface = $('#vmware-interface')
    const terminalContainer = $('#terminal')
    const terminalTools = $('#terminal-tools')
    const terminalCheckboxes = $('#checkbox-tools')
    const terminalSelections = $('#select-tools')
    const terminalButtons = $('#button-tools')
    const uploadOverlay = $('#upload-overlay')

    // Add the CSS-in-JS objects back to the jQuery items to retain their original stylings
    $('html').css(rebase_css)
    $('body').css(rebase_css)

    reworkContainer.css(reworkContainerStyles)
    vmInterface.css(vmInterfaceStyles)
    terminalContainer.css(terminalContainerStyles)
    terminalTools.css(terminalToolsStyles)
    terminalCheckboxes.css(terminalCheckboxesStyles)
    terminalSelections.css(terminalSelectionsStyles)
    terminalButtons.css(terminalButtonsStyles)
    uploadOverlay.css(uploadOverlayStyles)

    // Hide Old Interface
    $('#content-wrapper').hide()

    // VMWare console to new interface
    $('#vmware-interface').prependTo('#rework-container')

    // Initialize the jQuery Terminal
    $('#terminal-console').terminal(terminalCommands, {
        ...terminalOptions
    })

    // Create interface elements and functionallity
    for (const element of interfaceElements) {
        if (element) {
            $(`#${element.dataset['type']}-tools`).append(element)
        }
    }
    // Make the VMWare console resizable
    setTimeout(() => {
        $("#vmware-interface").resizable({
            handles: 's',
            ghost: true,
            stop: function (event, ui) {
                if (toggles.adjust_resolution) {
                    wmks.wmks._setOption('changeResolution', true)
                    wmks.wmks._setOption('rescale', true)
                    $('#mainCanvas').css('height', `${$('#vmware-interface').height()}px !important`)
                }
                setMargins()
            },
            // minHeight: $('#divider').outerHeight()
        })
    }, 1000)

    function setMargins() {
        function getMargin() {
            // get scale factor with regex, becasue jquery dosen't support 'scale' css property

            if ($('#mainCanvas').css('transform') == 'none') return
            let scaleFactor = parseFloat($('#mainCanvas').css('transform').match(/matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/)[1])
            let mainCanvasWidth = $('#mainCanvas').width() * scaleFactor
            let screenWidth = $('#vmware-interface').width()
            return ((screenWidth - mainCanvasWidth) / 2)
        }

        $('#mainCanvas').css('margin-left', getMargin)
        $('#mainCanvas').css('margin-right', getMargin)
    }
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
