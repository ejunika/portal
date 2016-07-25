( function( ctx, fn ) {
    "use strict";
    if( typeof define === "function" && define.amd ) {
        define( [ "ac", "dm" ], fn );
    }
    else if( typeof module === "object" && module.exports ) {
//        module.exports = fn( require( "ac" ), require( "dm" ) );
    }
    else {
        ctx.portal = ctx.portal || {};
        if( !ctx.portal.ac ) throw "app-config not found";
        fn( ctx.portal.ac, ctx.portal.ac.modules.designer.module );
    }    
} )( this, function( ac, dm ) {
     dm.controller( ac.controllers.designer, [ 
         ac.ngVars.scope,
         ac.ngVars.timeout,
         "$parse",
         ac.services.core,
         ac.services.request,
         designerCtrlFn 
     ] );
     function designerCtrlFn( $scope, $timeout, $parse, cs, rs ) {
         $scope.init = function() {
             var wedPath = ac.jsonPath.widgetExpData;
             $scope.openTabs = [];
             $scope.openDashboardIds = [];
             $scope.selectedDashboardId = "";
             $scope.dashboardMap = {};
             $scope.tabMap = {};
             $scope.wExpGrLastClicked = {};
             $scope.dsBuilderVisible = false;
//             $scope.dragging = false;
             $scope.wExpItemDragCfg = {
                 helper: "clone",
                 appendTo: "body"
             };
             $scope.dashboardResizeConfig = {
                 create: function( e, ui ) {
                     
                 },
                 resize: function( e, ui ) {
                     
                 },
                 start: function( e, ui ) {
                     
                 },
                 stop: function( e, ui ) {
                     var dashboard = $scope.getSelectedDashboard();
                     $timeout( function( dashboard ) {
                         dashboard.Layout.height = ui.size.height;
                         dashboard.Layout.width = ui.size.width;
                     }, 0, true, dashboard );
                 }
             };
             $scope.registerHotkeys();
             rs.getJson( wedPath, scb );
             function scb( jsonData ) {
                 $scope.widgetExpGroups = jsonData.groups;
                 $timeout( function() {
                     angular.element( $(".d-w-group-wrapper .active") ).click();
                 }, 0 );
             }
         };
         $scope.fDragConfig = {
//             helper: function() {
//               return "<img style='height: 20px; width: 20px' src='images/field.png' />";  
//             }
             helper: "clone"
         };
         $scope.fDropConfig = {
             drop: function( e, ui ) {
                 var dropRegion = e.target.id, field = ui.draggable.data( "dragData" ), 
                 cloneField = angular.copy( field ), 
                 dim = {
                     label: cloneField.label,
                     id: cloneField.id,
                     isVisible: true
                 }, 
                 mes = {
                     label: cloneField.label,
                     id: cloneField.id,
                     isVisible: true,
                     color: cs.getRandomHexColor(),
                     opacity: 1
                 };
                 dataSets = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets;
                 $timeout( function( dataSets ) {
                     if( dropRegion == "DIMS" ) {
                         if( dataSets[ 0 ].dimensions.length == 0 
                                 && !cs.isDuplicateInArray( dataSets[ 0 ].dimensions, cloneField, "id" ) ) {
//                             $scope.selectField( false, cloneField );
                             $scope.selectField( false, dim );
//                             dataSets[ 0 ].dimensions.push( cloneField );
                             dataSets[ 0 ].dimensions.push( dim );
                         }
                     }
                     else {
                         if( !cs.isDuplicateInArray( dataSets[ 0 ].measures, cloneField, "id" ) ) {
//                             $scope.selectField( false, cloneField );
                             $scope.selectField( false, mes );
//                             dataSets[ 0 ].measures.push( cloneField );
                             dataSets[ 0 ].measures.push( mes );
                         }
                         else {
                             console.info( "Duplicate field!!" );
                         }
                     }
                 }, 0, true, dataSets );
             }
         };
//       TODO commonly used utility functions
         $scope.getDashboard = function( dbId ) {
             return $scope.dashboardMap[ dbId ];
         };
         $scope.getSelectedDashboard = function() {
             return $scope.dashboardMap[ $scope.selectedDashboardId ];
         };
         $scope.getWidgetsOfSelectedDashboard = function() {
             var dashboard = $scope.getSelectedDashboard(), widgets = [];
             if( typeof dashboard == "object" ) {
                 widgets = dashboard.Layout.widgets;
             }
             return widgets;
         };
         $scope.getSelectedWidgetsFromSelectedDashboard = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard(), sWidgets = [];
             for( var i = 0; i < widgets.length; i++ ) {
                 if( widgets[ i ].selected ) {
                     sWidgets.push( widgets[ i ] );
                 }
             }
             return sWidgets;
         };
         $scope.isDashboardOpen = function( dbId ) {
             return $scope.dashboardMap.hasOwnProperty( dbId );
         };
         $scope.isRefWidget = function( widget ) {
             return $scope.getSelectedDashboard().sWidgetIds.length > 1 &&
             $scope.getSelectedDashboard().sWidgetIds[ 0 ] == widget.id;
         };
         $scope.openDatasetBuilder = function() {
             $scope.dsBuilderVisible = true;
         };
         $scope.closeDatasetBuilder = function() {
             $scope.dsBuilderVisible = false;
         };
         $scope.registerHotkeys = function() {
             cs.addHotkeys( {
                 combo: "ctrl+a",
                 description: "Select all widgets",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.selectAllWidget();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+up",
                 description: "Align Top",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.alignTop();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+right",
                 description: "Align Right",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.alignRight();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+down",
                 description: "Align Bottom",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.alignBottom();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+left",
                 description: "Align Left",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.alignLeft();
                 }
             } );
             cs.addHotkeys( {
                 combo: "=+h",
                 description: "Equal Height",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.equalHeight();
                 }
             } );
             cs.addHotkeys( {
                 combo: "=+w",
                 description: "Equal Width",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.equalWidth();
                 }
             } );  
             cs.addHotkeys( {
                 combo: "del",
                 description: "Remove all selected widgets",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.removeAllSelectedWidgets();
                 }
             } );
             cs.addHotkeys( {
                 combo: "right",
                 description: "Move Right",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.moveRight();
                 }
             } );
             cs.addHotkeys( {
                 combo: "left",
                 description: "Move Left",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.moveLeft();
                 }
             } );
             cs.addHotkeys( {
                 combo: "up",
                 description: "Move Up",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.moveUp();
                 }
             } );
             cs.addHotkeys( {
                 combo: "down",
                 description: "Move Down",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.moveDown();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+b",
                 description: "Send to back",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.sendToBack();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+shift+b",
                 description: "Send backward",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.sendBackward();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+f",
                 description: "Send to front",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.bringToFront();
                 }
             } );
             cs.addHotkeys( {
                 combo: "ctrl+shift+f",
                 description: "Send forward",
                 callback: function( e, hKeys ) {
                     e.preventDefault();
                     $scope.bringForward();
                 }
             } );
         };
         $scope.doPreview = function( e ) {
             $scope.preview = true;
         };
