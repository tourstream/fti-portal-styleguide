
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

  fixVerticalScrollOnMenu();
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

var menu = document.querySelector('.header-mobile-navigation');
var originalHeight = null;
var fixVerticalScrollOnMenu = function() {
  if (window.outerWidth >= 480) { // Tablet only
    if (!originalHeight) {
      originalHeight = menu.offsetHeight;
    }
    if (window.outerHeight < originalHeight) {
      // Calculate visible height of the Menu inside the window, ignoring header
      var yScroll = menu.scrollTop;
      var elPos = menu.offsetTop - yScroll + menu.clientTop;
      // Set new 'height' to the Menu, so that it is scrollable
      menu.style.height = (window.outerHeight - elPos) + 'px';
    } else {
      // Menu is fully visible and does not need to be scrollable
      menu.style.height = 'auto';
    }
  } else {
    // Smaller screens
    menu.style.height = '100%';
  }
}

window.addEventListener('resize', function() {
  fixVerticalScrollOnMenu();
});


module.exports = {
  openNavigation: openNavigation,
  closeNavigation: closeNavigation,
  toggleSubMenu: toggleSubMenu,
  fixVerticalScrollOnMenu: fixVerticalScrollOnMenu
};
