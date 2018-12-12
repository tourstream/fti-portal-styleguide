/* global globalVariables:false */

/* START - Mobile Menu */
const body = document.querySelector("body");
const openMobileMenuButton = document.querySelector(".menu-open");
const headerMobileMenu = document.querySelector(".header-mobile-navigation");
const navigationElements = [
  document.querySelector(".header-mobile-navigation"),
  document.querySelector(".menu-close"),
  document.querySelector(".backdrop")
];

const openNavigation = function() {
  addClassToElements(body, "unscrollable");
  addClassToElements(navigationElements, "display-block");
  removeClassFromElements(openMobileMenuButton, "display-block");

  updateVerticalScrollOnMobileMenu();
};

const closeNavigation = function() {
  removeClassFromElements(body, "unscrollable");
  removeClassFromElements(navigationElements, "display-block");
  addClassToElements(openMobileMenuButton, "display-block");
};

const updateVerticalScrollOnMobileMenu = function() {
  headerMobileMenu.style.removeProperty("height");
  if (!isElementInViewportYAxis(headerMobileMenu)) {
    // Calculate visible height of the Menu inside the window, ignoring header
    const yScroll = headerMobileMenu.scrollTop;
    const elPos = headerMobileMenu.offsetTop - yScroll + headerMobileMenu.clientTop;
    // Set new "height" to the menu, to make it scrollable
    headerMobileMenu.style.height = (window.innerHeight - elPos) + "px";
  }
};
/* END - Mobile Menu */

/* START - Desktop Menu */
const desktopMenuItems = document.querySelectorAll(".header-menu .header-menu-item");
let openSubMenuUl;

// Make submenus show on hover on Desktop only
desktopMenuItems.forEach( function(element) {
  const subMenu = element.querySelector("ul");
  if (subMenu) { // Ignores menu items with no children
    element.addEventListener("mouseover", function() {
      toggleSubMenu(element);
    });
    element.addEventListener("mouseout", function() {
      toggleSubMenu(element);
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
  const rect = element.getBoundingClientRect();

  let verticalCheck = true;
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

const toggleSubMenu = function(mainMenuItem) {
  const listItemAnchor = mainMenuItem.querySelector("a");
  openSubMenuUl = mainMenuItem.querySelector("ul");

  if (openSubMenuUl.className.indexOf("display-block") === -1) {
    const subMenus = document.querySelectorAll(".header-sub-menu-container");
    const menuLinks = document.querySelectorAll(".header-menu-item-link");

    removeClassFromElements(subMenus, "display-block");
    removeClassFromElements(menuLinks, "active");

    addClassToElements(openSubMenuUl, "display-block");
    addClassToElements(listItemAnchor, "active");

    const arrows = document.querySelectorAll(".fg-arrow-up");
    addAndRemoveClass(arrows, "fg-arrow-down", "fg-arrow-up");

    const arrowDown = mainMenuItem.querySelector(".fg-arrow-down");
    addAndRemoveClass(arrowDown, "fg-arrow-up", "fg-arrow-down");

  } else {
    removeClassFromElements(openSubMenuUl, "display-block");
    removeClassFromElements(listItemAnchor, "active");

    const arrowUp = mainMenuItem.querySelector(".fg-arrow-up");
    addAndRemoveClass(arrowUp, "fg-arrow-down", "fg-arrow-up");
  }

  toggleLeftShift();
  updateVerticalScrollOnMobileMenu();
};

const removeClassFromElements = function (elements, classToRemove) {
  if (elements.length <= 0) {return;}
  elements = elements.length ? elements : [elements];
  elements.forEach( function(element) {
    element.classList.remove(classToRemove);
  });
};

const addClassToElements = function (elements, classToAdd) {
  if (elements.length <= 0) {return;}
  elements = elements.length ? elements : [elements];
  elements.forEach( function(element) {
    element.classList.add(classToAdd);
  });
};

const addAndRemoveClass = function(elements, classToAdd, classToRemove) {
  removeClassFromElements(elements, classToRemove);
  addClassToElements(elements, classToAdd);
};
/* END - Utility functions */

module.exports = {
  openNavigation  : openNavigation,
  closeNavigation : closeNavigation,
  toggleSubMenu   : toggleSubMenu,
  updateVerticalScrollOnMobileMenu: updateVerticalScrollOnMobileMenu
};
