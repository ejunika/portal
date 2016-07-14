( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "cm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "cm" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.core.module );
    }
} )( this, function( ac, cm ) {
    cm.controller( ac.controllers.core, [ 
         ac.ngVars.scope,
         ac.services.core,
         ac.ngVars.timeout,
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
         };
     }
} );