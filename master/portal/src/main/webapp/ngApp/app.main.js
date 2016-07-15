( function() {
    "use strict";
    require.config( {
        baseUrl: "/portal/ngApp/",
        paths: {
            jquery : "../node_modules/jquery/dist/jquery.min",
            jqueryui : "../node_modules/jquery-ui/jquery-ui",
            uijquery: "utility/ui.jquery",
            njutil: "utility/nj.util",
            canvasjs : "../src/canvasjs/source/canvasjs",
            codemirror: "../node_modules/codemirror/lib/codemirror",
            uicodemirror: "",
            angular : "../node_modules/angular/angular",
            alstorage: "../node_modules/angular-local-storage/dist/angular-local-storage",
            angularroute: "../node_modules/angular-route/angular-route",
            angularjstoster: "../node_modules/angularjs-toaster/toaster",
            hotkeys: "../node_modules/angular-hotkeys/build/hotkeys",
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
            dbm: "designer/dashboard/dashboard.module",
            dbc: "designer/dashboard/dashboard.ctrl",
            dbd: "designer/dashboard/dashboard.dir",
            spm: "designer/special-page/special-page.module",
            spc: "designer/special-page/special-page.ctrl",
            spd: "designer/special-page/special-page.dir",
            wm: "designer/widget/widget.module",
            wc: "designer/widget/widget.ctrl",
            wd: "designer/widget/widget.dir",
            jsfileloader: "js-file.loader"
        },
        shim: {
            jquery: {
                exports: "jQuery"
            },
            jqueryui: {
                deps: [ "jquery" ]
            },
            canvasjs: {
                deps: [ "jquery" ]
            },
            uijquery: {
                deps: [ "jqueryui" ]
            },
            angular: {
                exports: "angular",
                deps: [ "jquery" ]
            },
            angularroute: {
                deps: [ "angular" ]
            },
            hotkeys: {
                deps: [ "angular" ]
            },
            njutil: {
                deps: [ "angular" ]
            },
            angularanimate: {
                deps: [ "angular" ]
            },
            angularjstoster: {
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