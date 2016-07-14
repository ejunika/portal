( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "angular", "jsfileloader" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "angular" ) );
    }
    else {
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.angular );
    }
} )( this, function( ac, angular ) {
    angular.bootstrap( document, [ ac.modules.core.module.name ] );
} );