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
        ctx.portal = ctx.portal || {};
        ctx.portal.ac = fn();
    }
} )( this, function() {
    return {
        modules: {
            core: { module: { name: "core.module" } },
            header: { module: { name: "header.module" } },
            breadcrumb: { module: { name: "breadcrumb.module" } },
            mainMenu: { module: { name: "main-menu.module" } },
            mainArea: { module: { name: "main-area.module" } },
            fileManager: { module: { name: "file-manager.module" } },
            modalDialog: { module: { name: "modal-dialog.module" } },
            designer: { module: { name: "designer.module" } },
            dashboard: { module: { name: "dashboard.module" } },
            specialPage: { module: { name: "special-page.module" } },
            widget: { module: { name: "widget.module" } }
        },
        controllers: {
            core: "core.ctrl",
            header: "header.ctrl",
            breadcrumb: "breadcrumb.ctrl",
            mainMenu: "main-menu.ctrl",
            mainArea: "main-area.ctrl",
            fileManager: "file-manager.ctrl",
            modalDialog: "modal-dialog.ctrl",
            designer: "designer.ctrl",
            dashboard: "dashboard.ctrl",
            specialPage: "special-page.ctrl",
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
            modalDialog: {
                name: "njModalDialog",
                tUrl: "ngApp/modal-dialog/modal-dialog.view.html"
            },
            dashboard: {
                name: "njDashboard",
                tUrl: "ngApp/designer/dashboard/dashboard.view.html"
            },
            specialPage: {
                name: "njSpecialPage",
                tUrl: "ngApp/designer/special-page/special-page.view.html"
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
            dashboardData: "ngApp/designer/dashboard/dashboard.data.json",
            dropdownMenuData: "ngApp/designer/designer-dropdown-menu.data.json",
            propData: "ngApp/designer/widget-prop/line-chart.prop.json",
        },
        serverInfo: {
            ip: "localhost",
            port: "8080",
//            port: "8090",
            contextPath: "portal"
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
            rootScope: "$rootScope",
            parse: "$parse",
            http: "$http",
            timeout: "$timeout",
            routeProvider: "$routeProvider"
        }
    };
} );