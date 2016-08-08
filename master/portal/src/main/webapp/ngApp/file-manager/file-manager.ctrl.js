( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "fmm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "dm" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.fileManager.module );
    }    
} )( this, function( ac, fmm ) {
     fmm.controller( ac.controllers.fileManager, [ 
         ac.ngVars.scope,
         ac.ngVars.timeout,
         ac.services.core,
         ac.services.request,
         fileManagerCtrlFn 
     ] );
     function fileManagerCtrlFn( $scope, $timeout, cs, rs ) {
         $scope.init = function() {
             $scope.files = [];
             $scope.parentChildMap = {};
             $scope.treeCfg = {
                     core: {
                         themes: {
                             name: "proton",
                             responsive: true
                         },
                         data: $scope.treeDataHandler,
                         check_callback: true
                     },
                     plugins : [ "wholerow", "contextmenu" ],
                     contextmenu: {
                         items: function( node, cb ) {
                             var options = {
                                 CREATE: {
                                     separator_before: true,
                                     separator_after: true,
                                     _disabled: false,
                                     label: "Create",
                                     action: function( option ) {
                                         console.log( option );
                                     },
                                     //icon: "",
                                     //shortcut: 113,
                                     //shortcut_label: "F2",
                                     submenu: {
                                         FOLDER: {
                                             separator_before: true,
                                             separator_after: true,
                                             _disabled: false,
                                             label: "Folder",
                                             action: function( option ) {
                                                 $( "#uni_modal" ).modal( "show" );
                                             },
                                             //icon: "",
                                             //shortcut: 113,
                                             //shortcut_label: "F2",
                                             //submenu: {},
                                             nodeInfo: node
                                         },
                                         FILE: {
                                             separator_before: true,
                                             separator_after: true,
                                             _disabled: false,
                                             label: "File",
                                             action: function( option ) {
                                                 $( "#uni_modal" ).modal( "show" );
                                             },
                                             //icon: "",
                                             //shortcut: 113,
                                             //shortcut_label: "F2",
                                             //submenu: {},
                                             nodeInfo: node
                                         }
                                     },
                                     nodeInfo: node
                                 },
                                 RENAME: {
                                     separator_before: true,
                                     separator_after: true,
                                     _disabled: false,
                                     label: "Rename",
                                     action: function( option ) {
                                         console.log( option );
                                     },
                                     //icon: "",
                                     //shortcut: 113,
                                     //shortcut_label: "F2",
                                     //submenu: {},
                                     nodeInfo: node
                                 },
                                 DELETE: {
                                     separator_before: true,
                                     separator_after: true,
                                     _disabled: false,
                                     label: "Delete",
                                     action: function( option ) {
                                         console.log( option );
                                     },
                                     //icon: "",
                                     //shortcut: 113,
                                     //shortcut_label: "F2",
                                     //submenu: {},
                                     nodeInfo: node
                                 }
                             };
                             cb( options );
                         }
                     } 
                 };
         };
         $scope.getChildNodes = function( node, cb ) {
             var url = rs.getUrl( "rest/directory/getByParent/" + node.id );
             rs.doGetRequest( url, scb );
             function scb( resData ) {
                 $scope.processResponseData( node, resData, cb );
             }
         };
         $scope.processResponseData = function( node, resData, cb ) {
             var files, newNode, nodes = [];
             if( resData.status ) {
                 files = resData.data;
                 for( var i = 0; i < files.length; i++ ) {
                     newNode = {
                         id: files[ i ].id,
                         text: files[ i ].label,
                         parent: node.id,
                         children: true
                     };
                     nodes.push( newNode );
                 }
             }
             cb( nodes );
         };
         $scope.getRootNodes = function( node, cb ) {
             var reqUrl = rs.getUrl( "rest/directory/getAll" );
             rs.doGetRequest( reqUrl, scb );
             function scb( resData ) {
                 $scope.processResponseData( node, resData, cb );
             }
         };
         $scope.treeDataHandler = function( node, cb ) {
             var nodeId = node.id, thiz = this;

             if( nodeId === "#" ) {
                 $scope.getRootNodes( node, function( rootNodes ) {
                     cb.call( thiz, rootNodes );
                 } );
             }
             else {
                 $scope.getChildNodes( node, function( childNodes ) {
                     cb.call( thiz, childNodes );
                 } );
             }
         };
         $scope.jsTreeSelectHandler = function( e, data ) {
             vm.data.files = vm.data.parentChildMap[ data.node.id ];
             $scope.$apply();
         };
     }
} );