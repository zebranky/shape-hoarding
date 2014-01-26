// Runs the core gameplay loop
Crafty.scene('Game', function() {
    var yy = 3;
    Crafty.e('Stack').setSide(0).addPiece('red').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('red').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('yellow').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('yellow').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('green').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('green').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('purple').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('purple').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('blue').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(0).addPiece('blue').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('red').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('red').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('yellow').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('yellow').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('green').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('green').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('purple').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('purple').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('blue').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Stack').setSide(1).addPiece('blue').attr({x: 3, y: yy, w: 300, h: 26}); yy += 29;
    Crafty.e('Butan').setFunc(0);
    Crafty.e('Butan').setFunc(1);
    Crafty.e('Butan').setFunc('pass');
    Crafty.e('StatusLabel').textFont({ size: '14pt', family: 'monospace' }).css('color', '#080').update();
});