( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "dm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "dm" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.designer.module );
    }    
} )( this, function( ac, dm ) {
    dm.directive( ac.directives.header.name, [
        headerDirFn
    ] );
    function headerDirFn() {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            templateUrl: ac.directives.header.tUrl,
            controller: ac.controllers.header,
            compile: compileFn
        };
    }
    function compileFn() {
        return linkFn;
        }
    function linkFn() {
        
    }
} );