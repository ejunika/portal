( function() {
    "use strict";
    define( [ "angular", "ac" ], rcb );
    function rcb( ng, ac ) {
        return ng.module( ac.modules.mainMenu, [] );
    }
} )();