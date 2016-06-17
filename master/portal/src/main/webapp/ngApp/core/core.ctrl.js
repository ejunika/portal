( function() {
    "use strict";
    define( [ "core_module", "ac" ], rcb );
    function rcb( cm, ac ) {
        cm.controller( ac.controllers.core, [ 
            "$scope", 
            coreCtrl 
        ] );
        function coreCtrl( $scope ) {
            $scope.data = "Data";
        }
    }
} )();