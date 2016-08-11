( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "wem" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.widgetExp.module );
    }
} )( this, function( ac, wem ) {
    wem.directive( ac.directives.widgetExp.name, [
        widgetExpDirFn
    ] );
    function widgetExpDirFn() {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            templateUrl: ac.directives.widgetExp.tUrl,
            controller: ac.controllers.widgetExp,
            compile: compileFn
        };
    }
    function compileFn() {
        return linkFn;
    }
    function linkFn() {
        
    }
} );