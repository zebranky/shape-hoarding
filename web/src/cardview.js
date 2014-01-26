(function() {
  Crafty.c( 'CardView', {
    init: function() {
      this.$elem = null;
      this.stacked = false;
      this.angle = 0;
      this.color = 'gray'; // default for now
    },

    setColor: function( color ) {
      this.color = color;
      return this;
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
          .addClass( 'stackedCard' )
      } else {
        this.$elem = $( '<div><div></div></div>' )
          .addClass( 'unstackedCard' );
      }
      // if ( this.$img ) {
      //   this.$elem.append( this.$img );
      // }
      this.$elem
        .addClass( 'card' )
        .addClass( 'rot' + this.angle );
        //.css('-webkit-transform','rotate('+this.angle+'deg)');
      this.$elem.find( 'div' ).css( 'background-color', this.color );

      if ( !this.stacked ) {
        // HACKITY HACK
        // Unstacked cards must go in a div.stackContainer... yes the name is bad.
        var $container = $( '<div></div>' )
          .addClass( 'stackContainer' )
          .addClass( 'singletonStack' );
        var $stack = $( '<div></div>' )
          .addClass( 'stack' );

        this.$elem = $container.append( $stack.append( this.$elem ));
      }

      return this;
    }
  });
}());
