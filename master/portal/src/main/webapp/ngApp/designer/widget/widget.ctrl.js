( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "wm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.widget.module );
    }
} )( this, function( ac, wm ) {
    wm.controller( ac.controllers.widget, [ 
        ac.ngVars.scope,
        ac.ngVars.timeout,
        ac.services.core,
        widgetCtrlFn 
    ] );
    function widgetCtrlFn( $scope, $timeout, cs ) {
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
                    start: function( e, ui ) {
                        $timeout( function() {
                            $scope.preventClick = true;
                        }, 0 );
                    },
                    stop: function( e, ui ) {
                        e.stopPropagation();
                        $timeout( function() {
                            var wId = ui.element.find( ".widget" )[ 0 ].id, 
                            dashboard = $scope.getSelectedDashboard(),
                            widget = dashboard.Info.WidgetMap[ wId ],
                            canvasObj = dashboard.Info.ObjMap[ wId ];
                            
                            widget.height = ui.size.height;
                            widget.width = ui.size.width;
                            
                            widget.left = ui.position.left;
                            widget.top = ui.position.top;
                            $scope.preventClick = false;
                            canvasObj.render();
                        }, 0 );
                    }
            };
            $scope.wDragConfig = {
                    containment: "parent",
                    start: function( e, ui ) {
                        $timeout( function() {
                            $scope.preventClick = true;
                        }, 0 );
                    },
                    stop: function( e, ui ) {
                        $timeout( function() {
                            var wId = ui.helper.find( ".widget" )[ 0 ].id, 
                            dashboard = $scope.getSelectedDashboard(),
                            widget = dashboard.Info.WidgetMap[ wId ];
                            widget.left = ui.position.left;
                            widget.top = ui.position.top;
                            $scope.preventClick = false;
                        }, 0 );
                    }
            };
        };
        $scope.onClickWidget = function( e, w ) {
            $scope.handleWidgetSelection( e, w );
        };
        $scope.getWidgetContainerStyle = function( w ) {
            return {
                top: w.top + 'px', 
                left: w.left + 'px', 
                height: w.height + 'px', 
                width: w.width + 'px'
            };
        };
        $scope.cxtMenuWidCfg = {
                setOptionList: function( e ) {
                    var opnList = [], widget;
                    if( $scope.getSelectedWidgetsFromSelectedDashboard().length > 1 ) {
                        opnList = [
                                   { id: "ALIGN_TOP", label: "Align Top" },
                                   { id: "ALIGN_RIGHT", label: "Align Right" },
                                   { id: "ALIGN_BOTTOM", label: "Align Bottom" },
                                   { id: "ALIGN_LEFT", label: "Align Left" },
                                   { divider: true },
                                   { id: "EQUAL_HEIGHT", label: "Equal Height" },
                                   { id: "EQUAL_WIDTH", label: "Equal Width" },
                                   { divider: true },
                                   { id: "EQUAL_DISTANCE_H", label: "Equal Distance(H)" },
                                   { id: "EQUAL_DISTANCE_V", label: "Equal Distance(V)" },
                                   { id: "CENTER_H", label: "Center(H)" },
                                   { id: "CENTER_V", label: "Center(V)" },
                                   { divider: true },
                                   { id: "DELETE", label: "Delete" }
                                   ];
                    }
                    else {
                        $scope.deSelectAllWidget();
                        widget = angular.element( e.target.closest( ".widget" ) ).scope().w;
                        $scope.selectWidget( widget );
                        opnList = [
                                   { id: "PROPERTIES", label: "Properties" },
                                   { divider: true },
                                   { id: "DATA_SET", label: "Data Set" },
                                   { id: "SCRIPTS", label: "Scripts" },
                                   { divider: true },
                                   { id: "DELETE", label: "Delete" }
                                   ];
                    }
                    return opnList;
                },
                opnClicked: function( e, opn ) {
                    switch( opn.id ) {
                        case "ALIGN_LEFT": $scope.alignLeft(); break;
                        case "ALIGN_TOP": $scope.alignTop(); break;
                        case "ALIGN_RIGHT": $scope.alignRight(); break;
                        case "ALIGN_BOTTOM": $scope.alignBottom(); break;
                        case "EQUAL_HEIGHT": $scope.equalHeight(); break;
                        case "EQUAL_WIDTH": $scope.equalWidth(); break;
                        case "EQUAL_DISTANCE_H": $scope.equalDisanceH(); break;
                        case "CENTER_H": $scope.alignCenterH(); break;
                        case "CENTER_V": $scope.alignCenterV(); break;
                        case "DELETE": $scope.removeAllSelectedWidgets(); break;
                        case "DATA_SET": $scope.openDatasetBuilder(); break;
                        case "PROPERTIES": $scope.showProperties( "WIDGET" ); break;
                        default: break;
                    }
                }
        };
    }
} );