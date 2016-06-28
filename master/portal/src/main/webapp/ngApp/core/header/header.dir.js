( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "hm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac || !cxt.portal.hm ) 
            throw "app-config or header module not found";
        fn( cxt.portal.ac, cxt.portal.hm );
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