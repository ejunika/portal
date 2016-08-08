( function( ctx, fn ) {
    "use strict";
    if( typeof define == "function" && define.amd ) {
        define( [ "ac", "cm" ], fn );
    }
    else if( typeof module == "object" && module.exports ) {
        
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.core.module );
    }
} )( this, function( ac, cm ) {
    cm.service( ac.services.request, [
        ac.ngVars.rootScope,
        ac.ngVars.http,
        requestSrvcFn
    ] );
    function requestSrvcFn( $rootScope, $http ) {
        var rs = this;ac
        rs.loginInfo = {};
      
        rs.getUrl = function( act ) {
            return rs.getBaseUrl() + act;
        };
        rs.getBaseUrl = function() {
            var bUrl = "http://";
            bUrl += ac.serverInfo.ip + ":";
            bUrl += ac.serverInfo.port + "/";
            bUrl += ac.serverInfo.contextPath + "/";
            return bUrl;
        };
        rs.getJson = function( fileUrl, sCallback ) {
            rs.doGetRequest( fileUrl, sCallback );
        };
        rs.getRequestHeaders = function() {
            var headers = {}, userAuth;
            // headers[ "Content-Type" ] = "application/x-www-form-urlencoded";
            headers[ "Content-Type" ] = "application/json";
            
            try {
                userAuth = rs.loginInfo.userAuth;
                if( userAuth ) {
                    headers[ "authtoken" ] = userAuth.authToken;
                    headers[ "spacekey" ] = userAuth.spaceKey;
                    headers[ "userid" ] = userAuth.id;
                    return headers;
                }
            }
            catch( error ) {
                console.error( error );
                return headers;
            }
            return headers;
        };
        rs.doRequest = function( config, sCallbackFn, eCallbackFn ) {
            var defSettings = {
                method: "GET",
                traditional: true,
                crossDomain: true,
                async: true,
                //transformRequest function is needed 
                //if the "Content-Type": "application/x-www-form-urlencoded"
                // transformRequest: transformRequestFn,
                headers: rs.getRequestHeaders() || {}
            },
            transformRequestFn = function( obj ) {
                var str = [];
                for( var p in obj ) {
                    str.push( encodeURIComponent( p ) + 
                            "=" + 
                            encodeURIComponent( obj[ p ] ) );
                }
                return str.join( "&" );
            },
            settings = angular.extend( {}, defSettings, config );
            $rootScope.showLoader = true;
            $http( settings )
            .success( function( resData, resStatus, resHeaders, cnf ) {
                if( sCallbackFn && typeof (sCallbackFn) === "function" ) {
                    sCallbackFn( resData, resStatus, resHeaders, cnf );
                }
                $rootScope.showLoader = false;
            } )
            .error( function( resData, resStatus, resHeaders, cnf ) {
                console.info( "$http request ERROR!!!" );
                if( eCallbackFn && typeof (eCallbackFn) === "function" ) {
                    eCallbackFn( resData, resStatus, resHeaders, cnf );
                }
                $rootScope.showLoader = false;
            } );
        };
        rs.doPostRequest = function( reqUrl, reqData, sCallbackFn, eCallbackFn ) {
            var config = {
                url: reqUrl,
                data: reqData,
                method: "POST",
            };
            rs.doRequest( config, 
                function( sData, sStatus, x, y ) {
                    if( sCallbackFn && typeof( sCallbackFn ) === "function" ) {
                        sCallbackFn( sData, sStatus, x, y );
                    }
                }, 
                function( sData, sStatus, x, y ) {
                    if( eCallbackFn && typeof( eCallbackFn ) === "function" ) {
                        eCallbackFn( sData, sStatus, x, y );
                    }
                } 
            );
        };
        rs.doPostRequest4Json = function( reqUrl, reqData, sCallbackFn, eCallbackFn ) {
            var config = {
                url: reqUrl,
                data: reqData,
                method: "POST",
            };
            rs.doRequest( config, 
                function( sData, sStatus, x, y ) {
                    if( sCallbackFn && typeof( sCallbackFn ) === "function" ) {
                        sCallbackFn( sData, sStatus, x, y );
                    }
                }, 
                function( sData, sStatus, x, y ) {
                    if( eCallbackFn && typeof( eCallbackFn ) === "function" ) {
                        eCallbackFn( sData, sStatus, x, y );
                    }
                } 
            );
        };
        rs.doGetRequest = function( reqUrl, sCallbackFn, eCallbackFn ) {
            var config = {
                url: reqUrl,
                method: "GET",
            };
            rs.doRequest( config, 
                function( sData, sStatus, x, y ) {
                    if( sCallbackFn && typeof( sCallbackFn ) === "function" ) {
                        sCallbackFn( sData, sStatus, x, y );
                    }
                }, 
                function( sData, sStatus, x, y ) {
                    if( eCallbackFn && typeof( eCallbackFn ) === "function" ) {
                        eCallbackFn( sData, sStatus, x, y );
                    }
                } 
            );
        };
    }
} );