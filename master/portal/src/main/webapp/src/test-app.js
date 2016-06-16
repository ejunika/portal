( function( angular ){
    "use strict";
        angular
            .module( "test-app", [] )
            .filter( "search", function() {
                return function( list, searchStr, pName ) {
                    var fValue = [];
                    if( !searchStr ) return list;
                    angular.forEach( list, function( v, k ) {
                        if( typeof( v ) === "object" ) {
                            if( v.hasOwnProperty( pName ) ) {
                                if( v[ pName ].toString().toLowerCase().startsWith( searchStr.toLowerCase() ) ) {
                                    fValue.push( v );
                                }
                            }
                        }
                        else if( v.toLowerCase().toString().startsWith( searchStr.toLowerCase() ) ) {
                            fValue.push( v );
                        }
                    } );
                    return fValue;
                }
            } )
            .controller( "test-ctrl", [ "$scope", testAppCtrl ] );
        function testAppCtrl( $scope ) {
        	$scope.pName = "id";
            $scope.items = [
                {
                    id: 1,
                    name: "banana"
                },
                {
                    id: 2,
                    name: "apple"
                },
                {
                    id: 3,
                    name: "pine apple"
                },
                {
                    id: 4,
                    name: "orange"
                },
                {
                    id: 5,
                    name: "grape"
                },
                {
                    id: 6,
                    name: "cherry"
                },
                {
                    id: 7,
                    name: "coconut"
                },
                {
                    id: 8,
                    name: "black berry"
                },
                {
                    id: 9,
                    name: "mango"
                }
            ];
            $scope.filterBy = $scope.items[ 0 ];
        }
} )( angular );