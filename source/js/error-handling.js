/* global globalVariables:false */
/**
 * Catches Errors and
 * makes script keep running.
 * The Styleguide uses a cookie per default.
 * On your portal add a cookie with debug=1.
 * */

/**
 * Checks the existence of one element.
 * @param {Object} element, a DOM element,
 * @param {Function} callbackFunction, function(){return true;} or a function that does something before return
 * @return {Boolean} {Function}
 * Create a guard using false as return value.
 * Example: if (guard === false) {return;}
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

/**
 * Checks the existence of elements in an array.
 * @param {Array} arrayOfElements, a DOM element,
 * @param {Function} callbackFunction, function(){return true;} or a function that does something before return
 * @return  {Boolean} {Function}
 * Create a guard using false as return value.
 * Example: if (guard === false) {return;}
 * */

var checkElements = function(arrayOfElements, callbackFunction) {
  /*eslint no-console: ["error", { allow: ["error"] }] */

  if(globalVariables.debugMode === "1") {
    // Debug mode
    if(arrayOfElements.length > 0){
      return callbackFunction();
    } else {
      console.error("No elements found for this array.");
      return false;
    }
  } else {
    // Production
    if(arrayOfElements.length > 0){
      return callbackFunction();
    } else {
      return false;
    }
  }
};

module.exports = {
  checkElement  : checkElement,
  checkElements : checkElements
};
