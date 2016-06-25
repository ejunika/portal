( function() {
    "use strict";
    define( [ "angular", "ac" ], rcb );
    function rcb( angular, ac ) {
        return angular.module( ac.modules.core, [
            "ngRoute",
            "ngAnimate",
            "ui.jquery",
            "nj.util",
            "toaster",
            "cfp.hotkeys",
            ac.modules.header,
            ac.modules.breadcrumb,
            ac.modules.mainMenu,
            ac.modules.mainArea,
            ac.modules.designer
        ] )
        .config( [
            ac.ngVars.routeProvider,
            coreConfigFn
        ] );
        function coreConfigFn( $routeProvider ) {
            $routeProvider
                .when( "/designer", {
                    templateUrl: "ngApp/designer/designer.view.html",
                    controller: "designer.ctrl"
                } )
                .otherwise( {
                    redirectTo: "/designer"
                } )
        }
    }
} )();