// web.js
// 2008-11-26

// This is the web browser companion to fulljslint.js.

/*extern JSLINT */
/*jslint browser: true, evil: true */
/*members checked, clearall, cookie, getElementById, getElementsByName,
    getTime, goodparts, indent, indexOf, innerHTML, join, length, onchange,
    onclick, parse, predef, recommended, report, select, setTime, split,
    stringify, substring, toGMTString, value
*/

var nclick;

"use strict";

(function () {
    var c = document.cookie,
        predefined = document.getElementById('predef'),
        cluster = {
            recommended: ['eqeqeq', 'newcap', 'nomen', 'undef', 'white'],
            goodparts: [
                'bitwise', 'eqeqeq', 'newcap', 'nomen', 'onevar',
                'plusplus', 'regexp', 'undef', 'white'
            ],
            clearall: []
        },
        i,                              // Loop counter
        indent = document.getElementById('indent'),
        input = document.getElementById('input'),
        n,                              // A dom node
        ns,                             // An array of dom nodes
        nclear,
        // make nclick global
        // nclick,
        o,                              // The options object
        options = [
            'adsafe', 'bitwise', 'browser', 'cap', 'css', 'debug',
            'eqeqeq', 'evil', 'forin', 'fragment', 'laxbreak', 'newcap',
            'nomen', 'on', 'onevar', 'passfail', 'plusplus', 'regexp',
            'rhino', 'safe', 'sidebar', 'strict', 'sub', 'undef', 'white',
            'widget'
        ],
        output = document.getElementById('output');

    function getCheckbox(o) {
        var n = document.getElementById(o);
        return n && n.checked;
    }


    function setCheckbox(o, b) {
        var n = document.getElementById(o);
        if (n) {
            n.checked = b;
        }
    }

    function setCluster(n) {
        document.getElementById(n).onclick = function (e) {
            var c = cluster[n];
            for (i = 0; i < options.length; i += 1) {
                setCheckbox(options[i], false);
            }
            for (i = 0; i < c.length; i += 1) {
                setCheckbox(c[i], true);
            }
        };
    }


    input.onchange = function (e) {
        output.innerHTML = '';
    };

// Add click event handlers to the [JSLint] and [clear] buttons.

    ns = document.getElementsByName('jslint');
    nclick = function (e) {

// Make a JSON cookie of the current options.

        var d = new Date(), j, oj, op = {};
        for (j = 0; j < options.length; j += 1) {
            oj = options[j];
            op[oj] = getCheckbox(oj);
        }
        op.indent = +indent.value || 4;
        oj = predefined.value;
        if (oj) {
            op.predef = oj.split(/\s*,\s*/);
        }
        d.setTime(d.getTime() + 1e10);
        document.cookie = 'jslint=' + JSON.stringify(op) + ';expires=' +
            d.toGMTString();

// Call JSLint and obtain the report.

        JSLINT(input.value, op);
        output.innerHTML = JSLINT.report();
        input.select();
        return false;
    };
    nclear = function (e) {
        input.value = '';
        output.innerHTML = '';
        input.select();
        return false;
    };
    for (i = 0; i < ns.length; i += 1) {
        n = ns[i];
        switch (n.value) {
        case 'JSLint':
            n.onclick = nclick;
            break;
        case 'clear':
            n.onclick = nclear;
            break;
        }
    }

// Recover the JSLint options from a JSON cookie.

    if (c && c.length > 8) {
        i = c.indexOf('jslint={');
        if (i >= 0) {
            c = c.substring(i + 7);
            i = c.indexOf('}');
            if (i > 1) {
                c = c.substring(0, i + 1);
                o = JSON.parse(c);
                for (i = 0; i < options.length; i += 1) {
                    setCheckbox(options[i], o[options[i]]);
                }
                indent.value = o.indent || 4;
                predefined.value = o.predef instanceof Array ?
                    o.predef.join(',') : '';
            }
        }
    }

    setCluster('recommended');
    setCluster('goodparts');
    setCluster('clearall');

    input.select();
})();