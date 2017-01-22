(function ( window ) {

var arr = [],
    concat = arr.concat,
    push = arr.push;


// 静态方法, 作为工具使用
iQuery.extend({
    prependChild: function ( parent, node ) {
        // 将 node 追加到 parent 子元素的最前面
        if ( parent.childNodes.length === 0 ) {
            // 没有子元素, 直接追加
            parent.appendChild( node );
        } else {
            parent.insertBefore( node, parent.firstChild );
        }
    },
    appendChild: function ( parent, node ) {
        parent.appendChild( node );
    },
    insertBefore: function ( nodeExt, node ) {
        nodeExt.parentNode.insertBefore( node, nodeExt );
    },
    insertAfter: function ( nodeExt, node ) {   
        // 首先看看 nodeExt 是不是一个已经在最后的元素, 如果是 直接 appendChild
        // 否则找下一个追加到前面
        var parent = nodeExt.parentNode;
        if ( parent.lastChild == nodeExt ) {
            parent.appendChild( node );
        } else {
            parent.insertBefore( node, nodeExt.nextSibling );
        }
    }
});


// // 重构
// 'appendTo',
// 'prependTo',
// 'insertBefore',
// 'insertAfter'

// // 可取的方法是
// 'appendChild',
// 'prependChild',
// 'insertBefore',
// 'insertAfter'

// function ( selector ) {
//     ... 
//     iQuery.XXX( v, docFrag );
//     ...
// }

// 转化
// 给 iQuery.fn, 增加 'appendTo' 方法 用 'appendChild' 实现

// iQuery.fn.xxx = function () ...

iQuery.each( {
    'appendTo':     'appendChild',
    'prependTo':    'prependChild',
    'insertBefore': 'insertBefore',
    'insertAfter':  'insertAfter' 
}, function ( methodName, toolMethodName ) {
    // 此时的 k 是需要增加的 方法名, 此时的 v 是实际使用的 工具方法 名
    iQuery.fn[ methodName ] = function ( selector ) {
        var that = this,
            array = iQuery( selector );

        var arr = iQuery.map( array, function ( v, i ) {
            var docfrag = document.createDocumentFragment(),
                tmpArr = that.map( function ( v1, i1 ) {
                    var node =  i === array.length - 1 
                                ? v1 
                                : v1.cloneNode( true );  
                    
                    // iQuery.prependChild( v, node );
                    iQuery.appendChild( docfrag, node );
                    return node;
                });

            iQuery[ toolMethodName ]( v, docfrag );

            return tmpArr;
        });
        
        return this.pushStack( arr );
    } 
} );















// 元素的追加与插入
iQuery.fn.extend({
    append: function ( selector ) {
        iQuery( selector ).appendTo( this );
        return this;
    },
    prepend: function ( selector ) {
        iQuery( selector ).prependTo( this );
        return this;
    },
    before: function ( selector ) {
        iQuery( selector ).insertBefore( this );
        return this;
    },
    after: function ( selector ) {
        iQuery( selector ).insertAfter( this );
        return this;
    }  
});










// 亲属节点访问
// 工具方法
iQuery.extend({
    unique: function ( array ) {
        var arr = [];
        iQuery.each( array, function () {
            if ( arr.indexOf( this ) == -1 ) {
                arr.push( this );
            }
        });
        return arr;
    },

    next: function ( dom ) {
        var current = dom;
        while( current = current.nextSibling ) {
            if ( current.nodeType == 1 ) {
                break;
            }
        }
        return current;
    },
    nextAll: function ( dom ) {
        var arr = [],
            current = dom;
        while( current = current.nextSibling ) {
            if ( current.nodeType == 1 ) {
                arr.push( current );
            }
        }

        return arr;
    },
    
    
    prev: function ( dom ) {
        var current = dom;
        while( current = current.previousSibling ) {
            if ( current.nodeType == 1 ) {
                break;
            }
        }
        return current;
    },
    prevAll: function ( dom ) {
        var arr = [],
            current = dom;
            
        while ( current = iQuery.prev( current )) {
            arr.push( current );
        }

        return arr;
    }
});


iQuery.fn.extend({
    parent: function ( ) {
        // 不考虑过滤元素的功能

        return this.pushStack( iQuery.unique( this.map(function ( v, i ) {
            return v.parentNode;
        }) ) );
    },
    next: function () {
        return this.pushStack( iQuery.unique( this.map(function ( v ) {
            return iQuery.next( v );
        })) );
    },
    nextAll: function () {
        return this.pushStack( iQuery.unique( this.map(function ( v ) {
            return iQuery.nextAll( v );
        })) );
    },
    prev: function () {
        return this.pushStack( iQuery.unique( this.map( function ( v ) {
            return iQuery.prev( v );
        }) ) );
    },
    prevAll: function () {
        return this.pushStack( iQuery.unique( this.map( function ( v ) {
            return iQuery.prevAll( v );
        }) ) );
    },
    siblings: function () {
        var t1 = this.prevAll().toArray(),
            t2 = this.nextAll().toArray();
        push.apply( t1, t2 );
        // concat.apply( t1, t2 )

        return this.pushStack( t1 );
    }


});


















})( window );