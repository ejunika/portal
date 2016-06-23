( function() {
    "use strict";
    define( [ "wm", "ac" ], rcb );
    function rcb( wm, ac ) {
        wm.controller( ac.controllers.widget, [ 
            ac.ngVars.scope,
            ac.services.core,
            widgetCtrlFn 
        ] );
        function widgetCtrlFn( $scope, cs ) {
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
                    },
                    stop: function( e, ui ) {
                        var wId = ui.element[ 0 ].id, 
                        dashboard = $scope.getSelectedDashboard(),
                        widget = dashboard.Info.WidgetMap[ wId ];
                        
                        widget.height = ui.size.height + "px";
                        widget.width = ui.size.width + "px";
                        
                        widget.left = widget.left.split( "px" )[ 0 ] * 1 + ui.position.left + "px";
                        widget.top = widget.top.split( "px" )[ 0 ] * 1 + ui.position.top + "px";
                        $scope.$apply();
                    }
                };
                $scope.wDragConfig = {
                    stop: function( e, ui ) {
                        var wId = ui.helper.find( ".widget" )[ 0 ].id, 
                        dashboard = $scope.getSelectedDashboard(),
                        widget = dashboard.Info.WidgetMap[ wId ];
                        
                        widget.left = ui.position.left + "px";
                        widget.top = ui.position.top + "px";
                        $scope.$apply();
                    }
                };
            };
            $scope.onClickWidget = function( e, w ) {
               $scope.handleWidgetSelection( e, w );
            };
            $scope.cxtMenuWidCfg = {
                opnList: [
                    {
                        id: "",
                        label: "Data Set"
                    },
                    {
                        id: "",
                        label: "Scripts"
                    },
                    {
                        divider: true
                    },
                    {
                        id: "",
                        label: "Delete"
                    },
                    {
                        id: "",
                        label: "Properties"
                    }
                ],
                opnClicked: function( e, opn ) {
                    $( ".d-dataset-panel" ).show();
                }
            };
        }
    }
} )();