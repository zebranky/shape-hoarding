(function() {
  Crafty.c( 'StackView', {
    init: function() {
      this.$elem = null;
      this.$ul = null;
      this.cardViews = [];
    },

    addCardView: function( view ) {
      this.cardViews.push( view );
      return this;
    },

    render: function() {
      this.$elem = $( '<div><ul></ul></div>' )
        .addClass( 'stack' );
      this.$ul = this.$elem.find( 'ul' );
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
