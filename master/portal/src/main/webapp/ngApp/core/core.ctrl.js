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
             $scope.cs = cs;
             $scope.fullMainMenu = false;
             $scope.mouseOverCnt = 0;
             cs.cxtMenuPosition = {};
             $scope.selectHelper = {
                 position: "absolute",
                 zIndex: "1000",
                 border: "1px solid #2196f3",
                 background: "rgba(33, 150, 243, 0.1)"
             };
             $scope.loggedInUser = {};
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
                 
             }
             rs.doPostRequest( reqUrl, reqData, scb, ecb );
         };
         $scope.signIn = function() {
             var reqUrl = rs.getUrl( "rest/login/doLogin" ),
             reqData = {
                 emailId: "akhtar.azaz@live.com",
                 password: "password"
             },
             scb = function( resData ) {
                 if( resData.status ) {
                     $scope.loggedInUser = resData.data[ 0 ];
                 }
             },
             ecb = function() {
                 
             }
             rs.doPostRequest( reqUrl, reqData, scb, ecb );
         };
         $scope.createDirectoryInDb = function( name, description, pId, type, cb ) {
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