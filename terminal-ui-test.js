const reworkContainer = $('#rework-container')
const vmInterface = $('#vmware-interface')
const terminalContainer = $('#terminal')
const divider = $('#divider')
const terminalTools = $('#terminal-tools')
const uploadOverlay = $('#upload-overlay')

reworkContainer.css({
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    'flex-direction': 'column',
    'font-family': 'Hack, "Segoe UI" !important'
})
vmInterface.css({
    position: 'fixed',
    flex: '1 1 auto',
    height: '80%',
    width: '100%',
    'background-color': 'black',
})
terminalContainer.css({
    position: 'fixed',
    bottom: 0,
    flex: '1 1 auto',
    height: '20%',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column'
})
divider.css({
    width: '100%',
    display: 'inline-flex',
    overflow: 'visible',
    cursor: 'none',
    position: 'fixed',
    maxHeight: 0,
    'border': '1px solid #404040',
})
$('#divider>span.resizable-handle').css({
    margin: '0 auto',
    'min-width': '50px',
    'min-height': '10px',
    cursor: 'row-resize',
    'background-color': '#404040',
    'border-radius': '2px',
    position: 'relative',
    top: '-5px',

})
terminalTools.css({
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'background-color': '#242424',
    height: '20px',
    'padding': '5px',
    'font-size': '12px',
    'font-weight': 'bold',
    'color': 'white',
    'font-family': 'Hack, "Segoe UI" !important'
})
uploadOverlay.css({
    display: 'none',
    position: 'absolute',
    inset: 0,
    'z-index': 999,
    'place-items': 'center',
    margin: '0px',
    color: 'rgba(211, 211, 211, 0.514)',
    'background-color': '#242424ad',
})

// Resizable terminal
$("#terminal").resizable({
    handles: {
        n: "#divider",
    },
    ghost: true,
    resize: function (event, ui) {
        $('#vmware-interface').css({ 'height': event.pageY })
    },
    minHeight: $('#terminal-tools').outerHeight()
})

// Terminal
terminalPrompts = {
    default: ' ' + window.name.split(':')[0] + '> ',
}
terminalEvents = {
    onResize: function () {
        this.scroll_to_bottom()
    },
}
terminalKeymap = {
    keymap: {
        ENTER: function (e, original) {
            let command = this.terminal.get_command()
            command = toggles.newline ? `${command}\n` : command
            sendInputString(command)
            original()
        },
    },
}
terminalCommands = function (command) {
    this.scroll_to_bottom()
    return ""
}
terminalOptions = {
    ...terminalKeymap,
    ...terminalEvents,
    greetings: false,
    prompt: this.terminalPrompts.default,
}


$('#terminal-console').terminal((command) => terminalCommands, {
    ...terminalOptions
})

