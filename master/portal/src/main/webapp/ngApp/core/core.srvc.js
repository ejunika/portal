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
        cs.getRandomColor = function() {
            return "#" + ( ( 1 << 24 ) * Math.random() | 0 ).toString( 16 );
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
        cs.getRandomHexColor = function() {
            var colorList = [
                     "#D24D57",
                     "#F22613",
                     "#D91E18",
                     "#96281B",
                     "#EF4836",
                     "#D64541",
                     "#C0392B",
                     "#CF000F",
                     "#E74C3C",
                     "#DB0A5B",
                     "#F64747",
                     "#F1A9A0",
                     "#D2527F",
                     "#E08283",
                     "#F62459",
                     "#E26A6A",
                     "#674172",
                     "#AEA8D3",
                     "#913D88",
                     "#9A12B3",
                     "#BF55EC",
                     "#BE90D4",
                     "#8E44AD",
                     "#9B59B6",
                     "#446CB3",
                     "#E4F1FE",
                     "#4183D7",
                     "#59ABE3",
                     "#81CFE0",
                     "#52B3D9",
                     "#C5EFF7",
                     "#22A7F0",
                     "#3498DB",
                     "#2C3E50",
                     "#19B5FE",
                     "#336E7B",
                     "#22313F",
                     "#6BB9F0",
                     "#1E8BC3",
                     "#3A539B",
                     "#1F3A93",
                     "#89C4F4",
                     "#4B77BE",
                     "#5C97BF",
                     "#4ECDC4",
                     "#A2DED0",
                     "#87D37C",
                     "#90C695",
                     "#26A65B",
                     "#03C9A9",
                     "#68C3A3",
                     "#65C6BB",
                     "#1BBC9B",
                     "#1BA39C",
                     "#66CC99",
                     "#36D7B7",
                     "#C8F7C5",
                     "#86E2D5",
                     "#2ECC71",
                     "#16A085",
                     "#3FC380",
                     "#019875",
                     "#03A678",
                     "#4DAF7C",
                     "#2ABB9B",
                     "#00B16A",
                     "#1E824C",
                     "#049372",
                     "#26C281",
                     "#F5D76E",
                     "#F7CA18",
                     "#F4D03F",
                     "#FDE3A7",
                     "#F89406",
                     "#EB9532",
                     "#E87E04",
                     "#F4B350",
                     "#F2784B",
                     "#EB974E",
                     "#F5AB35",
                     "#D35400",
                     "#F39C12",
                     "#F9690E",
                     "#F9BF3B",
                     "#F27935",
                     "#E67E22",
                     "#ECECEC",
                     "#6C7A89",
                     "#D2D7D3",
                     "#EEEEEE",
                     "#BDC3C7",
                     "#ECF0F1",
                     "#95A5A6",
                     "#DADFE1",
                     "#ABB7B7",
                     "#F2F1EF",
                     "#BFBFBF"
                 ];
            return colorList[ Math.floor( Math.random() * colorList.length ) ];
        };
        cs.moveItemInArray = function( array, from, to ) {
            Array.prototype.move = function ( from, to ) {
                if( to >= this.length ) {
                    throw "ArrayIndexOutOfBoundException";
                }
                this.splice( to, 0, this.splice( from, 1 )[ 0 ] );
            };
            if( Array.isArray( array ) ) {
                array.move( from, to );
            }
        };
    }
} );