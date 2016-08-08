<<<<<<< HEAD
( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "angular" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac"), require( "angular" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        ctx.portal.ac.modules.fileManager.module = fn( ctx.portal.ac, ctx.angular );
    }
} )( this, function( ac, ng ) {
    return ng.module( ac.modules.fileManager.module.name, [
        
    ] );
} );
=======
( function() { "use strict";
    var
    requireCallback = function( ng, appConfig ) {
    	var

    	fileManagerModule = ng.module( appConfig.modules.core.fileManager.name, [] );

    	return fileManagerModule;
    };

    define( [ "angular", "appConfig" ], requireCallback );
    
} )();
>>>>>>> refs/remotes/origin/master
