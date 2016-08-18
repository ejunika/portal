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
         /**
          * @function
          * @description This function will invoked by the angular when file-manager.view.html
          * will loads on the DOM and do the initialization of related variables.
          * @author M A Akhtar
          * */
         $scope.init = function() {
             $scope.files = [];
             $scope.parentChildMap = {};
             $scope.treeCfg = {
                     core: {
                         themes: {
                             name: "proton",
                             responsive: true
                         },
                         data: $scope.treeDataProvider,
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
         /**
          * @function
          * @description This function will be invoked when any node of jstree will be expanded to get the
          * child node of the node
          * @param { Object } node - The expanded jstree node object
          * @param { function } cb - The callback function of jstree
          * @author M A Akhtar
          * */
         $scope.getChildNodes = function( node, cb ) {
             var url = rs.getUrl( "rest/directory/getByParent/" + node.id );
             rs.doGetRequest( url, scb );
             function scb( resData ) {
                 $scope.processResponseData( node, resData, cb );
             }
         };
         /**
          * @function
          * @description This is the response processing function which process the response and creates the
          * array of nodes
          * @param { Object } node - The expanded jstree node object
          * @param { Object } resData - The response object
          * @param { function } cb - The callback function of jstree
          * @author M A Akhtar
          * */
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
         /**
          * @function
          * @description This function will ask for the root nodes from the server
          * @param { Object } node - The expanded jstree node object
          * @param { function } cb - The callback function of jstree
          * @author M A Akhtar
          * */
         $scope.getRootNodes = function( node, cb ) {
             $scope.rootNodeInfo.node = node;
             $scope.rootNodeInfo.cb = cb;
         };
         $scope.treeDataProvider = function( node, cb ) {
             var thiz = this;

             if( node.id === "#" ) {
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
         $scope.addJsTreeNode = function( pId, nodeObj, pos, cb, isLoaded ) {
             if( !pos ) pos = "last";
             if( !cb ) cb = function() {};
             if( !isLoaded ) isLoaded = true;
             $( "#jstree" ).jstree( "create_node", pId, nodeObj, pos, cb, isLoaded );
         };
         $scope.jsTreeSelectHandler = function( e, data ) {
             $scope.selectedNodeId = data.node.id;
         };
         $scope.$on( "addJsTreeNode", function( e, node ) {
             $scope.addJsTreeNode( $scope.selectedNodeId, node );
         } );
     }
} );