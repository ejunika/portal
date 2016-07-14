( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "spm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.specialPage.module );
    }
} )( this, function( ac, spm ) {
    "use strict";
    spm.controller( ac.controllers.specialPage, [
        specialPageCtrlFn
    ] );
    function specialPageCtrlFn() {
        
    }
} );