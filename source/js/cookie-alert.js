module.exports = {
  initCookieAlert : function() {
    var cookieAlert = document.querySelector(".cookie-alert");
    var acceptCookies = document.querySelector(".accept-cookies");
  
    if (cookieAlert && acceptCookies) {
      if (!cookieAlert.classList.contains("show")) {
        cookieAlert.classList.add("show");
      }
  
      acceptCookies.addEventListener("click", function () {
        cookieAlert.classList.remove("show");
      });
    }
  }
};