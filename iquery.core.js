(function () {
    var arr = [],
        push = arr.push,
        slice = arr.slice,
        concat = arr.concat;

    function iQuery(selector) {
        return new iQuery.fn.init(selector);
    }
    iQuery.fn = iQuery.prototype = {
        constructor: iQuery,
        version: 1.03,
        length:0,
        each: function (callback) {
            return iQuery.each(this, callback);
        },
        map: function (callback) {
            return iQuery.map(this, callback);
        },
        pushStack: function (selector) {
            var o = iQuery(selector);
            o.prevObject = this;
            return o;
        },
        end: function(){
            return this.prevObject;
        }
    }

    iQuery.each = function (arr, callback) {
        var i;
        if (arr.length >= 0) {
            for (i = 0; i < arr.length; i++) {
                if (callback.call(arr[i], i, arr[i]) === false) break;
            }
        } else {
            for (i in arr) {
                if (callback.call(arr[i], i, arr[i]) === false) break;
            }
        }
        return arr;
    }

    iQuery.map = function (arr, callback) {
        var i, rest,
            tmp = [];
        if (arr.length >= 0) {
            for (i = 0; i < arr.length; i++) {
                rest = callback(arr[i], i);
                if (rest != null) {
                    tmp.push(rest);
                }
            }
        } else {
            for (i in arr) {
                rest = callback(arr[i], i);
                if (rest != null) {
                    tmp.push(rest);
                }
            }
        }
        rest = concat.apply([],rest);
        return rest;
    }

    iQuery.select = function (selector) {
        return slice.call(document.querySelectorAll(selector));
    }

    iQuery.fn.extend = iQuery.extend = function (option) {
        for (var k in option) {
            this[k] = option[k];
        }
    }

    iQuery.parseHTML = function (htmlStr) {
        var div = document.createElement("div");
        div.innerHTML = htmlStr;
        return slice.call(div.childNodes);
    }



    this.I = this.iQuery = iQuery;
})(window)