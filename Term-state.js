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

div.feedback-container.cursor-icon-shadow {
    display: none !important;
}

#mainCanvas {
    position: relative;
    z-index: 0 !important;
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

#checkbox-tools,
#button-tools,
#select-tools {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
}

#button-tools {
    margin-left: auto;
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: 5px;
}

#terminal-console {
    background-color: #000;
    height: 100% !important;
}
#terminal-console>.terminal-scroller {
    height: 100% !important;
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

a[type="button"] {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: transparent;
    border-color: #717171;
    height: 25px;
    width: 25px;
    transition: all 0.2s ease-in-out;
}

ul.menu {
    position: absolute;
    left: 0px;
    z-index: 9999;
    background-color: #222222;
    box-shadow: 0 0 5px 1px rgba(0,0,0,.50), 0 0 2px 1px rgba(0,0,0,.75);
    border-radius: 5px;
    padding: 5px;
    top: 105%;
    display: none;

}

ul.menu>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    width: 75px;
    border-radius: 3px;
}

ul.menu>li:hover {
    background-color: #404040;
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

.icon-btn > i {
    color: #1e87f0 !important;
    padding: 5px;
    font-size: 14px;
}

.icon-btn:hover {
    background-color: rgba(199, 199, 199, 12%);
}

a {
    text-decoration: none !important;
}

#notification-wrapper {
    position: absolute;
    z-index: 9999;
    width: 400px;
    padding: 10px 10px 10px 0px;
    bottom: 0;
    top: 0;
    pointer-events: none;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.notification {
    position: relative;
    width: 100%;
    height: 85px;
    margin-bottom: 10px;
    padding: 10px;
  
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  
    transition: all .3s ease-in;
    cursor: pointer;
}

.notification-content { width: calc( 100% - 105px ); }
.notification-title,
.notification-message { display: block; }

.notification-title {
  font-size: 17px;
}

.notification-message {
  font-size: 14px;
  color: #929292;
}

.notification-option {
    position: absolute;
    top: 5px;
    right: 5px;
  width: 20px;
  height: 20px;
  margin: 8px 0;

  border-radius: 50%;

  font-size: 10px;
  text-align: center;

  cursor: pointer;
  transition: all .2s;
}

.notification:hover {
    background-color: #f7f7f7;
    transform: scale( 0.95 );
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .notification:hover .notifications-option { opacity: 1; }
  
  
  
  .notification.delete {
    animation: deleteAnimation 1.5s cubic-bezier(0, 0, 0, 1.12) forwards;
    animation-delay: .6s;
  }
  
  @keyframes deleteAnimation{
    to {
      transform: translateX( 100px );
      opacity: 0;
    }
  }
`

const html = `
<div id="rework-container">
    <div id="terminal">
        <div id="terminal-tools">
            <div id='checkbox-tools'></div>
            <div id="vm-name"></div>
            <div id="button-tools"></div>
            <div id="select-tools"></div>
        </div>
            <div id='terminal-console'></div>
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
<div id="notification-wrapper"></div>
`

const interfaceElements = [
    {
        id: "open-terminal",
        type: 'button',
        data: { tooltip: "Open Terminal", },
        classes: "icon-btn",
        icon: "fa fa-terminal",
    },
    {
        id: "cad",
        type: 'button',
        data: {
            tooltip: "Send Ctrl + Alt + Del to the VM.",
        },
        classes: "icon-btn",
        icon: "fa fa-keyboard-o",
    },
    {
        id: "popout",
        type: 'button',
        data: { tooltip: "Popout terminal into seperate window. (Experimental)", },
        classes: "icon-btn",
        icon: "fa fa-eject",
    },
    {
        id: "fullscreen",
        type: 'button',
        data: { tooltip: "Fullscreen", },
        classes: "icon-btn",
        icon: "fa fa-tv",
    },
    {
        id: "old",
        type: 'button',
        data: { tooltip: "Switch back to old interface.", },
        classes: "icon-btn",
        icon: "fa fa-trash-o",
    },
    {
        id: "closings",
        type: 'checkbox',
        data: { tooltip: "Check for closing partners for all brackets, paraenes, quotes, and back ticks (`). Prints what is missing, if any are found. Will not trip-up on escaped characters.", },
    },
    {
        id: "newline",
        type: 'checkbox',
        data: { tooltip: "Submit command to VM rather than just paste to VM.", },
    },
    {
        id: "adjust-resolution",
        type: 'checkbox',
        data: { tooltip: "When the VM Console is resized the VM with adjust its resolution to match the new console side. Reccommened use with rescale.", },
    },
    {
        id: "interactive",
        type: 'checkbox',
        data: { tooltip: "When checked, the VM Console will be interactive.", },
    },
    {
        id: 'vm',
        type: 'select',
        data: { tooltip: "Select VM to connect to." },
    }
]

