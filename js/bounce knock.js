//Volleyball with Pandas

var image;
var platforms;
var knocker = null;
var knocker2 = null;
var ball;
var net = null;
var jumpTimer = 0;
var graphics;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var scoreText1;
var scoreText2;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('bear', 'assets/rsz_bear.png');
    game.load.image('ball', 'assets/rsz_ball.png');
    game.load.image('net', 'assets/net.png');
}

function create() {
    // Score 
    scoreText1 = game.add.text(10, 100, 'Score: ', { fontSize: '32px', fill: '#fff' });
    scoreText2 = game.add.text(600, 100, 'Score: ', { fontSize: '32px', fill: '#fff' });

    game.physics.startSystem(Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();
    
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    ball = game.add.sprite(100, 400, 'ball');

    // The player1 and its settings
    knocker= game.add.sprite(600, game.world.height - 150, 'bear');
    game.physics.enable([knocker,ball], Phaser.Physics.ARCADE);
    // The player2 and its settingsa
    knocker2= game.add.sprite(50, game.world.height - 150, 'bear');
    
    game.physics.enable([knocker2,ball], Phaser.Physics.ARCADE);

    //  The platforms group contains the net
    
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    
    // create the net 
    var net = platforms.create(game.world.height - 200, 450, 'net');
    game.physics.arcade.enable(net);

    net.body.immovable = true;

    knocker.body.immovable = false;
    knocker.body.collideWorldBounds = true;
    game.physics.arcade.enable(knocker);

    knocker2.body.immovable = false;
    knocker2.body.collideWorldBounds = true;
    game.physics.arcade.enable(knocker2);
    
    //  This makes the game world bounce-able
    ball.body.collideWorldBounds = true;

    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    ball.body.bounce.setTo(1, 1);
    //  Set knocker2 controls
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function update () {
    //  Enable physics between the knockers and the ball
    game.physics.arcade.collide(knocker, ball);
    game.physics.arcade.collide(knocker2, ball);
    //  Enable physics between the knockers and the platform
    game.physics.arcade.collide(knocker, platforms);
    game.physics.arcade.collide(knocker2, platforms);
    //  Enable physics between the platform and the ball
    game.physics.arcade.collide(ball, platforms);
        

    //  Reset the knockers velocity (movement)
    knocker.body.velocity.x = 0;
    knocker2.body.velocity.x = 0;
    knocker.body.velocity.y = 0;
    knocker2.body.velocity.y = 0;

    
    //  Move the knocker with the arrow keys
    if (cursors.left.isDown)
    {
        //  Move to the left
        knocker.body.velocity.x = -150;

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        knocker.body.velocity.x = 150;
    }else{
        knocker.body.velocity.setTo(0, 0);
    }
    // if(cursors.up.isDown)
    // {
    //     knocker.body.velocity.y = -200 ;
    // }
    //  Set gravity to knocker2
    knocker.body.gravity.y = 20000;
    if (cursors.up.isDown && knocker.body.onFloor() && game.time.now > jumpTimer)
    {
       var i = 0;
        var interval = setInterval(function() {
            i ++;
            knocker.body.velocity.y -= 1000;
            if (i == 10) clearInterval(interval);
        }, 10)

        // knocker2.body.velocity.y = -6500;
        jumpTimer = game.time.now + 100;
        console.log("jump");
    }
    
   
    //  Move the knocker2 with the WSDA controls
    
    game.physics.arcade.collide(knocker2, ball);

    if (leftKey.isDown)
    {
        knocker2.body.velocity.x = -300;
    }
    else if (rightKey.isDown)
    {
        knocker2.body.velocity.x = 300;
    }
    else {
        knocker2.body.velocity.setTo(0, 0);
    }
    knocker2.body.gravity.y = 14000;
    if (upKey.isDown && knocker2.body.onFloor() && game.time.now > jumpTimer)
    {
        var i = 0;
        var inte = setInterval(function() {
            i ++;
            knocker2.body.velocity.y -= 1000;
            if (i == 10) clearInterval(inte);
        }, 10)

        // knocker2.body.velocity.y = -6500;
        jumpTimer = game.time.now + 100;
        console.log("jump");
    }

    // Score screen 
    if (ball.body.onFloor())
    {
        console.log('Hit', ball.x);
        if(ball.x > 0 && ball.x < 340)
        {
            scorePlayer1 += 1;
            scoreText1.text = 'Score: ' + scorePlayer1;

        }
        if(ball.x > 340 && ball.x < 740)
        {
            scorePlayer2 += 1;
            scoreText2.text = 'Score: ' + scorePlayer2;
        }
        ballResetState();
    }


        function ballResetState(){
        ball.reset(250, 350);
    }

}

function render () {

    //debug helper
    game.debug.spriteInfo(ball, 32, 32);
}
