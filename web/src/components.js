Crafty.c('Stack', {
    init : function() {
        this.requires('2D, DOM, Mouse');
        
        this.bind('Click', function() {
            console.log('Click');
            if (Game.state_machine.current == 'select_singleton') {
                if (this.nextCost() == 1 && !Game.selected_piece) {
                    this.css('background-color', 'goldenrod');
                    Game.selected_piece = this;
                    Game.state_machine.singleton_selected();
                }
            } else if (Game.state_machine.current == 'select_target') {
                // only allow if player can afford it
                if (this.nextCost() <= Game.players[Game.currentPlayer].moves && this.side == Game.selected_piece.side) {
                    this.css('background-color', 'darkgoldenrod');
                    Game.players[Game.currentPlayer].moves -= this.nextCost();
                    // merge/remove stacks
                    this.addPiece(Game.selected_piece.pieces[0]);
                    Game.selected_piece.destroy();
                    // prep for move decision
                    Game.selected_piece = this;
                    this.css('background-color', 'goldenrod');
                    Game.state_machine.target_selected();
                }
            }
        });
        this.bind('MouseOver', function() {
            console.log('MouseOver');
            // hover display logic
            if (Game.state_machine.current == 'select_singleton') {
                if (this.pieces.length == 1) {
                    this.css('background-color', '#444');
                }
            } else if (Game.state_machine.current == 'select_target') {
                if (this.nextCost() <= Game.players[Game.currentPlayer].moves && this.side == Game.selected_piece.side) {
                    // only allow if player can afford it
                    this.css('background-color', '#444');
                }
            }
        });
        this.bind('MouseOut', function() {
            console.log('MouseOut');
            if (Game.selected_piece != this) {
                this.css('background-color', '#000');
            }
        });
        
        this.toggleSelected = function() {
            console.log('toggleSelected');
            if (Game.selected_piece == this) {
                Game.selected_piece = null;
                this.css('background-color', '#000');
            } else {
                Game.selected_piece = this;
                this.css('background-color', 'goldenrod');
            }
        }
        
        this.avoidCss3dTransforms = true;
        
        this.side = null;
        this.pieces = new Array();
        this.selected = false;
        
        this.setSide = function(side) {
            this.side = side;
            this.updateText();
            return this;
        };
        
        this.addPiece = function(color) {
            this.pieces.push(color);
            this.updateText();
            return this;
        };
        
        this.updateText = function() {
            var lkup = new Object();
            lkup['red'] = 'R';
            lkup['yellow'] = 'Y';
            lkup['green'] = 'G';
            lkup['purple'] = 'P';
            lkup['blue'] = 'B';
            var s = this.side + ' ';
            for (var i = 0; i < this.pieces.length; i++) {
                s += '<span style="color: ' + this.pieces[i] + '">' + lkup[this.pieces[i]] + ' </span>';
            }
            this._element.innerHTML = s;
        };
        
        this.nextCost = function() {
            return this.pieces.length;
        };
    },    
});

Crafty.c('Butan', {
    init : function() {
        this.requires('2D, DOM, Mouse');
        
        this.bind('Click', function() {
            console.log('Butan Click');
            if (Game.state_machine.current == 'move_target' && (this.func == 0 || this.func == 1)) {
                Game.selected_piece.setSide(this.func);
                Game.selected_piece.css('background-color', '#000');
                Game.selected_piece = null;
                Game.state_machine.move_completed();
            } else if (this.func == 'pass') {
                if (Game.selected_piece) {
                    Game.selected_piece.css('background-color', '#000');
                }
                Game.selected_piece = null;
                Game.state_machine.pass();
            }
        });
        
        this.bind('MouseOver', function() {
            console.log('Butan MouseOver');
            // hover display logic
            if (this.func == 'pass' ||
                (Game.state_machine.current == 'move_target' && (this.func == 0 || this.func == 1))) {
                this.css('background-color', '#fff');
            }
        });
        this.bind('MouseOut', function() {
            console.log('Butan MouseOut');
            if (Game.selected_piece != this) {
                this.css('background-color', '#444');
            }
        });
        
        this.avoidCss3dTransforms = true;
        
        this.func = null;
        
        this.setFunc = function(func) {
            this.func = func;
            this._element.innerHTML = ''+func;
            if (func == 0) {
                this.x = 300;
                this.y = 20;
            } else if (func == 1) {
                this.x = 300;
                this.y = 50;
            } else if (func == 'pass') {
                this.x = 300;
                this.y = 80;
            }
            this.w = 100;
            this.h = 26;
            this.css('background-color', '#444').css('font-size', '20pt').css('font-family', 'monospace').css('color', '#000').css('margin', '3px');
            return this;
        }
    },
});

Crafty.c('StatusLabel', {
    init: function() {
        this.requires('2D, DOM, Text');
        this.avoidCss3dTransforms = true;
        this.x = 300;
        this.y = 200;
        this.w = 500;
        this.update = function() {
            var s = '';
            s = 'Turn: ' + Game.currentPlayer + '<br/>State: ' + Game.state_machine.current + '<br/>P1 Moves: ' + Game.players[0].moves + '<br/>P2 Moves: ' + Game.players[1].moves;
            s += '<br/>P1 Card: ' + Game.players[0].points.red + ' ' + Game.players[0].points.yellow + ' ' + Game.players[0].points.green + ' ' + Game.players[0].points.purple + ' ' + Game.players[0].points.blue;
            s += '<br/>P2 Card: ' + Game.players[1].points.red + ' ' + Game.players[1].points.yellow + ' ' + Game.players[1].points.green + ' ' + Game.players[1].points.purple + ' ' + Game.players[1].points.blue;
            s += '<br/>P1 Score: ' + Game.calcScore(0);
            s += '<br/>P2 Score: ' + Game.calcScore(1);
            this.text(s);
            return this;
        }
        this.update();
    },
});