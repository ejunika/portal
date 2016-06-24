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
                scope: {
                    jqDraggable: "=",
                    dragData: "="
                },
                link: function( $scope, el, attrs, ctrl ) {
                    el.draggable( $scope.jqDraggable ).data("dragData", $scope.dragData);
                }  
           };
        }
        function jqDroppableFn( $parse ) {
            return {
                restrict: "A",
                scope: {
                    jqDroppable: "="
                },
                link: function( $scope, el, attrs, ctrl ) {
                    el.droppable( $scope.jqDroppable );
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
                scope: {
                    jqSortable: "="
                },
                link: function( $scope, el, attrs, ctrl ) {
                    el.sortable( $scope.jqSortable );
                }  
           };
        }
        function jqSelectableFn( $parse ) {
            return {
                restrict: "A",
                scope: {
                    jqSelectable: "="
                },
                link: function( $scope, el, attrs, ctrl ) {
                    el.selectable( $scope.jqSelectable );
                }  
           };
        }
    }
} )();