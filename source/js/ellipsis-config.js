var characterPerLine = require("./characters-per-line");
var errorHandling = require("./error-handling");

var EllipsisUtil = require("./ellipsis-util").EllipsisUtil;
var EllipseableObject = require("./ellipsis-util").EllipseableObject;

characterPerLine.initFontConstant();

var ellipsisConfig = [
  { type: "singleteaser-headline", selector: ".teaser h3" , lines: 2 },
  { type: "singleteaser-textline", selector: ".teaser p", lines: 4 },
  { type: "multiteaser-headline", selector: ".multi-teaser-head h3", lines: 2 },
  { type: "multiteaser-subheadline", selector: ".multi-teaser-head h4", lines: 1 },
  { type: "multiteaser-offertitle", selector: ".multi-teaser-offer h5", lines: 1 },
  { type: "multiteaser-textline", selector: ".multi-teaser-offer-body > div .multi-teaser-region p", lines: 1 },
  { type: "multiteaser-textline", selector: ".multi-teaser-offer-body > div .multi-teaser-hotel-content p", lines: 1 },
  { type: "top-offer-headline", selector: ".top-offer-title > h3", lines: 1 },
  { type: "top-offer-hotel-info-textline", selector: ".top-offer-hotel-info > p", lines: 1 },
];

var isParendWidthNeeded = function(configType) {
  return configType === "multiteaser-textline"
      || configType === "top-offer-headline";
};

/***
 * @description Get's an array and applies the ellipsis to the described elements
 * @param {Array} initialConfig: Array with configuration for the elements to apply Ellipsis
 * @return {Array} ellipseableObjects
 */
var initializeEllipseableObjects = function(initialConfig) {


  var buildEllipseableObjcts = function (builtObjects, config) {
    var elements = document.querySelectorAll(config.selector);

    if (!errorHandling.checkElements(elements, function() { return true; })) {
      return builtObjects;
    }

    elements.forEach(function (element) {
      var builtObject = isParendWidthNeeded(config.type)
        ? new EllipseableObject(element, EllipsisUtil.getParentsWidth, config.lines)
        : new EllipseableObject(element, EllipsisUtil.getWidth, config.lines);

      // subscribe to the resize event
      window.addEventListener("resize", function() {
        builtObject.applyEllipse();
      });

      // apply Ellipsis and push it into the ellipsableObjects array
      builtObjects.push(builtObject.applyEllipse());
    });

    return builtObjects;
  };

  return initialConfig.reduce(buildEllipseableObjcts, []);
};

/***
   * @summary Inits Elliptable objects and returns them
   * @fires initializeEllipseableObjects that requires @param ellipsisConfig
   * @return {Object} ellipseableObjects
   */
var initEllipsis = function() {
  return initializeEllipseableObjects(ellipsisConfig);
};

module.exports = {
  initEllipsis : initEllipsis,
};
