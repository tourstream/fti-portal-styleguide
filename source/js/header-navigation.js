/* START - Mobile Menu */
const body = document.querySelector('body');
var openMobileMenuBtn = document.querySelector('.menu-open');
var headerMobileMenu = document.querySelector('.header-mobile-navigation');
var navigationElements = [
  document.querySelector('.header-mobile-navigation').classList,
  document.querySelector('.menu-close').classList,
  document.querySelector('.backdrop').classList
];

var openNavigation = function() {
  body.classList.add('unscrollable');
  openMobileMenuBtn.classList.remove('display-block');
  navigationElements.forEach( function(el) {
    el.add('display-block');
  });

  updateVerticalScrollOnMobileMenu();
};

var closeNavigation = function() {
  body.classList.remove('unscrollable');
  openMobileMenuBtn.classList.add('display-block');
  navigationElements.forEach( function(el) {
    el.remove('display-block');
  });
};

var updateVerticalScrollOnMobileMenu = function() {
    headerMobileMenu.style.removeProperty('height');
    if (!isElementInViewportYAxis(headerMobileMenu)) {
      // Calculate visible height of the Menu inside the window, ignoring header
      var yScroll = headerMobileMenu.scrollTop;
      var elPos = headerMobileMenu.offsetTop - yScroll + headerMobileMenu.clientTop;
      // Set new 'height' to the menu, to make it scrollable
      headerMobileMenu.style.height = (window.innerHeight - elPos) + 'px';
    }
};
/* END - Mobile Menu */

/* START - Desktop Menu */
var desktopMenuItems = document.querySelectorAll('.header-menu .header-menu-item');
var openSubMenuUl;

// Make submenus show on hover on Desktop only
desktopMenuItems.forEach( function(el) {
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

function checkIfOpenSubMenuIsVisibleOnHover() {
  if (!openSubMenuUl) return; // If a menu item with no children was hovered

  openSubMenuUl.classList.remove('left-shift');
  if (!isElementInViewportYAxis(openSubMenuUl)) {
    openSubMenuUl.classList.add('left-shift');
  }
}
/* END - Desktop Menu */

/* START - Utility functions */
function isElementInViewportYAxis(el) {
  var rect = el.getBoundingClientRect();

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

window.addEventListener('resize', function() {
  checkIfOpenSubMenuIsVisibleOnHover();
  if (window.innerWidth >= globalVariables.breakpoints.sm && window.innerWidth < globalVariables.breakpoints.lg) { // Tablet only
    updateVerticalScrollOnMobileMenu();
  }
  if (window.innerWidth >= globalVariables.breakpoints.lg) { // Desktop
    closeNavigation();
  }
});

var toggleSubMenu = function(mainMenuItem) {
  var listItemAnchor = mainMenuItem.querySelector('a');
  openSubMenuUl = mainMenuItem.querySelector('ul');

  if (openSubMenuUl.className.indexOf('display-block') === -1) {
    var subMenus = document.querySelectorAll('.header-sub-menu-container');
    var menuLinks = document.querySelectorAll('.header-menu-item-link');

    subMenus.forEach( function(el) {
      el.classList.remove('display-block');
    });
    menuLinks.forEach( function(el) {
      el.classList.remove('active');
    });

    openSubMenuUl.classList.add('display-block');
    listItemAnchor.classList.add('active');

    var allArrowElements = document.querySelectorAll('.fg-arrow-up');
    allArrowElements.forEach( function(el) {
      el.classList.add('fg-arrow-down');
      el.classList.remove('fg-arrow-up');
    });

    var arrowDownElement = mainMenuItem.querySelector('.fg-arrow-down');
    arrowDownElement.classList.add('fg-arrow-up');
    arrowDownElement.classList.remove('fg-arrow-down');
  } else {
    openSubMenuUl.classList.remove('display-block');
    listItemAnchor.classList.remove('active');

    var arrowUpElement = mainMenuItem.querySelector('.fg-arrow-up');
    arrowUpElement.classList.add('fg-arrow-down');
    arrowUpElement.classList.remove('fg-arrow-up');
  }

  checkIfOpenSubMenuIsVisibleOnHover();
  updateVerticalScrollOnMobileMenu();
};
/* END - Utility functions */

module.exports = {
  openNavigation: openNavigation,
  closeNavigation: closeNavigation,
  toggleSubMenu: toggleSubMenu,
  updateVerticalScrollOnMobileMenu: updateVerticalScrollOnMobileMenu
};
