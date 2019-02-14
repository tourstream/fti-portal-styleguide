/* global errorHandling:false */
var adjustSkyscraperPositioning = function() {
  var mainElement = document.getElementsByTagName("main")[0];
  var skyscraper = document.querySelector("ad-skyscraper-wrapper");
  var guardMainElement = errorHandling.checkElement(mainElement, function(){return true;});
  var guardSkyscraper = errorHandling.checkElement(skyscraper, function(){return true;});

  if (
    guardMainElement === false ||
    guardSkyscraper === false
  ) {return;}

  var newHeight = mainElement.offsetTop;
  skyscraper.style.top = newHeight + "px";
};

module.exports = {
  adjustSkyscraperPositioning: adjustSkyscraperPositioning
};
