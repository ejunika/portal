( function() {
	"use strict";
	var rcb = function( modalDialogModule, appConfig ) {
		var
		compileFn = function( el, attr ) {
			return linkFn;
		},
		linkFn = function( $scope, $element, $attributes, $controller ) {

		},
		modalDialogDirective = function() {
			return {
				restrict: "E",
				replace: true,
				transclude: true,
				templateUrl: "app/modules/core/modal-dialog/modal-dialog.view.html",
				controller: "modal-dialog.ctrl",
				controllerAs: "mdVm",
				compile: compileFn
			};
		};

		modalDialogModule.directive( "njModalDialog", [ 
			modalDialogDirective 
		] );

		return modalDialogDirective;
	};
	define( [ "modalDialogModule", "appConfig" ], rcb );
} )();