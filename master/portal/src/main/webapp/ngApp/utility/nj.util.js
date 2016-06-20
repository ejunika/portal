( function() {
    "use strict";
    define( ["angular" ], rcb );
    function rcb( angular ) {
        angular
            .module( "nj.util", [] )
            .directive( "njCxtMenu", [ "$parse", njCxtMenuFn ] )
            .directive( "cxtMenuBox", [ "$parse", cxtMenuBoxFn ] );
        function njCxtMenuFn( $parse ) {
            return {
                restrict: "A",
                link: function( $scope, el, attrs, ctrl ) {
                    var cxtMenuCfg = $parse( attrs.njCxtMenu )( $scope );
                    if( typeof $scope.$root.cxtMenuList != "object" ) {
                        $scope.$root.cxtMenuList = {};
                        $scope.$root.cnt = 0;
                        $( document ).on( "click", function( e ) {
                            $( ".dropdown-menu" ).parent().removeClass( "open" );
                        } );
                    }
                    el.data( "cmi", ++$scope.$root.cnt );
                    $scope.$root.cxtMenuList[ $scope.$root.cnt ] = cxtMenuCfg;
                    el.on( "contextmenu", function( e ) {
                        e.preventDefault();
                        e.stopPropagation();
                        var cmi = $( e.target ).closest( "[ nj-cxt-menu ]" ).data( "cmi" );
                        $scope.$apply( function() {
                            $scope.$root.opnList = $scope.$root.cxtMenuList[ cmi ].opnList;
                            $scope.$root.opnClicked = $scope.$root.cxtMenuList[ cmi ].opnClicked;
                            $scope.$root.menuPos = {
                                left: e.clientX,
                                top: e.clientY
                            };
                            $( ".dropdown-menu" ).parent().removeClass( "open" );
                            $( ".cxt-menu" ).parent()
                            .addClass( "dropdown open" )
                            .css( "position", "initial");
                        } );
                    } );
                }
            }
        }
        function cxtMenuBoxFn( $parse ) {
            return {
                restrict: "E",
                template: '<ul ng-style="$root.menuPos" class="dropdown-menu cxt-menu"><li ng-class="{ \'divider\': opn.divider }" ng-repeat="opn in $root.opnList" ng-click="$root.opnClicked( $event, opn )"><a>{{opn.label}}</a></li></ul>',
                link: function( $scope, el, attrs, ctrl ) {
                    var njCxtMenuHandler = $parse( attrs.cxtMenuBox )( $scope );
                }
            }
        }
    }
} )();