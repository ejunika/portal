( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "wem" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.widgetExp.module );
    }
} )( this, function( ac, wem ) {
    wem.controller( ac.controllers.widgetExp, [ 
        ac.ngVars.scope,
        widgetExpCtrlFn 
    ] );
    function widgetExpCtrlFn( $scope ) {
        $scope.init = function() {
            
        };
    }
} );