( function() {
    "use strict";
    define( [ "wm", "ac" ], rcb );
    function rcb( wm, ac ) {
        wm.directive( ac.directives.widget.name, [
            widgetDirFn
        ] );
        function widgetDirFn() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: ac.directives.widget.tUrl,
                controller: ac.controllers.widget,
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