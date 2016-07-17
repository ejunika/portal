( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "angular" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        fn( ctx.angular );
    }
} )( this, function( angular ) {
    angular
        .module( "nj.util", [] )
        .directive( "njCxtMenu", [ "$parse", njCxtMenuFn ] )
        .directive( "cxtMenuBox", [ "$parse", cxtMenuBoxFn ] )
        .filter( "search", [ searchFilterFn ] )
        .directive( "repeatEnd", [ repeatEndDirFn ] );
    function repeatEndDirFn() {
        return {
            restrict: "A",
            link: function( $scope, el, attrs ) {
                if( $scope.$last ) {
                    $scope.$eval( attrs.repeatEnd );
                }
            }
        };
    }
    function searchFilterFn() {
        return function( list, searchToken, pName ) {
            if( !searchToken ) return list;
            var ciSearchToken = searchToken.toLowerCase(), 
            fList = [], ciIvalue;
            angular.forEach( list, function( v, k ) {
                if( typeof( v ) === "object" ) {
                    if( v.hasOwnProperty( pName ) ) {
                        ciIvalue = v[ pName ].toString().toLowerCase();
                        if( ciIvalue.indexOf( ciSearchToken ) != -1 ) {
                            fList.push( v );
                        }
                    }
                }
                else {
                    ciIvalue = v.toString().toLowerCase();
                    if( ciIvalue.indexOf( ciSearchToken ) != -1 ) {
                        fList.push( v );
                    }
                }
            } );
            return fList;
        };
    }
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
                        var optionBuilder = $scope.$root.cxtMenuList[ cmi ].setOptionList;
                        if( typeof optionBuilder == "function" ) {
                            $scope.$root.opnList = optionBuilder.call( this, e );
                        }
                        $scope.$root.opnClicked = $scope.$root.cxtMenuList[ cmi ].opnClicked;
                        $scope.$root.menuPos = {
                            left: getAdjustableLeft( e ),
                            top: getAdjustableTop( e )
                        };
                    } );
                    setTimeout( function() {
                        $( ".dropdown-menu" ).parent()
                        .removeClass( "open" );
                        $( ".cxt-menu" ).parent()
                        .addClass( "dropdown open" )
                        .css( "position", "initial");
                    }, 300 );
                    function getAdjustableLeft( e ) {
                        if( e.clientX + $( ".cxt-menu" ).width() > $( "body" ).width() ) {
                            return $( "body" ).width() - $( ".cxt-menu" ).width() - 10;
                        }
                        else {
                            return e.clientX;
                        }
                    }
                    function getAdjustableTop( e ) {
                        if( e.clientY + $( ".cxt-menu" ).height() > $( "body" ).height() ) {
                            return $( "body" ).height() - $( ".cxt-menu" ).height() - 20;
                        }
                        else {
                            return e.clientY;
                        }
                    }
                } );
            }
        };
    }
    function cxtMenuBoxFn( $parse ) {
        return {
            restrict: "E",
            template: '<ul ng-style="$root.menuPos" class="dropdown-menu cxt-menu"><li ng-class="{ \'divider\': opn.divider }" ng-repeat="opn in $root.opnList" ng-click="$root.opnClicked( $event, opn )"><a>{{opn.label}}</a></li></ul>',
            link: function( $scope, el, attrs, ctrl ) {
    //            var njCxtMenuHandler = $parse( attrs.cxtMenuBox )( $scope );
            }
        };
    }
} );