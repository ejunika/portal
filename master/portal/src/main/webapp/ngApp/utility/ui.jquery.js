( function() {
    "use strict";
    define( [ "angular", "jquery", "jqueryui" ], rcb );
    function rcb( angular ) {
        angular
            .module( "ui.jquery", [] )
            .controller( "ui.jquery.ctrl", [] )
            .directive( "jqDraggable", [ jqDraggableFn ] )
            .directive( "jqDroppable", [ jqDroppableFn ] )
            .directive( "jqResizable", [ jqResizableFn ] )
            .directive( "jqSortable", [ jqSortableFn ] )
            .directive( "jqSelectable", [ jqSelectableFn ] );
        function jqDraggableFn() {
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
        function jqDroppableFn() {
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
        function jqResizableFn() {
            return {
                restrict: "A",
                scope: {
                    jqResizable: "="
                },
                link: function( $scope, el, attrs, ctrl ) {
                    el.resizable( $scope.jqResizable );
                }  
           };
        }
        function jqSortableFn() {
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
        function jqSelectableFn() {
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