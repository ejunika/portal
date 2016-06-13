( function() {
	"use strict";
	var appConfig = {
		route: {
			login: {
				tUrl: "login.view.html",
				ctrl: "login.ctrl"
			},
			directory: {
				tUrl: "directory.view.html",
				ctrl: "directory.ctrl"
			},
			addEditLogin: {
				tUrl: "add-edit-login.view.html"
			},
			addEditDirectory: {
				tUrl: "add-edit-directory.view.html"
			}
		},
		serverInfo: {
			ip: "localhost",
			port: "8080",
			context: "portal"
		},
		urls: {
			getAllDirectories: "directory/getAll",
			getAllUser: "login/getAll"
		},
		fn: {
			getBaseUrl: function() {
				return "http://" + 
				appConfig.serverInfo.ip + 
				":" + 
				appConfig.serverInfo.port + 
				"/" + 
				appConfig.serverInfo.context + 
				"/rest/";
			}
		}
	};
	angular
		.module( "app", [ "ngRoute" ] )
		.constant( "app.config", appConfig )
		.config( [ "$routeProvider", "app.config", appConfigFn ] )
		.factory( "app.factory", [ "app.config", "$http", "$log", appFactoryFn ] )
		.controller( "app.ctrl", [ "$scope", "app.factory", appControllerFn ] )
		.controller( "login.ctrl", [ "$scope", "$location", "app.factory", loginControllerFn ] )
		.controller( "directory.ctrl", [ "$scope", "$location", "$timeout", "app.factory", directoryControllerFn ] );
	function appConfigFn( $routeProvider, appConfig ) {
		$routeProvider
			.when( "/login", {
				templateUrl: appConfig.route.login.tUrl,
				controller: appConfig.route.login.ctrl
			} )
			.when( "/directory", {
				templateUrl: appConfig.route.directory.tUrl,
				controller: appConfig.route.directory.ctrl
			} )
			.when( "/add-edit-directory", {
				templateUrl: appConfig.route.addEditDirectory.tUrl,
				controller: appConfig.route.directory.ctrl
			} )
			.when( "/add-edit-login", {
				templateUrl: appConfig.route.addEditLogin.tUrl,
				controller: appConfig.route.login.ctrl
			} )
			.otherwise( {
				redirectTo: "/login"
			} );
	}
	function appFactoryFn( appConfig, $http, $log ) {
		var appFact = {
			data: {},
			fn: {
				getUrl: function( service ) {
					return appConfig.fn.getBaseUrl() + appConfig.urls[ service ];
				},
				processRequest: function( url, method, data, scb, ecb ) {
					var cfg = {
						url: url,
						headers: {
							"Content-Type": "application/json"
						}
					};
					data ? cfg[ "data" ] = data: false;
					method ? cfg[ "method" ] = method: false;
					$http( cfg )
						.success( function( sData, sStatus, headers, sCfg ) {
							if( scb && typeof scb === "function" ) {
								scb( sData, sStatus, headers, sCfg );
							}
							else {
								$log.info( "Success callback is undefined or not a function" );
							}
						} )
						.error( function( eData, eStatus, headers, eCfg ) {
							if( ecb && typeof ecb === "function" ) {
								ecb( eData, eStatus, headers, eCfg );
							}
							else {
								$log.info( "Error callback is undefined or not a function" );
							}
						} );
				},
				doGet: function( url, scb, ecb ) {
					appFact.fn.processRequest( url, "GET", null, scb, ecb );
				},
				doPost: function( url, data, scb, ecb ) {
					appFact.fn.processRequest( url, "POST", DATA, scb, ecb );
				},
				doDelete: function( url, data, scb, ecb ) {
					appFact.fn.processRequest( url, "DELETE", data, scb, ecb );
				},
				doPut: function( url, data, scb, ecb ) {
					appFact.fn.processRequest( url, "PUT", data, scb, ecb );
				}
			}
		};
		return appFact;
	}
	function appControllerFn( $scope, $location, appFact ) {
	
	}
	function loginControllerFn( $scope, $location, appFact ) {
		$scope.init = function() {
			var url = appFact.fn.getUrl( "getAllUser" );
			appFact.fn.doGet( url, scb );
			function scb( rData ) {
				$scope.logins = rData.data;
				appFact.data.logins = rData.data;
			}
		};
		$scope.openAddEditLogin = function( e ) {
			$location.path( "/add-edit-login" );
		};
	}
	function directoryControllerFn( $scope, $location, $timeout, appFact ) {
		$scope.init = function() {
			var url = appFact.fn.getUrl( "getAllDirectories" );
			appFact.fn.doGet( url, scb );
			function scb( rData ) {
				$scope.directories = rData.data;
				appFact.data.directories = rData.data;
			}
		};
		$scope.logins = appFact.data.logins;
		$scope.selectedOwner = $scope.logins ? $scope.logins[ 0 ] : "";
		$scope.dirType = [
		    {
		    	id: 1,
		    	label: "Root Folder"
		    },
		    {
		    	id: 2,
		    	label: "Folder"
		    },
		    {
		    	id: 3,
		    	label: "File"
		    }
		];
		$scope.selectedType = $scope.dirType[ 0 ];
		$scope.openAddEditDirectory = function( e, d ) {
			$location.path( "/add-edit-directory" );
		};
	}
} )();