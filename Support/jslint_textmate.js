
/*global nclick, file_name, XPathResult*/

/*members ORDERED_NODE_SNAPSHOT_TYPE, evaluate, getElementsByName, 
    innerHTML, length, onclick, replace, snapshotItem, snapshotLength, 
    value
*/

"use strict";

(function () {
  var old_nclick = nclick,
      ns = document.getElementsByName('jslint'),
      n, i;

  nclick = function () {
    old_nclick();
    var results, i, result, text, new_text;
    results = document.evaluate("//div[@id='output']//p[not(@class='evidence')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; i < results.snapshotLength; i += 1) {
      result = results.snapshotItem(i);
      text = result.innerHTML;
      new_text = text.replace(
        /line (\d+) character (\d+)/,
        '<a href="txmt://open/?url=file://' +
        file_name +
        '&line=$1&column=$2">line $1 character $2</a>');
      result.innerHTML = new_text;
    }
    results = document.evaluate("//div[@id='functions']//div[@class='function']/i[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; i < results.snapshotLength; i += 1) {
      result = results.snapshotItem(i);
      text = result.innerHTML;
      new_text = text.replace(
        /(\d+)/,
        '<a href="txmt://open/?url=file://' +
        file_name +
        '&line=$1">line $1</a>');
      result.innerHTML = new_text;
    }
  };

  for (i = 0; i < ns.length; i += 1) {
    n = ns[i];
    if (n.value === 'JSLint') {
      n.onclick = nclick;
    }
  }
})();