//       TODO PROPERTY PALETTE
         $scope.enablePropPanel = false;
         $scope.clickedPropGroup = {};
         $scope.overflowHidden = true;
         $scope.listVisible = true;
         $scope.fbCfg = {
             colors: [
                 "#FF0000", 
                 "#5C97BF", 
                 "#4ECDC4", 
                 "#00F910", 
                 "#A2DED0", 
                 "#87D37C", 
                 "#0000FF", 
                 "#90C695",
                 "#26A65B"
             ],
             fonts: [
                 "Arial",
                 "Verdna",
                 "Cursive",
                 "Ubuntu"
             ],
             minSize: 1,
             maxSize: 72
         };
         $scope.font  = {
             fFamily: "Ubuntu",
             fSize: 15,
             fColor: "green",
             fStyle: "none",
             fWeight: "normal",
             fDecoration: "none"
         };
         $scope.propGroups = [
             {
                 label: "General",
                 props: [
                     {
                         label: "Title font",
                         type: "font",
                         value: {
                             fFamily: "Cursive",
                             fSize: 13,
                             fColor: "red",
                             fStyle: "italic",
                             fWeight: "bold",
                             fDecoration: "underline"
                         }
                     },
                     {
                         label: "Left",
                         type: "numSpinner",
                         min: 0,
                         max: 1000,
                         step: 1,
                         value: 5
                     },
                     {
                         label: "Top",
                         type: "numSpinner",
                         min: 0,
                         max: 1000,
                         step: 1,
                         value: 5
                     },
                     {
                         label: "Height",
                         type: "numSpinner",
                         min: 0,
                         max: 1000,
                         step: 1,
                         value: 5
                     },
                     {
                         label: "Width",
                         type: "numSpinner",
                         min: 0,
                         max: 1000,
                         step: 1,
                         value: 5
                     },
                     {
                         label: "Visible",
                         type: "checkbox",
                         value: true
                     }
                 ]
             },
             {
                 label: "Chart"
             },
             {
                 label: "Style"
             },
             {
                 label: "Formatter"
             }
         ];
         $scope.showProperties = function( propFor ) {
             switch( propFor ) {
                 case "WIDGET":
                     $scope.setRightPane( "PROPS", "WIDGET" );
                     break;
                 case "DASHBOARD":
                     $scope.setRightPane( "PROPS", "DASHBOARD" );
                     break;
                 default:
                     break;
             }
             $scope.toggleRightPane( false );
         };
         $scope.showWidgetExp = function() {
             $scope.setRightPane( "WID_EXP" );
             $scope.toggleRightPane( false );
         };
         $scope.listProperty = function( e, pg ) {
             if( pg ) {
                 $scope.clickedPropGroup = pg;
             }
             $scope.enablePropPanel = !$scope.enablePropPanel;    
         };
         $scope.propNgModel = {};
         $scope.changeNgModel = function() {
             for( var i = 0; i < $scope.propGroups.length; i++ ) {
                 $scope.propGroups[ i ].props = angular.copy( $scope.propGroups[ i ].props );
             }
         };
         $scope.setNgModel = function( propId, objPath ) {
             var dashboard = $scope.getSelectedDashboard(), 
             widget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ];
             $scope.propNgModel[ propId ] = objPath ? $parse( objPath )( widget ): widget;
         };
         $scope.onPropChange = function() {
             var dashboard = $scope.getSelectedDashboard(),
             wId = dashboard.sWidgetIds[ 0 ],
             canvasObj = dashboard.Info.ObjMap[ wId ];
             canvasObj.render();
         };
         $scope.updatePropertyPalette = function( propFor ) {
             var widget, dashboard, propDataUrl = "ngApp/designer/widget-prop/line-chart.prop.json";
             if( propFor == "WIDGET" ) {
                 widget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ];
             }
             else {
                 dashboard = $scope.getSelectedDashboard();
             }
             rs.getJson( propDataUrl, scb );
             function scb( propData ) {
                 $scope.propGroups = propData;
             }
         };
         $scope.setRightPane = function( pane, paneFor ) {
             switch( pane ) {
                 case "WID_EXP":
                     $scope.showWidExp = true;
                     $scope.showProps = false;
                     break;
                 case "PROPS":
                     $scope.updatePropertyPalette( paneFor )
                     $scope.showWidExp = false;
                     $scope.showProps = true;
                     break;
                 default:
                     break;
             }
         };
