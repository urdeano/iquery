(function ( window ) {

iQuery.fn.extend({
    on: function ( eventName, callback ) {
        return this.each(function () {
            this.addEventListener( eventName, callback );
        });
    },
    off: function ( eventName, callback ) {
        return this.each(function () {
            this.removeEventListener( eventName, callback );
        });
    }
});

// click
// iQuery.fn[ 'click' ] = function ( callback ) {
//     return this.on( 'click', callback );
// };

// mouseover

iQuery.each( ( 'abort,blur,cancel,canplay,canplaythrough,change,click,close,contextmenu,cuechange,' + 
             'dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied, ' + 
             'ended,error,focus,input,invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,' + 
             'loadstart,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,' + 
             'mousewheel,pause,play,playing,progress,ratechange,reset,resize,scroll,seeked,seeking, ' + 
             'select,show,stalled,submit,suspend,timeupdate,toggle,volumechange,waiting,auxclick,' + 
             'pointercancel,pointerdown,pointerenter,pointerleave,pointermove,pointerout,pointerover, ' + 
             'pointerup,beforecopy,beforecut,beforepaste,copy,cut,paste,search,selectstart,wheel, ' + 
             'webkitfullscreenchange,webkitfullscreenerror,gotpointercapture,lostpointercapture' ).split( ',' ), function ( i, v ) {
    iQuery.fn[ v ] = function ( callback ) {
        return this.on( v, callback );
    };
});


iQuery.fn.hover = function ( f1, f2 ) {
    return this.each(function () {
        iQuery( this ).on( 'mouseover', f1 ).on( 'mouseout', f2 );
    })
};


})( window );