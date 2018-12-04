
var navigationElements = [];
var openMenuClasses;

openMenuClasses = document.querySelector(".menu-open").classList;

const body = document.querySelector("body");

navigationElements.push(
  document.querySelector(".header-mobile-navigation").classList,
  document.querySelector(".menu-close").classList,
  document.querySelector(".backdrop").classList
);

var openNavigation = function () {
  openMenuClasses.remove("display-block");
  navigationElements.forEach(function (element) {
    element.add("display-block");
  });
  body.classList.add("unscrollable");
};

var closeNavigation = function () {
  openMenuClasses.add("display-block");
  navigationElements.forEach(function (element) {
    element.remove("display-block");
  });
  body.classList.remove("unscrollable");
};


module.exports = {
  openNavigation: openNavigation,
  closeNavigation: closeNavigation
};