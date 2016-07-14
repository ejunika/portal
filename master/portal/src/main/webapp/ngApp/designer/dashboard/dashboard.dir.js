( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "dbm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.dashboard.module );
    }
} )( this, function( ac, dbm ) {
    dbm.directive( ac.directives.dashboard.name, [
        dashboardDirFn
        ] );
    function dashboardDirFn() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: ac.directives.dashboard.tUrl,
            controller: ac.controllers.dashboard,
            compile: compileFn
        };
    }
    function compileFn() {
        return linkFn;
    }
    function linkFn() {
        
    }
} );