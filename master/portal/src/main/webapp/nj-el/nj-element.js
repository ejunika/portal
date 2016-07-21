( function( ctx, fn ) {
    fn( ctx.window );
} )( this, function( win ) {
    /**
     * @constructor Widget
     * */
    function Widget() {
        this.x = 0;
        this.y = 0;
        this.height = 100;
        this.width = 100;
        this.background = "#FFFFFF";
        this.borderRadius = 0;
        this.borderColor = "#000000";
        this.borderStyle = "solid";
    }
    Widget.prototype.init = function() {};
    /**
     * @constructor Other
     * */
    function Other() {
        this.otherProp = "Other Prop";
        Widget.call( this );
    }
    Other.prototype = new Widget();
    /**
     * @constructor Box
     * */
    function Box() {
        this.boxStyle = "boxStyle";
        Other.call( this );
    }
    Box.prototype = new Other();
    Box.prototype.init = function() {
        console.log( this.x );
    };
    var box = new Box();
    debugger;
    box.init();
} );