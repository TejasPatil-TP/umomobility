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

VPAIDWrapper = {};
_creative = {};

window.VPAIDWrapper_Init = function(VPAIDCreative) {
    _creative = VPAIDCreative;

    if(!this.checkVPAIDInterface(VPAIDCreative)) {
        console.log("Invalid VPAID Interface");
        //The VPAIDCreative doesn't conform to the VPAID spec
        var invoke = "VPAID://AdError?msg=" + "InvalidCreative";
        VPAIDWrapper.nativeInvoke(invoke);
        return;
    }
    VPAIDWrapper.handshakeVersion("2.0");
    this.setCallbacksForCreative();

    var invoke = "VPAID://InitializeAd";
    VPAIDWrapper.nativeInvoke(invoke);
};

// This function checks for the VPAID Ad Interface
this.checkVPAIDInterface = function(VPAIDCreative) {
    if(VPAIDCreative.handshakeVersion && typeof VPAIDCreative.handshakeVersion == "function" &&
        VPAIDCreative.initAd && typeof VPAIDCreative.initAd == "function" &&
        VPAIDCreative.startAd && typeof VPAIDCreative.startAd == "function" &&
        VPAIDCreative.stopAd && typeof VPAIDCreative.stopAd == "function" &&
        //VPAIDCreative.skipAd && typeof VPAIDCreative.skipAd == "function" &&
        //VPAIDCreative.resizeAd && typeof VPAIDCreative.resizeAd == "function" &&
        //VPAIDCreative.pauseAd && typeof VPAIDCreative.pauseAd == "function" &&
        //VPAIDCreative.resumeAd && typeof VPAIDCreative.resumeAd == "function"&&
        //VPAIDCreative.expandAd && typeof VPAIDCreative.expandAd == "function" &&
        //VPAIDCreative.collapseAd && typeof VPAIDCreative.collapseAd == "function" &&
        VPAIDCreative.subscribe && typeof VPAIDCreative.subscribe == "function" &&
        VPAIDCreative.unsubscribe && typeof VPAIDCreative.unsubscribe == "function" ){
    return true;
    }
    return false;
};

// This function registers the callbacks of each of the events
this.setCallbacksForCreative = function() {
    //The key of the object is the event name and the value is a reference to the callback function that is registered with the creative

    var callbacks = {
        AdStarted : VPAIDWrapper.onStartAd,
        AdStopped : VPAIDWrapper.onStopAd,
        AdSkipped : VPAIDWrapper.onSkipAd,
        AdLoaded : VPAIDWrapper.onAdLoaded,
        AdLinearChange : VPAIDWrapper.onAdLinearChange,
        AdSizeChange : VPAIDWrapper.onAdSizeChange,
        AdExpandedChange : VPAIDWrapper.onAdExpandedChange,
        AdSkippableStateChange : VPAIDWrapper.onAdSkippableStateChange,
        AdDurationChange : VPAIDWrapper.onAdDurationChange,
        AdRemainingTimeChange : VPAIDWrapper.onAdRemainingTimeChange,
        AdVolumeChange : VPAIDWrapper.onAdVolumeChange,
        AdImpression : VPAIDWrapper.onAdImpression,
        AdClickThru : VPAIDWrapper.onAdClickThru,
        AdInteraction : VPAIDWrapper.onAdInteraction,
        AdVideoStart : VPAIDWrapper.onAdVideoStart,
        AdVideoFirstQuartile : VPAIDWrapper.onAdVideoFirstQuartile,
        AdVideoMidpoint : VPAIDWrapper.onAdVideoMidpoint,
        AdVideoThirdQuartile : VPAIDWrapper.onAdVideoThirdQuartile,
        AdVideoComplete : VPAIDWrapper.onAdVideoComplete,
        AdUserAcceptInvitation : VPAIDWrapper.onAdUserAcceptInvitation,
        AdUserMinimize : VPAIDWrapper.onAdUserMinimize,
        AdUserClose : VPAIDWrapper.onAdUserClose,
        AdPaused : VPAIDWrapper.onAdPaused,
        AdPlaying : VPAIDWrapper.onAdPlaying,
        AdError : VPAIDWrapper.onAdError,
        AdLog : VPAIDWrapper.onAdLog
    };
    // Looping through the object and registering each of the callbacks with the creative
    for ( var eventName in callbacks) {
        _creative.subscribe(callbacks[eventName], eventName, this);
    }
};

// UMOAdKit SDK Native Invoke
VPAIDWrapper.nativeInvoke = function(call) {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", call);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
};

