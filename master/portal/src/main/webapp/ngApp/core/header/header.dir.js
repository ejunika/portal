( function() {
    "use strict";
    define( [ "hm", "ac" ], rcb );
    function rcb( hm, ac ) {
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
            }
        }
        function compileFn() {
            return linkFn;
        }
        function linkFn() {
            
        }
    }
} )();