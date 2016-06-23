( function() {
    "use strict";
    define( [ "cm", "ac" ], rcb );
    function rcb( cm, ac ) {
        cm.service( ac.services.core, [ 
            "toaster",
            coreSrvcFn
        ] );
        function coreSrvcFn( toaster ) {
            var cs = this;
            cs.alert = function( type, title, msg ) {
                toaster.pop( type, title, msg );
            };
            cs.getPouchDbInstance = function( dbName ) {
                return new pDb( dbName );
            };
            cs.getUniqueId = function( x4Bits ) {
                var getRandom = function() {
                    return Math.floor( ( 1 + Math.random() ) * 0x10000 )
                        .toString( 16 ).substring( 1 ).toUpperCase();
                }, uniqueId = "";
                x4Bits = x4Bits || 16;
                if( typeof x4Bits == "number" ) {
                    for( var i = 0; i < x4Bits; i++ ) {
                        if( i > 0 ) {
                            uniqueId += "-";
                        }
                        uniqueId += getRandom();
                    }
                }
                return uniqueId;
            };
            cs.counter = function() {
                var count = 0;
                return function( initValue ) {
                    if( initValue >= 0 ) {
                        count = initValue;
                    }
                    if( initValue < 0 ) {
                        return 0;
                    }
                    return ++count;
                };
            };
            cs.filterItemInList = function( list, key, value ) {
                var filterFn = function( item, index ) {
                    var typeOfItem = typeof( item );
                    if( typeOfItem != "undefined" ) {
                        switch( typeOfItem ) {
                            case "object":
                                return item[ key ] == value;
                                break;
                            case "string":
                                return item == key;
                                break;
                            case "function":
                                return item == key;
                                break;
                            default:
                                break;
                        }
                    } 
                };
                return $.grep( list, filterFn );
            };
            cs.insertAt = function( arr, item, index ) {
                arr.splice( index, 0, item );
                return arr;
            };
        }
    }
} )();