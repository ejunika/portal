( function() {
    "use strict";
    define( [ "bcm", "ac" ], rcb );
    function rcb( bcm, ac ) {
        bcm.controller( ac.controllers.breadcrumb, [ 
            ac.ngVars.scope, 
            breadcrumbCtrlFn 
        ] );
        function breadcrumbCtrlFn( $scope ) {
            
        }
    }
} )();