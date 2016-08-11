( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "wpm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.widgetProp.module );
    }
} )( this, function( ac, wpm ) {
    wpm.directive( ac.directives.widgetProp.name, [
        widgetPropDirFn
    ] );
    function widgetPropDirFn() {
        return {
            restrict: "E",
            replace: true,
            scope: true,
            templateUrl: ac.directives.widgetProp.tUrl,
            controller: ac.controllers.widgetProp,
            compile: compileFn
        };
    }
    function compileFn() {
        return linkFn;
    }
    function linkFn() {
        
    }
} );