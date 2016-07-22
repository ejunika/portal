( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "dbm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.dashboard.module );
    }
} )( this, function( ac, dbm ) {
    dbm.controller( ac.controllers.dashboard, [ 
        ac.ngVars.scope,
        ac.ngVars.timeout,
        ac.services.core,
        ac.services.request,
        dashboardCtrlFn 
    ] );
    function dashboardCtrlFn( $scope, $timeout, cs, rs ) {
        $scope.init = function() {
            $scope.aboutToSelectList = [];
            $scope.dragSelectConfig = {
                    selectHelper: ".selectHelper",
                    start: function( e, ui ) {
                        $scope.dragging = true;
                        $( ".dropdown-menu" ).parent().removeClass( "open" );
                        $timeout( function() {
                            $scope.deSelectAllWidget();
                        }, 0 );
                    },
                    selecting: function( e, ui ) {
                        $scope.aboutToSelectList.push( ui.selecting.id );
                    },
                    unselecting: function( e, ui ) {
                        var id = ui.unselecting.id, index = $scope.aboutToSelectList.indexOf( id );
                        $scope.aboutToSelectList.splice( index, 1 );
                    },
                    stop: function( e, ui ) {
                        var widget, wId;
                        $timeout( function() {
                            $scope.deSelectAllWidget();
                            for( var i = 0; i < $scope.aboutToSelectList.length; i++ ) {
                                wId = $scope.aboutToSelectList[ i ];
                                widget = $scope.getSelectedDashboard().Info.WidgetMap[ wId ];
                                $scope.selectWidget( widget );
                            }
                        }, 0 );
                    },
                    filter: ".widget"
            };
            $scope.dashboardDropConfig = {
                    accept: ".d-w-list-item",
                    drop: function( e, ui ) {
                        rs.getJson( "ngApp/designer/widget/widget.data.json", scb );
                        function scb( jsonData ) {
                            var dragData = ui.draggable.data("dragData"),
                            widget = jsonData;
                            widget.id = cs.getUniqueId();
                            widget.wName = dragData.label;
                            widget.cjsObjName = dragData.cjsObjName;
                            widget.selected = true;
                            widget.top = e.clientY - $( e.target ).offset().top - 3;
                            widget.left = e.clientX - $( e.target ).offset().left - 3;
                            $scope.addWidget( widget, true );
                        }
                    }
            };
        };
        $scope.initWidget = function( widget ) {
            var dashboard = $scope.getSelectedDashboard();
            $timeout( function() {
                dashboard.Info.ObjMap = dashboard.Info.ObjMap || {};
                dashboard.Info.WidgetMap = dashboard.Info.WidgetMap || {};
                dashboard.Info.WidgetMap[ widget.id ] = widget;
                dashboard.Info.ObjMap[ widget.id ] = new CanvasJS.Chart( "CC_" + widget.id );
                dashboard.Info.ObjMap[ widget.id ].options = widget.Options;
                dashboard.Info.ObjMap[ widget.id ].render();
            }, 300, true, dashboard );
        };
//      TODO  CONNECTIONS need to improve
        $scope.createConnection = function( data ) {
            var rawFields = data.splice( 0, 1 ),
            rawRecords = data, 
            connection = {
                id: cs.getUniqueId(),
                label: "CSV-DP-" + ( $scope.getSelectedDashboard().DataProvider.Offline.connections.length + 1 ),
                type: "csv",
                sheets: [ { id: cs.getUniqueId(), label: "CSV", fields: [], records: [] } ]
            }, field, record;
            for( var fCnt = 0; fCnt < rawFields[ 0 ].length; fCnt++ ) {
                field = {
                        id: cs.getUniqueId(),
                        label: rawFields[ 0 ][ fCnt ]
                };
                connection.sheets[ 0 ].fields.push( field );
            }
            for( var row = 0; row < rawRecords.length; row++ ) {
                record = {};
                for( var col = 0; col < rawRecords[ row ].length; col++ ) {
                    record[ connection.sheets[ 0 ].fields[ col ].id ] = rawRecords[ row ][ col ];
                }
                connection.sheets[ 0 ].records.push( record );
            }
//          TODO  duplicate condition check should implement
            $timeout( function( connection ) {
                $scope.getSelectedDashboard().DataProvider.Offline.connections.push( connection );
                cs.alert( "success", "Designer", connection.label + " created" );
            }, 0, true, connection );
        };
        $scope.addNewDataProvider = function() {
            $("<input type='file' accept='.csv'>")
            .on( "change", function( e ) {
                var f = e.target.files[ 0 ];
                Papa.parse( f, {
                    delimiter: ",",
                    newline: "",
                    header: false,
                    dynamicTyping: false,
                    preview: 0,
                    encoding: "",
                    worker: false,
                    comments: false,
                    step: undefined,
                    complete: function( result ) {
                        $scope.createConnection( result.data );
                    },
                    error: undefined,
                    download: false,
                    skipEmptyLines: false,
                    chunk: undefined,
                    fastMode: undefined,
                    beforeFirstChunk: undefined,
                    withCredentials: undefined
                } );
            } ).trigger( "click" );
        };
        $scope.cxtMenuCfg = {
                setOptionList: function( e ) {
                    return [
                            { id: "PREVIEW", label: "Preview" },
                            { divider: true },
                            { id: "DATA_SOURCE", label: "Data Provider" },
                            { id: "WIDGET_EXP", label: "Widgets Explorer" },
                            { id: "WIDGET_BROWSER", label: "Widget Browser" },
                            { divider: true },
                            { id: "COPY", label: "Copy" },
                            { id: "PASTE", label: "Paste" },
                            { id: "SELECT_ALL", label: "Select All" },
                            { divider: true },
                            { id: "PROPS", label: "Properties" },
                            { id: "CLOSE", label: "Close" }
                            ];
                },
                opnClicked: function( e, opn ) {
                    switch( opn.id ) {
                        case "PREVIEW": break;
                        case "DATA_SOURCE": $scope.addNewDataProvider(); break;
                        case "WIDGET_EXP":  $scope.showWidgetExp(); break;
                        case "WIDGET_BROWSER": break;
                        case "COPY": break;
                        case "PASTE": break;
                        case "SELECT_ALL": break;
                        case "PROPS": break;
                        case "CLOSE": break;
                        case "DELETE": break;
                        default: break;
                    }
                }
        };
        $scope.getDashboardSize = function() {
            var dashboard = $scope.getSelectedDashboard(), size;
            if( dashboard ) {
                size = {
                    height: dashboard.Layout.height,
                    width: dashboard.Layout.width
                };
            }
            return size;
        };
        $scope.getDashboardStyle = function( dashboard ) {
            return {
                // 'background': 'linear-gradient('+ d.Layout.gredientRotation +'deg,'+d.Layout.gredientColor +')',
                background: "#ecf0f1",
                height: '100%',
                width: '100%',
                border: '2px solid #E0E0E0'
            };
        };
    }
} );
