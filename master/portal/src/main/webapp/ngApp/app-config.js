/**
 * This file is used for configuration of application
 * @author M A AKHTAR
 * */
( function() {
    "use strict";
    define( [
    ], rcb );
    function rcb() {
        return {
            modules: {
                core: "core.module",
                header: "header.module",
                breadcrumb: "breadcrumb.module",
                mainMenu: "main-menu.module",
                mainArea: "main-area.module",
                designer: "designer.module"
            },
            controllers: {
                core: "core.ctrl",
                header: "header.ctrl",
                breadcrumb: "breadcrumb.ctrl",
                mainMenu: "main-menu.ctrl",
                mainArea: "main-area.ctrl",
                designer: "designer.ctrl"
            },
            directives: {
                core: {},
                header: {
                    name: "njHeader",
                    tUrl: "ngApp/core/header/header.view.html"
                },
                breadcrumb: {
                    name: "njBreadcrumb",
                    tUrl: "ngApp/core/breadcrumb/breadcrumb.view.html"
                },
                mainMenu: {
                    name: "njMainMenu",
                    tUrl: "ngApp/core/main-menu/main-menu.view.html"
                },
                mainArea: {
                    name: "njMainArea",
                    tUrl: "ngApp/core/main-area/main-area.view.html"
                }
            },
            factories: {
                
            },
            services: {
                core: "core.srvc",
                request: "request.srvc"
            },
            ngVars: {
                scope: "$scope",
                http: "$http",
                routeProvider: "$routeProvider"
            }
        };
    }
} )();