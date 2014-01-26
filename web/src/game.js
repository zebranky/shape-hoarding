Game = {
  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(); //800, 500);

    var $vertical = $( '<div class="vertical-rule"></div>' );
    $( Crafty.stage.elem ).append( $vertical );

    [{
      pieces: [ 'red', 'yellow' ],
      nextCost: 2,
      position: [ 0, 0 ],
      side: 0
    }, {
      pieces: [ 'yellow' ],
      nextCost: 2,
      position: [ 0, 1 ],
      side: 0
    }, {
      pieces: [ 'yellow', 'green', 'purple' ],
      nextCost: 3,
      position: [ 0, 2 ],
      side: 0
    }, {
      pieces: [ 'purple', 'blue' ],
      nextCost: 2,
      position: [ 1, 0 ],
      side: 0
    }, {
      pieces: [ 'purple' ],
      nextCost: 2,
      position: [ 1, 1 ],
      side: 0
    }, {
      pieces: [ 'red' ],
      nextCost: 2,
      position: [ 1, 2 ],
      side: 0

    }, {
      pieces: [ 'green' ],
      nextCost: 3,
      position: [ 0, 0 ],
      side: 1
    }, {
      pieces: [ 'green','yellow', 'blue', 'green' ],
      nextCost: 3,
      position: [ 0, 1 ],
      side: 1
    }, {
      pieces: [ 'blue', 'purple' ],
      nextCost: 3,
      position: [ 0, 2 ],
      side: 1
    }, {
      pieces: [ 'blue' ],
      nextCost: 3,
      position: [ 1, 0 ],
      side: 1
    }, {
      pieces: [ 'red' ],
      nextCost: 3,
      position: [ 1, 1 ],
      side: 1
    }, {
      pieces: [ 'red' ],
      nextCost: 2,
      position: [ 1, 2 ],
      side: 1


    }].forEach(function( stack ) {
      var view = Crafty.e( 'StackView' )
        .updateFromStack( stack )
        .render();
      $( Crafty.stage.elem ).append( view.$elem );
    });

    // [{
    //   color: 'purple',
    //   position: [ 0, 2 ]
    // }, {
    //   color: 'purple',
    //   position: [ 0, 3 ]
    // }, {
    //   color: 'purple',
    //   position: [ 1, 1 ]
    // }, {
    //   color: 'purple',
    //   position: [ 1, 3 ]
    // }, {
    //   color: 'purple',
    //   position: [ 1, 1 ]
    // }, {
    //   color: 'purple',
    //   position: [ 1, 1 ]
    // }, {
    //   color: 'purple',
    //   position: [ 1, 1 ]
    // }].forEach

    // var card = Crafty.e( 'CardView' ).render();
    // var hiddenValues = Crafty.e( 'HiddenValues' ).render();
    // $( Crafty.stage.elem ).append( card.$elem );
    // $( Crafty.stage.elem ).append( hiddenValues.$elem );

    $( '.singletonStack > div > div' ).draggable({ revert: false });
    $( '.multiStack' ).draggable({ revert: false });
    $( '.multiStack ul li' ).droppable({
      drop: function() {
        console.log( 'dropped!' );
      }
    });

    $('.showHide').click( function() {
      if($(this).text() == "Hide Your Values") {
        $(this).text("Show Your Values");
        $(this).parent().css("bottom", "-85px");
      } else {
        $(this).text("Hide Your Values");
        $(this).parent().css("bottom", "0");
      }
    });
  }
};
