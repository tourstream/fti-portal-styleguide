/* global globalVariables:false errorHandling:false */

// Mobile Menu
// Desktop Menu
// Utilities
// Init

var body,
  html,
  navigationElements,
  openSubMenuUl,
  desktopMenuItems,
  openMobileMenuButton,
  headerMobileMenu,
  menuClose,
  backdrop,
  lastScrollPosition = 0,
  scrollTicking = false;

/* START - Mobile Menu */
var openNavigation = function() {
  addClassToElements(body, "unscrollable");
  addClassToElements(html, "unscrollable");
  addClassToElements(navigationElements, "display-block");
  removeClassFromElements(openMobileMenuButton, "display-block");
  updateNavigationDistance(lastScrollPosition);
};

var closeNavigation = function() {
  removeClassFromElements(body, "unscrollable");
  removeClassFromElements(html, "unscrollable");
  removeClassFromElements(navigationElements, "display-block");
  addClassToElements(openMobileMenuButton, "display-block");
};

var updateNavigationDistance = function(position) {
  var isBreakPointSM = window.innerWidth < globalVariables.breakpoints.sm;
  var isBreakPointLG = window.innerWidth < globalVariables.breakpoints.lg;
  var header = document.querySelector("header");
  var message = document.querySelector(".fti-message");
  // Guards
  var guardHeader = errorHandling.checkElement(header, function(){return true;});
  var guardMessage = errorHandling.checkElement(message, function(){return true;});
  if(guardHeader === false){return;}

  var navigationDistance = guardMessage === undefined ? message.offsetHeight : 0;

  var messageHeight = message ? parseInt(getComputedStyle(message).height) + parseInt(getComputedStyle(message).paddingBottom) + parseInt(getComputedStyle(message).paddingTop) : 0;
  var headerHeight = parseInt(getComputedStyle(header).height);

  // iE11: Makes <header> sticky and positions it depending on scroll position
  if (isIE) {
    if(isBreakPointLG && position > navigationDistance ) {
      header.style.position = "fixed";
      header.style.top = "0px";
    }
    else {
      header.style.position = "static";
      header.style.top = messageHeight + "px";
    }
  }

  position > navigationDistance ?
    navigationDistance = headerHeight :
    navigationDistance = headerHeight + messageHeight;

  // Positions Navigation
  headerMobileMenu.style.top = navigationDistance + "px";
  backdrop.style.top = navigationDistance + "px";

  // Heighting the Navigation
  var isOverflowingWindowHeight = window.innerHeight - navigationDistance < parseInt(getComputedStyle(headerMobileMenu).height);
  headerMobileMenu.style.removeProperty("height"); // Makes calculation much smoother

  isBreakPointSM || isOverflowingWindowHeight ?
    headerMobileMenu.style.height = (window.innerHeight - headerHeight - messageHeight) + "px" :
    headerMobileMenu.style.height = "auto";
};

/* END - Mobile Menu */

/* START - Desktop Menu */
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
  var elementBoundaries = element.getBoundingClientRect();

  var windowHeight = window.innerHeight <= document.documentElement.clientHeight ?
    window.innerHeight :
    document.documentElement.clientHeight;

  var verticalCheck = true;
  if (window.innerWidth < globalVariables.breakpoints.lg) { // Tablet and mobile
    verticalCheck = elementBoundaries.top >= 0 &&
                    elementBoundaries.bottom <= windowHeight;
  }

  var windowWidth = window.innerWidth <= document.documentElement.clientWidth ?
    window.innerWidth :
    document.documentElement.clientWidth;

  return (
    elementBoundaries.left >= 0 &&
    windowWidth &&
    verticalCheck
  );
}

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

  updateNavigationDistance(lastScrollPosition);
};


var toggleMobileSubMenu = function(mainMenuItem) {
  openSubMenuUl = mainMenuItem.querySelector("ul");
  if (openSubMenuUl.className.indexOf("display-block") === -1) {
    openSubMenu(mainMenuItem);
  } else {
    closeSubMenu(mainMenuItem);
  }
  updateNavigationDistance(lastScrollPosition);
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

var isIE = (function () {
  return (
    (navigator.appName === "Microsoft Internet Explorer") ||
    (
      (navigator.appName === "Netscape") &&
      (new RegExp("Trident/.*rv:([0-9]+[0-9]*)").exec(navigator.userAgent) != null)
    ));
})();

// Event Listeners:

var addEventListenersToDesktopMenuItems = function(){
  // Make submenus show on hover on Desktop only
  desktopMenuItems.forEach( function(element) {
    var subMenu = element.querySelector("ul");
    if (subMenu) { // Ignores menu items with no children
      element.addEventListener("mouseover", function(event) {
        if (event.target === this || this.hasChildNodes(event.target)) {
          openSubMenu(element);
          toggleLeftShift();
        }
      });
      element.addEventListener("mouseleave", function(event) {
        if (event.target === this || this.hasChildNodes(event.target)) {
          closeSubMenu(element);
          toggleLeftShift();
        }
      });
    }
  });
};

var addEventListenersForWindowResizing = function() {
  window.addEventListener("resize", function() {
    toggleLeftShift();
    // Exits desktop navigation, when entering tablet or mobile view
    if (window.innerWidth < globalVariables.breakpoints.lg) {
      updateNavigationDistance(lastScrollPosition);
    }
    // Exits mobile/tablet navigation, when entering desktop view
    if (window.innerWidth >= globalVariables.breakpoints.lg) {
      closeNavigation();
      updateNavigationDistance(lastScrollPosition);
    }
  });
};

var addEventListenerForMobileScrolling = function() {
  window.addEventListener("scroll", function() {
    lastScrollPosition = isIE ? window.pageYOffset : window.scrollY;

    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        updateNavigationDistance(lastScrollPosition);
        scrollTicking = false;
        return;
      });

      scrollTicking = true;
    }
  });
};
/* END - Utility functions */

var initHeaderNavigation = function(){
  body = document.querySelector("body");
  html = document.querySelector("html");
  openMobileMenuButton = document.querySelector(".menu-open");
  headerMobileMenu = document.querySelector(".header-mobile-navigation");
  menuClose = document.querySelector(".menu-close");
  backdrop = document.querySelector(".backdrop");
  desktopMenuItems = document.querySelectorAll(".header-menu .header-menu-item");

  // Guards
  var guardOpenMobileMenuButton = errorHandling.checkElement(openMobileMenuButton, function(){return true;});
  var guardHeaderMobileMenu = errorHandling.checkElement(headerMobileMenu, function(){return true;});
  var guardMenuClose = errorHandling.checkElement(menuClose, function(){return true;});
  var guardBackdrop = errorHandling.checkElement(backdrop, function(){return true;});
  var guardDesktopMenuItems = errorHandling.checkElements(desktopMenuItems, addEventListenersToDesktopMenuItems);

  if (
    guardOpenMobileMenuButton === false ||
    guardHeaderMobileMenu === false ||
    guardMenuClose === false ||
    guardBackdrop === false ||
    guardDesktopMenuItems === false
  ) {return;}

  navigationElements = [
    headerMobileMenu,
    menuClose,
    backdrop
  ];

  addEventListenersForWindowResizing();
  addEventListenerForMobileScrolling();

  updateNavigationDistance();
};

module.exports = {
  initHeaderNavigation : initHeaderNavigation,
  openNavigation  : openNavigation,
  closeNavigation : closeNavigation,
  toggleSubMenu   : toggleMobileSubMenu,
  openSubMenu     : openSubMenu,
  closeSubMenu    : closeSubMenu,
  updateNavigationDistance : updateNavigationDistance
};
