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
            cm: "core/core.module",
            cc: "core/core.ctrl",
            cs: "core/core.srvc",
            rs: "core/request.srvc",
            hm: "core/header/header.module",
            hc: "core/header/header.ctrl",
            hd: "core/header/header.dir",
            bcm: "core/breadcrumb/breadcrumb.module",
            bcc: "core/breadcrumb/breadcrumb.ctrl",
            bcd: "core/breadcrumb/breadcrumb.dir",
            mmm: "core/main-menu/main-menu.module",
            mmc: "core/main-menu/main-menu.ctrl",
            mmd: "core/main-menu/main-menu.dir",
            mam: "core/main-area/main-area.module",
            mac: "core/main-area/main-area.ctrl",
            mad: "core/main-area/main-area.dir",
            dm: "designer/designer.module",
            dc: "designer/designer.ctrl",
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
            angularroute: {
                deps: [ "angular" ]
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