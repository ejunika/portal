( function() {
    "use strict";
    define( [ "dm", "ac" ], rcb );
    function rcb( dm, ac ) {
        dm.controller( ac.controllers.designer, [ 
            ac.ngVars.scope,
            "$timeout",
            ac.services.core,
            ac.services.request,
            designerCtrlFn 
        ] );
        function designerCtrlFn( $scope, $timeout, cs, rs ) {
            $scope.init = function() {
                $scope.openTabs = [];
                $scope.openDashboardIds = [];
                $scope.selectedWidgetIds = [];
                $scope.selectedDashboardId = "";
                $scope.dashboardMap = {};
                $scope.tabMap = {};
                $scope.wExpGrLastClicked = {};
                $scope.wExpItemDragCfg = {
                    helper: "clone",
                    appendTo: "body"
                };
                rs.getJson( "ngApp/designer/widget-exp/widget-exp.data.json", function( jsonData) {
                    $scope.widgetExpGroups = jsonData.groups;
                    $timeout( function() {
                        angular.element( $(".d-w-group-wrapper .active") ).click();
                    }, 0 );
                } );
            };
//            commonly used utility functions
            $scope.getDashboard = function( dbId ) {
                return $scope.dashboardMap[ dbId ];
            };
            $scope.getSelectedDashboard = function() {
                return $scope.dashboardMap[ $scope.selectedDashboardId ];
            };
            $scope.getWidgetsOfSelectedDashboard = function() {
                return $scope.getSelectedDashboard().Layout.widgets;
            };
            $scope.isDashboardOpen = function( dbId ) {
                return $scope.dashboardMap.hasOwnProperty( dbId );
            };
            
//            WIDGET EXPLORER
            $scope.listWidget = function( e, g ) {
                $scope.widgetList = g.widgets;
            };
            $scope.movePointer = function( e, g ) {
                var left = $( e.target ).closest( "li" ).position().left + 5;
                $( ".pointer" ).css( "left", left );
            };
            $scope.groupClicked = function( e, g ) {
                $scope.wExpGrLastClicked.active = false;
                g.active = true;
                $scope.wExpGrLastClicked = g;
                $scope.listWidget( e, g );
                $scope.movePointer( e, g );
            };
            $scope.saveDashboard = function( e ) {
                cs.alert( "error", "Designer", "Service Error!!" );
            };
            $scope.previewDashboard = function( e ) {
                cs.alert( "info", "Designer", "Preview enabled!!" );
            };
            $scope.toggleRightPane = function( e ) {
                var 
                $rightPane = $( ".d-right-pane" ),
                $dashboardWrapper = $( ".d-dashboard-wrapper" );
                
                if( $rightPane.hasClass( "d-right-pane-hide" ) ) {
                    $rightPane.removeClass( "d-right-pane-hide" );
                    $dashboardWrapper.removeClass( "d-dashboard-wrapper-full" );
                }
                else {
                    $rightPane.addClass( "d-right-pane-hide" );
                    $dashboardWrapper.addClass( "d-dashboard-wrapper-full" );
                }
            };
            $scope.notify = function( type, obj ) {
                switch( type ) {
                    case "ADD_DASHBOARD":
                        $scope.openDashboardIds.push( obj.id );
                        $scope.dashboardMap[ obj.id ] = obj;
                        $timeout( function() {
                            $('a[data-toggle="tab"]')
                                .off('shown.bs.tab')
                                .on('shown.bs.tab', function (e) {
                                    var dbId = $(e.target)[ 0 ].id.split( "_" )[ 1 ];
                                    $scope.selectedDashboardId = dbId;
                                });
                            $( "#TAB_" + obj.id ).click();
                            cs.alert( "success", "Designer", obj.Layout.title + " Added" );
                        }, 0 );
                        break;
                    case "REMOVE_DASHBOARD":
                        var indexInOpenDashboardIds = $scope.openDashboardIds.indexOf( obj.id );
                        $scope.openDashboardIds.splice( indexInOpenDashboardIds, 1 );
                        delete $scope.dashboardMap[ obj.id ];
                        if( $scope.openDashboardIds.length > indexInOpenDashboardIds ) {
                            $scope.selectedDashboardId = $scope.openDashboardIds[ indexInOpenDashboardIds ];
                        }
                        else {
                            $scope.selectedDashboardId = $scope.openDashboardIds[ $scope.openDashboardIds.length - 1 ];
                        }
                        $timeout( function() {
                            $( "#TAB_" + $scope.selectedDashboardId ).click();
                            cs.alert( "info", "Designer", obj.Layout.title + " Removed" );
                        }, 0 );
                        break;
                    case "OPEN_OTHER_TAB":
                        $timeout( function() {
                            $( "#TAB_" + obj.id ).click();
                            cs.alert( "info", "Designer", obj.title + " Mode" );
                        }, 0 );
                        break;
                    case "REMOVE_SPECIAL_TAB":
                        $scope.isto = false;
                        break;
                    default:
                        break;
                }
            };
            $scope.addDashboard = function( tab ) {
                var filePath = "ngApp/designer/dashboard/dashboard.data.json";
                rs.getJson( filePath, scb );
                function scb( dashboard ) {
                    dashboard.id = tab.id;
                    dashboard.Layout.height = 2200;
                    dashboard.Layout.width = 2200;
                    dashboard.Layout.title = tab.title;
                    dashboard.Layout.gredientColor = "#0000";
                    dashboard.Layout.gredientRotation = "90";
                    $scope.notify( "ADD_DASHBOARD", dashboard );
                }
            };
            $scope.openTab = function( e, type ) {
                var tab = {};
                if( type == "DASHBOARD" && $scope.openDashboardIds.length < 4 ) {
                    tab = {
                        type: 0,
                        id: cs.getUniqueId(),
                        title: "Untitled_" + $scope.openTabs.length
                    };
                    $scope.openTabs.push( tab );
                    $scope.addDashboard( tab );
                }
                else {
                    switch( type ) {
                        case "MANAGE":
                            tab = {
                                type: 1,
                                id: cs.getUniqueId(),
                                title: "Manage"
                            };
                            break;
                        case "SETTINGS":
                            tab = {
                                type: 1,
                                id: cs.getUniqueId(),
                                title: "Settings"
                            };
                            break;
                        default:
                            break;
                    }
                    if( $scope.isto && $scope.openTabs[ 0 ].type != 0 ) {
                        $scope.openTabs.splice( 0, 1 );
                    }
                    cs.insertAt( $scope.openTabs, tab, 0 );
                    $scope.isto = true;
                    $scope.loadSpecialPage( tab );
                    $scope.notify( "OPEN_OTHER_TAB", tab );
//                  TODO Load special page as tab content
//                  NOTE only one special page can be load at a time, write logic for it.
                }
            };
            $scope.loadSpecialPage = function( tab ) {
                
            };
            $scope.closeTab = function( e, tab ) {
                var indexInOpenTabs = $scope.openTabs.indexOf( tab ),
                dashboard = $scope.dashboardMap[ tab.id ];
                if( indexInOpenTabs != -1 ) {
                    $scope.openTabs.splice( indexInOpenTabs, 1 );
                    if( tab.type != 1 ) {
                        $scope.notify( "REMOVE_DASHBOARD", dashboard );
                    }
                    else {
                        $scope.notify( "REMOVE_SPECIAL_TAB", tab );
                    }
                }
            };
            $scope.openSettings = function( e ) {
                
            };
            $scope.updateOptions = function( widget ) {
                widget.Options.data[ 0 ].type = widget.cjsObjName;
            };
            $scope.addWidget = function( widget, isNew ) {
                rs.getJson( "ngApp/designer/widget/column-chart.data.json", scb );
                function scb( jsonData ) {
                    widget.Options = jsonData;
                    $scope.updateOptions( widget );
                    if( isNew ) {
                        $scope.getWidgetsOfSelectedDashboard().push( widget );
                        $timeout( function() {
                            cs.alert( "success", "Designer", widget.wName + " Added" );
                        } );
                    }
                    if( widget.selected ) {
                        $scope.selectedWidgetIds.push( widget.id );
                    }
                }
            };
            $scope.openDashboard = function( dashboard ) {
                if( $scope.isDashboardOpen( dashboard.id ) ) {
                    $timeout( function() {
                        cs.alert( "error", "Designer", "Dashboard is already opened" );
                        $( "#TAB_" + dashboard.id ).click();
                    }, 0 );
                    return false;
                };
                var tab = {
                    type: 0,
                    id: dashboard.id,
                    title: dashboard.Layout.title
                };
                $scope.$apply( function() {
                    var widgets = dashboard.Layout.widgets;
                    $scope.openTabs.push( tab );
                    $scope.openDashboardIds.push( dashboard.id );
                    $scope.dashboardMap[ dashboard.id ] = dashboard;
                    $scope.selectedDashboardId = dashboard.id;
                    for( var i = 0; i < widgets.length; i++ ) {
                        $scope.addWidget( widgets[ i ] );
                    }
                } );
                $timeout( function() {
                    $('a[data-toggle="tab"]')
                        .off('shown.bs.tab')
                        .on('shown.bs.tab', function (e) {
                            var dbId = $(e.target)[ 0 ].id.split( "_" )[ 1 ];
                            $scope.selectedDashboardId = dbId;
                        });
                    $( "#TAB_" + dashboard.id ).click();
                    cs.alert( "success", "Designer", dashboard.Layout.title + " has been loaded" );
                }, 0 );
            };
            $scope.openFromLocal = function( e ) {
                $("<input type='file' accept='.njd'>")
                .on( "change", onChangeFileBrowser )
                .trigger( "click" );
                function onChangeFileBrowser( e ) {
                    var f = e.target.files[ 0 ],
                    fileReader = new FileReader();
                    fileReader.onload = onFileReadSuccess;
                    fileReader.readAsText( f );
                    function onFileReadSuccess( result ) {
                        var dashboard = angular.fromJson(result.currentTarget.result);
                        $scope.openDashboard( dashboard );
                    }
                }
            };
            $scope.exportToLocalDisk = function( e, dbId ) {
                var data = angular.copy( $scope.getSelectedDashboard() ), 
                widgets = data.Layout.widgets,
                fileName = data.Layout.title + ".njd",
                dataToExport, enData, downloadLink, blob;
                delete data.Info.ObjMap;
                delete data.Info.WidgetMap;
                for( var i = 0; i < widgets.length; i++ ) {
                    delete widgets[ i ].Options;
                }
                dataToExport = angular.toJson( data ); 
                /*Check for IE*/
                if( /*@cc_on!@*/ false || !!document.documentMode ) {
                    blob = new Blob( [ dataToExport ] );
                    navigator.msSaveBlob( blob, fileName );
                }
                /*Check for  SAFARI */
                else if( Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 ) {
                    enData = "data:application/...," + encodeURIComponent( dataToExport );
                    location.replace( enData );
                }
                else {
                    enData = "text/json;charset=utf-8," + encodeURIComponent( dataToExport );
                    downloadLink = document.createElement( "a" );
                    downloadLink.href = "data:" + enData;
                    downloadLink.download = fileName;
                    document.body.appendChild( downloadLink );
                    downloadLink.click();
                    document.body.removeChild( downloadLink );
                }
                cs.alert( "success", "Designer", data.Layout.title + " has been exported as "+ fileName +" to locak disk" );
            };
        }
    }
} )();