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
                $scope.openDashboardIds = [];
                $scope.selectedDashboardId = "";
                $scope.dashboardMap = {};
                $scope.wExpItemDragCfg = {
                    helper: "clone",
                    appendTo: "body"
                };
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
                            $( "#TAB_" + obj.id ).click();
                            $scope.selectedDashboardId = obj.id;
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
        }
    }
} )();