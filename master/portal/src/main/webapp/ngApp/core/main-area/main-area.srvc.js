( function() {
    "use strict";
    define( [ "mam", "ac" ], rcb );
    function rcb( mam, ac ) {
        mam.service( ac.services.mainArea, [
            mainAreaSrvcFn
        ] );
        function mainAreaSrvcFn() {
            
        }
    }
} )();