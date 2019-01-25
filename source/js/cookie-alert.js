var initCookieAlert = function() {
  var cookieAlert = document.querySelector(".cookie-alert");
  var acceptCookies = document.querySelector(".accept-cookies");

  if (!getCookie("ftiAcceptCookies")) {
    cookieAlert.classList.add("show");
  }

  acceptCookies.addEventListener("click", function () {
    setCookie("ftiAcceptCookies", true, 30);
    cookieAlert.classList.remove("show");
  });
};

var setCookie = function(cookieName, cookieValue, expirationDays) {
  var date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString() + ";";
  var domain = getDomainName(window.location.hostname);
  document.cookie = cookieName.concat("=", cookieValue, ";", "expires=", expires, ";", "domain=", domain, ";", "path=/;");
};

var getDomainName = function (hostName) {
  return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
};

var getCookie = function (cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieBits = decodedCookie.split(";");
  for (var i = 0; i < cookieBits.length; i++) {
    var cookieBitIterator = cookieBits[i];
    while (cookieBitIterator.charAt(0) === " ") {
      cookieBitIterator = cookieBitIterator.substring(1);
    }
    if (cookieBitIterator.indexOf(name) === 0) {
      return cookieBitIterator.substring(name.length, cookieBitIterator.length);
    }
  }
  return "";
};

module.exports = {
  initCookieAlert : initCookieAlert,
};
