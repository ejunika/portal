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
//                scope: {
//                    jqDraggable: "=",
//                    dragData: "="
//                },
                link: function( $scope, el, attrs, ctrl ) {
                    var dragCfg = $parse( attrs.jqDraggable )( $scope ),
                    dragData = $parse( attrs.dragData )( $scope );
//                    el.draggable( $scope.jqDraggable ).data("dragData", $scope.dragData);
                    el.draggable( dragCfg ).data("dragData", dragData);
                }  
           };
        }
        function jqDroppableFn( $parse ) {
            return {
                restrict: "A",
//                scope: {
//                    jqDroppable: "="
//                },
                link: function( $scope, el, attrs, ctrl ) {
                    var dropCfg = $parse( attrs.jqDroppable )( $scope );
//                    el.droppable( $scope.jqDroppable );
                    el.droppable( dropCfg );
                }  
            };
        }
        function jqResizableFn( $parse ) {
            return {
                restrict: "A",
//                scope: {
//                    jqResizable: "="
//                },
                link: function( $scope, el, attrs, ctrl ) {
                    var resizeCfg = $parse( attrs.jqResizable )( $scope );
                    el.resizable( resizeCfg );
//                    el.resizable( $scope.jqResizable );
                }  
           };
        }
        function jqSortableFn( $parse ) {
            return {
                restrict: "A",
//                scope: {
//                    jqSortable: "="
//                },
                link: function( $scope, el, attrs, ctrl ) {
                    var sortCfg = $parse( attrs.jqSortable )( $scope );
//                    el.sortable( $scope.jqSortable );
                    el.sortable( sortCfg );
                }  
           };
        }
        function jqSelectableFn( $parse ) {
            return {
                restrict: "A",
//                scope: {
//                    jqSelectable: "="
//                },
                link: function( $scope, el, attrs, ctrl ) {
                    var selectCfg = $parse( attrs.jqSelectable )( $scope );
//                    el.selectable( $scope.jqSelectable );
                    el.selectable( selectCfg );
                }  
           };
        }
    }
} )();