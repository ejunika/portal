( function() {
    "use strict";
    define( [ "dbm", "ac" ], rcb );
    function rcb( dbm, ac ) {
        dbm.controller( ac.controllers.dashboard, [ 
            ac.ngVars.scope, 
            dashboardCtrlFn 
        ] );
        function dashboardCtrlFn( $scope ) {
            $scope.init = function() {
                $scope.selectedWidgetIds = [];
                $scope.dragSelectConfig = {
                    start: function( e, ui ) {
                        
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
                var selectedDashboard = $scope.dashboardMap[ $scope.selectedDashboardId ],
                widgets = selectedDashboard.Layout.Widgets;
                for( var i = 0; i < widgets.length; i++ ) {
                    $scope.selectWidget( widgets[ i ] );
                }
            };
            $scope.deSelectAllWidget = function() {
                var selectedDashboard = $scope.dashboardMap[ $scope.selectedDashboardId ],
                widgets = selectedDashboard.Layout.Widgets;
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