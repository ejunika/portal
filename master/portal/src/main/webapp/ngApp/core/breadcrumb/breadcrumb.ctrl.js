( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "bcm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "bcm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.breadcrumb.module );
    }
} )( this, function( ac, bcm ) {
    bcm.controller( ac.controllers.breadcrumb, [ 
        ac.ngVars.scope, 
        breadcrumbCtrlFn 
    ] );
    function breadcrumbCtrlFn( $scope ) {
        
    }
} );