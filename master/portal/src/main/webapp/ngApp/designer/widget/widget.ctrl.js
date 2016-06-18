( function() {
    "use strict";
    define( [ "wm", "ac" ], rcb );
    function rcb( wm, ac ) {
        wm.controller( ac.controllers.widget, [ 
            ac.ngVars.scope, 
            widgetCtrlFn 
        ] );
        function widgetCtrlFn( $scope ) {
            $scope.init = function() {
                $scope.widgetResizeConfig = {
                    handles: { 
                        n: ".r-handle-n", 
                        e: ".r-handle-e", 
                        s: ".r-handle-s", 
                        w: ".r-handle-w", 
                        ne: ".r-handle-ne", 
                        se: ".r-handle-se", 
                        sw: ".r-handle-sw", 
                        nw: ".r-handle-nw" 
                    }
                };
            };
            $scope.onClickWidget = function( e, w ) {
               $scope.handleWidgetSelection( e, w );
            };
        }
    }
} )();