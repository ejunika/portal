( function() {
    "use strict";
    define( [ "angular", "jquery", "jqueryui" ], rcb );
    function rcb( angular ) {
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
    }
} )();