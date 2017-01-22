(function (w) {
    var iQuery = w.iQuery;
    iQuery.fn.extend({
        appendTo: function (selector) {
            var that = this,
                array = iQuery(selector);

            var arr = array.map(function (v, i) {
                return that.map(function (v1, i1) {
                    var node = i === array.length - 1 
                                    ?v1 
                                    :v1.cloneNode(true);
                    v.appendChild(node);
                    return node;
                });
            })
            arr = [].concat.apply([], arr);
            return this.pushStack(arr);
        },
        append: function (selector) {
            iQuery(selector).appendTo(this);
            return this;
        },

        prependTo:function (selector){
            var that = this,
                array = iQuery(selector);
                that = [].reverse.call(that);//颠倒数组,使最后结果元素正序排列
            var arr = iQuery.map(array, function (v, i) {
                return that.map(function (v1, i1) {
                    var node = i === array.length - 1 
                                    ?v1 
                                    :v1.cloneNode(true);
                    var first = v.firstChild;
                    v.insertBefore(node,first);
                    return node;
                });
            })
            arr = [].concat.apply([], arr);
            return this.pushStack(arr);
        },
        prepend:function (selector){
            iQuery(selector).prependTo(this);
            return this;
        },

        parent:function(){
            // var rest = [];
            // this.each(function (){
            //     rest.push(this.parentNode);
            // });
            // rest = iQuery.unique(rest);

            // return this.pushStack(rest);

            return this.pushStack(iQuery.unique(this.map(function(v){
                return v.parentNode;
            })));
        },

        insertBefore:function(selector){
            var array = iQuery(selector);
            var that = this;
            var arr = array.map(function (v,i){
                return that.map(function(v1,i1){
                    var node = i==array.length-1
                                ?v1
                                :v1.cloneNode(true);
                    v.parentNode.insertBefore(node,v);
                    return node;
                });
            });
            arr = [].concat.apply([],arr);
            return this.pushStack(arr);
        },
        insertAfter:function(selector){
            var array = iQuery(selector),
                that = this;
            var rest = array.map(function(v,i){
                return that.map(function(v1,i1){
                    var node = i==array.length-1
                                ?v1
                                :v1.cloneNode(true);
                    if(v!==v.parentNode.lastChild){
                        v.parentNode.insertBefore(node,v.nextSibling);
                    }else{
                        node.appendTo(v.parentNode);
                    }
                    return node;
                })
            })

            rest = [].concat.apply([],rest);
            return this.pushStack(rest);
        },

        before:function(selector){
            iQuery(selector).insertBefore(this);
            return this;
        },
        after:function(selector){
            iQuery(selector).insertAfter(this);
            return this;
        },

        next: function(){
            /*var rest = [];                    
            rest = this.map(function(v){    1.遍历获得数组所有项的next,返回到一个数组中
                return iQuery.next(v);
            }); 
            rest = iQuery.unique(rest);     2.将返回的数组去重
            return this.pushStack(rest);    3.恢复链结构
            */
            return this.pushStack(iQuery.unique(this.map(function(v){
                return iQuery.next(v);
            })));
        },
        nextAll:function(){
            return this.pushStack(iQuery.unique(this.map(function(v,i){
                return iQuery.nextAll(v);
            })));
        },

        prev:function(){
            // var rest = this.map(function(v,i){
            //     return iQuery.prev(v)
            // });
            // rest= iQuery.unique(rest);
            // return this.pushStack(rest);
            return this.pushStack(iQuery.unique(this.map(function(v,i){
                return iQuery.prev(v)
            })));
        },
        prevAll:function(){
            return this.pushStack(iQuery.unique(this.map(function(v,i){
                return iQuery.prevAll(v);
            })));
        },

        siblings:function(){
            var prevAll =this.map(function(v,i){
                            return iQuery.prevAll(v)
                        });
            var nextAll =this.map(function(v){
                return iQuery.nextAll(v);
            });

            //合并prevAll和nextAll并去重
            var tmp = [];
            tmp = [].concat.call(tmp,prevAll,nextAll);


            return this.pushStack(iQuery.unique(tmp));
        }

    });

    iQuery.extend({
        unique:function(arr){//数组去重,返回一个真数组
            var rest = [];
            for(var i=0;i<arr.length;i++){
                if(rest.indexOf(arr[i])===-1){
                    rest.push(arr[i]);
                }
            }
            return rest;
        },
        next:function(dom){
            var current = dom;
            while(current=current.nextSibling){
                if(current.nodeType==1){
                    break;
                }
            }
            return current;
        },
        nextAll:function(dom){
            var rest = [];
            var current = dom;
            while(current=current.nextSibling){
                if(current.nodeType==1){
                    rest.push(current);
                }
            }
            return rest;
        },
        prev:function(dom){
            var current = dom;
            while(current=current.previousSibling){
                if(current.nodeType==1){
                    break;
                }
            }
            return current;
        },
        prevAll:function(dom){
            var current = dom;
            var rest = [];
            while (current=iQuery.prev(current)) {
                rest.push(current);
            }
            return rest;
        }
    })

})(window)