const state = {
    wmks: null,
    wmksOptions: {},
    observers: {},
    sizes: {
        get reworkContainer() { return this.elements.reworkContainer.height() },
        get mainCanvas() { return this.elements.mainCanvas.height() },
        get divider() { return this.elements.divier.height() },
        get vmInterface() { return this.elements.vmInterface.height() },
        get terminal() { return this.elements.terminal.height() },
        get terminalTools() { return this.elements.terminalTools.height() },
        get terminalConsole() { return this.elements.terminalConsole.height() },
        prevTerminalSize: this.sizes.terminal,
    },
    elements: {
        reworkContainer: $('#reqork-container'),
        mainCanvas: $('#mainCanvas'),
        divider: $('#divider'),
        vmInterface: $('#vmware-interface'),
        terminal: $('#terminal'),
        terminalTools: $('#terminal-tools'),
        terminalConsole: $('#terminal-console')
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
    toggles: {
        get adjustResolution() { return this.checkboxes.adjustResolution.prop('checked') },
        get closings() { return this.checkboxes.closings.prop('checked') },
        get newLine() { return this.checkboxes.newLine.prop('checked') },
    },
    events: {
        onCollapse: (e) => {
            this.sizes.prevTerminalSize = this.sizes.terminal
            this.elements.vmInterface.css('flex', '0 0 auto')
            this.elements.terminal.animate({ height: this.sizes.terminal }, 500)
            setTimeout(() => {
                this.elements.terminal.css('flex', '1 1 auto')
            }, 550)
            this.buttons.expand.hide()
            this.buttons.collapse.show()
        },
        onExpand: (e) => {
            this.elements.vmInterface.css('flex', '1 1 auto')

            this.elements.terminal.animate({ height: this.sizes.prevTerminalSize }, 500)
            setTimeout(() => {
                this.elements.terminal.css('flex', '0 0 auto')
            }, 550)

            this.buttons.expand.show()
            this.buttons.collapse.hide()
        },
        onDragOver: (e) => {
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
    utils: {
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
        resizeVm: (e) => {
            this.wmksOptions.rescale = e.target.checked
            this.wmksOptions.changeResolution = e.target.checked
        },
        setMargins: function () {
            let scaleFactor = this.wmks.options.scale
            let mainCanvasWidth = this.elements.mainCanvas.width() * scaleFactor
            let screenWidth = this.vmInterface.width()
            let margin = ((screenWidth - mainCanvasWidth) / 2)
            this.mainCanvas.css('margin', `0 ${margin}px`)
        },
        getWMKS: function () {
            let target = document.querySelector("#vmware-interface")
            for (const key in target) {
                if (key.includes('jQuery')) {
                    return target[key].wmksNwmks
                }
            }
            return undefined
        },
        resizeObserverFactory: function (target, callback) {
            return new ResizeObserver(function (entries) {
                for (let entry in entries) {
                    callback(entry)
                }
            }).observe(target)
        },
    },
    _init: function () {
        // Get WMKS instance
        this.wmks = this.utils.getWMKS()

        // Populate wmks options object
        Object.keys(this.wmks.options).forEach(function (key) {
            this.wmksOptions.set(key, {
                get: () => { return this.wmks.options[key] },
                set: (value) => this.wmks._setOption(key, value)
            })
        })

        // Start resize Observers
        this.observers.mainCanvas = this.utils.resizeObserverFactory(this.elements.mainCanvas[0], this.utils.setMargins)
        this.ovservers.vmINterface = this.utils.resizeObserverFactory(this.elements.vmInterface[0], this.utils.resizeVm)
    }
}