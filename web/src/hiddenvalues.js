(function() {

  var content = '
<div class="showHide">Hide Your Values</div>
<ul>
<li><div>-2</div></li>
<li><div>-1</div></li>
<li><div>0</div></li>
<li><div>1</div></li>
<li><div>2</div></li>
</ul>';


  Crafty.c( 'HiddenValue', {
    init: function() {
    },

    render: function() {
      // D:
      var $v1 = $( '<div></div>' )
        .html( content )
        .addClass( 'values values1' );

      var $v2 = $( '<div></div>' )
        .html( content )
        .addClass( 'values values2' );

      this.$elem = $( '<div></div>' )
        .append( v1 )
        .append( v2 );

      return this;
    }
  });
}());
