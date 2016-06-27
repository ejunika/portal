/**
 * This file is used for configuration of application
 * @author M A AKHTAR
 * */
( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [], fn );
    }
    else if( typeof module === "object" && module.exports ) {
        module.exports = fn();
    }
    else {
        cxt.portal = cxt.portal || {};
        cxt.portal.ac = fn();
    }
} )( this, function() {
    return {
        modules: {
            core: "core.module",
            header: "header.module",
            breadcrumb: "breadcrumb.module",
            mainMenu: "main-menu.module",
            mainArea: "main-area.module",
            designer: "designer.module",
            dashboard: "dashboard.module",
            widget: "widget.module"
        },
        controllers: {
            core: "core.ctrl",
            header: "header.ctrl",
            breadcrumb: "breadcrumb.ctrl",
            mainMenu: "main-menu.ctrl",
            mainArea: "main-area.ctrl",
            designer: "designer.ctrl",
            dashboard: "dashboard.ctrl",
            widget: "widget.ctrl"
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
            },
            dashboard: {
                name: "njDashboard",
                tUrl: "ngApp/designer/dashboard/dashboard.view.html"
            },
            widget: {
                name: "njWidget",
                tUrl: "ngApp/designer/widget/widget.view.html"
            }
        },
        factories: {
            
        },
        services: {
            core: "core.srvc",
            request: "request.srvc"
        },
        jsonPath: {
            widgetExpData: "ngApp/designer/widget-exp/widget-exp.data.json",
            dashboardData: "ngApp/designer/dashboard/dashboard.data.json"
        },
        ngPlugins: {
            ngRoute: "ngRoute",
            ngAnimate: "ngAnimate",
            uiJquery: "ui.jquery",
            njUtil: "nj.util",
            toaster: "toaster",
            cfpHotkeys: "cfp.hotkeys"
        },
        ngVars: {
            scope: "$scope",
            http: "$http",
            timeout: "$timeout",
            routeProvider: "$routeProvider"
        }
    };
} );