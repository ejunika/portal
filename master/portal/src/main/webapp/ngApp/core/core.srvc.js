( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "cm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "cm" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.core.module );
    }
} )( this, function( ac, cm ) {
    cm.service( ac.services.core, [ 
        "toaster",
        "hotkeys",
        coreSrvcFn
    ] );
    function coreSrvcFn( toaster, hotkeys ) {
        var cs = this;
        cs.addHotkeys = function( cfg ) {
            hotkeys.add( cfg );
        };
        cs.alert = function( type, title, msg ) {
            toaster.pop( type, title, msg );
        };
        cs.getPouchDbInstance = function( dbName ) {
            return new pDb( dbName );
        };
        cs.removeFromArray = function( arr, item ) {
            var itemIndex;
            if( Array.isArray( arr ) ) {
                itemIndex = arr.indexOf( item );
                if( itemIndex != -1 ) {
                    arr.splice( itemIndex, 1 );
                }
                else {
                    console.info( "cs.removeFromArray( arr, item ): Item not found!!" );
                }
            }
        };
        cs.isDuplicateInArray = function( arr, item, criteria ) {
            if( Array.isArray( arr ) && 
                    typeof item == "object" && 
                    typeof criteria == "string" &&
                    item.hasOwnProperty( criteria ) ) {
                for( var i = 0; i < arr.length; i++ ) {
                    if( arr[ i ][ criteria ] == item[ criteria ] ) {
                        return true;
                    }
                }
                return false;
            }
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
} );