/* global globalVariables:false */

/**
 * Makes script keep running.
 *
 * element: Check if DOM element exists or is undefined,
 * callbackFunction: function(){return true} or a function that does something before return
 *
 * Create a guard using false as return value.
 * Example: if (guard === false) {return}
 *
 * Add &debug=1 to the url to turn on debug mode.
 * */

var checkElement = function(element, callbackFunction) {

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
