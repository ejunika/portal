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
                $scope.openTabsId = [];
                $scope.openDashboardIds = [];
                $scope.selectedDashboardId = "";
                $scope.dashboardMap = {};
                $scope.tabMap = {};
                $scope.wExpItemDragCfg = {
                    helper: "clone",
                    appendTo: "body"
                };
                rs.getJson( "ngApp/designer/widget-exp/widget-exp.data.json", function( jsonData) {
                    $scope.widgetExpGroups = jsonData.groups;
                } );
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
                        $scope.openTabsId.push( obj.id );
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
                            cs.alert( "success", "Designer", obj.Layout.title + " Added.." );
                        }, 0 );
                        break;
                    default:
                        break;
                }
            };
            $scope.addDashboard = function( e ) {
                var filePath = "ngApp/designer/dashboard/dashboard.data.json",
                dashboardCount = $scope.openDashboardIds.length;
                rs.getJson( filePath, scb );
                function scb( dashboard ) {
                    dashboard.id = cs.getUniqueId();
                    dashboard.Layout.height = 2200;
                    dashboard.Layout.width = 2200;
                    dashboard.Layout.title = "Untitled_" + ++dashboardCount;
                    dashboard.Layout.gredientColor = "#0000";
                    dashboard.Layout.gredientRotation = "90";
                    $scope.notify( "ADD_DASHBOARD", dashboard );
                }
            };
            $scope.openSettings = function( e ) {
                
            };
        }
    }
} )();