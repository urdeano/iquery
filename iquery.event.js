(function(w){
    var iQuery = w.iQuery;
    iQuery.fn.on=function(type,callback){
        return this.each(function(){
            this.addEventListener(type,callback);
        });
    }
    iQuery.fn.off=functio(type,callback){
       return this.each(function(){
            this.removeEventListener(type,callback);
        });
    }
})(window)