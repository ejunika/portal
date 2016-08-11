( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "dsm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.dataSet.module );
    }
} )( this, function( ac, dsm ) {
    dsm.controller( ac.controllers.dataSet, [ 
        ac.ngVars.scope,
        dataSetCtrlFn 
    ] );
    function dataSetCtrlFn( $scope ) {
        $scope.init = function() {
            
        };
    }
} );