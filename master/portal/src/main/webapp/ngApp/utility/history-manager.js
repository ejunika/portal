( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        
    }
    else if( typeof module == "object" && module.exports ) {
        
    }
    else {
        cxt.portal = cxt.portal || {};
        cxt.portal.hmm = fn( angular );
    }
} )( this, function( angular ) {
    angular.module( "nj.history", [] )
    .provider( "historyManager", [ historyManagerFn ] );
    function historyManagerFn() {
        this.steps = 10;
        this.historyCount = 0;
        this.historyMap = {};
        this.$get = function() {
            var that = this;
            return {
                undo: function( k ) {
                    return that.historyMap[ k ].historyStack[ --that.historyMap[ k ].pointer ];
                },
                redo: function( k ) {
                    if( that.historyMap[ k ].pointer != that.steps )
                    return that.historyMap[ k ].historyStack[ ++that.historyMap[ k ].pointer ];
                },
                register: function( k, steps ) {
                    that.historyMap[ k ] = new historyService( steps || that.steps );
                },
                add: function( k, obj ) {
                    if( that.historyCount <= that.steps ) {
                        that.historyMap[ k ].historyStack.push( obj );
                        that.historyMap[ k ].pointer++;
                        that.historyCount++;
                    }
                    else {
                        that.historyMap[ k ].historyStack.shift();
                        that.historyMap[ k ].historyStack.push( obj );
                    }
                }
            };
        };
    }
    function historyService( steps ) {
        this.steps = steps;
        this.historyStack = [];
        this.pointer = -1;
    }
} );