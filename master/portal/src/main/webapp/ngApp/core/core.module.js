( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "angular" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn();
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        ctx.portal.ac.modules.core.module = fn( ctx.portal.ac, ctx.angular );
    }
} )( this, function( ac, angular ) {
    return angular.module( ac.modules.core.module.name, [
         ac.ngPlugins.ngRoute,
         ac.ngPlugins.ngAnimate,
         ac.ngPlugins.uiJquery,
         ac.ngPlugins.njUtil,
         ac.ngPlugins.toaster,
         ac.ngPlugins.cfpHotkeys,
         ac.modules.header.module.name,
         ac.modules.breadcrumb.module.name,
         ac.modules.mainMenu.module.name,
         ac.modules.mainArea.module.name,
         ac.modules.designer.module.name
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
             .when( "/fProps", {} )
             .otherwise( {
                 redirectTo: "/designer"
             } );
     }
} );