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
        if( !cxt.portal.ac ) 
            throw "app-config module not found";
        cxt.portal.bcm = fn( cxt.portal.ac, cxt.portal.bcm );
    }
} )( this, function( ac, ng ) {
    return ng.module( ac.modules.breadcrumb, [] );
} );