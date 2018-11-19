var scrollPosition;
var bodyClasses = document.querySelector("body").classList;
var htmlClasses = document.querySelector("html").classList;
function saveScrollPosition() {
  // bodyClasses.add("no-scroll");
  // htmlClasses.add("no-scroll");
  scrollPosition = window.scrollY;
}

function returnToScrollposition () {
  // htmlClasses.remove("no-scroll");
  // htmlClasses.remove("no-scroll");
  window.scrollTo(0, scrollPosition);
}
