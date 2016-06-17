( function() {
    "use strict";
    define( [ "angular", "ac", "jsfileloader" ], rcb );
    function rcb( angular, ac ) {
        angular.bootstrap( document, [ ac.modules.core ] );
    }
} )();