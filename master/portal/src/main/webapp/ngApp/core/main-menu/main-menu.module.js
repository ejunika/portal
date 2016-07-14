( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "angular" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
        module.exports = fn( require( "ac" ), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        ctx.portal.ac.modules.mainMenu.module = fn( ctx.portal.ac, ctx.angular );
    }
} )( this, function( ac, ng ) {
    "use strict";
    return ng.module( ac.modules.mainMenu.module.name, [] );
} );