var characterPerLine = require("./characters-per-line");
var errorHandling = require("./error-handling");

var ellipsis = require("html-ellipsis");

var teasers = [];

/***
 * @param {Object} lineStyles: Node with DOM elements that has a string
 * @return {Boolean}
 */
var hasSpecificHeight = function(lineStyles) {
  return lineStyles.height != "auto" && parseInt(lineStyles.height) != 0;
};

/***
 * @summary Returns the width of the object 
 * @param {Node} textLines: Node with DOM elements that has a string
 * @return {Integer} width
 */
var getWidth = function(textLine) {
  if(textLine.innerText === "") {
    return 0;
  }
 
  var lineStyles = window.getComputedStyle(textLine);

  if(hasSpecificHeight(lineStyles)) {
    return parseInt(lineStyles.width);
  }
};

/***
 * @summary Returns the width of the object's parent 
 * @param {Node} textLines: Node with DOM elements that has a string
 * @return {Integer} parent's width
 */
var getParentsWidth = function(textLine) {
  if(textLine.innerText === "") {
    return 0;
  }
  
  var lineStyles = window.getComputedStyle(textLine);

  if(hasSpecificHeight(lineStyles)) {
    var parentElement = textLine.parentElement;
    var parentStyles = window.getComputedStyle(parentElement);

    if(parentElement.className !== "multi-teaser-hotel-name") {
      return parseInt(parentStyles.width);
    }

    return parseInt(parentStyles.width);
  }
};

/***  
 * @param {Node} element Node element.
 * @return {Integer} Returns a font size.
* */
var getFontSize = function(element) {
  return parseInt(window.getComputedStyle(element).getPropertyValue("font-size"));
};

/*** 
 * @summary Creates a TeaserObject and pushes it into teaser. 
 * @param {Node} element Node element.
 * @param {Integer} numberOfLines One of the model's attributes.
 * @param {Function} getStyles A self-made method to extract computed Styles.
 */
var TeaserObject = function(element, getStylesFunction, numberOfLines){
  this.element = element;
  this.html = this.element.innerHTML.replace(/<!--[\s\S]*?-->/g, "");
  this.fontSize = getFontSize(this.element);
  this.numberOfLines = numberOfLines;
  this.getWidth = getStylesFunction;

  teasers.push(this);
};

/*** 
 * @summary Sets the ellipsis for every TeaserObject based on the characters per line that fit into the width.
 * @fires characterPerLine.calculate
 * @fires ellipsis by html-ellipsis
 */
var setTeaserEllipsis = function() {
  teasers.forEach(function (teaser) {
    var width = teaser.getWidth(teaser.element);
    if (width === 0) {
      return;
    }

    var charactersPerLine = characterPerLine.calculate(
      teaser.fontSize,
      width
    );
    teaser.element.innerHTML = ellipsis(teaser.html, charactersPerLine * teaser.numberOfLines, true);
  });
};

/*** 
 * @summary Creates TeaserObjects out of the current DOM elements
 * @description Fetches Single Teasers independently from Multi Teasers
 * @fires errorHandling.checkElements
 * @fires TeaserObject
 */
var setTeaserObjects = function() {
  var singleTeaserHeadlines = document.querySelectorAll(".teaser h3");
  var singleTeaserTextlines = document.querySelectorAll(".teaser p");

  // Guards
  var guardSingleTeaserHeadline = errorHandling.checkElements(singleTeaserHeadlines, function(){return true;});
  var guardSingleTeaserTextline = errorHandling.checkElements(singleTeaserTextlines, function(){return true;});
  if(
    guardSingleTeaserHeadline === false ||
    guardSingleTeaserTextline === false
  ){return;}

  singleTeaserHeadlines.forEach(function(singleTeaserHeadline) {
    new TeaserObject(singleTeaserHeadline, getWidth, 2);
  });
  singleTeaserTextlines.forEach(function(singleTeaserTextline) {
    new TeaserObject(singleTeaserTextline, getWidth, 4);
  });
};

/*** 
 * @summary Creates TeaserObjects out of the current DOM elements
 * @description Fetches Multi Teasers independently from Single Teasers
 * @fires errorHandling.checkElements
 * @fires TeaserObject
 */
var setMultiTeaserObjects = function() {
  var multiTeaserHeadlines = document.querySelectorAll(".multi-teaser-head h3");
  var multiTeaserSubheadlines = document.querySelectorAll(".multi-teaser-head h4");
  var multiTeaserOfferTitles = document.querySelectorAll(".multi-teaser-offer h5");
  var multiTeaserTextlines = document.querySelectorAll(".multi-teaser-offer-body > div p");

  var guardMultiTeaserHeadline = errorHandling.checkElements(multiTeaserHeadlines, function(){return true;});
  var guardMultiTeaserSubheadline = errorHandling.checkElements(multiTeaserSubheadlines, function(){return true;});
  var guardMultiTeaserOfferTitle = errorHandling.checkElements(multiTeaserOfferTitles, function(){return true;});
  var guardMultiTeaserTextline = errorHandling.checkElements(multiTeaserTextlines, function(){return true;});
  if(
    guardMultiTeaserHeadline === false ||
    guardMultiTeaserSubheadline === false ||
    guardMultiTeaserOfferTitle === false ||
    guardMultiTeaserTextline === false
  ){return;}

  multiTeaserHeadlines.forEach(function(multiTeaserHeadline) {
    new TeaserObject(multiTeaserHeadline, getWidth, 2);
  });
  multiTeaserSubheadlines.forEach(function(multiTeaserSubheadline) {
    new TeaserObject(multiTeaserSubheadline, getWidth, 1);
  });
  multiTeaserOfferTitles.forEach(function(multiTeaserOfferTitle) {
    new TeaserObject(multiTeaserOfferTitle, getWidth, 1);
  });
  multiTeaserTextlines.forEach(function(multiTeaserTextline) {
    new TeaserObject(multiTeaserTextline, getParentsWidth, 1);
  });
};

/*** 
 * @fires setTeaserEllipsis
 */
var addEventListenersForWindowResizing = function() {
  window.addEventListener("resize", function() {
    setTeaserEllipsis();
  });
};

/*** 
 * @fires addEventListenersForWindowResizing
 * @fires setTeaserObjects
 * @fires setMultiTeaserObjects
 * @fires setTeaserEllipsis
 */
var initEllipsis = function() {
  addEventListenersForWindowResizing();
  setTeaserObjects();
  setMultiTeaserObjects();
  setTeaserEllipsis();
};

module.exports = {
  initEllipsis : initEllipsis,
};