const staticButtons = [
    {
        parent: 'body',
        hidden: true,
        id: "new",
        type: 'button',
        data: { tooltip: "Switch back to old interface.", },
        classes: "icon-btn",
        icon: "fa fa-chevron-circle-left",
    },
    {
        parent: "#terminal-tools",
        hidden: true,
        id: "expand",
        type: 'button',
        data: { tooltip: "Expand terminal." },
        classs: "icon-btn",
        icon: "fa fa-arrow-up",
    },
    {
        parent: "#terminal-tools",
        id: "collapse",
        type: 'button',
        data: { tooltip: "Collapse terminal.", },
        classs: "icon-btn",
        icon: "fa fa-arrow-down"
    }
]

const menus = [
    {
        parent: "#open-terminal-btn",
        id: "send-cmd",
        type: "ul",
        items: [{
            text: "windows",
            icon: "fa fa-windows",
        }, {
            text: "linux",
            icon: "fa fa-linux",
        }]
    }
]

const state = {
    html: html,
    css: css,
    _wmks: null,
    wmksOptions: {},
    observers: {
        mainCanvas: null,
        vmInterface: null,
    },
    terminal: null,
    terminalSettings: {
        terminalPrompts: {
            default: ' ' + window.name.split(':')[0] + '> ',
        },
        terminalEvents: {
            onResize: function (terminal) {
                try {
                    let availSpace = $(window).height() - (this.sizes.vmInterface.height + this.elements.terminalTools.height())
                    let lines = Math.floor(availSpace / 18)
                    terminal.setOption('outputLimit', lines)
                    terminal.height(availspace)
                    terminal.scroll_to_bottom()
                } catch {
                    console.error('Unable to scroll to bottom of terminal.')
                }
            },
        },
        terminalKeymap: {
            keydown: function (e, terminal) {
                console.log('keydown: ', e.keyCode)

                this.wmksKeyboard._syncModifiers(e)
                if (this.toggles.interactive) {
                    this.wmks._keyboardManager.onKeyDown(e)
                    this.wmks._keyboardManager.onKeyUp(e)
                    try {
                        terminal.keymap[e.keyCode](e, terminal)
                    } catch {
                        console.error('Unable to find keymap for keydown event.')
                    }
                    return
                }
                if ([17].includes(e.keyCode)) {
                    console.info(`Meta key pressed: ${e.key}`)
                    if (this.wmksKeyboard.keyDownKeyTimer !== null) {
                        clearTimeout(this.keyDownKeyTimer)
                    }
                    this.wmksKeyboard._handleControlKeys(e.keyCode)

                } else if (this.wmksKeyboard.pendingKey == 17 && e.key == 'C') {
                    this.wmksKeyboard.keyDownKeyTimer = setTimeout(function () {
                        this.wmks.sendInputString('c')
                        // this.wmksKeyboard.sendKey(e.keyCode, true, false)
                        this.wmksKeyboard.keyDownKeyTimer = null
                        this.wmksKeyboard.pendingKey = null
                    }.bind(this), 0)
                }

                this.wmksKeyboard.pendingKey = e.keyCode
                this.wmksKeyboard.keyDownKeyTimer = setTimeout(function () {
                    this.wmksKeyboard.keyDownKeyTimer = null
                    this.wmksKeyboard.pendingKey = null
                }.bind(this), 500)
            },
            keymap: {
                ENTER: function (e, original) {
                    if (!this.toggles.interactive) {
                        let command = this.terminal.get_command()
                        command = this.toggles.newline ? `${command}\r` : command
                        this.wmksKeyboard._syncModifiers(e)
                        console.info(`Active Modifiers: ${this.wmksKeyboard.activeModifiers}`)
                        this.wmks.sendInputString(command)
                        original()
                    } else {
                        original()
                    }
                },
                TAB: function (e, original) {
                    e.preventDefault()
                    e.stopPropagation()
                    if (this.wmksKeyboard.pendingKey == 9) {
                        let command = this.terminal.get_command()
                        command && this.wmks.sendInputString(command)
                        this.terminal.set_command('')
                        this.utils.sendKeyPress(9)
                        this.utils.sendKeyPress(9)
                    }
                },
            },
        }
    },
    toggles: {
        get adjustResolution() { return $('#adjust-resolution-checkbox').prop('checked') },
        get closings() { return $('#closings-checkbox').prop('checked') },
        get newline() { return $('#newline-checkbox').prop('checked') },
        get interactive() { return $('#interactive-checkbox').prop('checked') },
        get contentWrapperVisible() { return $('#content-wrapper').css('display') != 'none' },
        get terminalVisible() { return $('#terminal').height() > $('#terminal-tools').height() },
    },
    elements: {
        get reworkContainer() { return $('#rework-container') },
        // get vmInterface() { return $('#vmware-interface') },
        get vmInterface() { return $('.interface') },
        get mainCanvas() { return $('#mainCanvas') },
        get terminal() { return $('#terminal') },
        get terminalConsole() { return $('#terminal-console') },
        get terminalTools() { return $('#terminal-tools') },
        get checkboxTools() { return $('#checkbox-tools') },
        get buttonTools() { return $('#button-tools') },
        get selectionTools() { return $('#select-tools') },
        get notificationWrapper() { return $('#notification-wrapper') },
        get uploadOverlay() { return $('#upload-overlay') },
        get dropArea() { return $('#drop-area') },
    },
    buttons: {
        get openTerminal() { return $('#open-terminal-btn') },
        get sendCad() { return $('#cad-btn') },
        get popout() { return $('#popout-btn') },
        get fullscreen() { return $('#fullscreen-btn') },
        get oldInterface() { return $('#old-btn') },
        get newInterface() { return $('#new-btn') },
        get collapse() { return $('#collapse-btn') },
        get expand() { return $('#expand-btn') },
    },
    checkboxes: {
        defaults: {
            "adjust-resolution": true,
            closings: false,
            newline: true,
            interactive: false,
        },
        get closings() { return $('#closings-checkbox') },
        get newline() { return $('#newline-checkbox') },
        get adjustResolution() { return $('#adjust-resolution-checkbox') },
        get interactive() { return $('#interactive-checkbox') },
    },
    menus: {
        get windows() { return $('#windows-menu-item') },
        get linux() { return $('#linux-menu-item') },
    },
    selects: {
        get vmSelect() { return $('#vm-select') },
    },
    sizes: {
        get mainCanvas() {
            return {
                width: $('#mainCanvas').width(),
                height: $('#mainCanvas').height(),
            }
        },
        get vmInterface() {
            return {
                width: $('#vmware-interface').width(),
                height: $('#vmware-interface').height(),
            }
        },
        get terminal() {
            return {
                width: $('#terminal').width(),
                height: $('#terminal').height(),
            }
        },
        get reworkContainer() {
            return {
                width: $('#rework-container').width(),
                height: $('#rework-container').height(),
            }
        },
        prevTerminalSize: 0,
    },
    utils: {
        sendKeyCombo(keys) {
            keys.forEach((key) => {
                this.wmksKeyboard.sendKey(key, false, false)
            })
            keys.forEach((key) => {
                this.wmksKeyboard.sendKey(key, true, false)
            })
        },
        sendKeyPress(key) {
            this.wmksKeyboard.sendKey(key, false, false)
            this.wmksKeyboard.sendKey(key, true, false)
        },
        preloadVmSelect: () => {
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
        resizeVm: function (e) {
            if (this.toggles.adjustResolution) {
                this.elements.vmInterface.height(`${$(window).height() - this.sizes.terminal.height - 10}px`)
            } else if (this.sizes.vmInterface.height < 10) {
                this.elements.vmInterface.height(`${$(window).height() * .8}px`)
            }
            this.elements.mainCanvas.height(`${this.sizes.vmInterface.height}px`)

            if (this.toggles.adjustResolution != this.wmksOptions.adjustResolution) {
                this.wmksOptions.changeResolution = this.toggles.adjustResolution
                this.wmksOptions.rescale = this.toggles.adjustResolution
                this.utils.setMargins()
            }

        },
        resizeObserverFactory: function (target, caller, callback) {
            let targetElement = document.querySelector(target)
            return new ResizeObserver(function (entries) {
                for (let entry of entries) {
                    $(this).trigger(`${target}-resized`, entry)
                }
            }.bind(this)).observe(targetElement)
        },
        getWMKS: () => {
            let target = document.querySelector("#vmware-interface")
            for (const key in target) {
                if (key.includes('jQuery')) {
                    return target[key].wmksNwmks
                }
            }
            return undefined
        },
        setMargins: function () {
            if (this.wmks._scale < 1) return
            let scaleFactor = this.wmks._scale
            let mainCanvasWidth = this.elements.mainCanvas.width() * scaleFactor
            let screenWidth = this.elements.vmInterface.width()
            let marginSize = ((screenWidth - mainCanvasWidth) / 2)
            this.elements.mainCanvas.css('margin-left', `${marginSize}px`)
            this.elements.mainCanvas.css('margin-right', `${marginSize}px`)
        },
        getFileContents: (e) => {
            let contents = e.target.result
            let lines = contents.split('\n')
            for (var line = 0; line < lines.length; line++) {
                lines[line] = line == lines.length - 1 ? lines[line] + '\r' : lines[line]
                setTimeout((lines, line) => {
                    this.wmks.sendInputString(lines[line])
                }, 100 * line, [lines, line])
            }
        },
        toggleInterface: function () {
            console.log('interface toggle clicked')
            if ($('#content-wrapper').css('display') == 'none') {
                $('#content-wrapper').show()
                // this.elements.vmInterface.appendTo('.interface>div')
                this.elements.vmInterface.appendTo('#content-wrapper')
                this.elements.reworkContainer.hide()
                this.buttons.newInterface.show()
            } else {
                $('#content-wrapper').hide()
                this.elements.reworkContainer.show()
                this.elements.vmInterface.prependTo('#rework-container')
                this.buttons.newInterface.hide()
            }
        },
        toggleTerminal: function (e) {
            if (this.toggles.terminalVisible) {
                this.sizes.prevTerminalSize = this.sizes.terminal.height
                this.elements.vmInterface.css('flex', '1 0 auto')
                this.elements.terminal.css('flex', '0 1 auto')

                this.elements.terminal.height(this.elements.terminalTools.height())
                setTimeout(() => {
                    this.elements.vmInterface.css('flex', '1 1 auto')
                    this.elements.terminal.css('flex', '0 0 auto')
                }, 550)
                this.buttons.expand.show()
                this.buttons.collapse.hide()
            } else {
                this.elements.vmInterface.css('flex', '0 1 auto')
                this.elements.terminal.css('flex', '1 0 auto')
                this.elements.terminal.height(this.sizes.prevTerminalSize)
                setTimeout(() => {
                    this.elements.vmInterface.css('flex', '0 0 auto')
                    this.elements.terminal.css('flex', '1 1 auto')
                    this.elements.terminal.height('unset')
                }, 550)
                this.buttons.expand.hide()
                this.buttons.collapse.show()
            }
        },
        changeVm: function (e) {
            if (this.elements.mainCanvas.length <= 0) return
            //this.elements.vmInterface.remove()
            this.utils.toggleInterface()
            let host = window.location.host
            let urlParts = window.location.href.split("/")
            let selected = this.selects.vmSelect.find(':selected')
            let key = selected.attr('key')
            let repetitionGroup = selected.attr('data-repetitionGroup')
            let vmName = selected.val()
            let connectUrl = `https://${host}/#/app/range/console/live-action/${urlParts[8]}/${urlParts[9]}/${repetitionGroup}/${key}?vmName=${vmName}`
            window.location.href = connectUrl
            setTimeout(function () {
                this.wmks = this.utils.getWMKS()
                // this.elements.vmInterface.prependTo('#rework-container')
                this.utils.toggleInterface()
                this.utils.initResizable()
                this.utils.resizeVm()
            }.bind(this), 2000)
        },
        initResizable: function () {

            const divider = $("<div id='divider' class='ui-resizable-handle ui-resizable-s'></div>")
            const dividerHandle = $("<span id='divider-handle' class='resizable-handle'></span>")
            divider.append(dividerHandle)
            this.elements.vmInterface.append(divider)
            this.elements.vmInterface.resizable({
                handles: {
                    's': "#divider",
                },
                ghost: true,
                stop: function (event, ui) {
                    this.elements.terminal.css('flex', '1 1 auto')
                    this.elements.vmInterface.css('flex', '0 0 auto')

                    this.buttons.collapse.show()
                    this.buttons.expand.hide()

                    this.utils.resizeVm()
                }.bind(this),
                maxHeight: window.innerHeight - this.elements.terminalTools.height(),
            })
        },
        createNotification: function (title, text) {
            let notification = $(`<div></div>`)
            notification.addClass('notification')
            let notification_content = $(`<div class="notification-content"><span class="notification-title">${title ? title : 'Notification'}</span><span class="notification-message">${text}</span></div>`)
            let notification_option = $('<div class="notification-option">X</div>')
            notification.append(notification_content)
            notification.append(notification_option)
            this.elements.notificationWrapper.append(notification)
            return notification
        }
    },
    events: {
        onNotification: function (e, data) {
            console.info('Notification created')
            let notification = this.utils.createNotification(data.title, data.message)

            requestAnimationFrame(function () {
                setTimeout(function () {
                    notification.addClass('delete')
                    notification.parent().remove(notification)
                }, 2501)
            })
        },
        onVmSelected: function (e) {
            console.info('VM Selected')
            this.utils.changeVm()
        },
        onCollapse: function (e) {
            console.info('Collapse clicked')
            $(window).triggerHandler('notification', { title: 'Interface Interaction', message: 'Collapse clicked' })
            this.utils.toggleTerminal()
            this.utils.resizeVm()
        },
        onExpand: function (e) {
            console.info('Expand clicked')
            this.utils.toggleTerminal()
            this.utils.resizeVm()
        },
        onDragOver: function (e) {
            console.info('File dragged over')
            e.preventDefault()
            e.stopPropagation()

            let position = {
                top: this.elements.terminal.offset().top,
                left: this.elementsterminal.offset().left,
                right: 0,
                bottom: 0
            }

            this.elements.dropArea.css(position)
            this.elements.uploadOverlay.css(position)
            this.elements.uploadOverlay.show()
        },
        onDrop: function (e) {
            console.info('File dropped')
            e.preventDefault()
            e.stopPropagation()

            let selectedFile = e.originalEvent.dataTransfer.files[0]

            let reader = new FileReader()
            reader.onload = this.utils.getFileContents
            reader.readAsText(selectedFile)

            this.elements.uploadOverlay.hide()
        },
        onPopout: function (e) {
            console.info('Popout clicked')
        },
        onFullscreen: function (e) {
            console.info('Fullscreen clicked')
        },
        onOpenTerminal: function (key, e) {
            console.info('Open Terminal clicked')
            this.wmksKeyboard._syncModifiers(e)
            this.utils.sendKeyPress(91)
            switch (key) {
                case 'windows':
                    setTimeout(() => {
                        this.wmks.sendInputString("cmd.exe /c \"start /max cmd /k mode con:cols=120 lines=2500\"\n")
                    }, 250)
                    break
                case 'linux':
                    setTimeout(() => {
                        this.wmks.sendInputString("term\n")
                    }, 250)
                    break
                    break

            }

        },
        onSendCad: function (e) {
            this.utils.sendKeyCombo([17, 18, 46])
        },
        onOldInterface: function (e) {
            console.info('Old interface clicked')
            this.utils.toggleInterface()
        },
        onNewInterface: function (e) {
            console.info('New interface clicked')
            this.utils.toggleInterface()
        },
        onClosings: function (e) {
            console.info('Closings toggled')
        },
        onNewline: function (e) {
            console.info('New line toggled')
            this.toggles.newline = !this.toggles.newline
        },
        onAdjustResolution: function (e) {
            console.info('Adjust resolution toggled')
            this.toggles.adjustResolution = !this.toggles.adjustResolution
            this.utils.resizeVm()
        },
    },
    getElementProp(target, property) {
        return $(target).prop(property)
    },
    _init: function () {
        // Start event listener for while #vmware-interface is in the DOM
        $(this).on('wmks-loaded', this._build)

        // Start wait loop for #vmware-interface to be in the DOM
        this._wait()
    },
    _wait: function () {
        setTimeout(() => {
            if ($('#vmware-interface').length > 0) {

                // Get wmks instance
                this.wmks = this.utils.getWMKS()
                this.wmksKeyboard = this.wmks.getLegacyKeyboardManager()

                // Trigger wmks-loaded event
                $(this).trigger('wmks-loaded', this)
            }
            else {
                this._wait()
            }
        }, 1000)
    },
    _build: function (e) {
        $(window).on('notification', this.events.onNotification.bind(this))
        this.wmksOptions = new Proxy(this.wmks, {
            set: (target, property, value) => {
                target[property] = value
                this.wmks._setOption(property, value)
                return true
            },
            get: (target, property) => {
                return target.options[property]
            }
        })

        // Add custom css to the page
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
        GM_addStyle(this.css)

        // Add custom html to the page
        $('body').append(this.html)

        // Add checkboxes to terminal tools #checkbox-tools
        interfaceElements.filter((item) => item.type == 'checkbox').forEach((item) => {
            let checkboxContainer = $(`<div class="checkbox-container"></div>`)
            let checkbox = $(`<input type="checkbox" id="${item.id}-checkbox" ${this.checkboxes.defaults[item.id] ? 'checked' : ''}>`)
            let label = $(`<label for="#${item.id}">${item.id}</label>`)
            let icon = $(`<i class="fa fa-${item.icon}"></i>`)
            label.append(icon)
            checkboxContainer.append(checkbox)
            checkboxContainer.append(label)
            this.elements.checkboxTools.append(checkboxContainer)
        })

        // Add buttons to terminal tools #button-tools
        interfaceElements.filter((item) => item.type == 'button').forEach((item) => {
            let button = $(`<a id="${item.id}-btn" type="${item.type}" class="${item.classes}" data-tooltip="${item.data.tooltip}"><i class="fa ${item.icon}"></i></a>`)
            this.elements.buttonTools.append(button)
        })

        // Add select to terminal tools #select-tools
        interfaceElements.filter((item) => item.type == 'select').forEach((item) => {
            let select = $(`<select id="${item.id}-select" data-tooltip="${item.data.tooltip}"></select>`)
            this.elements.selectionTools.append(select)
        })

        // Add hidden menus to theiir parents hidden and aboslutely positioned
        menus.forEach((item) => {
            let menu = $(`<${item.type} id="${item.id}-menu" class="menu"></${item.type}>`)
            item.items.forEach((subItem) => {
                let menuItem = $(`<li id="${subItem.text}-menu-item">${subItem.text}</li>`)
                let menuItemIcon = $(`<i class="fa ${subItem.icon}"></i>`)
                menuItem.prepend(menuItemIcon)

                menuItem.on('click', (e) => {
                    $(menu).slideUp()
                })

                menu.append(menuItem)
            })
            $(item.parent).css('position', 'relative')
            $(item.parent).append(menu)

            $(item.parent).on('click', (e) => {
                $(this).show()
                $(menu).slideDown()
            })
            $(menu).on('mouseleave', (e) => {
                e.preventDefault()
                e.stopPropagation()
                $(e.currentTarget).slideUp()
            })
        })

        // Bind all event functions to this
        Object.keys(this.events).forEach((key) => {
            this.events[key] = this.events[key].bind(this)
        })

        // Bind all util functions to this
        Object.keys(this.utils).forEach((key) => {
            this.utils[key] = this.utils[key].bind(this)
        })

        // Add event listeners
        this.buttons.sendCad.on('click', this.events.onSendCad.bind(this))
        this.buttons.popout.on('click', this.events.onPopout.bind(this))
        this.buttons.fullscreen.on('click', this.events.onFullscreen.bind(this))
        this.buttons.oldInterface.on('click', this.events.onOldInterface.bind(this))
        this.checkboxes.closings.on('change', this.events.onClosings.bind(this))
        this.checkboxes.newline.on('change', this.events.onNewline.bind(this))
        this.checkboxes.adjustResolution.on('change', this.events.onAdjustResolution.bind(this))
        this.selects.vmSelect.on('change', this.events.onVmSelected.bind(this))
        this.elements.terminal.on('dragover', this.events.onDragOver.bind(this))
        this.elements.uploadOverlay.on('dragleave', this.elements.uploadOverlay.hide.bind(this))
        this.elements.uploadOverlay.on('dragover', this.events.onDragOver.bind(this))
        this.elements.uploadOverlay.on('drop', this.events.onDrop.bind(this))
        this.elements.dropArea.on('drop', this.events.onDrop.bind(this))
        this.menus.windows.on('click', this.events.onOpenTerminal.bind(this, 'windows'))
        this.menus.linux.on('click', this.events.onOpenTerminal.bind(this, 'linux'))

        // Start #mainCanvas Observer
        // this.observers.mainCanvas = this.utils.resizeObserverFactory('#mainCanvas')
        // $(this).on('#mainCanvas-resized', this.utils.resizeVm.bind(this))

        // Start #vmware-interface Observer
        // this.observers.vmInterface = this.utils.resizeObserverFactory('#vmware-interface')
        // $(this).on('#vmware-interface-resized', this.utils.setMargins.bind(this))

        // Preload vm select
        this.utils.preloadVmSelect()

        // Initalize resizable
        this.utils.initResizable()

        // Show new interface
        this.utils.toggleInterface()

        // Add static buttons after intercface toggle becasue they require their parent elements to be in the DOM
        staticButtons.forEach((item) => {
            let button = $(`<a id="${item.id}-btn" class="${item.classes}" data-tooltip="${item.data.tooltip}" ${item.hidden ? 'hidden' : ''}><i class="${item.icon}"></i></a>`)
            $(item.parent).prepend(button)
        })

        // add events after static elements are added.
        this.buttons.newInterface.on('click', this.events.onNewInterface.bind(this))
        this.buttons.collapse.on('click', this.events.onCollapse.bind(this))
        this.buttons.expand.on('click', this.events.onExpand.bind(this))

        // Hide the new interface button for some stupid reason
        this.buttons.newInterface.hide()

        // Init tooltips
        this.elements.terminal.tooltip({
            items: "[data-tooltip]",
            content: function () {
                var element = $(this)
                if (element.is("[data-tooltip]")) {
                    var text = element.data("tooltip")
                    return $("<p>").text(text)
                }
            },
            position: {
                my: "center bottom",
                at: "center top",
                collision: "flipfit",
            },
        })

        // bind all termin keymaps and events to this
        Object.keys(this.terminalSettings.terminalKeymap.keymap).forEach((key) => {
            this.terminalSettings.terminalKeymap.keymap[key] = this.terminalSettings.terminalKeymap.keymap[key].bind(this)
        })

        Object.keys(this.terminalSettings.terminalEvents).forEach((key) => {
            this.terminalSettings.terminalEvents[key] = this.terminalSettings.terminalEvents[key].bind(this)
        })

        // bind all terminal keymap.keydown to this
        Object.keys(this.terminalSettings.terminalKeymap).forEach((key) => {
            if (key != 'keymap') {
                this.terminalSettings.terminalKeymap[key] = this.terminalSettings.terminalKeymap[key].bind(this)
            }
        })
        // Initialize the jQuery Terminal
        this.terminal = this.elements.terminalConsole.terminal(this.terminalSettings.terminalCommands, {
            ...this.terminalSettings.terminalKeymap,
            ...this.terminalSettings.terminalEvents,
            greetings: false,
            prompt: this.terminalSettings.terminalPrompts.default,
            outputLimit: 0,
        })

        // Reconect wmks when VM refreshes
        let relativePadFunction = WMKS.relativePadManager
        WMKS.relativePadManager = (e) => {
            $(window).trigger('notification', { title: 'Interface Interaction', message: 'VM Refreshed' })
            $(window).trigger('disconnect-refresh')
            relativePadFunction(e)
        }

        $(window).on('disconnect-refresh')
    },
    _reset() {
        setTimeout(function () {
            this.wmks.utils.getWMKS()
            this.wmksOptions = new Proxy(this.wmks, {
                set: (target, property, value) => {
                    target[property] = value
                    this.wmks._setOption(property, value)
                    return true
                },
                get: (target, property) => {
                    return target.options[property]
                }
            })
            // Bind all event functions to this
            Object.keys(this.events).forEach((key) => {
                this.events[key] = this.events[key].bind(this)
            })

            // Bind all util functions to this
            Object.keys(this.utils).forEach((key) => {
                this.utils[key] = this.utils[key].bind(this)
            })

            // add events after static elements are added.
            this.buttons.newInterface.on('click', this.events.onNewInterface.bind(this))
            this.buttons.collapse.on('click', this.events.onCollapse.bind(this))
            this.buttons.expand.on('click', this.events.onExpand.bind(this))

            // bind all termin keymaps and events to this
            Object.keys(this.terminalSettings.terminalKeymap.keymap).forEach((key) => {
                this.terminalSettings.terminalKeymap.keymap[key] = this.terminalSettings.terminalKeymap.keymap[key].bind(this)
            })

            Object.keys(this.terminalSettings.terminalEvents).forEach((key) => {
                this.terminalSettings.terminalEvents[key] = this.terminalSettings.terminalEvents[key].bind(this)
            })

            // bind all terminal keymap.keydown to this
            Object.keys(this.terminalSettings.terminalKeymap).forEach((key) => {
                if (key != 'keymap') {
                    this.terminalSettings.terminalKeymap[key] = this.terminalSettings.terminalKeymap[key].bind(this)
                }
            })
            this.utils.initResizable()
            this.utils.toggleInterface()
        }.bind(this), 2000)
    }
}

state._init()
