var navigationElements = [];
var openMenuClasses;
(() => {
  "use strict";
  openMenuClasses = document.querySelector(".menu-open").classList;
  navigationElements.push(
    document.querySelector(".header-mobile-navigation").classList,
    document.querySelector(".menu-close").classList,
    document.querySelector(".backdrop").classList
  );
})();
function openNavigation () {
  openMenuClasses.remove("display-block");
  navigationElements.forEach(function (element) {
    element.add("display-block");
  });
}

function closeNavigation() {
  openMenuClasses.add("display-block");
  navigationElements.forEach(function (element) {
    element.remove("display-block");
  });
}
