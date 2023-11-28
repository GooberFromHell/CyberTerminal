
$(document).on('alpine:init', () => {
    Alpine.data('globalStore', function () {
        return {
            uploadDialogOpen: false,
        }
    })
    Alpine.data('verticalResizer', function () {
        return {
            dragging: false,
            startY: 0,
            deltaY: 0,
            startHeight: 0,
            init() {
                this.$refs.upperSection.style.height = `${this.$el.offsetHeight * .8}px`
                this.$refs.lowerSection.style.top = `${this.$el.offsetHeight * .8 + 8}px`
                this.$refs.lowerSection.style.bottom = `0`
            },
            startDragging(event) {
                this.dragging = true
                this.startY = event.clientY
                this.startHeight = this.$refs.upperSection.offsetHeight
            },
            resizeContainer(event) {
                if (this.dragging) {
                    this.deltaY = event.clientY - this.startY
                    this.$refs.upperSection.style.height = `${this.startHeight + this.deltaY}px`
                    this.$refs.lowerSection.style.top = `${this.startHeight + this.deltaY + this.$refs.resizerHandle.offsetHeight}px`
                }
            },
            stopDragging() {
                this.dragging = false
            },
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
                if (!this.open) return

                this.open = false
                focusAfter && focusAfter.focus()
            }
        }
    })

    Alpine.data('terminal', () => {
        return {
            toolsOpen: 'hidden',
            toggleTools() {
                this.toolsOpen = this.toolsOpen == 'hidden' ? '' : this.toolsOpen == '' ? 'hidding' : 'hidden'
                this.toolsOpen == '' && (this.$refs.terminalTools.parentElement.classList.remove('hidden'))
                if (this.toolsOpen == 'hidding') {

                    this.toggleTools()
                    this.$refs.terminalTools.parentElement.classList.add('hidden')


                }
            },
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
                if (!this.open) return

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
                    })
                })
            },
            select() {
                $event.preventDefault()
                let vmId = $event.currentTarget.dataset['repetitionGroup']
                Alpine.store('pcte').vmId = vmAlpine.store('pcte').vms[vmId].repetitionGroup
            }
        }
    })

    const terminal = $('#terminal-console').terminal(function (command, term) {
        console.log(command)
    }, {
        greetings: false,
        prompt: " > ",
        outputLimit: 0,
    })
})
