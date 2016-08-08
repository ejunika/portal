( function() {
	"use strict";
	var rcb = function( ng, appConfig ) {
		return ng.module( "modal-dialog.module", [] );
	};
	define( [ "angular", "appConfig" ], rcb );
} )();