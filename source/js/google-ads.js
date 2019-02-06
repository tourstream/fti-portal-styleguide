var adjustSkyscraperPositioning = function() {
  var mainElement = document.getElementsByTagName("main")[0];
  if (mainElement) {
    var newHeight = mainElement.offsetTop;
    document.getElementsByClassName("ad-skyscraper-wrapper")[0].style.top = newHeight + "px";
  }
};

module.exports = {
  adjustSkyscraperPositioning: adjustSkyscraperPositioning
};
