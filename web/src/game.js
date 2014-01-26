Game = {
  // Initialize and start our game
  start: function( playdata ) {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(false, false);
    Crafty.background('black');
     
    var RandomizeArray = function( input )
	{
		var n = input.length;
		while (n > 1)
		{
			n--;
			var k = Math.floor( Math.random() * (n+1) );
			var temp = input[k];
			input[k] = input[n];
			input[n] = temp;
		}
		
		return input;
	};
	
	
	playdata.shapeimages = RandomizeArray( playdata.shapeimages );
	
	var BuildPlayerValues = function ( num )
	{
		var retVal = [];
		for (var i=0; i<num; ++i)
		{
			retVal[i] = playData.shapevalues[Math.floor(Math.random()*(playdata.shapevalues.length))];
		}
		return retVal;
	};
	
	var ArrayElementWiseAdd = function ( a, b ) //a and b should be the same exact length
	{
		var retVal = [];
		
		for (var i=0; i<a.length; ++i)
		{
			retVal[i] = a[i] + b[i];
		}
		return retVal;
	};
	
	var playerOneValues = BuildPlayerValues(5);
	var playerTwoValues = BuildPlayerValues(5);
	
	var actualValues = ArrayElementWiseAdd( playerOneValues, playerTwoValues ); 

	
	
	
    
  }
  

};