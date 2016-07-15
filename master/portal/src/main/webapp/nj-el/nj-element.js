( function( ctx, fn ) {
    fn( ctx.window );
} )( this, function( win ) {
    function inherits( child, parent ) {
        child.prototype = new parent();
    }
    function njElement() {
        this.x = 10;
        this.y = 90;
    }
    njElement.prototype = {
        doThis: function() {
            alert( "doThis from base" );
        }
    };
    function njBox() {
        
    }
    inherits( njBox, njElement );
    njBox.prototype = {
        doThis: function() {
            alert( "doThis" );
        },
        doThat: function() {
            alert( "doThat" );
        }
    };
    var njEle = win.njEle = new njElement();
    var njBox = win.njBox =  new njBox();
    console.log( njBox );
    console.log( njEle );
} );