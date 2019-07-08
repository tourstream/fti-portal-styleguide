/*** 
 * @summary Sets the ellipsis based on the cpl - 3.
 * @param {Object} textLine: Node element, where to set the ellipsis
 * @param {Integer} characterPerLine: Characters per line. Set or calculate cpl.
 */
var setEllipsis = function(textLine, characterPerLine) {
  if (textLine.innerText.length > characterPerLine) {
    textLine.innerText = textLine.innerText.substring(0, characterPerLine - 3).trim() + "...";
  }
};

module.exports = {
  setEllipsis : setEllipsis
};