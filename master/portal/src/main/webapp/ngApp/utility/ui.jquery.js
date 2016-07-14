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
        .module( "ui.jquery", [] )
        .controller( "ui.jquery.ctrl", [] )
        .directive( "jqDraggable", [ "$parse", jqDraggableFn ] )
        .directive( "jqDroppable", [ "$parse", jqDroppableFn ] )
        .directive( "jqResizable", [ "$parse", jqResizableFn ] )
        .directive( "jqSortable", [ "$parse", jqSortableFn ] )
        .directive( "jqSelectable", [ "$parse", jqSelectableFn ] );
    function jqDraggableFn( $parse ) {
        return {
            restrict: "A",
            link: function( $scope, el, attrs, ctrl ) {
                var dragCfg = $parse( attrs.jqDraggable )( $scope ),
                dragData = $parse( attrs.dragData )( $scope );
                el.draggable( dragCfg ).data("dragData", dragData);
            }  
       };
    }
    function jqDroppableFn( $parse ) {
        return {
            restrict: "A",
            link: function( $scope, el, attrs, ctrl ) {
                var dropCfg = $parse( attrs.jqDroppable )( $scope );
                el.droppable( dropCfg );
            }  
        };
    }
    function jqResizableFn( $parse ) {
        return {
            restrict: "A",
            link: function( $scope, el, attrs, ctrl ) {
                var resizeCfg = $parse( attrs.jqResizable )( $scope );
                el.resizable( resizeCfg );
            }  
       };
    }
    function jqSortableFn( $parse ) {
        return {
            restrict: "A",
            link: function( $scope, el, attrs, ctrl ) {
                var sortCfg = $parse( attrs.jqSortable )( $scope );
                el.sortable( sortCfg );
            }  
       };
    }
    function jqSelectableFn( $parse ) {
        return {
            restrict: "A",
            link: function( $scope, el, attrs, ctrl ) {
                var selectCfg = $parse( attrs.jqSelectable )( $scope );
                el.selectable( selectCfg );
            }  
       };
    }
} );