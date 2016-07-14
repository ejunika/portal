( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "angular" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.mainMenu.module );
    }
} )( this, function( ac, mmm ) {
    mmm.service( ac.services.mainMenu, [
        mainMenuSrvcFn
    ] );
    function mainMenuSrvcFn() {
        
    }
} );