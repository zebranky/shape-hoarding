Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(); //800, 500);

    var stack = Crafty.e( 'StackView' )
      .updateFromStack({
        pieces: [ 'red', 'yellow', 'green' ]
      })
      .render();

    var card = Crafty.e( 'CardView' ).render();

    $( Crafty.stage.elem ).append( stack.$elem );
    $( Crafty.stage.elem ).append( card.$elem );
  }
};
