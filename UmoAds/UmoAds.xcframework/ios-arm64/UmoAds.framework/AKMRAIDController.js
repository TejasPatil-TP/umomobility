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

window.mraid_init = function() {
    console.log("mraid_init");
    
    var mraid = window.mraid = {};
    
    //UMOAdKit
    mraid.returnResult = function(call) {
        return call().toString();
    };
    
    //UMOAdKit
    mraid.returnInfo = function(call) {
        var info = '';
        var result = call();
        for (property in result) {
            if (info) {
                info += '&';
            }
            info += encodeURIComponent(property) + '=' + encodeURIComponent(result[property]);
        }
        return info;
    };
    
    //UMOAdKit
    mraid.nativeInvoke = function(call) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", call);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    };
    
    /////////
    //
    // events
    //
    
    var EVENTS = mraid.EVENTS = {
        READY                   : "ready",
        ERROR                   : "error",
        STATE_CHANGE            : "stateChange",
        VIEWABLE_CHANGE         : "viewableChange",
        SIZE_CHANGE             : "sizeChange"
    };
    
    var listeners = {};

    // MRAID
    mraid.addEventListener = function(event, listener) {
        console.log("addEventListener");
        var handlers = listeners[event];
        // Create the listeners for the event if not already created
        if (!handlers) {
            listeners[event] = [];
            handlers = listeners[event];
        }
        
        // Don't add the same listener twice
        for (var i = 0; i < handlers.length; ++i) {
            if (listener === handlers[i]) {
                return;
            }
        }
        
        // Add the new listener
        handlers.push(listener);
    };
    
    // MRAID
    mraid.removeEventListener = function(event, listener) {
        console.log("removeEventListener");
        var handlers = listeners[event];
        if (handlers) {
            if (listener) {
                delete handlers[listener];
            } else {
                listeners[event] = null;
            }
        }
    };
    
    //UMOAdKit
    mraid.fireChangeEvent = function(event, newValue) {
        console.log("fireChangeEvent handler: " + event + " with: " + newValue);
        var handlers = listeners[event];
        if (handlers) {
            for (var i = 0; i < handlers.length; ++i) {
                console.log("fireChangeEvent invoked handler");
                handlers[i](newValue);
            }
        }
    };
    
    //UMOAdKit
    mraid.fireErrorEvent = function(message, action) {
        console.log("fireErrorEvent handler: " + message + " action: " + action);
        var handlers = listeners[EVENTS.ERROR];
        if (handlers) {
            for (var i = 0; i < handlers.length; ++i) {
                handlers[i](message, action);
            }
        }
    };
    
    //UMOAdKit
    mraid.fireEvent = function(event) {
        console.log("fireEvent handler: " + event);
        var handlers = listeners[event];
        if (handlers) {
            for (var i = 0; i < handlers.length; ++i) {
                handlers[i]();
            }
        }
    };
    
    
    /////////
    //
    // version
    //
    
    // MRAID
    mraid.getVersion = function(){
        console.log("getVersion");
        return ("2.0");
    };
    
    
    //////////
    //
    // supports
    //
    
    var FEATURES = mraid.FEATURES = {
        SMS             : "sms",
        TEL             : "tel",
        CALENDAR        : "calendar",
        STORE_PICTURE   : "storePicture",
        INLINE_VIDEO    : "inlineVideo"
    };
    
    var supportedFeatures = {};
    
    //UMOAdKit
    mraid.setSupports = function(feature, supported) {
        supportedFeatures[feature] = supported;
    };
    
    // MRAID
    mraid.supports = function(feature) {
        console.log("supports");
        return supportedFeatures[feature];
    };
    
    
    /////////
    //
    // state
    //
    
    var STATES = mraid.STATES = {
        LOADING     : "loading",
        DEFAULT     : "default",
        EXPANDED    : "expanded",
        RESIZED     : "resized",
        HIDDEN      : "hidden"
    };
    
    var state = STATES.LOADING;
    
    //UMOAdKit
    mraid.setState = function(newState) {
        var diff = state != newState;
        state = newState;
        if (diff) {
            mraid.fireChangeEvent(EVENTS.STATE_CHANGE, state);
        } else if (state === STATES.RESIZED) {
            // spec says resized -> resized fires an event
            mraid.fireChangeEvent(EVENTS.STATE_CHANGE, state);
        }
    };
 
    //MRAID
    mraid.getState = function() {
        console.log("getState");
        return state;
    };
    
    
    /////////
    //
    // placementType
    //
    
    var PLACEMENT_TYPES = mraid.PLACEMENT_TYPES = {
        INLINE          : "inline",
        INTERSTITIAL    : "interstitial"
    };
    
    var placementType = PLACEMENT_TYPES.INLINE;
    
    //UMOAdKit
    mraid.setPlacementType = function(newPlacementType) {
        placementType = newPlacementType;
    };
    
    // MRAID
    mraid.getPlacementType = function() {
        console.log("getPlacementType");
        return placementType;
    };
    
    
    //////////
    //
    // isViewable
    //
    
    var isViewable = false;
    
    //UMOAdKit
    mraid.setViewable = function(viewable) {
        var diff = isViewable != viewable;
        isViewable = viewable;
        if (diff) {
            mraid.fireChangeEvent(EVENTS.VIEWABLE_CHANGE, isViewable);
        }
    };
    
    // MRAID
    mraid.isViewable = function() {
        console.log("isViewable");
        return isViewable;
    };
    
    
    //////////
    //
    // open
    //
    
    // MRAID
    mraid.open = function(url) {
        console.log("open");
        var invoke = "mraid://open?url=" + encodeURIComponent(url);
        mraid.nativeInvoke(invoke);
    };
    
    
    //////////
    //
    // close
    //
    
    // MRAID
    mraid.close = function() {
        console.log("close");
        var invoke = "mraid://close";
        mraid.nativeInvoke(invoke);
    };
    
    
    //////////
    //
    // video
    //
    
    // MRAID
    mraid.playVideo = function(url) {
        console.log("playVideo");
        var invoke = "mraid://playVideo?url=" + encodeURIComponent(url);
        mraid.nativeInvoke(invoke);
    };
    
    
    //////////
    //
    // expand
    //
    
    var expandProperties = {
        width:0,
        height:0,
        useCustomClose:false,
        isModal:true
    };
    
    // MRAID
    mraid.setExpandProperties = function(properties) {
        console.log("setExpandProperties");
        var writableFields = ["width", "height", "useCustomClose"];
        for (wf in writableFields) {
            var field = writableFields[wf];
            if (properties[field] !== undefined) {
                expandProperties[field] = properties[field];
            }
        }
        var invoke = "mraid://setExpandProperties?" + mraid.returnInfo(mraid.getExpandProperties);
        mraid.nativeInvoke(invoke);
    };
    
    // MRAID
    mraid.getExpandProperties = function() {
        console.log("getExpandProperties");
        return expandProperties;
    };
    
    // MRAID
    mraid.useCustomClose = function(useCustomClose) {
        console.log("useCustomClose");
        var property = { useCustomClose : useCustomClose };
        mraid.setExpandProperties(property);
    };
    
    // MRAID
    mraid.expand = function(url) {
        console.log("expand");
        var invoke = "mraid://expand";
        if (url) {
            invoke += "?url=" + encodeURIComponent(url);
        }
        mraid.nativeInvoke(invoke);
    };
    
    
    //////////
    //
    // resize
    //
    
    var RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = mraid.RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION = {
        TOP_LEFT        : "top-left",
        TOP_RIGHT       : "top-right",
        CENTER          : "center",
        BOTTOM_LEFT     : "bottom-left",
        BOTTOM_RIGHT    : "bottom-right"
    };
    
    var resizeProperties = {
        width:0,
        height:0,
        customClosePosition:RESIZE_PROPERTIES_CUSTOM_CLOSE_POSITION.TOP_RIGHT,
        offsetX:0,
        offsetY:0,
        allowOffscreen:false
    };
    
    // MRAID
    mraid.setResizeProperties = function(properties) {
        console.log("setResizeProperties");
        var writableFields = ["width", "height", "customClosePosition", "offsetX", "offsetY", "allowOffscreen"];
        for (wf in writableFields) {
            var field = writableFields[wf];
            if (properties[field] !== undefined) {
                resizeProperties[field] = properties[field];
            }
        }
        var invoke = "mraid://setResizeProperties?" + mraid.returnInfo(mraid.getResizeProperties);
        mraid.nativeInvoke(invoke);
    };
    
    // MRAID
    mraid.getResizeProperties = function() {
        console.log("getResizeProperties");
        return resizeProperties;
    };
    
    // MRAID
    mraid.resize = function() {
        console.log("resize");
        var invoke = "mraid://resize";
        mraid.nativeInvoke(invoke);
    };
    
    
    //////////
    //
    // orientation
    //
    
    var ORIENTATION_PROPERTIES_FORCE_ORIENTATION = mraid.ORIENTATION_PROPERTIES_FORCE_ORIENTATION = {
        PORTRAIT    : "portrait",
        LANDSCAPE   : "landscape",
        NONE        : "none"
    };
    
    var orientationProperties = {
        allowOrientationChange:true,
        forceOrientation:ORIENTATION_PROPERTIES_FORCE_ORIENTATION.NONE
    };
    
    // MRAID
    mraid.setOrientationProperties = function(properties){
        console.log("setOrientationProperties");
        var writableFields = ["allowOrientationChange", "forceOrientation"];
        for (wf in writableFields) {
            var field = writableFields[wf];
            if (properties[field] !== undefined) {
                orientationProperties[field] = properties[field];
            }
        }
        var invoke = "mraid://setOrientationProperties?" + mraid.returnInfo(mraid.getOrientationProperties);
        mraid.nativeInvoke(invoke);
    };
    
    // MRAID
    mraid.getOrientationProperties = function() {
        console.log("getOrientationProperties");
        return orientationProperties;
    };
    

    //////////
    //
    // position and size
    //
    
    var currentPosition = {
        x:0,
        y:0,
        width:0,
        height:0
    };
    
    var maxSize = {
        width:0,
        height:0
    };
    
    var defaultPosition = {
        x:0,
        y:0,
        width:0,
        height:0
    };
    
    var screenSize = {
        width:0,
        height:0
    };
    
    var currentOrientation = 0;
    
    //UMOAdKit
    mraid.setCurrentPosition = function(position) {
        var previousSize = mraid.getSize();
        currentPosition = position;
        var currentSize = mraid.getSize();
        
        // Only send the size changed event if the size in the position
        // was different from the previous position
        if ((previousSize.width === currentSize.width) && (previousSize.height === currentSize.height)) {
            return;
        }
        
        var handlers = listeners[EVENTS.SIZE_CHANGE];
        if (handlers) {
            var width = currentPosition.width;
            var height = currentPosition.height;
            for (var i = 0; i < handlers.length; ++i) {
                handlers[i](width, height);
            }
        }
    };
    
    // MRAID
    mraid.getCurrentPosition = function() {
        console.log("getCurrentPosition");
        var invoke = "mraid://updateCurrentPosition";
        mraid.nativeInvoke(invoke);
        return currentPosition;
    };
    
    // MRAID
    mraid.getSize = function() {
        console.log("getSize");
        var size = {
            width:currentPosition.width,
            height:currentPosition.height
        };
        return size;
    };
    
    //UMOAdKit
    mraid.setMaxSize = function(size) {
        maxSize = size;
    };
    
    // MRAID
    mraid.getMaxSize = function() {
        console.log("getMaxSize");
        return maxSize;
    };
    
    //UMOAdKit
    mraid.setDefaultPosition = function(position) {
        defaultPosition = position;
    };
    
    // MRAID
    mraid.getDefaultPosition = function() {
        console.log("getDefaultPosition");
        return defaultPosition;
    };
    
    //UMOAdKit
    mraid.setScreenSize = function(size) {
        screenSize = size;
    };
    
    // MRAID
    mraid.getScreenSize = function() {
        console.log("getScreenSize");
        return screenSize;
    };
    
    
    //////////
    //
    // picture
    //
    
    // MRAID
    mraid.storePicture = function(url) {
        console.log("storePicture");
        var invoke = "mraid://storePicture?url=" + encodeURIComponent(url);
        mraid.nativeInvoke(invoke);
    };
    
    
    //////////
    //
    // calendar
    //
    
    // MRAID
    mraid.createCalendarEvent = function(parameters) {
        console.log("createCalendarEvent");
        var invoke = "mraid://createCalendarEvent?event=" + encodeURIComponent(JSON.stringify(parameters));
        mraid.nativeInvoke(invoke);
    };
    
    mraid.nativeInvoke("mraid://init");
};

if (!window.mraid) {
    window.mraid_init();
}

