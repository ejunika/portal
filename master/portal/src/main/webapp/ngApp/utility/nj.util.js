( function() {
    "use strict";
    define( ["angular" ], rcb );
    function rcb( angular ) {
        angular
            .module( "nj.util", [] )
            .directive( "njCxtMenu", [ "$parse", njCxtMenuFn ] )
            .directive( "cxtMenuBox", [ "$parse", cxtMenuBoxFn ] )
            .controller( "cxtMenuBox.ctrl", [ "$scope", cxtMenuBoxCtrlFn ] );
        function njCxtMenuFn( $parse ) {
            return {
                restrict: "A",
                controller: "cxtMenuBox.ctrl",
                link: function( $scope, el, attrs, ctrl ) {
                    var njCxtMenuConfig = $parse( attrs.njCxtMenu )( $scope );
                    $scope.$root.opnList = njCxtMenuConfig.opnList;
                    $scope.$root.handleMenuClick = function( e, opn ) {
                        njCxtMenuConfig.handler( e, opn );
                        $scope.$root.cxtVisible = false;
                    };
                    el.on( "contextmenu", function( e ) {
                        e.preventDefault();
                        $scope.$root.cxtMenuPosition = {
                            left: e.clientX,
                            top: e.clientY
                        };
                        $scope.$root.cxtVisible = true;
                        $scope.$apply();
                    } );
                }
            }
        }
        function cxtMenuBoxCtrlFn( $scope ) {
            $scope.cxtMenuBox;
            $scope.$root.cxtMenuPosition = {};
        }
        function cxtMenuBoxFn( $parse ) {
            return {
                restrict: "E",
                scope: true,
                template: '<ul ng-show="$root.cxtVisible" ng-style="$root.cxtMenuPosition" class="dropdown-menu nj-cxt-menu"><li ng-class="{ \'divider\': opn.divider }" ng-repeat="opn in $root.opnList" ng-click="$root.handleMenuClick( $event, opn )"><a>{{opn.label}}</a></li></ul>',
                controller: "cxtMenuBox.ctrl",
                link: function( $scope, el, attrs, ctrl ) {
                    var njCxtMenuHandler = $parse( attrs.cxtMenuBox )( $scope );
                }
            }
        }
    }
} )();