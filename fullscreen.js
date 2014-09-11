/**
 * @license Fullscreen.js v0.1.1
 * (c) 2014 Caitlin Potter & Contributors
 * License: MIT
 */
(function(global) { 'use strict';

if (!global || !global.document)
    return;

var document = global.document;
var documentElement = document.documentElement;

var REQUEST_FULLSCREEN_PROPS = [
    'requestFullscreen',
    'mozRequestFullscreen',
    'webkitRequestFullscreen',
    'oRequestFullscreen',
    'msRequestFullscreen'
];

var EXIT_FULLSCREEN_PROPS = [
    'exitFullscreen',
    'mozCancelFullscreen',
    'webkitExitFullscreen',
    'oExitFullscreen',
    'msExitFullscreen'
];

var FULLSCREEN_ELEMENT_PROPS = [
    'fullscreenElement',
    'mozFullscreenElement',
    'webkitFullscreenElement',
    'oFullscreenElement',
    'msFullscreenElement'
];

var FULLSCREEN_ENABLED_PROPS = [
    'fullscreenEnabled',
    'mozFullscreenEnabled',
    'webkitFullscreenEnabled',
    'oFullscreenEnabled',
    'msFullscreenEnabled'
];

var requestFullscreenProp = void 0;
function requestFullscreen(node, flags) {
    if (typeof node === 'number' || !arguments.length) {
        flags = node;
        node = documentElement;
    }

    if (requestFullscreenProp !== void 0)
        return node[requestFullscreenProp](flags);

    for (var i=0; i<REQUEST_FULLSCREEN_PROPS.length; ++i) {
        var key = REQUEST_FULLSCREEN_PROPS[i];
        if (key in node) {
            requestFullscreenProp = key;
            return node[key](flags);
        }
    }
}

var exitFullscreenProp = void 0;
function exitFullscreen() {
    if (exitFullscreenProp !== void 0)
        return document[exitFullscreenProp]();

    for (var i=0; i<EXIT_FULLSCREEN_PROPS.length; ++i) {
        var key = EXIT_FULLSCREEN_PROPS[i];
        if (key in document) {
            exitFullscreenProp = key;
            return document[key]();
        }
    }
}

var fullscreenElementProp = void 0;
function fullscreenElement() {
    if (fullscreenElementProp !== void 0)
        return document[fullscreenElementProp];

    for (var i=0; i<FULLSCREEN_ELEMENT_PROPS.length; ++i) {
        var key = FULLSCREEN_ELEMENT_PROPS[i];
        if (key in document) {
            fullscreenElementProp = key;
            return document[key];
        }
    }
}

var fullscreenEnabledProp = void 0;
function fullscreenEnabled() {
    if (fullscreenEnabledProp !== void 0)
        return document[fullscreenEnabledProp];

    for (var i=0; i<FULLSCREEN_ENABLED_PROPS.length; ++i) {
        var key = FULLSCREEN_ENABLED_PROPS[i];
        if (key in document) {
            fullscreenEnabledProp = key;
            return document[key];
        }
    }
    return false;
}

function Fullscreen() {
    this._isFullscreen = false;
    this._keyListener = null;
}

var haveRequested = false;

function fullscreenKeyListener(event) {
    if (haveRequested && !fullscreenEnabled())
        return;

    if ((event.charCode === 70 || event.charCode === 102 ||
        (event.keyIdentifier.toUpperCase() === 'U+0046') ||
         event.char === 'f' || event.char === 'F') &&
         (event.ctrlKey || event.metaKey)) {
        this.toggle();
    }
}

Fullscreen.prototype.listen = function Fullscreen$Listen() {
    if (!this._keyListener) {
        this._keyListener = toMethod(this, fullscreenKeyListener);
        addEventListener(document, 'keypress', this._keyListener);
    }
};

Fullscreen.prototype.deafen = function Fullscreen$deafen() {
    if (this._keyListener) removeEventListener(document, 'keypress', this._keyListener);
};

Fullscreen.prototype.enter = function Fullscreen$enter(node) {
    if (!node) node = documentElement;

    if (fullscreenElement()) {
        if (fullscreenElement() === node) return;
        this.exit();
    }

    requestFullscreen(node);
    haveRequested = true;
};

Fullscreen.prototype.exit = function Fullscreen$exit() {
    if (fullscreenElement())
        exitFullscreen();
};

Fullscreen.prototype.toggle = function Fullscreen$toggle() {
    if (fullscreenElement()) {
        this.exit();
    } else {
        this.enter();
    }
};

var toMethod = Function.prototype.toMethod ?
    (function toMethodFn(obj, fn) {
        return fn.toMethod(obj);
    }) : (function bindFn(obj, fn) {
        return fn.bind(obj);
    });

var addEventListener = document.addEventListener ?
    (function addEventListener(node, event, handler) {
        node.addEventListener(event, handler);    
    }) : (function addEventListener(node, event, handler) {
        node.attachEvent('on' + event, handler);
    });

var removeEventListener = document.addEventListener ?
    (function removeEventListener(node, event, handler) {
        node.removeEventListener(event, handler);    
    }) : (function removeEventListener(node, event, handler) {
        node.detachEvent('on' + event, handler);
    });

if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  // RequireJS
  define(function() {
    return new Fullscreen();
  });
} else if (typeof module === 'object' && typeof require === 'function') {
  // CommonJS/Browserify
  module.exports = new Fullscreen();
} else {
  global.$fullscreen = new Fullscreen();
}

})(this);
