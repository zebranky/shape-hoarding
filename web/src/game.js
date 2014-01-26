Game = {
  // Initialize and start our game

  start: function() {
    // Start crafty and set a background color so that we can see it's working

    var WIDTH = 800;
    var HEIGHT = 500;

    Crafty.init( WIDTH, HEIGHT );
    Crafty.background('green');

    // Keep track of the Draggable entity that is currently being dragged.
    var currentDraggedEntity = null;

    // An event handler for dropping the current Draggable entity on a
    // mouseup event. We will apply this handler to the window whenever
    // the mouse leaves the Crafty stage.
    var dropOnMouseUp = function listener( event ) {
      if ( currentDraggedEntity ) {
        currentDraggedEntity.stopDrag();
        window.removeEventListener( 'mouseup', listener );
      }
    };

    Crafty.stage.elem.addEventListener( 'mouseleave', function() {
      window.addEventListener( 'mouseup', dropOnMouseUp );
    });

    Crafty.stage.elem.addEventListener( 'mouseenter', function() {
      window.removeEventListener( 'mouseup', dropOnMouseUp );
    });

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

      // Make sure the entity stops at the bounds of the scene when
      // dragged.
      ent.bind( 'Dragging', function( mouseevent ) {
        snapEntity( ent, WIDTH, HEIGHT, margin );
      });

      // Keep track of the current dragged entity.
      ent.bind( 'StartDrag', function() {
        currentDraggedEntity = ent;
      });

      ent.bind( 'StopDrag', function() {
        if ( currentDraggedEntity === ent ) {
          currentDraggedEntity = null;
        }
      });
    });
  }
}
