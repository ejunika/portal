( function() {
    "use strict";
    define( [ "dbm", "ac" ], rcb );
    function rcb( dbm, ac ) {
        dbm.controller( ac.controllers.dashboard, [ 
            ac.ngVars.scope,
            "$timeout",
            ac.services.core,
            ac.services.request,
            dashboardCtrlFn 
        ] );
        function dashboardCtrlFn( $scope, $timeout, cs, rs ) {
            $scope.init = function() {
                $scope.dragSelectConfig = {
                    selectHelper: ".selectHelper",
                    start: function( e, ui ) {
                        $( ".dropdown-menu" ).parent().removeClass( "open" );
                    },
                    stop: function( e, ui ) {
                        var sdId = $scope.selectedDashboardId;
                        var $uiWidgests = $( "#" + sdId ).find( ".ui-selected" );
                        $.each( $uiWidgests, function( k, v ) {
                            var wObj = angular.element($(this)).scope().w;
                            $scope.selectWidget( wObj );
                            $scope.$apply();
                        } );
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
                            widget.top = e.clientY - $( e.target ).offset().top - 3 + "px";
                            widget.left = e.clientX - $( e.target ).offset().left - 3 + "px";
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
                }, 0 );
            };
            $scope.createConnection = function( data ) {
                var rawFields = data.splice( 0, 1 ),
                rawRecords = data, 
                connection = {
                    id: cs.getUniqueId(),
                    label: "csv1",
                    type: "csv",
                    sheets: [ {
                        id: cs.getUniqueId(),
                        label: "",
                        fields: [],
                        records: []
                    } ]
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
                $scope.getSelectedDashboard().DataProvider.Offline.connections[ 0 ] = connection;
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
                opnClicked: function( e, opn ) {
                    if( opn.id == "NEW_CONN" ) {
                        $scope.addNewDataProvider();
//                        cs.alert( "info", "Designer", opn.label + " clicked" );
                    }
                },
                opnList: [
                     {
                         id: "NEW_CONN",
                         label: "Create Connection"
                     },
                     {
                         id: "2",
                         divider: true,
                     },
                     {
                         id: "3",
                         label: "Properties"
                     }
                ]
            };
            $scope.getDashboardStyle = function( dashboard ) {
                return {
                    // 'background': 'linear-gradient('+ d.Layout.gredientRotation +'deg,'+d.Layout.gredientColor +')',
                    background: "#ecf0f1",
                    // 'height': d.Layout.height+'px',
                    // 'width': d.Layout.width+'px',
                    height: 'calc( 100% - 5px )',
                    width: 'calc( 100% - 5px )',
                    border: '2px solid #E0E0E0'
                };
            };
            $scope.isSelectedWidget = function( w ) {
                return $scope.selectedWidgetIds.indexOf( w.id ) != -1;
            };
            $scope.selectWidget = function( w ) {
                if( !w.selected ) {
                    $scope.selectedWidgetIds.push( w.id );
                    w.selected = true;
                }
            };
            $scope.deSelectWidget = function( w ) {
                var index = $scope.selectedWidgetIds.indexOf( w.id );
                if( index != -1 ) {
                    $scope.selectedWidgetIds.splice( index, 1 );
                    w.selected = false;
                }
            };
            $scope.selectAllWidget = function() {
                var selectedDashboard = $scope.getSelectedDashboard(),
                widgets = selectedDashboard.Layout.widgets;
                for( var i = 0; i < widgets.length; i++ ) {
                    $scope.selectWidget( widgets[ i ] );
                }
            };
            $scope.deSelectAllWidget = function() {
                var selectedDashboard = $scope.getSelectedDashboard(),
                widgets = selectedDashboard.Layout.widgets;
                for( var i = 0; i < widgets.length; i++ ) {
                    $scope.deSelectWidget( widgets[ i ] );
                }
            };
            $scope.handleWidgetSelection = function( e, w ) {
                var ctrlKey = e ? e.ctrlKey: false;
                if( ctrlKey ) {
                    if( $scope.isSelectedWidget( w ) ) {
                        $scope.deSelectWidget( w );
                    }
                    else {
                        $scope.selectWidget( w );
                    }
                }
                else {
                    var wasSelected = w.selected;
                    $scope.deSelectAllWidget();
                    if( !wasSelected ) {
                        $scope.selectWidget( w );
                    }
                }
            };
        }
    }
} )();
