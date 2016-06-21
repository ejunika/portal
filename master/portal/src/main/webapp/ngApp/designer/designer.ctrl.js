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
                } );
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
            $scope.exportToLocalDisk = function( e ) {
                cs.alert( "success", "Designer", "Export successfully!!" );
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
                            cs.alert( "success", "Designer", obj.Layout.title + " Removed" );
                        }, 0 );
                        break;
                    case "OPEN_OTHER_TAB":
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
                if( type == "DASHBOARD" ) {
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
                        default:
                            break;
                    }
                    cs.insertAt( $scope.openTabs, tab, 0 );
                    $scope.loadSpecialPage( tab );
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
                    $scope.notify( "REMOVE_DASHBOARD", dashboard );
                }
            };
            $scope.openSettings = function( e ) {
                
            };
        }
    }
} )();