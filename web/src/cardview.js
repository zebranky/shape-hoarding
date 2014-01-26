(function() {
  Crafty.c( 'CardView', {
    init: function() {
      this.$elem = null;
      this.stacked = false;
      this.angle = 0;
    },

    setStacked: function( stacked ) {
      this.stacked = stacked;
      return this;
    },

    setAngle: function( angle ) {
      this.angle = angle;
      return this;
    },

    setImage: function( src ) {
      // TODO
      return this;
    },

    render: function() {
      if ( this.stacked ) {
        this.$elem = $( '<li><div></div></li>' )
          .addClass( 'stackedCard' );
      } else {
        this.$elem = $( '<div><div></div></div>' )
          .addClass( 'unstackedCard' );
      }
      if ( this.$img ) {
        this.$elem.append( this.$img );
      }
      this.$elem.css('-webkit-transform','rotate('+this.angle+'deg)');
      return this;
    }
  });
}());
