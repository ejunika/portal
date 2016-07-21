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
    function fontBuilderFn( $parse ) {
        return {
            restrict: "E",
            require: "ngModel",
            scope: true,
            replace: true,
            templateUrl: "ngApp/utility/font-builder.tpl.html",
            link: function( $scope, el, attrs ) {
                var ngModel = $parse( attrs.ngModel )( $scope ), 
                fbCfg = $parse( attrs.fbCfg )( $scope );
                $scope.init( ngModel, fbCfg );
            },
            controller: [ "$scope", "$timeout", function( $scope, $timeout ) {
                var displayStyle = {}, 
                ngModel, fbCfg;
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
                    ngModel[ "fColor" ] = color;
                    displayStyle[ "color" ] = color;
                };
                $scope.getAnalogousColors = function( color ) {
                    var tinyColors = tinycolor( color ).analogous();
                    var hexColors = [];
                    for( var i = 0; i < tinyColors.length; i++ ) {
                        hexColors.push( tinyColors[ i ].toHex() );
                    }
                    return hexColors;
                };
                $scope.init = function( m, c ) {
                    ngModel = m; fbCfg = c;
                    var minSize = fbCfg.minSize, maxSize = fbCfg.maxSize;
                    for( var i = minSize; i <= maxSize; i++ ) {
                        $scope.fSizeList.push( i );
                    }
                    $scope.sFont = fbCfg.fonts[ fbCfg.fonts.indexOf( ngModel.fFamily ) ];
                    $scope.sFontSize = $scope.fSizeList[ $scope.fSizeList.indexOf( ngModel.fSize ) ];
                    if( ngModel.fWeight == "bold" ) {
                        displayStyle[ "font-weight" ] = ngModel.fWeight;
                        $scope.biu.bold = true;
                    }
                    if( ngModel.fStyle == "italic" ) {
                        $scope.biu.italic = true;
                        displayStyle[ "font-style" ] = ngModel.fStyle;
                    }
                    if( ngModel.fDecoration == "underline" ) {
                        displayStyle[ "text-decoration" ] = ngModel.fDecoration;
                        $scope.biu.underline = true;
                    }
                    displayStyle[ "color" ] = ngModel.fColor;
                };
                $scope.toggleStyle = function( e, style ) {
                    switch( style ) {
                        case "BOLD":
                            if( displayStyle[ "font-weight" ] == 'bold' ) {
                                displayStyle[ "font-weight" ] = "normal";
                                ngModel.fWeight = "normal";
                                $scope.biu.bold = false;
                            }
                            else {
                                displayStyle[ "font-weight" ] = "bold";
                                ngModel.fWeight = "bold";
                                $scope.biu.bold = true;
                            }
                            break;
                        case "ITALIC":
                            if( displayStyle[ "font-style" ] == "italic" ) {
                                displayStyle[ "font-style" ] = "normal";
                                ngModel.fStyle = "normal";
                                $scope.biu.italic = false;
                            }
                            else {
                                displayStyle[ "font-style" ] = "italic";
                                ngModel.fStyle = "italic";
                                $scope.biu.italic = true;
                            }
                            break;
                        case "UNDERLINE":
                            if( displayStyle[ "text-decoration" ] == "underline" ) {
                                displayStyle[ "text-decoration" ] = "none";
                                ngModel.fDecoration = "none";
                                $scope.biu.underline = false;
                            }
                            else {
                                displayStyle[ "text-decoration" ] = "underline";
                                ngModel.fDecoration = "underline";
                                $scope.biu.underline = true;
                            }
                            break;
                        default:
                            break;
                    }
                };
                $scope.getDisplayStyle = function() {
                    return displayStyle;
                };
                $scope.$watch( "sFont", function( nv, ov ) {
                    if( nv && angular.isDefined( $scope.sFontSize ) ) {
                        displayStyle[ "font-family" ] = nv;
                        $scope.displayFont = nv + ", " + $scope.sFontSize + 'px';
                        ngModel.fFamily = nv;
                    }
                } );
                $scope.$watch( "sFontSize", function( nv, ov ) {
                    if( nv && $scope.sFont ) {
                        $scope.displayFont = $scope.sFont + ", " + nv + "px";
                        ngModel.fSize = nv;
                    }
                } );
            } ]
        };
    }
} );