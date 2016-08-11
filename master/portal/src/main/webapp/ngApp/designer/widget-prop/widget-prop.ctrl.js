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
        fn( cxt.portal.ac, cxt.portal.ac.modules.widgetProp.module );
    }
} )( this, function( ac, wpm ) {
    wpm.controller( ac.controllers.widgetProp, [ 
        ac.ngVars.scope,
        widgetPropCtrlFn 
    ] );
    function widgetPropCtrlFn( $scope ) {
        $scope.init = function() {
            
        };
    }
} );