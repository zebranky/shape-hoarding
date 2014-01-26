Game = {
  // Initialize and start our game

  start: function() {
    // Start crafty and set a background color so that we can see it's working

    var WIDTH = 800;
    var HEIGHT = 500;

    Crafty.init( WIDTH, HEIGHT );
    Crafty.background('green');

    Crafty.load([ 'assets/smiley.png' ], function() {
      var ent = Crafty.e( '2D, DOM, Draggable, Image' ).attr({
        x: 0, y: 0, w: 100, h: 100
      }).image( 'assets/smiley.png' );

      var margin = 5;

      var snapEntity = function( ent, width, height, margin ) {
        if ( ent.x < margin ) {
          ent.x = margin;
        } else if ( ent.x + ent.w > width - margin ) {
          ent.x = width - margin - ent.w;
        }

        if ( ent.y < margin ) {
          ent.y = margin;
        } else if ( ent.y + ent.h > height - margin ) {
          ent.y = height - margin - ent.h;
        }
      };

      ent.bind( 'Dragging', function( mouseevent ) {
        snapEntity( ent, WIDTH, HEIGHT, margin );
      });

      Crafty.stage.elem.addEventListener( 'mouseleave', function( event ) {
        if ( event.target === Crafty.stage.elem ) {
          ent.stopDrag();
        }
      });
    });
  }
}
