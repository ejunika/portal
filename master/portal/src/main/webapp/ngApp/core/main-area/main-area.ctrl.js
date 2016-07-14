( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "mam" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
        
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.mainArea.module );
    }
} )( this, function( ac, mam ) {
    mam.controller( ac.controllers.mainArea, [ 
        ac.ngVars.scope, 
        mainAreaCtrlFn 
    ] );
    function mainAreaCtrlFn( $scope ) {
        $scope.init = function() {
          
        };
        $scope.getMainAreaToggleClasses = function() {
            return { 
                "clg-wrapper-full": !$scope.fullMainMenu, 
                "clg-wrapper-hf": $scope.fullMainMenu 
            };
        };
    }
} );