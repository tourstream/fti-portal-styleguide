require("core-js-bundle");

// Utils
window.globalVariables = require("./global-variables");
window.cookie = require("./cookie");
window.errorHandling = require("./error-handling");
window.ieEvaluator = require("./ie-evaluator");
window.characterPerLine = require("./characters-per-line");

// Components
window.cookieAlert = require("./cookie-alert");
window.headerNavigation = require("./header-navigation");

// Init Utils
window.globalVariables.initDebugMode();

// Init Components
window.cookieAlert.initAcceptCookies();
window.headerNavigation.initHeaderNavigation();
window.ellipsedObjects = require("./ellipsis-config").initEllipsis();