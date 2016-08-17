( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "spm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.specialPage.module );
    }
} )( this, function( ac, spm ) {
    "use strict";
    spm.controller( ac.controllers.specialPage, [
        ac.ngVars.scope,
        specialPageCtrlFn
    ] );
    function specialPageCtrlFn( $scope ) {
        $scope.allWorkspaces = [
            {
                label: "Workspace-1"
            },
            {
                label: "Workspace-2"
            },
            {
                label: "Workspace-3"
            }
        ];
        $scope.ddOpns = [
            {
                label: "Open"
            },
            {
                label: "Move"
            },
            {
                label: "Delete"
            }
        ];
        $scope.getAllDashboards( function( dashboards ) {
            $scope.allDashboards = dashboards
        } );
    }
} );