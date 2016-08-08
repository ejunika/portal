( function() { "use strict";
    var
    requireCallback = function( ng, appConfig ) {
    	var

    	fileManagerModule = ng.module( appConfig.modules.core.fileManager.name, [] );

    	return fileManagerModule;
    };

    define( [ "angular", "appConfig" ], requireCallback );
    
} )();