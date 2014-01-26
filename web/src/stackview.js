(function() {
  Crafty.c( 'StackView', {
    init: function() {
      this.$elem = null;
      this.$ul = null;
      this.cardViews = [];
    },

    updateFromStack: function( stack ) {
      // Create CardViews from pieces in stack
      var cards = stack && stack.pieces;
      if ( cards && cards.length ) {
        this.cardViews = cards.map(function( cardColor ) {
          var view = Crafty.e( 'CardView' )
            .setColor( cardColor );
          return view;
        });
      } else {
        this.cardViews = [];
      }
      return this;
    },

    addCardView: function( view ) {
      this.cardViews.push( view );
      return this;
    },

    render: function() {
      this.$elem = $( '<div><ul></ul></div>' )
        .addClass( 'stack' );
      this.$ul = this.$elem.find( 'ul' );
      this.$ul.empty();
      this.cardViews.forEach(function( view, index ) {
        view
          .setStacked( true )
          .setAngle( index*-20 )
          .render();
        this.$ul.append( view.$elem );
      }, this );
      return this;
    }
  });
}());
