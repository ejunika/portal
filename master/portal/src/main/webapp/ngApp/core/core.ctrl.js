( function() {
    "use strict";
    define( [ "cm", "ac" ], rcb );
    function rcb( cm, ac ) {
        cm.controller( ac.controllers.core, [ 
            ac.ngVars.scope,
            "$timeout",
            coreCtrl 
        ] );
        function coreCtrl( $scope, $timeout ) {
            $scope.init = function() {
                $scope.fullMainMenu = false;
                $scope.mouseOverCnt = 0;
            };
            $scope.toggleMainMenu = function( e, full ) {
                if( full ) {
                    $scope.mouseOverCnt++;
                    if( $scope.mouseOverCnt == 2 ) {
                        $scope.fullMainMenu = true;
                        $scope.mouseOverCnt = 0;
                    }
                }
                else {
                    $scope.fullMainMenu = false; 
                }
//                $scope.fullMainMenu = !$scope.fullMainMenu;
            }
        }
    }
} )();