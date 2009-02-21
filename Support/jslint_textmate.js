/*
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*global nclick, file_name, XPathResult*/

/*members ORDERED_NODE_SNAPSHOT_TYPE, evaluate, getElementsByName, 
    innerHTML, length, onclick, replace, snapshotItem, snapshotLength, 
    value
*/

"use strict";

var old_nclick = nclick;

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

var ns = document.getElementsByName('jslint');

for (var i = 0; i < ns.length; i += 1) {
  var n = ns[i];
  if (n.value === 'JSLint') {
    n.onclick = nclick;
  }
}