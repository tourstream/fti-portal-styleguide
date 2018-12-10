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

  updateVerticalScrollOnMenu();
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

  updateVerticalScrollOnMenu();
};

var headerMenu = document.querySelector('.header-mobile-navigation');
var updateVerticalScrollOnMenu = function() {
    headerMenu.style.removeProperty('height');
    if (!isElementInViewport(headerMenu)) {
      // Calculate visible height of the Menu inside the window, ignoring header
      var yScroll = headerMenu.scrollTop;
      var elPos = headerMenu.offsetTop - yScroll + headerMenu.clientTop;
      // Set new 'height' to the menu, to make it scrollable
      headerMenu.style.height = (window.innerHeight - elPos) + 'px';
    }
};

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('resize', function() {
  if (window.innerWidth >= 480 && window.innerWidth <= 960) {// Tablet only
    updateVerticalScrollOnMenu();
  }
});

module.exports = {
  openNavigation: openNavigation,
  closeNavigation: closeNavigation,
  toggleSubMenu: toggleSubMenu,
  fixVerticalScrollOnMenu: updateVerticalScrollOnMenu
};
