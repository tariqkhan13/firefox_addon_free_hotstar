
const hotStarRegx = new RegExp('^https\:\/\/www\.hotstar\.com.*');

const CODE = `
    setInterval(function() {
        localStorage.clear();
    }, 0);

    setInterval(function() {
        window.location.reload();
    }, 60000);
`;

function onExecuted(result) {
    console.log(" script is executed");
}


function onFailure(error) {
    console.log("script failed");
}

function injectCode(tab) {
    if (tab && hotStarRegx.test(tab.url)) {
        console.log("Its a hotstar tab");
        console.log(localStorage);
        var execute = browser.tabs.executeScript(tab.id, {code : CODE});
        execute.then(onExecuted, onFailure);
    } else {
        console.error('Cannot execute on the current tab');
    }
}

//listener for tab update.
browser.tabs.onUpdated.addListener( function(tabid, changeInfo, tab) {
    injectCode(tab);
});

// listener for toolbar icon.
browser.browserAction.onClicked.addListener(function () {
    //get current active tab id
    var getCurrentTabId = browser.tabs.query( {active: true, currentWindow: true} );
    getCurrentTabId.then((tabs) => {
        console.log(tabs[0].id);
        injectCode(tabs[0]);
    });
});
