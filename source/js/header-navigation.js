
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

  fixVerticalScrollOnMenu();
};

var menu = document.querySelector('.header-mobile-navigation');
var fixVerticalScrollOnMenu = function() {
  if (window.outerWidth >= 480) { // Tablet only
    // Changes menu height to 'auto' just to retrieve its actual current height
    menu.style.height = 'auto';
    if (!isElementInViewport(menu)) {
      // Calculate visible height of the Menu inside the window, ignoring header
      var yScroll = menu.scrollTop;
      var elPos = menu.offsetTop - yScroll + menu.clientTop;
      // Set new 'height' to the Menu, to make it scrollable
      menu.style.height = (window.outerHeight - elPos) + 'px';
    }
  } else { // Smaller screens
    menu.style.height = '100%';
  }
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
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
