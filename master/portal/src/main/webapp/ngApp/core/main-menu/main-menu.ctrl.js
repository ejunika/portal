( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "mmm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.mainMenu.module );
    }
} )( this, function( ac, mmm ) {
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
} );