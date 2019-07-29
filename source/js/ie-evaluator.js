/*** 
 * @summary Checks if ie11-client is available
 */
var isIE = (function () {
  return (
    (navigator.appName === "Microsoft Internet Explorer") ||
    ((navigator.appName === "Netscape") &&
      (new RegExp("Trident/.*rv:([0-9]+[0-9]*)").exec(navigator.userAgent) != null)
    ));
})();

module.exports = {
  isIE : isIE,
};