/* global errorHandling:false */

var FONTCONSTANT;

/***
 * @summary Sets font constant
 * @description For Proportional Fonts and Monospaced-Fonts
 * @description Font constant (german "Dickte") is the minimum distance between two letters of a font
 * @description Value comes from how much space a letter takes compares to an m-dash, a dash that is as wide as an m (Geviert).
 */
var initFontConstant = function() {
  var body = document.querySelector("body");
  // Guards
  var guardBody = errorHandling.checkElement(body, function(){return true;});
  if (guardBody === false) {return;}

  var fontFamily = window.getComputedStyle(body).getPropertyValue("font-family");

  switch (fontFamily) {
    case "Helvetica Neue":
    case "Calibri":
      FONTCONSTANT = 1.9;
      break;
    case "Arial":
    case "Lucida Grande":
    case "Tahoma":
      FONTCONSTANT = 1.91;
      break;
    case "Trebuchet MS":
      FONTCONSTANT = 2.11;
      break;
    case "Verdana":
      FONTCONSTANT = 1.73;
      break;                            
    default:
      FONTCONSTANT = 1.8;
      break;
  }
};

/***  
 * @summary Characters per line (CPL)
 * @description CPL = width / (font-size / font-constant)
 * 
 * @param {Object} fontSize: Text's font size
 * @param {Integer} width: Width of DOM element that concernce the text
 * @return {Integer} cpl: Characters per line
 */
var calculate = function(fontSize, width) {
  return Math.floor(width / (fontSize / FONTCONSTANT));
};

module.exports = {
  initFontConstant : initFontConstant,
  calculate : calculate
};