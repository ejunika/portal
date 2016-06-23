( function() {
    "use strict";
    define( [ "cm", "ac" ], rcb );
    function rcb( cm, ac ) {
        cm.controller( ac.controllers.core, [ 
            ac.ngVars.scope,
            ac.services.core,
            "$timeout",
            coreCtrl 
        ] );
        function coreCtrl( $scope, cs, $timeout ) {
            $scope.init = function() {
                $scope.cs = cs;
                $scope.fullMainMenu = false;
                $scope.mouseOverCnt = 0;
                cs.cxtMenuPosition = {};
                $scope.selectHelper = {
                    position: "absolute",
                    zIndex: "1000",
                    border: "1px solid #2196f3",
                    background: "rgba(33, 150, 243, 0.1)"
                };
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