//       TODO DATA PROVIDER
         $scope.selectField = function( e, field ) {
             var sField = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ].sField;
             sField.selected = false;
             field.selected = true;
             $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ].sField = field;
         };
         $scope.removeDimension = function( e, dim ) {
             var dims = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ].dimensions;
             if( dim.selected ) {
                 $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ].sField = { selected: false };
             }
             cs.removeFromArray( dims, dim );
         };
         $scope.removeMeasure = function( e, mes ) {
             var mesz = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ].measures;
             if( mes.selected ) {
                 $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ].sField = { selected: false };
             }
             cs.removeFromArray( mesz, mes );
         };
         $scope.onChangeDataProvider = function( e, sDataProvider ) {
             var dataSet = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ].dataSets[ 0 ];
             dataSet.DataProvider.Connection.id = sDataProvider.id;
             dataSet.DataProvider.Sheet.id = sDataProvider.id;
         };
         $scope.setSelectedDataProvider = function() {
             var widget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ], 
             dataSet = widget.dataSets[ 0 ],
             cId = dataSet.DataProvider.Connection.id,
             offLineConns = $scope.getSelectedDashboard().DataProvider.Offline.connections;
             $scope.sDataProvider = cs.filterItemInList( offLineConns, "id", cId )[ 0 ];
         };
         
//       TODO WIDGET EXPLORER
         $scope.listWidget = function( e, g ) {
             $scope.widgetList = g.widgets;
         };
         $scope.movePointer = function( e, g ) {
             var left = $( e.target ).closest( "li" ).position().left + 5;
             $( ".pointer" ).css( "left", left );
         };
         $scope.groupClicked = function( e, g ) {
             $scope.wExpGrLastClicked.active = false;
             g.active = true;
             $scope.wExpGrLastClicked = g;
             $scope.listWidget( e, g );
             $scope.movePointer( e, g );
         };
         $scope.saveDashboard = function( e ) {
             cs.alert( "error", "Designer", "Service Error!!" );
         };
         $scope.previewDashboard = function( e ) {
             $scope.preview = true;
             cs.alert( "info", "Designer", "Preview enabled!!" );
             var dashboard = $scope.getSelectedDashboard(), 
             dJson = angular.copy( dashboard );
             $( ".d-preview-wrapper" ).find( "iframe" ).remove();
             $( ".d-preview-wrapper" ).append( $( "<iframe src='preview.html'></iframe>" ) );
             $timeout( function( dJson ) {
                 window.frames[0].frameElement.contentWindow.doPreview( dJson );
             }, 1000, false, dJson );
         };
         $scope.closePreview = function( e ) {
             $scope.preview = false;
         };
         $scope.toggleRightPane = function( e ) {
             var 
             $rightPane = $( ".d-right-pane" ),
             $dashboardWrapper = $( ".d-dashboard-wrapper" );
             
             if( $rightPane.hasClass( "d-right-pane-hide" ) ) {
                 $rightPane.removeClass( "d-right-pane-hide" );
                 $dashboardWrapper.removeClass( "d-dashboard-wrapper-full" );
             }
             else {
                 $rightPane.addClass( "d-right-pane-hide" );
                 $dashboardWrapper.addClass( "d-dashboard-wrapper-full" );
             }
         };
         $scope.notify = function( type, obj ) {
             switch( type ) {
                 case "ADD_DASHBOARD":
                     $scope.openDashboardIds.push( obj.id );
                     $scope.dashboardMap[ obj.id ] = obj;
                         $('a[data-toggle="tab"]')
                             .off('shown.bs.tab')
                             .on('shown.bs.tab', function (e) {
                                 if( !e.target.id ) return false;
                                 var dbId = $(e.target)[ 0 ].id.split( "_" )[ 1 ];
                                 $timeout( function( dbId ) {
                                     $scope.selectedDashboardId = dbId;
                                 }, 0, true, dbId );
                             })
                             .off('show.bs.tab')
                             .on('show.bs.tab', function (e) {
                                 if( $( e.target ).parent().hasClass( "disabled" ) ) {
                                     return false;
                                 }
                             });
                         $( "#TAB_" + obj.id ).click();
                         cs.alert( "success", "Designer", obj.Layout.title + " Added" );
                     break;
                 case "REMOVE_DASHBOARD":
                     var indexInOpenDashboardIds = $scope.openDashboardIds.indexOf( obj.id );
                     $scope.openDashboardIds.splice( indexInOpenDashboardIds, 1 );
                     delete $scope.dashboardMap[ obj.id ];
                     if( $scope.openDashboardIds.length > indexInOpenDashboardIds ) {
                         $scope.selectedDashboardId = $scope.openDashboardIds[ indexInOpenDashboardIds ];
                     }
                     else {
                         $scope.selectedDashboardId = $scope.openDashboardIds[ $scope.openDashboardIds.length - 1 ];
                     }
                     $timeout( function() {
                         $( "#TAB_" + $scope.selectedDashboardId ).click();
                         cs.alert( "info", "Designer", obj.Layout.title + " Removed" );
                     }, 0 );
                     break;
                 case "OPEN_OTHER_TAB":
                     $timeout( function() {
                         $( "#TAB_" + obj.id ).click();
                         cs.alert( "info", "Designer", obj.title + " Mode" );
                     }, 0 );
                     break;
                 case "REMOVE_SPECIAL_TAB":
                     $scope.isto = false;
                     break;
                 default:
                     break;
             }
         };
         $scope.getDashboardDimention = function() {
        	 var $tabContainer = $( ".d-tab-content-pane" );
        	 return {
        		 height: $tabContainer.height() - 5,
        		 width: $tabContainer.width() - 5
        	 };
         };
         $scope.addDashboard = function( tab ) {
             var filePath = ac.jsonPath.dashboardData, dimesion;
             rs.getJson( filePath, scb );
             function scb( dashboard ) {
            	 dimension = $scope.getDashboardDimention();
                 dashboard.id = tab.id;
                 dashboard.Layout.title = tab.title;
                 dashboard.Layout.gredientColor = "#0000";
                 dashboard.Layout.gredientRotation = "90";
                 dashboard.Layout.height = dimension.height;
                 dashboard.Layout.width = dimension.width;
                 $scope.notify( "ADD_DASHBOARD", dashboard );
             }
         };
         $scope.openTab = function( e, type ) {
             var tab = {};
             if( type == "DASHBOARD" && $scope.openDashboardIds.length < 4 ) {
                 tab = {
                     type: 0,
                     id: cs.getUniqueId(),
                     title: "Untitled_" + ( $scope.openTabs.length + 1 )
                 };
                 $scope.openTabs.push( tab );
                 $scope.addDashboard( tab );
             }
             else {
                 switch( type ) {
                     case "MANAGE":
                         tab = {
                             type: 1,
                             id: cs.getUniqueId(),
                             title: "Manage"
                         };
                         break;
                     case "SETTINGS":
                         tab = {
                             type: 2,
                             id: cs.getUniqueId(),
                             title: "Settings"
                         };
                         break;
                     default:
                         break;
                 }
                 if( $scope.isto && $scope.openTabs[ 0 ].type != 0 ) {
                     $scope.openTabs.splice( 0, 1 );
                 }
                 cs.insertAt( $scope.openTabs, tab, 0 );
                 $scope.isto = true;
                 $scope.loadSpecialPage( tab );
                 $scope.notify( "OPEN_OTHER_TAB", tab );
//               TODO Load special page as tab content
//               NOTE only one special page can be load at a time, write logic for it.
             }
         };
         $scope.loadSpecialPage = function( tab ) {
             
         };
         $scope.closeTab = function( e, tab ) {
             var dashboard = $scope.dashboardMap[ tab.id ];
             cs.removeFromArray( $scope.openTabs, tab );
             if( tab.type != 1 ) {
                 $scope.notify( "REMOVE_DASHBOARD", dashboard );
             }
             else {
                 $scope.notify( "REMOVE_SPECIAL_TAB", tab );
             }
         };
         $scope.openSettings = function( e ) {
             
         };
         $scope.updateOptions = function( widget ) {
             widget.Options.data[ 0 ].type = widget.cjsObjName;
             return widget;
         };
         $scope.addWidget = function( widget, isNew ) {
             rs.getJson( "ngApp/designer/widget/column-chart.data.json", scb );
             function scb( jsonData ) {
                 widget.Options = jsonData;
                 widget = $scope.updateOptions( widget );
                 if( isNew ) {
                     $scope.getWidgetsOfSelectedDashboard().push( widget );
                     $timeout( function() {
                         cs.alert( "success", "Designer", widget.wName + " Added" );
                     }, 0, true, widget );
                     if( widget.selected ) {
                         $scope.selectWidget( widget );
                     }
                 }
             }
         };
         $scope.removeWidget = function( widget ) {
             var wIndex = $scope.getWidgetsOfSelectedDashboard().indexOf( widget ), 
             wName = widget.wName;
             if( wIndex != -1 ) {
                 $scope.getWidgetsOfSelectedDashboard().splice( wIndex, 1 );
                 $timeout( function() {
                     cs.alert( "success", "Designer", wName + " Removed" );
                 }, 0 );
             }
         };
         $scope.removeFromSWidgets = function( wId ) {
             var dashboard = $scope.getSelectedDashboard(),
             sWidgetIds = dashboard.sWidgetIds,
             index = sWidgetIds.indexOf( wId );
             if( index != -1 ) {
                 sWidgetIds.splice( index, 1 );
             }
         };
         $scope.removeAllSelectedWidgets = function() {
             var widgets = $scope.getSelectedWidgetsFromSelectedDashboard();
             for( var i = 0; i < widgets.length; i++ ) {
                 $scope.removeWidget( widgets[ i ] );
                 $scope.removeFromSWidgets( widgets[ i ].id );
             }
         };
         $scope.openDashboard = function( dashboard ) {
             if( $scope.isDashboardOpen( dashboard.id ) ) {
                 $timeout( function() {
                     cs.alert( "error", "Designer", "Dashboard is already opened" );
                     $( "#TAB_" + dashboard.id ).click();
                 }, 0 );
                 return false;
             };
             var tab = {
                 type: 0,
                 id: dashboard.id,
                 title: dashboard.Layout.title
             };
             $scope.openTabs.push( tab );
             $scope.$apply();
             $timeout( function() {
                 var widgets = dashboard.Layout.widgets;
                 $scope.openDashboardIds.push( dashboard.id );
                 $scope.dashboardMap[ dashboard.id ] = dashboard;
                 $scope.selectedDashboardId = dashboard.id;
                 for( var i = 0; i < widgets.length; i++ ) {
                     $scope.addWidget( widgets[ i ] );
                 }
                 $( "#TAB_" + dashboard.id ).click();
             }, 0, true, dashboard );
             $('a[data-toggle="tab"]')
                 .off('shown.bs.tab')
                 .on('shown.bs.tab', function (e) {
                     if( !e.target.id ) return false;
                     var dbId = $(e.target)[ 0 ].id.split( "_" )[ 1 ];
                     $timeout( function( dbId ) {
                         $scope.selectedDashboardId = dbId;
                     }, 0, true, dbId );
                 })
                 .off('show.bs.tab')
                 .on('show.bs.tab', function (e) {
                     if( $( e.target ).parent().hasClass( "disabled" ) ) {
                         return false;
                     }
                 });
             cs.alert( "success", "Designer", dashboard.Layout.title + " has been loaded" );
         };
         $scope.openFromLocal = function( e ) {
             $("<input type='file' accept='.njd'>")
             .on( "change", onChangeFileBrowser )
             .trigger( "click" );
             function onChangeFileBrowser( e ) {
                 var f = e.target.files[ 0 ],
                 fileReader = new FileReader();
                 fileReader.onload = onFileReadSuccess;
                 fileReader.readAsText( f );
                 function onFileReadSuccess( result ) {
                     var dashboard = angular.fromJson( result.currentTarget.result );
                     $scope.openDashboard( dashboard );
                 }
             }
         };
         $scope.exportToLocalDisk = function( e, dbId ) {
             var data = angular.copy( $scope.getSelectedDashboard() ), 
             widgets = data.Layout.widgets,
             fileName = data.Layout.title + ".njd",
             dataToExport, enData, downloadLink, blob;
             delete data.Info.ObjMap;
             delete data.Info.WidgetMap;
             for( var i = 0; i < widgets.length; i++ ) {
                 delete widgets[ i ].Options;
             }
             dataToExport = angular.toJson( data ); 
             /*Check for IE*/
             if( /*@cc_on!@*/ false || !!document.documentMode ) {
                 blob = new Blob( [ dataToExport ] );
                 navigator.msSaveBlob( blob, fileName );
             }
             /*Check for  SAFARI */
             else if( Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 ) {
                 enData = "data:application/...," + encodeURIComponent( dataToExport );
                 location.replace( enData );
             }
             else {
                 blob = new Blob( [ dataToExport ], { type: "text/plain" } );
                 downloadLink = document.createElement( "a" );
                 downloadLink.href = URL.createObjectURL( blob );
                 downloadLink.download = fileName;
                 document.body.appendChild( downloadLink );
                 downloadLink.click();
                 document.body.removeChild( downloadLink );
             }
             cs.alert( "success", "Designer", data.Layout.title + " has been exported as "+ fileName +" to locak disk" );
         };
