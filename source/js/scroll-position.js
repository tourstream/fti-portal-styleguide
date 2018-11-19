var scrollPosition;
var bodyClasses = document.querySelector("body").classList;
var htmlClasses = document.querySelector("html").classList;

// Todo part of Ticket ETS-1382 second level navigation
function saveScrollPosition() {
  bodyClasses.add("no-scroll");
  htmlClasses.add("no-scroll");
  scrollPosition = window.scrollY;
}

function returnToScrollPosition () {
  htmlClasses.remove("no-scroll");
  bodyClasses.remove("no-scroll");
  window.scrollTo(0, scrollPosition);
}
