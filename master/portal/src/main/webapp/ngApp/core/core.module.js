( function( cxt, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "angular", "ac" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
        module.exports = fn();
    }
    else {
        cxt.portal = cxt.portal || {};
        cxt.portal.ac = fn();
    }
} )( this, function( angular, ac ) {
    return angular.module( ac.modules.core, [
         ac.ngPlugins.ngRoute,
         ac.ngPlugins.ngAnimate,
         ac.ngPlugins.uiJquery,
         ac.ngPlugins.njUtil,
         ac.ngPlugins.toaster,
         ac.ngPlugins.cfpHotkeys,
         ac.modules.header,
         ac.modules.breadcrumb,
         ac.modules.mainMenu,
         ac.modules.mainArea,
         ac.modules.designer
     ] )
     .config( [
         ac.ngVars.routeProvider,
         coreConfigFn
     ] );
     function coreConfigFn( $routeProvider ) {
         $routeProvider
             .when( "/designer", {
                 templateUrl: "ngApp/designer/designer.view.html",
                 controller: "designer.ctrl"
             } )
             .otherwise( {
                 redirectTo: "/designer"
             } );
     }
} );