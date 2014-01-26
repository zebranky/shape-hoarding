Game = {  
  // Initialize and start our game
  start: function() {
    Game.genPoints();
    
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(false, false, 'cr-stage');
    Crafty.background('black');
    
    Game.watchEvents();
    
    Crafty.scene('Game');
  },
  
  selected_piece: null,
  currentPlayer: 0,
  players: {
    '0': {moves: 15, points: {red: -2, yellow: -1, green: 2, purple: 1, blue: -1}},
    '1': {moves: 15, points: {red: 2, yellow: 2, green: 2, purple: 2, blue: 2}},
  },
  
  genPoints: function() {
    var rnd = 0;
    rnd = Math.floor((Math.random()*4)); Game.players[0].points.red = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[0].points.yellow = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[0].points.green = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[0].points.purple = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[0].points.blue = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[1].points.red = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[1].points.yellow = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[1].points.green = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[1].points.purple = rnd == 2 ? 2 : rnd - 2;
    rnd = Math.floor((Math.random()*4)); Game.players[1].points.blue = rnd == 2 ? 2 : rnd - 2;
  },
  
  calcScore: function(player) {
    var stacks = Crafty('Stack');
    var stack_points = _.map(stacks, function(_stack) {
        var stack = Crafty(_stack);
        if (stack.side + '' != player + '') {
            console.log('skipping');
            return 0;
        }
        var pts = 0;
        for(var i = 0; i < stack.pieces.length; i++) {
            pts += Game.players[0].points[stack.pieces[i]];
            pts += Game.players[1].points[stack.pieces[i]];
        }
        console.log(_stack + ' ' + pts);
        return pts;
    });
    return _.reduce(stack_points, function(memo, num){ return memo + num; }, 0);
  },
  
  justPassed: false,
  
  endTurn: function(isPass) {
    if (Game.currentPlayer == 0) {
        Game.currentPlayer = 1;
    } else {
        Game.currentPlayer = 0;
    }
    // check for game end conditions
    if (Game.players[0].moves <= 0 || Game.players[1].moves <= 0 || // one player out of moves
        !_.some(Crafty('Stack'), function(_stack) {return Crafty(_stack).nextCost() == 1;}) || // no singletons remaining
        (isPass && Game.justPassed)) { // double pass
        Game.state_machine.end_game();
    }
    Game.justPassed = isPass;
  },
  
  state_machine: StateMachine.create({
    initial: 'select_singleton',
    events: [
      { name: 'singleton_selected', from: 'select_singleton',            to: 'select_target' },
      { name: 'target_selected',    from: 'select_target',               to: 'move_target' },
      { name: 'move_completed',     from: 'move_target',                 to: 'select_singleton' },
      { name: 'pass',               from: '*',                           to: 'select_singleton' },
      { name: 'end_game',           from: '*',                           to: 'game_over' }
    ],
    callbacks: {
      onsingleton_selected: function() {
        console.log('singleton_selected');
        Crafty('StatusLabel').update();
      },
      ontarget_selected: function() {
        console.log('target_selected');
        Crafty('StatusLabel').update();
      },
      onmove_completed: function() {
        console.log('move_completed');
        Game.endTurn(false);
        Crafty('StatusLabel').update();
      },
      onpass: function() {
        console.log('pass');
        Game.endTurn(true);
        Crafty('StatusLabel').update();
      },
      onend_game: function() {
        console.log('end_game');
        Crafty('StatusLabel').update();
      },
    }
  }),
  
  watchEvents: function() {
    Crafty.bind('singletonSelected', function() {
      console.log('Singleton selected');
      Game.state_machine.singleton_selected();
    });

    Crafty.bind('targetSelected', function() {
      console.log('Target selected');
      Game.state_machine.target_selected();
    });

    Crafty.bind('moveCompleted', function() {
      console.log('Move completed');
      Game.state_machine.move_completed();
    });

    Crafty.bind('passTurn', function() {
      console.log('Turn passed');
      Game.state_machine.pass();
    });

    Crafty.bind('endGame', function() {
      console.log('Game over!');    
      Game.state_machine.end_game();
    });
    
    jQuery('#cr-stage').click(function() {
      Crafty.trigger('gameClick');
    });
  },
}