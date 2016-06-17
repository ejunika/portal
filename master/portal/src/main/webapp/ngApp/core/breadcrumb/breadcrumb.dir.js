( function() {
    "use strict";
    define( [ "bcm", "ac" ], rcb );
    function rcb( bcm, ac ) {
        bcm.directive( ac.directives.breadcrumb.name, [
            breadcrumbDirFn
        ] );
        function breadcrumbDirFn() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: ac.directives.breadcrumb.tUrl,
                controller: ac.controllers.breadcrumb,
                controllerAs: "bcvm",
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