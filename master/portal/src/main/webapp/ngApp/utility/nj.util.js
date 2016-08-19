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
        .directive( "fontBuilder", [ "$parse", fontBuilderFn ] )
        .directive( "jsTree", [ "$parse", jsTreeFn ] )
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
    function jsTreeFn( $parse ) {
        return {
            restrict: "AE",
            link: function( $scope, el, attrs, ngModel ) {
                var treeCfg = $parse( attrs.jsTree )( $scope ),
                jsTreeSelect = $parse( attrs.jsTreeSelect )( $scope );
                el.jstree( treeCfg )
                .on( "select_node.jstree", jsTreeSelect );
            }
        };
    }
    function fontBuilderFn( $parse ) {
        return {
            restrict: "E",
            require: "ngModel",
            scope: true,
            replace: true,
            templateUrl: "ngApp/utility/font-builder.tpl.html",
            link: function( $scope, el, attrs, ngModelCtrl ) {
                var fbCfg = $parse( attrs.fbCfg )( $scope );
                $scope.init( fbCfg );
                ngModelCtrl.$formatters.push( function( modelValue ) {
                    return {
                        fFamily: modelValue.fFamily,
                        fSize: modelValue.fSize,
                        fColor: modelValue.fColor,
                        fStyle: modelValue.fStyle,
                        fWeight: modelValue.fWeight,
                        fDecoration: modelValue.fDecoration
                    };
                } );
                ngModelCtrl.$render = function() {
                    $scope.font = {
                        fFamily: ngModelCtrl.$viewValue.fFamily,
                        fSize: ngModelCtrl.$viewValue.fSize,
                        fColor: ngModelCtrl.$viewValue.fColor,
                        fStyle: ngModelCtrl.$viewValue.fStyle,
                        fWeight: ngModelCtrl.$viewValue.fWeight,
                        fDecoration: ngModelCtrl.$viewValue.fDecoration
                    };
                };
                ngModelCtrl.$parsers.push( function( viewValue ) {
                    return {
                        fFamily: viewValue.fFamily,
                        fSize: viewValue.fSize,
                        fColor: viewValue.fColor,
                        fStyle: viewValue.fStyle,
                        fWeight: viewValue.fWeight,
                        fDecoration: viewValue.fDecoration
                    };
                } );
                $scope.$watch( "font.fFamily + font.fSize + font.fColor + font.fStyle + font.fWeight + font.fDecoration", function() {
                    ngModelCtrl.$setViewValue( {
                        fFamily: $scope.font.fFamily,
                        fSize: $scope.font.fSize,
                        fColor: $scope.font.fColor,
                        fStyle: $scope.font.fStyle,
                        fWeight: $scope.font.fWeight,
                        fDecoration: $scope.font.fDecoration
                    } );
                } );
            },
            controller: [ "$scope", "$timeout", function( $scope, $timeout ) {
                var fbCfg;
                $scope.fSizeList = [];
                $scope.recentColors = [];
                $scope.moreColor = "";
                $scope.biu = {
                    bold: false,
                    italic: false,
                    underline: false
                }
                $scope.addMoreColor = function( e ) {
                    e.stopPropagation();
                    $timeout( function() {
                        $( "#moreColor" ).click();
                    }, 0 );
                };
                $scope.setSelectedColor = function( color, fromRecent ) {
                    if( !fromRecent ) {
                        if( $scope.recentColors.indexOf( color ) == -1 ) {
                            if( $scope.recentColors.length < 9 ) {
                                $scope.recentColors.push( color );
                            }
                            else {
                                $scope.recentColors.splice( 0, 1 );
                                $scope.recentColors.push( color );
                            }
                        }
                    }
                    $scope.font.fColor = color;
                };
                $scope.getAnalogousColors = function( color ) {
                    var tinyColors = tinycolor( color ).analogous();
                    var hexColors = [];
                    for( var i = 0; i < tinyColors.length; i++ ) {
                        hexColors.push( tinyColors[ i ].toHex() );
                    }
                    return hexColors;
                };
                $scope.init = function( fbCfg ) {
                    var minSize = fbCfg.minSize, maxSize = fbCfg.maxSize;
                    for( var i = minSize; i <= maxSize; i++ ) {
                        $scope.fSizeList.push( i );
                    }
                };
                $scope.toggleStyle = function( e, style ) {
                    switch( style ) {
                        case "BOLD":
                            if( $scope.font.fWeight == 'bold' ) {
                                $scope.font.fWeight = "normal";
                            }
                            else {
                                $scope.font.fWeight = "bold";
                            }
                            break;
                        case "ITALIC":
                            if( $scope.font.fStyle == "italic" ) {
                                $scope.font.fStyle = "normal";
                            }
                            else {
                                $scope.font.fStyle = "italic";
                            }
                            break;
                        case "UNDERLINE":
                            if( $scope.font.fDecoration == "underline" ) {
                                $scope.font.fDecoration = "none";
                            }
                            else {
                                $scope.font.fDecoration = "underline";
                            }
                            break;
                        default:
                            break;
                    }
                };
                $scope.getDisplayStyle = function() {
                    return {
                        'font-style': $scope.font.fStyle,
                        'font-weight': $scope.font.fWeight,
                        'color': $scope.font.fColor,
                        'text-decoration': $scope.font.fDecoration,
                        'font-family': $scope.font.fFamily
                    };
                };
            } ]
        };
    }
} );