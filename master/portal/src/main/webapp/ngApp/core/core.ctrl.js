( function() {
    "use strict";
    define( [ "cm", "ac" ], rcb );
    function rcb( cm, ac ) {
        cm.controller( ac.controllers.core, [ 
            ac.ngVars.scope,
            coreCtrl 
        ] );
        function coreCtrl( $scope ) {
            $scope.init = function() {
                $scope.fullMainMenu = false;
            };
            $scope.toggleMainMenu = function( e ) {
                $scope.fullMainMenu = !$scope.fullMainMenu;
            }
        }
    }
} )();