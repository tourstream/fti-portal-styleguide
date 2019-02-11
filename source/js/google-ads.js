var adjustSkyscraperPositioning = function() {
  var mainElement = document.getElementsByTagName("main")[0];
  if (mainElement) {
    var newHeight = mainElement.offsetTop;
    var skyscraper = document.getElementsByClassName("ad-skyscraper-wrapper")[0];
    if (skyscraper) {
      skyscraper.style.top = newHeight + "px";
    }
  }
};

module.exports = {
  adjustSkyscraperPositioning: adjustSkyscraperPositioning
};
