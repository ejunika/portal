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
                        e.stopPropagation();
                        var wId = ui.element.find( ".widget" )[ 0 ].id, 
                        dashboard = $scope.getSelectedDashboard(),
                        widget = dashboard.Info.WidgetMap[ wId ],
                        canvasObj = dashboard.Info.ObjMap[ wId ];
                        
                        widget.height = ui.size.height + "px";
                        widget.width = ui.size.width + "px";
                        
                        widget.left = ui.position.left + "px";
                        widget.top = ui.position.top + "px";
                        $scope.$apply();
                        
                        canvasObj.render();
                    }
                };
                $scope.wDragConfig = {
                    stop: function( e, ui ) {
                        e.stopPropagation();
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
                        id: "ALIGN_TOP",
                        label: "Align Top"
                    },
                    {
                        id: "ALIGN_RIGHT",
                        label: "Align Right"
                    },
                    {
                        id: "ALIGN_BOTTOM",
                        label: "Align Bottom"
                    },
                    {
                        id: "ALIGN_LEFT",
                        label: "Align Left"
                    },
                    {
                        divider: true
                    },
                    {
                        id: "EQUAL_HEIGHT",
                        label: "Equal Height"
                    },
                    {
                        id: "EQUAL_WIDTH",
                        label: "Equal Width"
                    },
                    {
                        divider: true
                    },
                    {
                        id: "EQUAL_DISTANCE_H",
                        label: "Equal Distance(H)"
                    }
                ],
                opnClicked: function( e, opn ) {
//                    $( ".d-dataset-panel" ).show();
                    switch( opn.id ) {
                        case "ALIGN_LEFT":
                            $scope.alignLeft();
                            break;
                        case "ALIGN_TOP":
                            $scope.alignTop();
                            break;
                        case "ALIGN_RIGHT":
                            $scope.alignRight();
                            break;
                        case "ALIGN_BOTTOM":
                            $scope.alignBottom();
                            break;
                        case "EQUAL_HEIGHT":
                            $scope.equalHeight();
                            break;
                        case "EQUAL_WIDTH":
                            $scope.equalWidth();
                            break;
                        case "EQUAL_DISTANCE_H":
                            $scope.equalDisanceH();
                            break;
                        default:
                            break;
                    }
                }
            };
        }
    }
} )();