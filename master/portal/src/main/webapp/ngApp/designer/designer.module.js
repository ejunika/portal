( function( cxt, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "angular" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        cxt.portal.dm = fn( cxt.portal.ac, angular );
    }
} )( this, function( ac, ng ) {
    return ng.module( ac.modules.designer, [
        ac.modules.dashboard
    ] );
} );