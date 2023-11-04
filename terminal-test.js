function getWMKS(obj) {
    for (const key in obj) {
        if (key.includes('jQuery')) {
            return obj[key]
        }
    }
    return undefined // Property not found
}

function vmwareObserver(mutations, observer) {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            $(mutation.addedNodes).each(function (index, node) {
                console.info(node)
            })
        } else if (mutation.type === 'attributes') {
            console.info(mutation)
        } else if (mutation.type === 'characterData') {
            console.info(mutation)
        }

    }
}

function wait() {
    setTimeout(() => {
        if ($('#vmware-interface').length > 0) {
            console.log("vmware-interface added")
            let wmks = getWMKS(target).wmksNwmks
            $(document.body).trigger('wmks-loaded', { data: wmks })
        } else {
            wait()
        }
    }, 1000)
}

function init(data) {
    let target = document.querySelector("#vmware-interface")
    new MutationObserver(vmwareObserver)
        .observe(target, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
        })
    let wmks = data
}

$(document).on('wmks-loaded', function (event, data) {
    init(data)
})

wait()



