( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "cm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "cm" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.core.module );
    }
} )( this, function( ac, cm ) {
    cm.controller( ac.controllers.core, [ 
         ac.ngVars.scope,
         ac.services.request,
         ac.services.core,
         ac.ngVars.timeout,
         coreCtrl 
     ] );
     function coreCtrl( $scope, rs, cs, $timeout ) {
         $scope.init = function() {
             $scope.DIRECTORY = {
                 TYPE: {
                     ROOT_FOLDER: 1,
                     FOLDER: 2,
                     FILE: 3,
                     WORKSPACE: 4,
                     DASHBOARD: 5
                 }
             };
             $scope.modalDialog = {
                 title: "Create",
                 bInclude: "ngApp/file-manager/create-folder.view.html",
                 fBtns: [
                     {
                         label: "DONE",
                         action: "done"
                     }, 
                     {
                         label: "CANCEL",
                         action: "cancel"
                     }
                 ]
             };
             $scope.rootNodeInfo = {};
             $scope.cs = cs;
             $scope.$root.showLoader = false;
             $scope.fullMainMenu = false;
             $scope.mouseOverCnt = 0;
             cs.cxtMenuPosition = {};
             $scope.selectHelper = {
                 position: "absolute",
                 zIndex: "1000",
                 border: "1px solid #2196f3",
                 background: "rgba(33, 150, 243, 0.1)"
             };
             $scope.loggedInUser = {
                 rootDirectories: []
             };
//             debugger;
//             $scope.signUp();
             $scope.signIn();
         };
         $scope.alertOptions = {
             "time-out": { 
                 "toast-warning": 3000, 
                 "toast-error": 2000,
                 "toast-info": 3000,
                 "toast-success": 2000
             },
             "position-class": "toast-bottom-left"
         };
         $scope.toggleMainMenu = function( e, full ) {
             if( full ) {
                 $scope.mouseOverCnt++;
                 if( $scope.mouseOverCnt == 2 ) {
                     $scope.fullMainMenu = true;
                     $scope.mouseOverCnt = 0;
                 }
             }
             else {
                 $scope.fullMainMenu = false; 
             }
         };
         $scope.makeRootDirectories = function() {
             var rootDirectories = [
                 {
                     label: "My Documents",
                     description: "The root folder"
                 },
                 {
                     label: "Favourite Documents",
                     description: "The root folder"
                 },
                 {
                     label: "Public Documents",
                     description: "The root folder"
                 },
             ];
             for( var i = 0; i < rootDirectories.length; i++ ) {
                 $scope.createDirectoryInDb( 
                         rootDirectories[ i ].label, 
                         rootDirectories[ i ].description, 
                         null, 
                         $scope.DIRECTORY.TYPE.ROOT_FOLDER, 
                         function( rootDir ) {
                             $scope.loggedInUser.rootDirectories.push( rootDir );
                         } 
                 );
             }
         };
         $scope.signUp = function() {
             var reqUrl = rs.getUrl( "rest/login/register" ),
             reqData = {
                 fName: "Md",
                 mName: "Azaz",
                 lName: "Akhtar",
                 mobile: "7204584287",
                 emailId: "akhtar.azaz@live.com",
                 password: "password"
             },
             scb = function( resData ) {
                 console.log( resData );
             },
             ecb = function() {
                 
             };
             rs.doPostRequest( reqUrl, reqData, scb, ecb );
         };
         $scope.processRawNodes = function( node, rawNodes, cb ) {
             if( !node ) return false;
             var newNode, nodes = [],
             files = rawNodes;
             for( var i = 0; i < files.length; i++ ) {
                 newNode = {
                     id: files[ i ].id,
                     text: files[ i ].label,
                     parent: node.id,
                     children: true
                 };
                 nodes.push( newNode );
             }
             cb( nodes );
         };
         $scope.getRootDirectories = function( userId, cb ) {
             var reqUrl = rs.getUrl( "rest/directory/getRootDirectories/" + userId ),
             scb = function( resData ) {
                 if( cb && typeof cb === "function" ) {
                     cb( resData.data );
                 }
             },
             ecb = function() {
                 
             };
             rs.doGetRequest( reqUrl, scb, ecb );
         };
         $scope.signIn = function() {
             var reqUrl = rs.getUrl( "rest/login/doLogin" ),
             reqData = {
                 emailId: "akhtar.azaz@live.com",
                 password: "password"
//                 emailId: "sinha.vijeta@outlook.com",
//                 password: "pass"
             },
             scb = function( resData ) {
                 if( resData.status ) {
//                     debugger;
                     $scope.loggedInUser = resData.data[ 0 ];
                     $scope.getRootDirectories( resData.data[ 0 ].id, function( rootDir ) {
                         $scope.loggedInUser.rootDirectories = rootDir;
                         if( rootDir.length == 0 ) {
                             $scope.makeRootDirectories();
                         }
                         else {
                             $scope.processRawNodes( $scope.rootNodeInfo.node, rootDir, $scope.rootNodeInfo.cb );
                         }
                     } );
                 }
             },
             ecb = function() {
                 
             }
             rs.doPostRequest( reqUrl, reqData, scb, ecb );
         };
         $scope.createDirectoryInDb = function( name, description, pId, type, preview, cb ) {
             var reqUrl = rs.getUrl( "rest/directory/create" ),
             reqData = {
                 type: type,
                 status: 1,
                 parent: pId ? { id: pId }: null,
                 label: name,
                 description: description,
                 lastModified: new Date().getTime(),
                 creationTime: new Date().getTime(),
                 iconPath: "",
                 iconClass: "",
                 preview: preview,
                 owner: { 
                     id: $scope.loggedInUser.id
                 }
             },
             scb = function( resData ) {
                 if( resData.status ) {
                     if( cb && typeof cb === "function" ) {
                         cb( resData.data[ 0 ] );
                     }
                 }
                 console.log( resData );
             },
             ecb = function() {
                 
             }
             rs.doPostRequest( reqUrl, reqData, scb, ecb );
         }
     }
} );