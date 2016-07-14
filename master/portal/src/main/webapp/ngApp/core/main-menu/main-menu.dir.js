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
    mmm.directive( ac.directives.mainMenu.name, [
        mainMenuDirFn
    ] );
    function mainMenuDirFn() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: ac.directives.mainMenu.tUrl,
            controller: ac.controllers.mainMenu,
            controllerAs: "mmvm",
            compile: compileFn
        };
    }
    function compileFn() {
        return linkFn;
    }
    function linkFn() {
        
    }
} );