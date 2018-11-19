(function () {
  "use strict";

  let cookieAlert = document.querySelector(".cookie-alert");
  let acceptCookies = document.querySelector(".accept-cookies");

  if (cookieAlert && acceptCookies) {
    if (!cookieAlert.classList.contains("show")) {
      cookieAlert.classList.add("show");
    }

    acceptCookies.addEventListener("click", function () {
      cookieAlert.classList.remove("show");
    });
  }
})();
