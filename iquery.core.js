(function ( window ) {


var arr = [],
    push = arr.push,
    slice = arr.slice,
    concat = arr.concat;


var iQuery = function ( selector ) {
    return new iQuery.fn.init( selector );
}

iQuery.fn = iQuery.prototype = {
    constructor: iQuery,
    type: 'iQuery',
    length: 0,
    each: function ( callback ) {
        return iQuery.each( this, callback );
    },
    map: function ( callback ) {
        return iQuery.map( this, callback );
    },
    pushStack: function ( arr ) {
        var o = iQuery( arr );
        o.prevObject = this;
        return o;
    },
    end: function () {
        return this.prevObject || this;    
    },
    toArray: function () {
        return slice.call( this );
    } 
};


// 将所有的方法应该挂载到 iQuery 中
iQuery.select = function ( selector ) {
    return slice.call( document.querySelectorAll( selector ) );
};


// 工具方法 each map
iQuery.each = function ( arr, callback ) {
    var i;
    if ( arr.length >= 0 ) {
        for ( i = 0; i < arr.length; i++ ) {
            if ( callback.call( arr[ i ], i, arr[ i ] ) === false )  break;
        }
    } else {
        for ( i in arr ) {
            if ( callback.call( arr[ i ], i, arr[ i ] ) === false )  break;
        }
    }
    return arr;
};

iQuery.map = function ( arr, callback ) {
    var rest = [], tmp,
        i;
    if ( arr.length >= 0 ) {
        for ( i = 0; i < arr.length; i++ ) {
            tmp = callback( arr[ i ], i );
            if ( tmp != null )  {
                rest.push( tmp );
            }
        }
    } else {
        for ( i in arr ) {
            tmp = callback( arr[ i ], i );
            if ( tmp != null )  {
                rest.push( tmp );
            }
        }
    }
    return concat.apply( [], rest );
};


// 扩展能力
iQuery.extend = iQuery.fn.extend = function ( options ) {
    for ( var k in options ) {
        this[ k ] = options[ k ];
    }
};



window.iQuery = window.I = iQuery;

})( window );