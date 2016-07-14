( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "hm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.header.module );
    }
} )( this, function( ac, hm ) {
    hm.controller( ac.controllers.header, [ 
        ac.ngVars.scope,
        headerCtrlFn 
    ] );
    function headerCtrlFn( $scope ) {
        $scope.init = function() {
            
        };
    }
} );