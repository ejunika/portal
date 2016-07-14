( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "mam" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
        
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.mainArea.module );
    }
} )( this, function( ac, mam ) {
    mam.service( ac.services.mainArea, [
        mainAreaSrvcFn
    ] );
    function mainAreaSrvcFn() {
        
    }
} );