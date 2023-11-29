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
            })
        }
