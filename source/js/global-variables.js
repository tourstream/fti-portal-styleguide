// Sass breakpoints
var breakpoints = {
  sm: 480,
  md: 768,
  lg: 960,
  xl: 1280
};

var debugMode;

var initDebugMode = function () {

  // Patternlab iFrame
  var isInIframe = (parent !== window);

  var url = isInIframe ? new URL(document.referrer) : new URL(window.location.href);
  var debug = url.searchParams.get("debug");
  if (debug) {
    console.warn("Debug mode on");
    globalVariables.debugMode = debug;
  } else {
    return false;
  }
};

module.exports = {
  breakpoints: breakpoints,
  initDebugMode : initDebugMode,
  debugMode : debugMode
};
