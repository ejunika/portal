( function() {
    "use strict";
    define( [ "dbm", "ac" ], rcb );
    function rcb( dbm, ac ) {
        dbm.directive( ac.directives.dashboard.name, [
            dashboardDirFn
        ] );
        function dashboardDirFn() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: ac.directives.dashboard.tUrl,
                controller: ac.controllers.dashboard,
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