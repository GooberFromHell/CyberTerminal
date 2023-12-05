
const html = `
<div id="rework-container" x-data="verticalResizer()" x-ref="reworkContainer">
    <div id="upper-section" x-ref="upperSection">
      
    </div>

    <div id="resizer" x-on:mousemove.window="resizeContainer()" x-on:mouseup="stopDragging()" x-ref="resizerHandle"
        x-on:mousedown="startDragging()">
    </div>

    <div id="lower-section" x-ref="lowerSection">
        <div id="terminal">
            <div x-ref="terminalConsole" id='terminal-console'>
            </div>
        </div>
    </div>
</div>
<i class='fa' id="setting-icon" x-on:click="toggleTools">
<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg></i>
<div id="tools-overlay" class="hidden">
    <dialog x-ref="terminalTools" id="terminal-tools" :class="toolsOpen">
        <i class="fa" x-on:click="toggleTools" style="margin-left: auto;"> <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12"
                viewBox="0 0 384 512">
                <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg></i>
        <div id='checkbox-tools'>
            <div class='toggle-switch'>
                <label>
                    <input type='checkbox' x-on:change="insertSudo">
                    <span class='slider'></span>
                </label>
                <a>
                    Insert 'sudo' before command.
                </a>
            </div>
        </div>
        <div id="vm-name"></div>
        <div id="button-tools"></div>
        <div id="select-tools"></div>
    </dialog>
</div>
<div id="upload-overlay" x-show="$store.uploadDialogOpen">
    <div id='dropArea'
        style="color:inherit;border:1px dashed rgba(211, 211, 211, 0.514);background-color:rgba(211, 211, 211, 0.233);">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <i class="fa fa-upload" style="font-size: 50px;"></i>
            <p>Drop file to upload</p>
        </div>
    </div>
</div>
<div id="notification-wrapper"></div>
`
document.addEventListener('alpine:init', function () {
    Alpine.store('pcte', {
        host: window.location.host,
        auth: null,
        me: null,
        api_key: '',
        vms: null,
        rangeId: null,
        unknownId: null,
        vmId: null,
        clipboard: new Array(),
        options: {
            sudo: false,
            interactive: false,
            newline: true,
            rescale: true,
            resolution: true
        },
        get socketUrl() {
            return this._socketUrl
        },
        set socketUrl(value) {
            this._socketUrl = value
            loadInterface()
        },
        async load() {
            let matches = [...window.location.href.matchAll(/([a-f0-9\-]{36})/g)]
            this.rangeId = matches[0][1]
            this.unknownId = matches[1][1]
            this.vmId = matches[2][1]
            this.getMe()
        },
        async getMe() {
            $.get(`https://${this.host}/api/portal/me`).then(function (response) {
                this.me = response.user
                this.getApiKey()
            }
                .bind(this))
        },
        async getApiKey() {
            $.get(`https://${this.host}/api/mto-server/organizations/${this.me.organization}/hierarchy/primary/node/user/${this.me.key}`).then(function (response) {
                this.api_key = response
                this.getVmNames()

            }
                .bind(this))
        },
        async getVmNames() {
            $.get(`https://${this.host}/api/range-server/events/${this.rangeId}/range-info/vm-names-consoles`).then(function (response) {
                this.vms = response.vms
                this.getConsole()
            }
                .bind(this))
        },
        async getConsole() {
            $.ajax({
                url: `https://rcs00-portal.pcte.mil/api/range-server/console-url/event/${this.rangeId}/${this.unknownId}/${this.vmId}/1?reconnect=false&incognito=true`,
                success: function (response) {
                    this.socketUrl = response.consoleUrl
                }
                    .bind(this),
                error: function (error) {
                    console.log("Failed to get console url: " + error.statusText + " Setting alternate socket url")
                }
                    .bind(this),
                timeout: 5000
            })
        },
    })

    Alpine.data('terminal', () => {
        return {
            toolsOpen: 'hidden',
            toggleTools() {
                this.toolsOpen = this.toolsOpen == 'hidden' ? '' : this.toolsOpen == '' ? 'hiding' : 'hidden'
                this.toolsOpen == '' && (this.$refs.terminalTools.parentElement.classList.remove('hidden'))
                if (this.toolsOpen == 'hiding') {
                    setTimeout(() => {
                        this.toggleTools()
                    }, 1000)
                }
            },
            insertSudo() {
                Alpine.store('pcte').options.sudo = true
            }
        }
    })

    Alpine.data('verticalResizer', () => {
        return {
            dragging: false,
            startY: 0,
            deltaY: 0,
            startHeight: 0,
            init() {
                // Starting heights 80% and 20%
                this.$refs.upperSection.style.height = `${this.$el.offsetHeight * .8}px`
            },
            startDragging() {
                this.dragging = true
                this.startY = this.$event.clientY
                this.startHeight = this.$refs.upperSection.offsetHeight
            },
            mouseMoved() {
                this.deltaY = this.$event.clientY - this.startY
            },
            resizeContainer() {
                if (this.dragging) {
                    this.deltaY = this.$event.clientY - this.startY
                    this.$refs.upperSection.style.height = `${this.startHeight + this.deltaY}px`
                    this.$refs.upperSection.children.mainCanvas.style.height = `${this.startHeight + this.deltaY}px`
                }
            },
            stopDragging() {
                this.dragging = false
                setTimeout(() => {
                    Alpine.store('pcte').wmks.updateScreen()
                })
            }
        }
    })

    Alpine.data('dropdown', () => {
        return {
            open: false,
            toggle() {
                if (this.open) {
                    return this.close()
                }
                this.$refs.button.focus()
                this.open = true
            },
            close(focusAfter) {
                if (!this.open)
                    return

                this.open = false
                focusAfter && focusAfter.focus()
            }
        }
    })

    Alpine.data('vmselect', () => {
        return {
            vms: Alpine.store('pcte').vms,
            open: false,
            toggle() {
                if (this.open) {
                    return this.close()
                }
                this.$refs.button.focus()
                this.open = true
            },
            close(focusAfter) {
                if (!this.open)
                    return

                this.open = false
                focusAfter && focusAfter.focus()
            },
            build() {
                Alpine.store('pcte').vms.forEach((vm) => {
                    $.each(vms, (idx, value) => {
                        let option = `<a href="#" key=${idx} x-on:click="select"
                        class="flex items-center gap-2 w-full first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-left text-sm hover:bg-gray-50 disabled:text-gray-500">
                        ${value.val}
                    </a>`
                        this.$refs.panel.append(option)
                    }
                    )
                }
                )
            },
            select() {
                this.$event.preventDefault()
                let vmId = this.$event.currentTarget.dataset['repetitionGroup']
                Alpine.store('pcte').vmId = vmAlpine.store('pcte').vms[vmId].repetitionGroup
            }
        }
    })

    function notification(event, message) {
        event.preventDefault()
        event.stopPropagation()
        let notification = $(`<div class="notification ${message.type}"></div>`)
        notification.text(message.text)

        $('#notification-wrapper').append(notification)
        setTimeout((msg) => {
            $(msg).toggleClass('close')
            setTimeout((msg) => {
                $(msg).remove()
            }, 1000, notification)
        }, 5000, notification)

    }
    function copyToClipboard(event, text) {
        navigator.clipboard.writeText(text)
        console.log('Copied to clipboard!')
        $(document).trigger('notification', { text: 'Copied to clipboard!', type: 'info' })

        // Write to alpine store for session saving
        Alpine.store('pcte').clipboard.push(text)

    }
    function connectWMKS() {
        if (Alpine.store('env').dev) return
        $(document.body).append(html)
        $('#content-wrapper').remove()

        const wmks = WMKS.createWMKS('upper-section', {})
        wmks.register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE, function (event, data) {
            if (data.state == WMKS.CONST.ConnectionState.CONNECTED) {
                console.log("connection state change : connected")
                $("#mainCanvas").on('focus', function () {
                    wmks.grab()
                })
                $("#mainCanvas").on('blur', function () {
                    wmks.ungrab()
                })
                return
            }
        })
        wmks.register(WMKS.CONST.Events.COPY, function (evt, data) {
            if (data != Alpine.store('pcte').clipboard[Alpine.store('pcte').clipboard.length - 1]) {
                $(document).trigger('data-copied', data)
            }
        })

        wmks.sendKey = function (keyCode) {
            let keyPress = WMKS.CONST.KB.VScanMap['en-US'][keyCode]
            this.wmksData._keyboardManager.sendVScanKey(keyPress, false, false)
            this.wmksData._keyboardManager.sendVScanKey(keyPress, true, false)
        }
        wmks.sendKeyCombo = function (keyCodes) {
            let keyPresses = []
            keyCodes.forEach(function (keyCode) {
                let keyPressed = WMKS.CONST.KB.VScanMap['en-US'][keycode]
                this.wmksData._keyboardManager.sendVScanKey(keyPresses, false, false)
                keysPresses.push(keyPressed)
                if (keyCode === 20) {
                    this.wmksData._keyboardManager.sendVScanKey(keyPresses, true, false)
                }
            })
            keyPresses.forEach((key) => {
                this.wmksData._keyboardManager.sendVScanKey(keyups[i], true, false)
            }
            )
        }
        wmks.openTerminal = function (e, key) {
            console.info('Open Terminal clicked')
            wmks.sendKey(91)
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
            }
        }

        wmks.setOption("rescale", true)
        wmks.setOption("changeResolution", true)
        wmks.setOption("position", WMKS.CONST.Position.LEFT_TOP)

        wmks.connect(Alpine.store('pcte').socketUrl)

        Alpine.store('pcte').wmks = wmks
    }
    function loadInterface() {
        $(document.body).attr('x-data', 'terminal')

        connectWMKS()

        const terminal = $('#terminal-console').terminal(function (command, term) {
            console.log(command)
        }, {
            keymap: {
                ENTER: function (e, original) {
                    if (!Alpine.store('pcte').interactive) {
                        let command = terminal.get_command()
                        command = Alpine.store('pcte').options.newline ? `${command}\r` : command
                        command = Alpine.store('pcte').options.sudo ? `sudo ${command}` : command
                        try {
                            Alpine.store('pcte').wmks.sendInputString(command)
                        } catch (error) {
                            console.error(error)
                        }

                        original()
                    } else {
                        original()
                    }
                },
                TAB: function (e, original) {
                    e.preventDefault()
                    e.stopPropagation()
                    let command = terminal.get_command()
                    if (Alpine.store('pcte').pending == 9 && command) {
                        Alpine.store('pcte').wmks.sendInputString(command)
                        terminal.set_command('')
                        Alpine.store('pcte').wmks.sendKey(9)
                    }
                },
            },
            greetings: false,
            prompt: " > ",
            outputLimit: 0,
        })

        $(document).on('notification', notification)
        $(document).on('data-copied', copyToClipboard)
    }

    const dev = () => {
        // regex match if localhost or 127.0.0.1
        let regex = /localhost|127.0.0.1/g
        if (regex.test(window.location.href)) {
            return true
        }
        return false
    }

    Alpine.store('env', { dev: dev() })

    if (Alpine.store('env').dev) {
        loadInterface()
    } else {
        Alpine.store('pcte').load()
    }
})


