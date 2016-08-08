( function() {
	"use strict";
	var rcb = function( modalDialogModule, appConfig ) {
		var modalDialogController = function() {
			var vm = this;
			vm.fn = {
				init: function() {
					vm.data = {
						modalTitle: "Create Folder",
						modalBodyTemplateUrl: "app/modules/core/file-manager/create-folder.view.html",
						buttons: [
							{
								title: "Create",
								action: "CREATE_FOLDER"
							}
						]
					};
				},
				showModalDialog: function( dialogFor ) {
					$( "#uni_modal" ).modal( "show" );
				}
			};
		};
		modalDialogModule.controller( "modal-dialog.ctrl", [ 
			modalDialogController 
		] );
		return modalDialogController;
	};
	define( [ "modalDialogModule", "appConfig" ], rcb );
} )();