( function() { "use strict";
	/**
	 * [requireCallback description]
	 * @param  {[type]} fileManagerModule [description]
	 * @param  {[type]} appConfig         [description]
	 * @return {[type]}                   [description]
	 */
	var requireCallback = function( fileManagerModule, appConfig ) {
		/**
		 * [fileManagerDataService description]
		 * @return {[type]} [description]
		 */
		var fileManagerDataService = function() {
			this.jsTreeObj = {};
		};

		fileManagerModule.service( 
			appConfig.modules.core.fileManager.services.fileManagerDataService,
			[
				fileManagerDataService
			]
		);

	};

	define( [ "fileManagerModule", "appConfig" ], requireCallback );

} )();