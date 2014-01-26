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
        .addClass( 'stackContainer' )
        .addClass( 'multiStack' );
      this.$ul = this.$elem.find( 'ul' )
        .addClass( 'stack' )
        .empty();
      this.cardViews.forEach(function( view, index ) {
        view
          .setStacked( true )
          .setAngle( index*-20 )
          .render();
        this.$ul.append( view.$elem );
      }, this );

      var degree = (this.cardViews.length - 1 ) * 10;

      this.$ul
        .addClass("rot"+degree)
        .css("margin",""+(20+((degree-10)/2))+"px 0 0 "+(-24+(26*((degree/10)-1)))+"px");

      return this;
    }
  });
}());
