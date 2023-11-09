
const state = {
    _wmks: null,
    wmksOption: {},
    observers: {},
    toggles: {
        get adjustResolution() { return this.checkboxes.adjustResolution.prop('checked') },
        get closings() { return this.checkboxes.closings.prop('checked') },
        get newLine() { return this.checkboxes.newLine.prop('checked') },
        get contentWrapperVisible() { return this.elements.contentWrapper.css('display') != 'none' },
        get terminalVisible() { return this.sizes.terminal.height != 0 },
    },
    elements: {
        reworkContainer: $('#rework-container'),
        vmInterface: $('#vmware-interface'),
        mainCanvas: $('#mainCanvas'),
        terminalContainer: $('#terminal'),
        terminalTools: $('#terminal-tools'),
        notificationArea: $('#notification-area'),
    },
    buttons: {
        openTerminal: $('#open-terminal-btn'),
        sendCad: $('#send-cad-btn'),
        popout: $('#popout-btn'),
        fullscreen: $('#fullscreen-btn'),
        OldInterface: $('#old-btn'),
        newInterface: $('#new-btn'),
        collapse: $('#collapse-btn'),
        expand: $('#expand-btn'),
    },
    checkboxes: {
        closings: $('#closings-checkbox'),
        newLine: $('#newline-checkbox'),
        adjustResolution: $('#adjust-resolution-checkbox'),
    },
    selects: {
        vmSelect: $('#vm-select'),
    },
    sizes: {
        get mainCanvas() {
            return {
                width: this.elements.mainCanvas.width(),
                height: this.elements.mainCanvas.height(),
            }
        },
        get vmInterface() {
            return {
                width: this.elements.vmInterface.width(),
                height: this.elements.vmInterface.height(),
            }
        },
        get terminal() {
            return {
                width: this.elements.terminal.width(),
                height: this.elements.terminal.height(),
            }
        },
        get reworkContainer() {
            return {
                width: this.elements.reworkContainer.width(),
                height: this.elements.reworkContainer.height(),
            }
        },
        prevTerminalSize: this.sizes.terminal.height,
    },
    utils: {
        resizeVm: () => {
            if (this.toggles.adjustResolution) {
                this.elements.mainCanvas.height(`${entry.contentRect.height}px !important`)
            }
            this.wmksOptions.rescale = this.toggles.adjustResolution;
            this.wmksOptions.changeResolution = this.toggles.adjustResolution;
        },
        resizeObserverFactory: function (target, callback) {
            return new ResizeObserver(function (entries) {
                for (let entry of entries) {
                    callback(entry)
                }
            }).observe(target)
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
        setMargins: () => {
            let scaleFactor = this.wmks._scale
            let mainCanvasWidth = this.elements.mainCanvas.width() * scaleFactor
            let screenWidth = this.elements.vmWareInterface.width()
            let marginSize = ((screenWidth - mainCanvasWidth) / 2)
            this.elements.mainCanvas.css('margin-left', `${marginSize}px`)
            this.elements.mainCanvas.css('margin-right', `${marginSize}px`)
        },
        getFileContents: (e) => {
            let contents = e.target.result
            let lines = contents.split('\n')

            for (var line = 0; line < lines.length; line++) {
                lines[line] = line == lines.length - 1 ? lines[line] + '\r' : lines[line]
                setTimeout(function (lines, line) {
                    this.wmks.sendInputString(lines[line])
                }(lines, line), 100 * line)
            }
        },
        toggleInterface: (e) => {
            console.log('interface toggle clicked')
            if ($('#content-wrapper').css('display') == 'none') {
                $('#content-wrapper').show()
                vmInterface.appendTo('.interface:first-child')
                reworkContainer.hide()
                newInterface.show()
            } else {
                reworkContainer.show()
                vmInterface.prependTo('#rework-container')
                $('#content-wrapper').hide()
                newInterface.hide()
            }

        },
        toggleTerminal: function (e) {
            if (this.toggles.terminalVisible) {
                this.sizes.prevTerminalSize = this.sizes.terminal.height
                this.elements.vmwareInterface.css('flex', '1 0 auto')
                this.elements.terminal.css('flex', '0 1 auto')

                // animate resize
                this.buttons.terminal.animate({ height: 0 }, 500)
                setTimeout(() => {
                    this.elements.vmwareInterface.css('flex', '1 1 auto')
                    this.elements.terminal.css('flex', '0 0 auto')
                }, 550)
                this.buttons.expand.show()
                this.buttons.collapse.hide()
            } else {
                this.elements.vmwareInterface.css('flex', '0 0 auto')
                this.elements.terminal.animate({ height: this.sizes.prevTerminalSize }, 500)
                setTimeout(() => {
                    this.elements.vmwareInterface.css('flex', '0 0 auto')
                    this.elements.terminal.css('flex', '1 1 auto')
                }, 550)
                this.buttons.expand.hide()
                this.buttons.collapse.show()
            }
        }
    },
    events: {
        onCollapse: (e) => {
            console.info('Collapse clicked')
            this.utils.toggleTerminal()
        },
        onExpand: (e) => {
            console.info('Expand clicked')
            this.utils.toggleTerminal()
        },
        onDragOver: (e) => {
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
        onDrop: (e) => {
            console.info('File dropped')
            e.preventDefault()
            e.stopPropagation()

            let selectedFile = e.originalEvent.dataTransfer.files[0]

            let reader = new FileReader()
            reader.onload = this.utils.getFileContents
            reader.readAsText(selectedFile)

            this.elements.uploadOverlay.hide()
        },
        onPopout: (e) => {
            console.info('Popout clicked')
        },
        onFullscreen: (e) => {
            console.info('Fullscreen clicked')
        },
        onOpenTerminal: (e) => {
            console.info('Open Terminal clicked')
        },
        onSendCad: (e) => {
            this.wmks._keyboardManager.sendVScanKey([29, 56, 83])
        },
        onOldInterface: (e) => {
            console.linfoog('Old interface clicked')
            this.utils.toggleInterface()
        },
        onNewInterface: (e) => {
            console.info('New interface clicked')
            this.utils.toggleInterface()
        },
        onVmSelect: (e) => {
            console.info('VM Selected')
        },
        onClosings: (e) => {
            console.info('Closings toggled')
        },
        onNewLine: (e) => {
            console.info('New line toggled')
        },
    },
    getElementProp(target, property) {
        return $(target).prop(property);
    },

    _init: () => {

        // Get wmks instance
        this.wmks = this.utils.getWMKS();

        // Initalize Option setters
        Object.keys(this.wmks.options).forEach(function (key) {
            this.wmksOptions.set(key, {
                get: () => {
                    this.wmks._options[key]
                },
                set: (value) => {
                    this.wmks._setOptions(value)
                }
            })
        })

        // Create event listeners
        this.buttons.collapse

        // Start #mainCanvas Observer
        this.observers.mainCanvas = this.utils.resizeObserverFactory(this.elements.mainCanvas[0], this.utils.setMargins)

        // Start #vmware-interface Observer
        this.ovservers.vmInterface = this.utils.resizeObserverFactory(this.elements.vmInterface[0], this.utils.resizeVm)
    }
};
