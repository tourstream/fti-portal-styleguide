var ellipsis = require("html-ellipsis");
var characterPerLine = require("./characters-per-line");
var errorHandling = require("./error-handling");

var EllipsisUtil = {
  /***
   * @param {Object} lineStyles: Node with DOM elements that has a string
   * @return {Boolean}
   */
  hasSpecificHeight: function(lineStyles) {
    return lineStyles.height !== "auto" && parseInt(lineStyles.height) !== 0;
  },

  /***  
   * @param {Node} element Node element.
   * @return {Integer} Returns a font size.
  * */
  getFontSize: function(element) {
    return parseInt(window.getComputedStyle(element).getPropertyValue("font-size"));
  },

  /***
   * @summary Returns the width of the object 
   * @param {Node} textLine: Node with DOM element that has a string
   * @return {Integer} width
   */
  getWidth: function(textLine) {
    if(textLine.innerText === "") {
      return 0;
    }
  
    var lineStyles = window.getComputedStyle(textLine);

    if(EllipsisUtil.hasSpecificHeight(lineStyles)) {
      return parseInt(lineStyles.width);
    }

    errorHandling.checkElement(undefined, function() { } );  
  },

  /***
   * @summary Returns the width of the object's parent 
   * @param {Node} textLine: Node with DOM element that has a string
   * @return {Integer} parent's width
   */
  getParentsWidth: function(textLine) {
    if(textLine.innerText === "") {
      return 0;
    }
    
    var lineStyles = window.getComputedStyle(textLine);
          
    if(EllipsisUtil.hasSpecificHeight(lineStyles)) {
      var parentElement = textLine.parentElement;
      var parentStyles = window.getComputedStyle(parentElement);

      if(parentElement.className !== "multi-teaser-hotel-name") {
        return parseInt(parentStyles.width);
      }

      return parseInt(parentStyles.width);
    }

    errorHandling.checkElement(undefined, function() { } );
  },
};

/*** 
 * @summary Creates a EllipseableObject and pushes it into teaser. 
 * @param {Node} element Node element.
 * @param {Integer} numberOfLines One of the model's attributes.
 * @param {Function} getWidthClosure A self-made method to extract computed Styles.
 */
var EllipseableObject = function(element, getWidthClosure, numberOfLines) {
  this.element = element;
  this.html = this.element.innerHTML.replace(/<!--[\s\S]*?-->/g, "");
  this.fontSize = EllipsisUtil.getFontSize(this.element);
  this.numberOfLines = numberOfLines;
  this.getWidth = getWidthClosure;
};

/***
 * @summary Applies Ellipse to the Ellispseable element
 * @description Calculates the character per line and applies the ellipse
 * @return {Object} EllipseableObject
 */
EllipseableObject.prototype.applyEllipse = function() {
  var width = this.getWidth(this.element);

  var charactersPerLine = characterPerLine.calculate(
    this.fontSize,
    width
  );

  var totalCharacters = charactersPerLine * this.numberOfLines;
  if (this.element.parentElement.classList.contains("top-offer-title")) {
    totalCharacters -= 3;
  }

  if (this.element.innerHTML !== "" || width > 0) {
    this.element.innerHTML = ellipsis(this.html, totalCharacters, true);
  }

  return this;
};

module.exports = {
  EllipseableObject : EllipseableObject,
  EllipsisUtil : EllipsisUtil,
};