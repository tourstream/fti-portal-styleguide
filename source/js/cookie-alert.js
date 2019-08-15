var errorHandling = require("./error-handling");
var cookie = require("./cookie");

var initAcceptCookies = function() {
  var cookieAlert = document.querySelector(".cookie-alert");
  var acceptCookies = document.querySelector(".accept-cookies");

  // Guards
  var guardCookieAlert = errorHandling.checkElement(cookieAlert, function(){return true;});
  var guardAcceptCookies = errorHandling.checkElement(acceptCookies, function(){return true;});
  if (guardCookieAlert === false || guardAcceptCookies === false) {return;}

  if (!cookie.getCookie("ftiAcceptCookies")) {
    cookieAlert.classList.add("show");
  }

  acceptCookies.addEventListener("click", function () {
    setAcceptedCookie("ftiAcceptCookies", true, 30);
    cookieAlert.classList.remove("show");
  });
};

var setAcceptedCookie = function(cookieName, cookieValue, expirationDays) {
  var date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expirationValue = "expires=" + date.toUTCString() + ";";
  cookie.setCookies(cookieName, cookieValue, expirationValue);
};

module.exports = {
  initAcceptCookies : initAcceptCookies,
};
