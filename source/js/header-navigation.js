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

var subMenuUl;
var toggleSubMenu = function(element) {
  subMenuUl = element.querySelector("ul");
  if (subMenuUl.className.indexOf('display-block') === -1) {
    var arrowElements = document.querySelectorAll(".fg-arrow-up");
    var subMenus = document.querySelectorAll(".header-sub-menu-container");
    var menuLinks = document.querySelectorAll(".header-menu-item-link");
    subMenus.forEach(function(subMenu) {
      subMenu.classList.remove("display-block");
    });
    menuLinks.forEach(function(subMenu) {
      subMenu.classList.remove("active");
    });
    arrowElements.forEach(function(arrowElement) {
      arrowElement.classList.add("fg-arrow-down");
      arrowElement.classList.remove("fg-arrow-up");
    });

    element.querySelector("ul").classList.add("display-block");
    element.querySelector("a").classList.add("active");

    var arrowElement = element.querySelector(".fg-arrow-down");
    arrowElement.classList.add("fg-arrow-up");
    arrowElement.classList.remove("fg-arrow-down");

  } else {
    element.querySelector("ul").classList.remove("display-block");
    element.querySelector("a").classList.remove("active");
    var arrowElement = element.querySelector(".fg-arrow-up");
    arrowElement.classList.add("fg-arrow-down");
    arrowElement.classList.remove("fg-arrow-up");
  }
  shiftSubMenuToLeft();
  updateVerticalScrollOnMenu();
};

// Make submenus show on hover on Desktop only
document.querySelectorAll('.header-menu .header-menu-item').forEach( function(el) {
  var subMenu = el.querySelector('ul');
  if (subMenu) { // Ignores menu items with no children
    el.addEventListener('mouseover', function() {
        toggleSubMenu(el);
    });
    el.addEventListener('mouseout', function() {
        toggleSubMenu(el);
    });
  }
});

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

function shiftSubMenuToLeft() {
  if(!subMenuUl) {return}
  subMenuUl.classList.remove("left-shift");
  if (!isElementInViewport(subMenuUl)) {
    subMenuUl.classList.add("left-shift");
  }
}

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
  shiftSubMenuToLeft();
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
