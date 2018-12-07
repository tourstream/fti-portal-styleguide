
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

var toggleSubMenu = function(element) {
  if (element.querySelector("ul").className.indexOf('display-block') === -1) {
    var subMenus = document.querySelectorAll(".header-sub-menu-container");
    var menuLinks = document.querySelectorAll(".header-menu-item-link");
    subMenus.forEach(function(subMenu) {
      subMenu.classList.remove("display-block");
    });
    menuLinks.forEach(function(subMenu) {
      subMenu.classList.remove("active");
    });

    element.querySelector("ul").classList.add("display-block");
    element.querySelector("a").classList.add("active");
  } else {
    element.querySelector("ul").classList.remove("display-block");
    element.querySelector("a").classList.remove("active");
  }
};


module.exports = {
  openNavigation: openNavigation,
  closeNavigation: closeNavigation,
  toggleSubMenu, toggleSubMenu
};
