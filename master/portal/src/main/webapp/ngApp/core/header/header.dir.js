( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "hm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.header.module );
    }
} )( this, function( ac, hm ) {
    hm.directive( ac.directives.header.name, [
        headerDirFn
    ] );
    function headerDirFn() {
        return {
            restrict: "E",
            replace: true,
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