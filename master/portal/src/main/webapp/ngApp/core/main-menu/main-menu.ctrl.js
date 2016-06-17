( function() {
    "use strict";
    define( [ "mmm", "ac" ], rcb );
    function rcb( mmm, ac ) {
        mmm.controller( ac.controllers.mainMenu, [ 
            ac.ngVars.scope,
            ac.services.core,
            ac.services.request,
            mainMenuCtrlFn 
        ] );
        function mainMenuCtrlFn( $scope, cs, rs ) {
            $scope.init = function() {
                var filePath = "ngApp/core/main-menu/main-menu.data.json";
                rs.getJson( filePath, scb );
                function scb( jsonData ) {
                    $scope.mainMenuList = jsonData;
                }
            };
            $scope.getMenuToggleClasses = function() {
                return { 
                    "clg-hf-menu": !$scope.fullMainMenu, 
                    "clg-full-menu": $scope.fullMainMenu
                };
            };
            $scope.handleMainMenuClick = function( e, m ) {
                
            };
        }
    }
} )();