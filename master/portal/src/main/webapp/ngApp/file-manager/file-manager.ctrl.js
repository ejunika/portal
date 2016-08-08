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
         };
         $scope.getChildNodes = function( node, cb ) {
             var url = "http://localhost:8090/com.nj.clg.persistence/rest/file/getFilesByParent",
             data = {
                 file: {
                     id: node.id
                 }
             };
             bs.doPostRequest( url, data, scb );
             function scb( resData ) {
                 $scope.processResponseData( node, resData, cb );
             }
             // bs.getJson( "app/modules/core/file-manager/file-manager.data.json", 
             //     function( list ) {
             //         var childNodes = [];
             //         for( var i = 0; i < list.length; i++ ) {
             //             if( list[ i ].parent == nodeId ) {
             //                 if( list[ i ].folder ) {
             //                     list[ i ].children = true;
             //                 }
             //                 else {
             //                     list[ i ].icon = "glyphicon glyphicon-file";
             //                 }
             //                 childNodes.push( list[ i ] );
             //             }
             //         }
             //         vm.data.parentChildMap[ nodeId ] = childNodes;
             //         cb( childNodes );
             //     } ); 
         };
         $scope.processResponseData = function( node, resData, cb ) {
             var resStatus = resData.fileResponse.status, 
             files, newNode, nodes = [];
             if( resStatus ) {
                 files = resData.fileResponse.files;
                 for( var i = 0; i < files.length; i++ ) {
                     newNode = {
                         id: files[ i ].id,
                         text: files[ i ].title,
                         parent: node.id,
                         children: true
                     };
                     nodes.push( newNode );
                 }
             }
             cb( nodes );
         };
         $scope.getRootNodes = function( node, cb ) {
             var url = "http://localhost:8090/com.nj.clg.persistence/rest/file/getRootFolders", 
             data = {};
             bs.doPostRequest( url, data, scb );
             function scb( resData ) {
                 $scope.processResponseData( node, resData, cb );
             }
             /*bs.getJson( "app/modules/core/file-manager/file-manager.data.json", 
                 function( list ) {
                     var rootNodes = [];
                     for( var i = 0; i < list.length; i++ ) {
                         if( list[ i ].parent == "#" ) {
                             list[ i ].children = true;
                             rootNodes.push( list[ i ] );
                         }
                     }
                     cb( rootNodes );
                 } );*/
         };
         $scope.treeDataHandler = function( node, cb ) {
             var 
             nodeId = node.id, 
             thiz = this;

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
//
//
//
//
//
//
//
//( function() { 
//    "use strict";
//    var
//    requireCallback = function( $, fileManagerModule, appConfig ) {
//        var
//        fileManagerCtrl = function( $scope, bs, lss, x ) {
//            vm.ref = {},
//            $scope = {
//                init: function( coreVm ) {
//                    if( x.fmc ) return true;
//                    x.fmc = true;
//                    coreVm.ref.fmVm = vm;
//                    vm.ref.coreVm = coreVm;
//                    vm.data = {
//                        files: [],
//                        parentChildMap: {},
//                        fCxtMenu: [
//                            {
//                                label: "Open"
//                            },
//                            {
//                                label: "Move"
//                            }
//                        ],
//                        fileIcon: {
//                            thumbnail: {
//                                file: "images/Documents.png",
//                                folder: "images/Generic.png"
//                            },
//                            tree: {
//                                file: "",
//                                folder: ""
//                            }
//                        }
//                    };
//                    bs.getJson( "app/modules/core/file-manager/file-manager.data.json", 
//                            $scope.loadFilesInLocalStorage 
//                        );
//                },
//                loadFilesInLocalStorage: function( fileData ) {
//                    if( localStorage ) {
//                        localStorage.fileData = fileData;
//                    }
//                },
//                getThumbnail: function( file ) {
//                    return file.folder ? vm.data.fileIcon.thumbnail.folder
//                    : vm.data.fileIcon.thumbnail.file;
//                },
//                getChildNodes: function( node, cb ) {
//                    var url = "http://localhost:8090/com.nj.clg.persistence/rest/file/getFilesByParent",
//                    data = {
//                        file: {
//                            id: node.id
//                        }
//                    };
//                    bs.doPostRequest( url, data, scb );
//                    function scb( resData ) {
//                        $scope.processResponseData( node, resData, cb );
//                    }
//                    // bs.getJson( "app/modules/core/file-manager/file-manager.data.json", 
//                    //     function( list ) {
//                    //         var childNodes = [];
//                    //         for( var i = 0; i < list.length; i++ ) {
//                    //             if( list[ i ].parent == nodeId ) {
//                    //                 if( list[ i ].folder ) {
//                    //                     list[ i ].children = true;
//                    //                 }
//                    //                 else {
//                    //                     list[ i ].icon = "glyphicon glyphicon-file";
//                    //                 }
//                    //                 childNodes.push( list[ i ] );
//                    //             }
//                    //         }
//                    //         vm.data.parentChildMap[ nodeId ] = childNodes;
//                    //         cb( childNodes );
//                    //     } ); 
//                },
//                processResponseData: function( node, resData, cb ) {
//                    var resStatus = resData.fileResponse.status, 
//                    files, newNode, nodes = [];
//                    if( resStatus ) {
//                        files = resData.fileResponse.files;
//                        for( var i = 0; i < files.length; i++ ) {
//                            newNode = {
//                                id: files[ i ].id,
//                                text: files[ i ].title,
//                                parent: node.id,
//                                children: true
//                            };
//                            nodes.push( newNode );
//                        }
//                    }
//                    cb( nodes );
//                },
//                getRootNodes: function( node, cb ) {
//                    var url = "http://localhost:8090/com.nj.clg.persistence/rest/file/getRootFolders", 
//                    data = {};
//                    bs.doPostRequest( url, data, scb );
//                    function scb( resData ) {
//                        $scope.processResponseData( node, resData, cb );
//                    }
//                    /*bs.getJson( "app/modules/core/file-manager/file-manager.data.json", 
//                        function( list ) {
//                            var rootNodes = [];
//                            for( var i = 0; i < list.length; i++ ) {
//                                if( list[ i ].parent == "#" ) {
//                                    list[ i ].children = true;
//                                    rootNodes.push( list[ i ] );
//                                }
//                            }
//                            cb( rootNodes );
//                        } );*/
//                },
//                treeDataHandler: function( node, cb ) {
//                    var 
//                    nodeId = node.id, 
//                    thiz = this;
//
//                    if( nodeId === "#" ) {
//                        $scope.getRootNodes( node, function( rootNodes ) {
//                            cb.call( thiz, rootNodes );
//                        } );
//                    }
//                    else {
//                        $scope.getChildNodes( node, function( childNodes ) {
//                            cb.call( thiz, childNodes );
//                        } );
//                    }
//                },
//                jsTreeSelectHandler: function( e, data ) {
//                    vm.data.files = vm.data.parentChildMap[ data.node.id ];
//                    $scope.$apply();
//                }
//            },
//            vm.cfg = {
//                fmResCfg: {
//                    handles : "e",
//                    maxWidth : 500,
//                    minWidth : 100,
//                    resize : function( e, ui ) {
//                        $( ".clg-file-viewer" ).css( "width", "calc( 100% - " + 
//                            ( ui.element.width() + 3 ) + "px )" );
//                    }
//                },
//                treeCfg: {
//                    core: {
//                        themes: {
//                            name: "proton",
//                            responsive: true
//                        },
//                        data: $scope.treeDataHandler,
//                        check_callback: true
//                    },
//                    plugins : [ "wholerow", "contextmenu" ],
//                    contextmenu: {
//                        items: function( node, cb ) {
//                            var options = {
//                                CREATE: {
//                                    separator_before: true,
//                                    separator_after: true,
//                                    _disabled: false,
//                                    label: "Create",
//                                    action: function( option ) {
//                                        console.log( option );
//                                    },
//                                    //icon: "",
//                                    //shortcut: 113,
//                                    //shortcut_label: "F2",
//                                    submenu: {
//                                        FOLDER: {
//                                            separator_before: true,
//                                            separator_after: true,
//                                            _disabled: false,
//                                            label: "Folder",
//                                            action: function( option ) {
//                                                $( "#uni_modal" ).modal( "show" );
//                                            },
//                                            //icon: "",
//                                            //shortcut: 113,
//                                            //shortcut_label: "F2",
//                                            //submenu: {},
//                                            nodeInfo: node
//                                        },
//                                        FILE: {
//                                            separator_before: true,
//                                            separator_after: true,
//                                            _disabled: false,
//                                            label: "File",
//                                            action: function( option ) {
//                                                $( "#uni_modal" ).modal( "show" );
//                                            },
//                                            //icon: "",
//                                            //shortcut: 113,
//                                            //shortcut_label: "F2",
//                                            //submenu: {},
//                                            nodeInfo: node
//                                        }
//                                    },
//                                    nodeInfo: node
//                                },
//                                RENAME: {
//                                    separator_before: true,
//                                    separator_after: true,
//                                    _disabled: false,
//                                    label: "Rename",
//                                    action: function( option ) {
//                                        console.log( option );
//                                    },
//                                    //icon: "",
//                                    //shortcut: 113,
//                                    //shortcut_label: "F2",
//                                    //submenu: {},
//                                    nodeInfo: node
//                                },
//                                DELETE: {
//                                    separator_before: true,
//                                    separator_after: true,
//                                    _disabled: false,
//                                    label: "Delete",
//                                    action: function( option ) {
//                                        console.log( option );
//                                    },
//                                    //icon: "",
//                                    //shortcut: 113,
//                                    //shortcut_label: "F2",
//                                    //submenu: {},
//                                    nodeInfo: node
//                                }
//                            };
//                            cb( options );
//                        }
//                    }
//                }
//            };
//            return vm;
//        };
//        fileManagerModule.controller( appConfig.modules.core.fileManager.ctrl, 
//            [
//                appConfig.ngVars.scope,
//                appConfig.modules.core.services.backendService,
//                appConfig.ngVars.lss,
//                "x",
//                fileManagerCtrl 
//            ]
//        );
//    };
//    define( 
//        [ 
//            "jQuery", 
//            "fileManagerModule", 
//            "appConfig", 
//            "jQueryUI", 
//            "jsTree" 
//        ], 
//        requireCallback 
//    );
//} )();