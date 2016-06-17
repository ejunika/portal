( function() {
    "use strict";
    require.config( {
        baseUrl: "/portal/ngApp/",
        paths: {
            jquery : "../node_modules/jquery/dist/jquery.min",
            jqueryui : "../node_modules/jquery-ui/jquery-ui",
            canvasjs : "../node_modules/canvasjs/dist/jquery.canvasjs.min",
            angular : "../node_modules/angular/angular",
            alstorage: "../node_modules/angular-local-storage/dist/angular-local-storage",
            angularroute: "../node_modules/angular-route/angular-route",
            angularjstoster: "../node_modules/angularjs-toaster/toaster",
            angularanimate: "../node_modules/angular-animate/angular-animate",
            bootstrap : "../node_modules/bootstrap/dist/js/bootstrap.min",
            jstree : "../node_modules/jstree/dist/jstree",
            pouchdb: "../node_modules/pouchdb/dist/pouchdb",
            boot: "boot",
            ac: "app-config",
            core_module: "core/core.module",
            core_controller: "core/core.ctrl",
            jsfileloader: "js-file.loader"
        },
        shim: {
            jquery: {
                exports: "jQuery"
            },
            angular: {
                exports: "angular",
                deps: [ "jquery" ]
            },
            bootstrap: {
                deps: [ "jquery" ]
            }
        },
        waitSeconds : 180
    } );
    require( [ "boot" ], rcb );
    function rcb() {}
} )();