export function appendMap() {
    var app = new PIXI.Application({
        width: 1900,
        height: 920
    });
    document.getElementsByClassName("mapContent")[0].appendChild(app.view);
    var background = PIXI.Sprite.fromImage('./images/pages/map/map.jpg');
    background.width = 1900;
    background.height = 900;
    app.stage.addChild(background);
    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.renderer.view.style.touchAction = 'auto';
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    
    var friendBtn = PIXI.Texture.fromImage('./images/pages/map/friend-center.png');
    var buttonOne = new PIXI.Sprite(friendBtn);
    buttonOne.x = 520;
    buttonOne.y = 240;
    buttonOne.height = 100;
    buttonOne.width = 140;
    buttonOne.buttonMode = true;
    buttonOne.interactive = true;
    if(iOS) {
        buttonOne.on('click', ()=>{onButtonDown('group')});
    }else{
        buttonOne.on('tap', ()=>{onButtonDown('group')});
        buttonOne.on('pointerdown', ()=>{onButtonDown('group')});
    }
    app.stage.addChild(buttonOne);
    
    
    var friendBtn = PIXI.Texture.fromImage("./images/pages/map/game-center.png");
    var buttonTwo = new PIXI.Sprite(friendBtn);
    buttonTwo.x = 870;
    buttonTwo.y = 210;
    buttonTwo.height = 100;
    buttonTwo.width = 140;
    buttonTwo.buttonMode = true;
    buttonTwo.interactive = true;
    if(iOS) {
        buttonTwo.on('click', ()=>{onButtonDown('game')});
    } else {
        buttonTwo.on('tap', ()=>{onButtonDown('game')});
        buttonTwo.on('pointerdown', ()=>{onButtonDown('game')});
    }
    app.stage.addChild(buttonTwo);
    
    
    var friendBtn = PIXI.Texture.fromImage("./images/pages/map/trade-center.png");
    var buttonThree = new PIXI.Sprite(friendBtn);
    buttonThree.x = 1550;
    buttonThree.y = 400;
    buttonThree.height = 100;
    buttonThree.width = 140;
    buttonThree.buttonMode = true;
    buttonThree.interactive = true;
    if(iOS) { 
        buttonThree.on('click', ()=>{onButtonDown('trade')});
    } else {
        buttonThree.on('tap', ()=>{onButtonDown('trade')});
        buttonThree.on('pointerdown', ()=>{onButtonDown('trade')});
    }
    app.stage.addChild(buttonThree);
    
    
    var friendBtn = PIXI.Texture.fromImage("./images/pages/map/shopping-mall.png");
    var buttonFour = new PIXI.Sprite(friendBtn);
    buttonFour.x = 1340;
    buttonFour.y = 470;
    buttonFour.height = 100;
    buttonFour.width = 140;
    buttonFour.buttonMode = true;
    buttonFour.interactive = true;
    if(iOS) {
        buttonFour.on('click', ()=>{onButtonDown('mall')});
    } else {
        buttonFour.on('tap', ()=>{onButtonDown('mall')});
        buttonFour.on('pointerdown', ()=>{onButtonDown('mall')});
    }
    app.stage.addChild(buttonFour);
    
    var friendBtn = PIXI.Texture.fromImage("./images/pages/map/signature.png");
    var buttonFive = new PIXI.Sprite(friendBtn);
    buttonFive.x = 1170;
    buttonFive.y = 580;
    buttonFive.height = 100;
    buttonFive.width = 140;
    buttonFive.buttonMode = true;
    buttonFive.interactive = true;
    if(iOS) {
        buttonFive.on('click', ()=>{onButtonDown('checkin')});
    } else {
        buttonFive.on('tap', ()=>{onButtonDown('checkin')});
        buttonFive.on('pointerdown', ()=>{onButtonDown('checkin')});
    }
    
    app.stage.addChild(buttonFive);
    
    var friendBtn = PIXI.Texture.fromImage("./images/pages/map/stadium.png");
    var buttonSix = new PIXI.Sprite(friendBtn);
    buttonSix.x = 770;
    buttonSix.y = 520;
    buttonSix.height = 100;
    buttonSix.width = 140;
    buttonSix.buttonMode = true;
    buttonSix.interactive = true;
    buttonSix.zOrder = 1;
    if(iOS) {
        buttonSix.on('click', ()=>{onButtonDown('stadium')});
    } else {
        buttonSix.on('tap', ()=>{onButtonDown('stadium')});
        buttonSix.on('pointerdown', ()=>{onButtonDown('stadium')});
    }
    
    app.stage.addChild(buttonSix);
    
    var airplane = new PIXI.Sprite(PIXI.Texture.fromImage('./images/pages/map/airplane.png'));
    airplane.x = -400;
    airplane.y = 300;
    airplane.width = 350;
    airplane.height = 420;
    app.stage.addChild(airplane);
    
    var cloud = new PIXI.Sprite(PIXI.Texture.fromImage("./images/pages/map/cloudo.png"));
    // var cloud2 = new PIXI.Sprite(PIXI.Texture.fromImage("./images/pages/map/cloudt.png"));
    // var cloud3 = new PIXI.Sprite(PIXI.Texture.fromImage("./images/pages/map/cloudth.png"));
    var ranX = Math.floor(Math.random() * (-2000 - -100) + 100);
    var ranH = Math.floor(Math.random() * (1000 - 100) + 100);
    cloud.x = ranX;
    cloud.y = 150;
    // cloud2.x = ranX;
    // cloud2.y = -160;
    // cloud2.width = 800;
    // cloud2.height = 200;
    // cloud3.x = 400;
    // cloud3.y = -180;
    // cloud3.width = ranH;
    // cloud3.height = ranH;
    
    app.stage.addChild(cloud);
    // app.stage.addChild(cloud2);
    // app.stage.addChild(cloud3);
    
    var loader = PIXI.loader;
    loader.load(setup);
    
    var reverse = 0;
    var reverse2 = 0;
    var reverse3 = 0;
    var reverse4 = 0;
    var reverse5 = 0;
    var reverse6 = 0;
    function looptheBtn() {
        if(buttonOne.y <= 245 && reverse == 0 ) {
            buttonOne.y-= 0.2;
            if(buttonOne.y <= 230){
                reverse = 1;
            }
        } else {
            buttonOne.y+= 0.2;
            if(buttonOne.y >= 240){
                reverse = 0;
            }
        }
        if(buttonTwo.y <= 215 && reverse2 == 0 ) {
            buttonTwo.y-= 0.2;
            if(buttonTwo.y <= 200){
                reverse2 = 1;
            }
        } else {
            buttonTwo.y+= 0.2;
            if(buttonTwo.y >= 210){
                reverse2 = 0;
            }
        }
        if(buttonThree.y <= 405 && reverse3 == 0 ) {
            buttonThree.y-= 0.2;
            if(buttonThree.y <= 390){
                reverse3 = 1;
            }
        } else {
            buttonThree.y+= 0.2;
            if(buttonThree.y >= 400){
                reverse3 = 0;
            }
        }
        if(buttonFour.y <= 475 && reverse4 == 0 ) {
            buttonFour.y-= 0.2;
            if(buttonFour.y <= 460){
                reverse4 = 1;
            }
        } else {
            buttonFour.y+= 0.2;
            if(buttonFour.y >= 470){
                reverse4 = 0;
            }
        }
        if(buttonFive.y <= 585 && reverse5 == 0 ) {
            buttonFive.y-= 0.2;
            if(buttonFive.y <= 570){
                reverse5 = 1;
            }
        } else {
            buttonFive.y+= 0.2;
            if(buttonFive.y >= 580){
                reverse5 = 0;
            }
        }
        if(buttonSix.y <= 525 && reverse6 == 0 ) {
            buttonSix.y-= 0.2;
            if(buttonSix.y <= 510){
                reverse6 = 1;
            }
        } else {
            buttonSix.y+= 0.2;
            if(buttonSix.y >= 520){
                reverse6 = 0;
            }
        }
    }
    
    function setup() {
        app.ticker.add(delta => gameLoop(delta));
    }
    function gameLoop(delta){
        looptheBtn()
        airplane.y-= 0.8
        airplane.x+= 1.8
        cloud.x++
        // cloud2.x++
        // cloud3.x++
        if(airplane.x == 8000){
            airplane.x = -300;
        }
        if(cloud.x == 3800){
            cloud.x = ranX;
        }
        // if(cloud2.x == 2200){
        //     cloud2.x = ranX;
        // }
        // if(cloud3.x == 2400){
        //     cloud3.x = ranX;
        // }
    }
}
