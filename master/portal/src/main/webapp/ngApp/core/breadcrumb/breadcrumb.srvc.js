( function() {
    "use strict";
    define( [ "bcm", "ac" ], rcb );
    function rcb( bcm, ac ) {
        bcm.service( ac.services.breadcrumb, [
            breadcrumbSrvcFn
        ] );
        function breadcrumbSrvcFn() {
            
        }
    }
} )();