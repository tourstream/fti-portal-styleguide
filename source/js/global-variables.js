/* global globalVariables:false cookie:false */

// Sass breakpoints
var breakpoints = {
  sm: 480,
  md: 768,
  lg: 960,
  xl: 1280
};

var debugMode = "";

var initDebugMode = function () {
  /*eslint no-console: ["error", { allow: ["warn"] }] */
  globalVariables.debugMode = cookie.getCookie("debug");

  if (globalVariables.debugMode != 1) {
    var url = new URL(window.location.href);
    globalVariables.debugMode = url.searchParams.get("debug");
  }

  if (globalVariables.debugMode == "1") {
    console.warn("Debug mode on");
  }
};

module.exports = {
  breakpoints: breakpoints,
  initDebugMode : initDebugMode,
  debugMode : debugMode
};
