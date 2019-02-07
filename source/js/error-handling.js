/* global globalVariables:false */
/**
 * Catches Errors and
 * makes script keep running.
 *
 * @param {Object} element Check if DOM element exists or is undefined,
 * @param {Function} callbackFunction function(){return true} or a function that does something before return
 * @return {Boolean}
 * Create a guard using false as return value.
 * Example: if (guard === false) {return}
 *
 * Add &debug=1 to the url to turn on debug mode.
 * */

var checkElement = function(element, callbackFunction) {
  /*eslint no-console: ["error", { allow: ["error"] }] */
  if(globalVariables.debugMode === "1") {
    // Debug mode
    switch (element) {
    case null:
      console.error("This element does not exist");
      return false;
    case undefined:
      console.error("The value is undefined");
      break;
    default:
      callbackFunction();
    }
  } else {
    // Production
    switch (element) {
    case null:
      return false;
    case undefined:
      break;
    default:
      callbackFunction();
    }
  }
};

module.exports = {
  checkElement : checkElement,
};