//       Selection Operations
         $scope.isSelectedWidget = function( w ) {
             return $scope.getSelectedDashboard().sWidgetIds.indexOf( w.id ) != -1;
         };
         $scope.selectWidget = function( w ) {
             if( w ) {
                 w.selected = true;
                 $scope.getSelectedDashboard().sWidgetIds.push( w.id );
                 $scope.setSelectedDataProvider();
                 $scope.changeNgModel();
             }
         };
         $scope.deSelectWidget = function( w ) {
             var index = $scope.getSelectedDashboard().sWidgetIds.indexOf( w.id );
             if( index != -1 ) {
                 w.selected = false;
                 $scope.getSelectedDashboard().sWidgetIds.splice( index, 1 );
             }
         };
         $scope.selectAllWidget = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard();
             for( var i = 0; i < widgets.length; i++ ) {
                 $scope.selectWidget( widgets[ i ] );
             }
         };
         $scope.deSelectAllWidget = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard();
             for( var i = 0; i < widgets.length; i++ ) {
                 $scope.deSelectWidget( widgets[ i ] );
             }
         };
         $scope.handleWidgetSelection = function( e, w ) {
             var ctrlKey = e ? e.ctrlKey: false, 
             isSelected = w.selected, 
             multiSelected = $scope.getSelectedWidgetsFromSelectedDashboard().length > 1 ? true: false;
             if( ctrlKey ) {
                 if( isSelected ) {
                     $scope.deSelectWidget( w );
                 }
                 else {
                     $scope.selectWidget( w );
                 }
             }
             else {
                 $scope.deSelectAllWidget();
                 if( multiSelected ) {
                     $scope.selectWidget( w );
                 }
                 else if( !isSelected ) {
                     $scope.selectWidget( w );
                 }
             }
         };
