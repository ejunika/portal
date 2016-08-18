( function( cxt, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "mdm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
//        fn( require( "ac" ), require( "hm" ) );
    }
    else {
        cxt.portal = cxt.portal || {};
        if( !cxt.portal.ac ) throw "app-config not found";
        fn( cxt.portal.ac, cxt.portal.ac.modules.modalDialog.module );
    }
} )( this, function( ac, mdm ) {
    mdm.controller( ac.controllers.modalDialog, [ 
        ac.ngVars.rootScope,
        ac.ngVars.scope,
        modalDialogCtrlFn 
    ] );
    function modalDialogCtrlFn( $rootScope, $scope ) {
        $scope.dirName = "Abc";
        $scope.init = function() {
            
        };
        $scope.onModalBtnClick = function( e, action ) {
            $rootScope.$broadcast( "addJsTreeNode", $scope.dirName );
        };
    }
} );