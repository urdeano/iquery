(function ( window ) {

iQuery.fn.extend({
    css: function ( name, value ) {
        if ( value === undefined ) {
            // 可能传字符串 或 对象 
            if ( typeof name === 'string' ) {
                // 获得样式
                return this[ 0 ].style[ name ] || window.getComputedStyle( this[ 0 ] )[ name ];
            } else {
                return this.each(function () {
                    var that = this;
                    iQuery.each( name, function ( k, v ) {
                        that.style[ k ] = v;
                    });

                });

            }
        } else {
            return this.each(function () {
                this.style[ name ] = value;
            });
        }

    },

    hasClass: function ( className ) {
        // 在 jq 中实际上是判断 this 中的每一个 dom 元素, 只要有一个有 class 对应的就表示 true
        return this.toArray().some( function ( v ) {
            // this 是伪数组, toArray 将其变成真数组, 并且元素是 dom 元素
            // some 方法会尽可能的遍历 每一个 dom 元素, 使得判断 每一个 dom 元素是否符合要求
            // 只要有一个符合要求就返回 true, 而此时的 v 是 每一个待考察的 dom 元素
            return v.className && v.className.split( ' ' ).some( function ( vv ) {
                // 此时 v 是 dom 元素, 查看 是否含有 className 属性, 如果没有直接返回 false
                // 如果有 则 继续将其 split, 得到所有的 类样式的名字
                // 再次调用 some 方法就是在判断类样式名中是否含有与给定样式名同名的数据
                // 如果含有一个 同名的, 则返回 true 结束检查
                // 否则一直检查下去, 将所有的检查完, 还没有找到则返回 false
                return vv == className; 
                // 这里就是在 判断 每一个 dom 元素中的 每一个 class 样式名是否与 给定的 同名

            });
        });
    },
    addClass: function ( className ) {
        return this.each(function () {
            if ( !this.className ) {
                this.className = className;
            } else {
                this.className += ' ' + className;
            }
        });
    },
    removeClass: function ( className ) {
        // 需要考虑循环删除
        return this.each(function () {
            var classNames = this.className && this.className.split( ' ' );

            if ( !classNames ) return;

            // 循环移除
            var index = -1;
            while( ( index = classNames.indexOf( className ) ) != -1 ) {
                classNames.splice( index, 1 );
            }
            
            this.className = classNames.join( ' ' );
        });
    }
});

})( window );