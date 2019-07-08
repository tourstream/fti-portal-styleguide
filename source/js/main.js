require("core-js-bundle");

// Utils
window.globalVariables = require("./global-variables");
window.cookie = require("./cookie");
window.errorHandling = require("./error-handling");
window.characterPerLine = require("./characters-per-line");
window.textEllipsis = require("./text-ellipsis");

// Components
window.cookieAlert = require("./cookie-alert");
window.headerNavigation = require("./header-navigation");
window.googleAds = require("./google-ads");
window.teaser = require("./teaser");

// Init Utils
window.globalVariables.initDebugMode();
window.characterPerLine.initFontConstant();

// Init Components
window.cookieAlert.initAcceptCookies();
window.headerNavigation.initHeaderNavigation();
window.teaser.initEllipsis();
window.googleAds.adjustSkyscraperPositioning();