/**
 * Gets a specific cookie
 *
 * @param {String} cookie name
 * @return {String} cookie value
 * */

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

/**
 * Sets a specific cookie
 *
 * @param {String} cookieName
 * @param {String} cookieValue
 * @param {String} expirationValue (optional)
 * */

var setCookies = function(cookieName, cookieValue, expirationValue) {
  var domain = getDomainName(window.location.hostname);
  if(expirationValue) {
    document.cookie = cookieName.concat("=", cookieValue, ";", "expires=", expirationValue, ";", "domain=", domain, ";", "path=/;");
  } else {
    document.cookie = cookieName.concat("=", cookieValue, ";", "domain=", domain, ";", "path=/;");
  }
};

var getDomainName = function (hostName) {
  return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
};

module.exports = {
  getCookie : getCookie,
  setCookies : setCookies
};