//       TODO  Alignment Operations
         $scope.alignLeft = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, refWidgetLeft = 0;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];    
                 if( i == 0 ) {
                     refWidgetLeft = widget.left;
                 }
                 else {
                     widget.left = refWidgetLeft;
                 }
             }
         };
         $scope.alignRight = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, refWidgetRightEdge = 0;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];    
                 if( i == 0 ) {
                     refWidgetRightEdge = widget.left + widget.width;
                 }
                 else {
                     widget.left = ( refWidgetRightEdge - widget.width );
                 }
             }
         };
         $scope.alignTop = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, refWidgetTop = 0;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];    
                 if( i == 0 ) {
                     refWidgetTop = widget.top;
                 }
                 else {
                     widget.top = refWidgetTop;
                 }
             }
         };
         $scope.alignBottom = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, refWidgetBottomEdge = 0;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];    
                 if( i == 0 ) {
                     refWidgetBottomEdge = widget.top + widget.height;
                 }
                 else {
                     widget.top = refWidgetBottomEdge - widget.height;
                 }
             }
         };
         $scope.alignCenterV = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, rVerticalCenter = 0;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];    
                 if( i == 0 ) {
                     rVerticalCenter = widget.top + ( widget.height / 2 );
                 }
                 else {
                     widget.top = rVerticalCenter - ( widget.height / 2 );
                 }
             }
         };
         $scope.alignCenterH = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, rHorizontalCenter = 0;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 if( i == 0 ) {
                     rHorizontalCenter = widget.left + ( widget.width / 2 );
                 }
                 else {
                     widget.left = rHorizontalCenter - ( widget.width / 2 );
                 }
             }
         };
         $scope.equalDisanceH = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard, rWidget, tWidget, hDiff ;
             if( sWidgetIds.length > 2 ) {
                 dashboard = $scope.getSelectedDashboard();
                 rWidget = dashboard.Info.WidgetMap[ sWidgetIds[ 0 ] ];
                 tWidget = dashboard.Info.WidgetMap[ sWidgetIds[ 1 ] ];
                 hDiff = tWidget.left - ( rWidget.left + rWidget.width );
                 for( var i = 2; i < sWidgetIds.length; i++ ) {
                     rWidget = tWidget;
                     tWidget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                     tWidget.left = rWidget.left + rWidget.width + hDiff;
                 }
             }
         };
         $scope.equalDisanceV = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard, rWidget, tWidget, vDiff = 0;
             if( sWidgetIds.length > 2 ) {
                 dashboard = $scope.getSelectedDashboard();
                 rWidget = dashboard.Info.WidgetMap[ sWidgetIds[ 0 ] ];
                 tWidget = dashboard.Info.WidgetMap[ sWidgetIds[ 1 ] ];
                 hDiff = tWidget.top - ( rWidget.top + rWidget.height );
                 for( var i = 2; i < sWidgetIds.length; i++ ) {
                     rWidget = tWidget;
                     tWidget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                     tWidget.top = rWidget.top + rWidget.height + vDiff;
                 }
             }
         };
         $scope.equalHeight = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, refWidgetHeight = 0, canvasObj;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 if( i == 0 ) {
                     refWidgetHeight = widget.height;
                 }
                 else {
                     widget.height = refWidgetHeight;
                     $timeout( function( wId ) {
                         canvasObj = dashboard.Info.ObjMap[ wId ];
                         canvasObj.render();
                     }, 0, true, widget.id );
                 }
             }
         };
         $scope.equalWidth = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(),
             widget, refWidgetWidth = 0, canvasObj;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 if( i == 0 ) {
                     refWidgetWidth = widget.width;
                 }
                 else {
                     widget.width = refWidgetWidth;
                     $timeout( function( wId ) {
                         canvasObj = dashboard.Info.ObjMap[ wId ];
                         canvasObj.render();
                     }, 0, true, widget.id );
                 }
             }
         };
