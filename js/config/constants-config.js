App.constant("endPoint", {url: getUrl()});

function getUrl() {
    var currentHostname = window.location.hostname;
    var currentPort = window.location.port;

    var hostnameStage = 'hostnameStage';

    if (currentPort == "1234" || currentHostname.indexOf(hostnameStage) > -1) {
        return 'urlStageOrLocal';
    } else {
        return 'urlMaster';
    }
}
