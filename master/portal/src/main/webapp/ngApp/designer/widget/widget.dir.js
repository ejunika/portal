( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "wm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.widget.module );
    }
} )( this, function( ac, wm ) {
    wm.directive( ac.directives.widget.name, [
        widgetDirFn
    ] );
    function widgetDirFn() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: ac.directives.widget.tUrl,
            controller: ac.controllers.widget,
            controllerAs: "hvm",
            compile: compileFn
        };
    }
    function compileFn() {
        return linkFn;
    }
    function linkFn() {
        
    }
} );