//         MOVE
         $scope.moveRight = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(), widget;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 widget.left++;
             }
         };
         $scope.moveLeft = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(), widget;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 widget.left--;
             }
         };
         $scope.moveUp = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(), widget;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 widget.top--;
             }
         };
         $scope.moveDown = function() {
             var sWidgetIds = $scope.getSelectedDashboard().sWidgetIds,
             dashboard = $scope.getSelectedDashboard(), widget;
             for( var i = 0; i < sWidgetIds.length; i++ ) {
                 widget = dashboard.Info.WidgetMap[ sWidgetIds[ i ] ];
                 widget.top++;
             }
         };
         $scope.reachedToEdge = function( top, left ) {
             var dbId = $scope.getSelectedDashboard().id, $dashboard = $( "#MAIN_" + dbId );
             if( top < 5 || top > $dashboard.height() || left < 5 || left > $dashboard.width() ) {
                 return true;
             }
             else {
                 return false;
             }
         };
//         LAYER
         $scope.sendToBack = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard(), 
             sWidget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ],
             swIndex = widgets.indexOf( sWidget );
             if( swIndex != -1 && swIndex != 0 ) {
                 cs.moveItemInArray( widgets, swIndex, --swIndex );
             }
         };
         $scope.sendBackward = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard(), 
             sWidget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ],
             swIndex = widgets.indexOf( sWidget );
             if( swIndex != -1 ) {
                 cs.moveItemInArray( widgets, swIndex, 0 );
             }
         };
         $scope.bringToFront = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard(), 
             sWidget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ],
             swIndex = widgets.indexOf( sWidget );
             if( swIndex != -1 && swIndex != widgets.length - 1 ) {
                 cs.moveItemInArray( widgets, swIndex, ++swIndex );
             }
         };
         $scope.bringForward = function() {
             var widgets = $scope.getWidgetsOfSelectedDashboard(), 
             sWidget = $scope.getSelectedWidgetsFromSelectedDashboard()[ 0 ],
             swIndex = widgets.indexOf( sWidget );
             if( swIndex != -1 ) {
                 cs.moveItemInArray( widgets, swIndex, widgets.length - 1 );
             }
         };
     }
} );