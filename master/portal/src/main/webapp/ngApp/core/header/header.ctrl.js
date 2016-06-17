( function() {
    "use strict";
    define( [ "hm", "ac" ], rcb );
    function rcb( hm, ac ) {
        hm.controller( ac.controllers.header, [ 
            ac.ngVars.scope, 
            headerCtrlFn 
        ] );
        function headerCtrlFn( $scope ) {
            $scope.init = function() {
                
            };
        }
    }
} )();