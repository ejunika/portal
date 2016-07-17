( function( ctx, fn ) {
    fn( ctx, ctx.jQuery )
} )( this, function( ctx, $ ) {
    "use strict";
    function DashboardManager( dashboard ) {
        this.dashboard = dashboard;
    }
    function createDashboardFrame( layout ) {
        var $dbFrame = 
        $( "<div class='db-frame'></div>" )
        .css( {
            height: layout.height + "px",
            width: layout.width + "px",
            position: "relative"
        } ), 
        $dPreview = $( ".d-preview" );
        $dPreview.empty().append( $dbFrame );
    }
    function createWidgetFrames( widgets, dataProvider ) {
        var $wFrame, widget, chart;
        for( var i = 0; i < widgets.length; i++ ) {
            widget = widgets[ i ];
            $wFrame = 
            $( "<div></div>" )
            .attr( "id", widget.id )
            .css( {
                height: widget.height,
                width: widget.width,
                position: "absolute",
                top: widget.top,
                left: widget.left,
            } );
            $( ".db-frame" ).append( $wFrame );
            chart = new CanvasJS.Chart( widget.id );
            chart.options = widget.Options;
            chart.options.interactivityEnabled = true;
            chart.options.toolTip = { enabled: true };
            chart.options.data = prepareNgetData( widget, dataProvider );
            chart.render();
        }
    }
    function filterItemInList( list, key, value ) {
        var filterFn = function( item, index ) {
            var typeOfItem = typeof( item );
            if( typeOfItem != "undefined" ) {
                switch( typeOfItem ) {
                    case "object":
                        return item[ key ] == value;
                        break;
                    case "string":
                        return item == key;
                        break;
                    case "function":
                        return item == key;
                            break;
                    default:
                        break;
                }
            } 
        };
        return $.grep( list, filterFn );
    }
    function prepareNgetData( widget, dataProvider ) {
        var data = [], series, dataPoints, dataPoint,
        dims = widget.dataSets[ 0 ].dimensions,
        sConnId = widget.dataSets[ 0 ].DataProvider.Connection.id,
        sDataProvider = filterItemInList( dataProvider.Offline.connections, "id", sConnId )[ 0 ],
        records = sDataProvider.sheets[ 0 ].records,
        mesz = widget.dataSets[ 0 ].measures;
        for( var mIndex = 0; mIndex < mesz.length; mIndex++ ) {
            series = {
                type: widget.cjsObjName,
                name: mesz[ mIndex ].label,
                dataPoints: []
            };
            for( var rIndex = 0; rIndex < records.length; rIndex++ ) {
                dataPoint = {
                    label: records[ rIndex ][ dims[ 0 ].id ],
                    y: records[ rIndex ][ mesz[ mIndex ].id ] * 1,
                    color: mesz[ mIndex ].color
                };
                series.dataPoints.push( dataPoint );
            }
            data.push( series );
        }
        return data;
    };
    DashboardManager.prototype.render = function() {
        var dashboard = this.dashboard;
        createDashboardFrame( dashboard.Layout );
        createWidgetFrames( dashboard.Layout.widgets, dashboard.DataProvider )
    };
    ctx.DashboardManager = DashboardManager;
} );