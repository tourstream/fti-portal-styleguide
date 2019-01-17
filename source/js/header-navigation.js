/* global globalVariables:false */

/* START - Mobile Menu */
var body = document.querySelector("body");
var html = document.querySelector("html");
var openMobileMenuButton = document.querySelector(".menu-open");
var headerMobileMenu = document.querySelector(".header-mobile-navigation");
var navigationElements = [
  document.querySelector(".header-mobile-navigation"),
  document.querySelector(".menu-close"),
  document.querySelector(".backdrop")
];

var openNavigation = function() {
  addClassToElements(body, "unscrollable");
  addClassToElements(html, "unscrollable");
  addClassToElements(navigationElements, "display-block");
  removeClassFromElements(openMobileMenuButton, "display-block");

  updateVerticalScrollOnMobileMenu();
};

var closeNavigation = function() {
  removeClassFromElements(body, "unscrollable");
  removeClassFromElements(html, "unscrollable");
  removeClassFromElements(navigationElements, "display-block");
  addClassToElements(openMobileMenuButton, "display-block");
};

var updateVerticalScrollOnMobileMenu = function() {
  headerMobileMenu.style.removeProperty("height");
  if (!isElementInViewportYAxis(headerMobileMenu)) {
    // Calculate visible height of the Menu inside the window, ignoring header
    var yScroll = headerMobileMenu.scrollTop;
    var elPos = headerMobileMenu.offsetTop - yScroll + headerMobileMenu.clientTop;
    // Set new "height" to the menu, to make it scrollable
    headerMobileMenu.style.height = (window.innerHeight - elPos) + "px";
  }
};
/* END - Mobile Menu */

/* START - Desktop Menu */
var desktopMenuItems = document.querySelectorAll(".header-menu .header-menu-item");
var openSubMenuUl;

// Make submenus show on hover on Desktop only
desktopMenuItems.forEach( function(element) {
  var subMenu = element.querySelector("ul");
  if (subMenu) { // Ignores menu items with no children
    element.addEventListener("mouseover", function(event) {
      if (event.target === this || this.hasChildNodes(event.target)) {
        event.preventDefault();
        openSubMenu(element);
        toggleLeftShift();
      }
    });
    element.addEventListener("mouseout", function(event) {
      if (event.target === this || this.hasChildNodes(event.target)) {
        event.preventDefault();
        closeSubMenu(element);
        toggleLeftShift();
      }
    });
  }
});

function toggleLeftShift() {
  if (!openSubMenuUl) return; // If a menu item with no children was hovered

  removeClassFromElements(openSubMenuUl, "left-shift");
  if (!isElementInViewportYAxis(openSubMenuUl)) {
    addClassToElements(openSubMenuUl, "left-shift");
  }
}
/* END - Desktop Menu */

/* START - Utility functions */
function isElementInViewportYAxis(element) {
  var rect = element.getBoundingClientRect();

  var verticalCheck = true;
  if (window.innerWidth < globalVariables.breakpoints.lg) { // Tablet
    verticalCheck = rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
  
  return (
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    verticalCheck
  );
}

window.addEventListener("resize", function() {
  toggleLeftShift();
  if (window.innerWidth >= globalVariables.breakpoints.sm &&
      window.innerWidth < globalVariables.breakpoints.lg) { // Tablet only
    updateVerticalScrollOnMobileMenu();
  }
  if (window.innerWidth >= globalVariables.breakpoints.lg) { // Desktop
    closeNavigation();
  }
});

var closeSubMenu = function (mainMenuItem) {
  var listItemAnchor = mainMenuItem.querySelector("a");
  openSubMenuUl = mainMenuItem.querySelector("ul");

  removeClassFromElements(openSubMenuUl, "display-block");
  removeClassFromElements(listItemAnchor, "active");

  var arrowUp = mainMenuItem.querySelector(".fg-arrow-up");
  if(arrowUp) {
    addAndRemoveClass(arrowUp, "fg-arrow-down", "fg-arrow-up"); // error comes from here
  }

};

var openSubMenu = function(mainMenuItem) {
  var listItemAnchor = mainMenuItem.querySelector("a");
  openSubMenuUl = mainMenuItem.querySelector("ul");
  var subMenus = document.querySelectorAll(".header-sub-menu-container");
  var menuLinks = document.querySelectorAll(".header-menu-item-link");

  removeClassFromElements(subMenus, "display-block");
  removeClassFromElements(menuLinks, "active");

  addClassToElements(openSubMenuUl, "display-block");
  addClassToElements(listItemAnchor, "active");

  var arrows = document.querySelectorAll(".fg-arrow-up");
  addAndRemoveClass(arrows, "fg-arrow-down", "fg-arrow-up");

  var arrowDown = mainMenuItem.querySelector(".fg-arrow-down");
  addAndRemoveClass(arrowDown, "fg-arrow-up", "fg-arrow-down");
};

var toggleMobileSubMenu = function(mainMenuItem) {
  openSubMenuUl = mainMenuItem.querySelector("ul");

  if (openSubMenuUl.className.indexOf("display-block") === -1) {
    openSubMenu(mainMenuItem);
  } else {
    closeSubMenu(mainMenuItem);
  }

  updateVerticalScrollOnMobileMenu();
};

var removeClassFromElements = function (elements, classToRemove) {
  if (elements.length <= 0) {return;}
  elements = elements.length ? elements : [elements];
  elements.forEach( function(element) {
    element.classList.remove(classToRemove);
  });
};

var addClassToElements = function (elements, classToAdd) {
  if (elements.length <= 0) {return;}
  elements = elements.length ? elements : [elements];
  elements.forEach( function(element) {
    element.classList.add(classToAdd);
  });
};

var addAndRemoveClass = function(elements, classToAdd, classToRemove) {
  removeClassFromElements(elements, classToRemove);
  addClassToElements(elements, classToAdd);
};
/* END - Utility functions */

module.exports = {
  openNavigation  : openNavigation,
  closeNavigation : closeNavigation,
  toggleSubMenu   : toggleMobileSubMenu,
  openSubMenu     : openSubMenu,
  closeSubMenu    : closeSubMenu,
  updateVerticalScrollOnMobileMenu: updateVerticalScrollOnMobileMenu
};
