// ==UserScript==
// @name         PCTE Term UI Test
// @version      4.2
// @author       @LordGoober
// @match        http://127.0.0.1:5500/index.html
// @require      https://code.jquery.com/jquery-3.7.1.js
// @require      https://code.jquery.com/ui/1.13.2/jquery-ui.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.37.2/js/jquery.terminal.js
// @resource     jqterminal_css https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/2.37.2/css/jquery.terminal.css
// @resource     jquery_ui_css https://code.jquery.com/ui/1.13.2/themes/ui-darkness/jquery-ui.css
// @resource     fontawesome_css https://raw.githubusercontent.com/bryfry/chronos_trigger/master/font-awesome.css
// @resource     hack_font https://raw.githubusercontent.com/GooberFromHell/term/master/hack.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-end
// @sandbox      MAIN_PAGE
// @require      file://D:/Code/js/Term 4.0/terminal-ui-test.js
// ==/UserScript==

const jqueryui_css = getResourceText("jqueryui_css")
const jquerys_css = getResourceText("jquerys_css")
const juqeryt_css = getResourceText("juqeryt_css")
const fontawesome_css = getResourceText("fontawesome_css")
const hack_css = getResourceText("hack_css")
const terminal_css = getResourceText("terminal_css")

addStyle(jqueryui_css)
addStyle(jquerys_css)
addStyle(juqeryt_css)
addStyle(fontawesome_css)
addStyle(hack_css)
addStyle(terminal_css)

const $ = jQuery
var wmks = undefined

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

