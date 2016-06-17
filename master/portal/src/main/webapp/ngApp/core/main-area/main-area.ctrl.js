( function() {
    "use strict";
    define( [ "mam", "ac" ], rcb );
    function rcb( mam, ac ) {
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
    }
} )();