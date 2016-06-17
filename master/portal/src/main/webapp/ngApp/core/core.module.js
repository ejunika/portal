( function() {
    "use strict";
    define( [ "angular", "ac" ], rcb );
    function rcb( angular, ac ) {
        return angular.module( ac.modules.core, [] );
    }
} )();