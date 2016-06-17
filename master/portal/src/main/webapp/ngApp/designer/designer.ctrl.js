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
                $scope.dashboardMap = {};
            };
            $scope.notify = function( type, obj ) {
                switch( type ) {
                    case "ADD_DASHBOARD":
                        $scope.openDashboardIds.push( obj.id );
                        $scope.dashboardMap[ obj.id ] = obj;
                        $timeout( function() {
                            $( "#TAB_" + obj.id ).click();
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