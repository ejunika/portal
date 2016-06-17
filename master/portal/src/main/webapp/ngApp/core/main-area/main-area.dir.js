( function() {
    "use strict";
    define( [ "mam", "ac" ], rcb );
    function rcb( mam, ac ) {
        mam.directive( ac.directives.mainArea.name, [
            mainAreaDirFn
        ] );
        function mainAreaDirFn() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: ac.directives.mainArea.tUrl,
                controller: ac.controllers.mainArea,
                controllerAs: "mavm",
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