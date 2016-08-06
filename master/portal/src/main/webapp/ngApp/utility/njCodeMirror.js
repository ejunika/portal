( function( ctx, fn ) {
    if( !ctx.angular ) throw "AngularJS not found";
    fn( ctx.angular, ctx.CodeMirror )
} )( this, function( angular, CodeMirror ) {
    angular
        .module( "njCodeMirror", [] )
        .directive( "njCodeMirror", [ "$timeout", njCodeMirrorDir ] );
    function njCodeMirrorDir( $timeout ) {
        return {
            restrict: "EA",
            link: function( $scope, iEl, iAttrs, ngModel ) {
                
            }
        };
    }
} );