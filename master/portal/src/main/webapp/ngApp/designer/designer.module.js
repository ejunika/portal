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
        ctx.portal.ac.modules.designer.module = fn( ctx.portal.ac, ctx.angular );
    }
} )( this, function( ac, ng ) {
    return ng.module( ac.modules.designer.module.name, [
        ac.modules.dashboard.module.name,
        ac.modules.widgetExp.module.name,
        ac.modules.widgetProp.module.name,
        ac.modules.dataSet.module.name,
        ac.modules.specialPage.module.name
    ] );
} );