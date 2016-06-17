( function() {
    "use strict";
    define( [ "mmm", "ac" ], rcb );
    function rcb( mmm, ac ) {
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
            }
        }
        function compileFn() {
            return linkFn;
        }
        function linkFn() {
            
        }
    }
} )();