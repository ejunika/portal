( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "angular" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
        module.exports = fn( require( "ac" ), require( "angular" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac || !cxt.portal.hm ) 
            throw "app-config or header module not found";
        fn( cxt.portal.ac, cxt.angular );
    }
} )( this, function( ac, ng ) {
    return ng.module( ac.modules.header, [] );
} );