( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {

    }
    else if( typeof module == "object" && module.exports ) {

    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.header.module );
    }
} )( this, function( ac, hm ) {
    
} );