VPAIDWrapper.handshakeVersion = function(playerVPAIDVersion) {
    console.log("handshakeVersion: " + _creative.handshakeVersion(playerVPAIDVersion));
    return ("2.0");
};

// Passthrough for initAd - when the video player wants to call the ad
VPAIDWrapper.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
    var envVars = new Object();
    if(environmentVars == "null" || environmentVars == '') {
        envVars.videoSlot = document.getElementById('VPAIDVideoPlayer');
        envVars.slot = document.getElementById('VPAIDVideoPlayerDiv');
        envVars.videoSlot.width = width;
        envVars.videoSlot.height = height;
        envVars.videoSlotCanAutoPlay = true;
    }
    _creative.initAd(width, height, viewMode,
                     desiredBitrate, creativeData,
                     envVars);
};

// Callback for AdPaused
VPAIDWrapper.onAdPaused = function() {
    console.log("onAdPaused");
    var invoke = "VPAID://AdPaused";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdPlaying
VPAIDWrapper.onAdPlaying = function() {
    console.log("onAdPlaying");
    var invoke = "VPAID://AdPlaying";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdError
VPAIDWrapper.onAdError = function(message) {
    console.log("onAdError: " + message);
    var invoke = "VPAID://AdError?msg=" + message;
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdLog
VPAIDWrapper.onAdLog = function(message) {
    console.log("onAdLog: " + message);
};

// Callback for AdUserAcceptInvitation
VPAIDWrapper.onAdUserAcceptInvitation = function() {
    console.log("onAdUserAcceptInvitation");
    var invoke = "VPAID://AdUserAcceptInvitation";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdUserMinimize
VPAIDWrapper.onAdUserMinimize = function() {
    console.log("onAdUserMinimize");
    var invoke = "VPAID://AdUserMinimize";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdUserClose
VPAIDWrapper.onAdUserClose = function() {
    console.log("onAdUserClose");
    var invoke = "VPAID://AdUserClose";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdSkippableStateChange
VPAIDWrapper.onAdSkippableStateChange = function() {
    console.log("Ad Skippable State Changed to: " + _creative.getAdSkippableState());
    var invoke = "VPAID://AdSkippableStateChange?skipstate=" + _creative.getAdSkippableState();
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdExpandedChange
VPAIDWrapper.onAdExpandedChange = function() {
    console.log("Ad Expanded Changed to: " + _creative.getAdExpanded());
    var invoke = "VPAID://AdExpandedChange?expand=" + _creative.getAdExpanded();
    VPAIDWrapper.nativeInvoke(invoke);
};

// Passthrough for getAdExpanded
VPAIDWrapper.getAdExpanded = function() {
    console.log("getAdExpanded");
    return _creative.getAdExpanded();
};

// Passthrough for getAdSkippableState
VPAIDWrapper.getAdSkippableState = function() {
    console.log("getAdSkippableState");
    return _creative.getAdSkippableState();
};

// Callback for AdSizeChange
VPAIDWrapper.onAdSizeChange = function() {
    console.log("Ad size changed to: w=" + _creative.getAdWidth() + ", h=" + _creative.getAdHeight());
    var invoke = "VPAID://AdSizeChange?width=" + _creative.getAdWidth() + "&height=" + _creative.getAdHeight();
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdDurationChange
VPAIDWrapper.onAdDurationChange = function() {
    console.log("Ad Duration Changed to: " + _creative.getAdDuration());
    var invoke = "VPAID://AdDurationChange?time=" + _creative.getAdDuration();
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdRemainingTimeChange
VPAIDWrapper.onAdRemainingTimeChange = function() {
    console.log("Ad Remaining Time Changed to: " + _creative.getAdRemainingTime());
    var invoke = "VPAID://AdRemainingTimeChange?time=" + _creative.getAdRemainingTime();
    VPAIDWrapper.nativeInvoke(invoke);
};

// Passthrough for getAdRemainingTime
VPAIDWrapper.getAdRemainingTime = function() {
    console.log("getAdRemainingTime");
    return _creative.getAdRemainingTime();
};

// Callback for AdImpression
VPAIDWrapper.onAdImpression = function() {
    console.log("Ad Impression");
    var invoke = "VPAID://AdImpression";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdClickThru
VPAIDWrapper.onAdClickThru = function(data, id, playerHandles) {
    var invoke = "VPAID://AdClickThru";
    if(typeof data === 'object') {
        console.log("Clickthrough portion of the ad was clicked : url=" + data.url + ", id=" + data.id + ", player=" + data.playerHandles);
        if(data.playerHandles) {
            invoke = invoke + "?url=" + data.url + "&id=" + data.id;
        }
    } else {
        console.log("Click-through portion of the ad was clicked : url=" + data + ", id=" + id + ", player=" + playerHandles);
        if(playerHandles){
            invoke = invoke + "?url=" + data + "&id=" + id;
        }
    }
    VPAIDWrapper.nativeInvoke(invoke);
    
};

// Callback for AdInteraction
VPAIDWrapper.onAdInteraction = function(id) {
    console.log("A non-clickthrough event has occured");
    var invoke = "VPAID://AdInteraction?id=" + id;
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdVideoStart
VPAIDWrapper.onAdVideoStart = function() {
    console.log("Video 0% completed");
    var invoke = "VPAID://AdVideoStart";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdVideoFirstQuartile
VPAIDWrapper.onAdVideoFirstQuartile = function() {
    console.log("Video 25% completed");
    var invoke = "VPAID://AdVideoFirstQuartile";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdVideoMidpoint
VPAIDWrapper.onAdVideoMidpoint = function() {
    console.log("Video 50% completed");
    var invoke = "VPAID://AdVideoMidpoint";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdVideoThirdQuartile
VPAIDWrapper.onAdVideoThirdQuartile = function() {
    console.log("Video 75% completed");
    var invoke = "VPAID://AdVideoThirdQuartile";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdVideoComplete
VPAIDWrapper.onAdVideoComplete = function() {
    console.log("Video 100% completed");
    var invoke = "VPAID://AdVideoComplete";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for AdLinearChange
VPAIDWrapper.onAdLinearChange = function() {
    console.log("Ad linear has changed: " + _creative.getAdLinear())
    var invoke = "VPAID://AdLinearChange?linear=" + _creative.getAdLinear();
    VPAIDWrapper.nativeInvoke(invoke);
};

// Passthrough for getAdLinear
VPAIDWrapper.getAdLinear = function() {
    console.log("getAdLinear");
    return _creative.getAdLinear();
};

// Passthrough for startAd()
VPAIDWrapper.startAd = function() {
    console.log("startAd");
    _creative.startAd();
};

// Callback for AdLoaded
VPAIDWrapper.onAdLoaded = function() {
    console.log("ad has been loaded");
    var invoke = "VPAID://AdLoaded";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for StartAd()
VPAIDWrapper.onStartAd = function() {
    console.log("Ad has started");
    var invoke = "VPAID://AdStarted";
    VPAIDWrapper.nativeInvoke(invoke);
};

//Passthrough for stopAd()
VPAIDWrapper.stopAd = function() {
    _creative.stopAd();
};

// Callback for StopAd
VPAIDWrapper.onStopAd = function() {
    console.log("Ad has stopped");
    var invoke = "VPAID://AdStopped";
    VPAIDWrapper.nativeInvoke(invoke);
};

// Callback for SkipAd
VPAIDWrapper.onSkipAd = function() {
    console.log("Ad was skipped");
    var invoke = "VPAID://AdSkipped";
    VPAIDWrapper.nativeInvoke(invoke);
};

//Passthrough for setAdVolume
VPAIDWrapper.setAdVolume = function(val) {
    _creative.setAdVolume(val);
};

//Passthrough for getAdVolume
VPAIDWrapper.getAdVolume = function() {
    return _creative.getAdVolume();
};

// Callback for AdVolumeChange
VPAIDWrapper.onAdVolumeChange = function() {
    console.log("Ad Volume has changed to - " + _creative.getAdVolume());
    var invoke = "VPAID://AdVolumeChange?volume=" + _creative.getAdVolume();
    VPAIDWrapper.nativeInvoke(invoke);
};

//Passthrough for resizeAd
VPAIDWrapper.resizeAd = function(width, height, viewMode) {
    console.log("resizeAd");
    _creative.resizeAd(width, height, viewMode);
};

//Passthrough for pauseAd()
VPAIDWrapper.pauseAd = function() {
    console.log("pauseAd");
    _creative.pauseAd();
};

//Passthrough for resumeAd()
VPAIDWrapper.resumeAd = function() {
    _creative.resumeAd();
};

//Passthrough for expandAd()
VPAIDWrapper.expandAd = function() {
    _creative.expandAd();
};

//Passthrough for collapseAd()
VPAIDWrapper.collapseAd = function() {
    _creative.collapseAd();
};

if(window['getVPAIDAd']) {
    var fn = window['getVPAIDAd']();
    if (fn) {// && typeof fn == 'function') {
        var VPAIDCreative = fn;
        window.VPAIDWrapper_Init(VPAIDCreative);
    }
}
