console = {};
console.log = function(log) {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", "console://localhost?" + log);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
};

console.debug = console.log;
console.info = console.log;
console.warn = console.log;
console.error = console.log;

function AdImpression() {
    console.log("AdImpression");
    mraidNativeInvoke('AdImpression');
}

function AdClickThru() {
    console.log("AdClickThru");
    mraidNativeInvoke('AdClickThru');
}

function AdVideoFirstQuartile() {
    console.log("AdVideoFirstQuartile");
    mraidNativeInvoke('AdVideoFirstQuartile');
}

function AdVideoMidpoint() {
    console.log("AdVideoMidpoint");
    mraidNativeInvoke('AdVideoMidpoint');
}

function AdVideoThirdQuartile() {
    console.log("AdVideoThirdQuartile");
    mraidNativeInvoke('AdVideoThirdQuartile');
}

function AdVideoComplete() {
    console.log("AdVideoComplete");
    mraidNativeInvoke('AdVideoComplete');
}

function AdVideoStart() {
    console.log("AdVideoStart");
    mraidNativeInvoke('AdVideoStart');
}

function AdStarted() {
    console.log("AdStarted");
    mraidNativeInvoke('AdStarted');
}

function AdStopped() {
    console.log("AdStopped");
    mraidNativeInvoke('AdStopped');
}

function AdPaused() {
    console.log("AdPaused");
    mraidNativeInvoke('AdPaused');
}

function AdPlaying() {
    console.log("AdPlaying");
    mraidNativeInvoke('AdPlaying');
}

function AdError() {
    console.log("AdError");
    mraidNativeInvoke('AdError');
}

function AdSizeChange() {
    console.log("AdSizeChange");
    mraidNativeInvoke('AdSizeChange');
}

function AdDurationChange() {
    console.log("AdDurationChange");
    mraidNativeInvoke('AdDurationChange');
}

function AdInteraction() {
    console.log("AdInteraction");
    mraidNativeInvoke('AdInteraction');
}

function mraidNativeInvoke(comment) {
     var invoke = "mraid://"+comment;
     window.mraid.nativeInvoke(invoke);
}

if(window['getVPAIDAd']) {
    var adEvents = window['getVPAIDAd']();
    adEvents.subscribe(AdImpression, 'AdImpression');
    adEvents.subscribe(AdClickThru, 'AdClickThru');
    adEvents.subscribe(AdVideoFirstQuartile, 'AdVideoFirstQuartile');
    adEvents.subscribe(AdVideoMidpoint, 'AdVideoMidpoint');
    adEvents.subscribe(AdVideoThirdQuartile, 'AdVideoThirdQuartile');
    adEvents.subscribe(AdVideoComplete, 'AdVideoComplete');
    adEvents.subscribe(AdVideoStart, 'AdVideoStart');
    adEvents.subscribe(AdStarted, 'AdStarted');
    adEvents.subscribe(AdStopped, 'AdStopped');
    adEvents.subscribe(AdPaused, 'AdPaused');
    adEvents.subscribe(AdPlaying, 'AdPlaying');
    adEvents.subscribe(AdError, 'AdError');
    adEvents.subscribe(AdSizeChange, 'AdSizeChange');
    adEvents.subscribe(AdDurationChange, 'AdDurationChange');
    adEvents.subscribe(AdInteraction, 'AdInteraction');
}
