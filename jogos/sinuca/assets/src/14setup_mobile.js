// Setup modificado para melhor posicionamento mobile
var playState = new Object;

playState.init = function() {
    this.menuInfo = new Object;
};

playState.create = function() {
    window.famobi.onOrientationChange((function() {
        resizeGame();
    }));
    
    resizeGame = function(a, t) {
        Math.min(fenster.innerWidth, document.documentElement.clientWidth);
        Math.min(fenster.innerHeight, document.documentElement.clientHeight);
        
        // Detectar se é mobile
        var isMobile = window.innerWidth <= 768;
        
        if ("portrait" == window.famobi.getOrientation()) {
            e.landscape = !1;
            game.scale.setGameSize(1080, 1920);
            e.gameCanvas.x = game.width / 2 + 30;
            e.gameCanvas.y = game.height / 2 - 50;
            e.gameCanvas.angle = -90;
            
            // Configurações para mobile - mover elementos para a lateral esquerda
            if (isMobile) {
                // Mover rackSolids para a lateral esquerda
                e.rackSolids.x = 50; // Lado esquerdo
                e.rackSolids.y = game.height / 2 - 200; // Centro vertical
                
                // Mover rackStripes para a lateral esquerda
                e.rackStripes.x = 50; // Lado esquerdo
                e.rackStripes.y = game.height / 2 + 200; // Centro vertical
                
                // Mover humanIcon para a lateral esquerda
                e.humanIcon.x = 20;
                e.humanIcon.y = game.height / 2 - 300;
                
                // Mover aiIcon para a lateral esquerda
                e.aiIcon.x = 20;
                e.aiIcon.y = game.height / 2 + 300;
                
                // Mover spinSetter para a lateral esquerda
                e.spinSetter.x = 20;
                e.spinSetter.y = game.height / 2;
                
                // Mover guiPanels para a lateral esquerda
                e.guiPanel1.x = 20;
                e.guiPanel1.y = game.height / 2 - 400;
                e.guiPanel2.x = 20;
                e.guiPanel2.y = game.height / 2 - 350;
                e.guiPanel3.x = 20;
                e.guiPanel3.y = game.height / 2 - 300;
                
                // Mover turnArrows para a lateral esquerda
                e.turnArrow1.x = 20;
                e.turnArrow1.y = game.height / 2 - 250;
                e.turnArrow2.x = 20;
                e.turnArrow2.y = game.height / 2 + 250;
                
                // Mover scoreText para a lateral esquerda
                e.scoreText.x = 20;
                e.scoreText.y = game.height / 2 - 150;
                
                // Mover timerText para a lateral esquerda
                e.timerText.x = 20;
                e.timerText.y = game.height / 2 - 100;
                
                // Mover multiplierText para a lateral esquerda
                e.multiplierText.x = 20;
                e.multiplierText.y = game.height / 2 - 50;
                
                // Mover menuButton para canto superior direito
                e.menuButton.x = game.width - 65;
                e.menuButton.y = 10;
                
                // Mover powerBar para a lateral direita (se touch)
                if (game.device.touch) {
                    e.powerBar.x = game.width - 100;
                    e.powerBar.y = game.height / 2;
                }
            } else {
                // Configurações originais para desktop
                e.rackSolids.x = game.width / 2 + 25;
                e.rackSolids.y = game.height - 100;
                e.rackStripes.x = game.width / 2 + 25;
                e.rackStripes.y = game.height - 10;
                e.humanIcon.x = 170;
                e.humanIcon.y = game.height - 95;
                e.aiIcon.x = 170;
                e.aiIcon.y = game.height - 0;
                e.spinSetter.x = game.width - 135;
                e.spinSetter.y = game.height - 105;
                e.guiPanel1.x = game.width / 2 - e.guiPanel2.width / 2 - 20 + 25;
                e.guiPanel1.y = 100;
                e.guiPanel2.x = game.width / 2 + 25;
                e.guiPanel2.y = 100;
                e.guiPanel3.x = game.width / 2 + e.guiPanel2.width / 2 + 20 + 25;
                e.guiPanel3.y = 100;
                e.timerText.x = e.guiPanel3.x + e.guiPanel3.width / 2;
                e.timerText.y = 100;
                e.scoreText.x = game.width / 2 + 25;
                e.scoreText.y = 100;
                e.multiplierText.x = e.guiPanel1.x - e.guiPanel1.width / 2;
                e.multiplierText.y = 100;
                e.menuButton.x = game.width - 65;
                e.menuButton.y = 10;
                e.turnArrow1.x = 125;
                e.turnArrow1.y = game.height - 110;
                e.turnArrow2.x = 125;
                e.turnArrow2.y = game.height - 20;
            }
            
            // Configurações específicas do tutorial
            if (projectInfo.tutorial) {
                e.skipText.x = game.world.centerX + 30;
                e.skipText.y = game.world.centerY + 230;
                e.tutorialText.x = game.world.centerX + 30;
                e.tutorialText.y = 320;
                
                if (game.device.touch) {
                    e.hand.scale.x = -1;
                    if (e.tutStage >= 6) {
                        e.hand.angle = 0;
                        e.pointerStart = e.pointerStartP;
                        e.pointerEnd = e.pointerEndP;
                    }
                    if (6 != e.tutStage && 7 != e.tutStage || (e.hand.x = e.pointerStart.x, e.hand.y = e.pointerStart.y), e.tutStage >= 8) {
                        e.hand.x = e.pointerStart.x - e.pointerProgress;
                        e.hand.y = e.pointerStart.y;
                        e.powerBarMask.x = 0;
                        e.powerBarMask.y = e.pointerProgress;
                    }
                }
            }
        } else {
            // Configurações para landscape
            e.landscape = !0;
            game.scale.setGameSize(1920, 1080);
            e.gameCanvas.x = game.width / 2;
            e.gameCanvas.y = game.height / 2 - 75;
            
            // Configurações originais para landscape
            e.rackSolids.x = game.width / 4;
            e.rackSolids.y = game.height - 40;
            e.rackStripes.x = 3 * game.width / 4;
            e.rackStripes.y = game.height - 40;
            e.guiPanel1.x = game.width / 2 - e.guiPanel2.width / 2 - 20;
            e.guiPanel1.y = game.height - 40;
            e.guiPanel2.x = game.width / 2;
            e.guiPanel2.y = game.height - 40;
            e.guiPanel3.x = game.width / 2 + e.guiPanel2.width / 2 + 20;
            e.guiPanel3.y = game.height - 40;
            e.timerText.x = e.guiPanel3.x + e.guiPanel3.width / 2;
            e.timerText.y = game.height - 40;
            e.scoreText.x = game.width / 2;
            e.scoreText.y = game.height - 40;
            e.multiplierText.x = e.guiPanel1.x - e.guiPanel1.width / 2;
            e.multiplierText.y = game.height - 40;
            e.gameCanvas.angle = 0;
            e.humanIcon.x = 120;
            e.humanIcon.y = game.height - 20;
            e.aiIcon.x = game.width - 120 - e.aiIcon.width;
            e.aiIcon.y = game.height - 20;
            e.turnArrow1.x = 75;
            e.turnArrow1.y = game.height - 40;
            e.turnArrow2.scale = new Point(.5, .5);
            e.turnArrow2.x = game.width - 75;
            e.turnArrow2.y = game.height - 40;
            e.turnArrow2.scale = new Point(-.5, .5);
            e.menuButton.x = game.width - 80;
            e.menuButton.y = 20;
            e.menuButton.scale = new Point(.5, .5);
            e.spinSetter.x = game.width - 90;
            e.spinSetter.y = game.height / 2;
            e.spinSetterZoom.x = game.width / 2;
            e.spinSetterZoom.y = game.height / 2 - 75;
            
            if (game.device.touch) {
                e.powerBar.angle = -90;
                e.powerBar.x = 100;
                e.powerBar.y = game.height / 2;
                e.powerBarCueMask.clear();
                e.powerBarCueMask.beginFill(16777215);
                e.powerBarCueMask.drawRect(e.powerBar.x, e.powerBar.y - 250, 26, 500);
                e.powerBarMask.clear();
                e.powerBarMask.beginFill(16711680);
                e.powerBarMask.drawRect(e.powerBar.x - 26, e.powerBar.y - 750, 26, 500);
            }
        }
        
        // Configurações comuns
        e.debugText.x = game.width - 25;
        e.debugText.y = 30;
        e.successIcon.x = 0;
        e.successIcon.y = 0;
    };
    
    // Resto da função create original...
    this.gameInfo = new Object;
    var e = this.gameInfo;
    
    // Inicializar variáveis do jogo
    e.adjustmentScale = 2.3;
    e.settingSpin = !1;
    e.pointerStartL = new Point(-850, -200);
    e.pointerStartP = new Point(100, -450);
    e.pointerEndL = new Point(-850, -50);
    e.pointerEndP = new Point(-80, -450);
    e.pointerProgress = 0;
    e.numLevels = 6;
    e.ballRadius = 1e3 * e.adjustmentScale;
    e.physScale = .01;
    e.friction = 1.5;
    e.gameOver = !1;
    e.counter = 0;
    e.transferCounter = 0;
    e.bonusStarOn = !1;
    e.starNumber = 2;
    e.timerStarted = !1;
    e.ballPotted = !1;
    e.ballsPotted = 0;
    e.fouled = !1;
    e.multiplier = 1;
    e.frictionSpeedThreshold = 85;
    e.pocketRadius = 2250;
    e.minVelocity = 2;
    e.cushionRestitution = .6;
    e.ballRestitution = .94;
    e.maxPower = 5e3;
    e.trial = !1;
    e.overlap = !1;
    e.cueBallInHand = !0;
    e.preventAim = !1;
    e.preventSetPower = !1;
    e.preventUpdateCue = !1;
    e.cueSet = !1;
    e.shotRunning = !1;
    e.settingPower = !1;
    e.executeStrike = !1;
    e.beginStrike = !1;
    e.cueTweenComplete = !1;
    e.firstTouch = !1;
    e.tutStage = 0;
    e.shotComplete = !1;
    e.rulingsApplied = !1;
    e.shotNum = 0;
    e.scratched = !1;
    e.trial = !1;
    e.pottedBallArray = new Array;
    e.time = 0;
    e.scratchFoulShown = !1;
    e.p1TargetType = "ANY";
    e.p2TargetType = "ANY";
    e.scratch = !1;
    e.foulMessage = "";
    e.shotNum = 0;
    e.turnExtended = !1;
    e.ballsPottedSameType = !1;
    e.typesPotted = "";
    e.trial = !1;
    e.initVars = !1;
    e.shotReset = !0;
    e.drawGuide = !0;
    e.allowTransferPoints = !1;
    e.placedInCenter = !1;
    e.foulDisplayComplete = !0;
    e.transfer1Complete = !0;
    e.transfer2Complete = !0;
    e.aimDirectionVector = new Vector2D(1, 0).normalize();
    
    // Configurar level
    if (0 == projectInfo.levelComplete) {
        projectInfo.level = 1;
    } else {
        projectInfo.level++;
    }
    
    if (0 == projectInfo.tutorial) {
        window.famobi_analytics.trackScreen("SCREEN_LEVEL");
    }
    
    // Configurar score
    if (0 == projectInfo.levelComplete) {
        projectInfo.score = 0;
    } else {
        projectInfo.levelComplete = !1;
    }
    
    // Configurar tempo baseado no level
    switch (projectInfo.level) {
        case 1:
            projectInfo.startTime = 50;
            break;
        case 2:
            projectInfo.startTime = 60;
            break;
        case 3:
            projectInfo.startTime = 80;
            break;
        case 4:
            projectInfo.startTime = 90;
            break;
        case 5:
            projectInfo.startTime = 100;
            break;
    }
    
    if (projectInfo.level >= e.numLevels) {
        projectInfo.startTime -= 10;
    }
    
    // Inicializar canvases
    e.bgCanvas = new Phaser.Group(game, game.stage, "bgCanvas");
    e.guiBaseCanvas = new Phaser.Group(game, game.stage, "guiBaseCanvas");
    e.gameCanvas = new Phaser.Group(game, game.stage, "gameCanvas");
    e.gameCanvas.x = game.width / 2;
    e.gameCanvas.y = game.height / 2 - 15;
    e.tableCanvas = new Phaser.Group(game, e.gameCanvas, "tableCanvas");
    e.tableCanvas.y += 2;
    e.timerCanvas = new Phaser.Group(game, e.gameCanvas, "timerCanvas");
    e.ballCanvas = new Phaser.Group(game, e.gameCanvas, "ballCanvas");
    e.guiCanvas = new Phaser.Group(game, game.stage, "guiCanvas");
    e.cueBaseCanvas = new Phaser.Group(game, e.gameCanvas, "cueCanvas");
    e.cueCanvas = new Phaser.Group(game, e.cueBaseCanvas, "cueCanvas");
    e.guideCanvas = new Phaser.Group(game, e.gameCanvas, "guideCanvas");
    e.tutCanvas = new Phaser.Group(game, e.gameCanvas, "tutCanvas");
    
    // Animações de entrada
    game.add.tween(e.cueBaseCanvas).from({alpha: 0}, 1e3, Phaser.Easing.Linear.None, !0, 500);
    game.add.tween(e.guiCanvas).from({alpha: 0}, 1e3, Phaser.Easing.Linear.None, !0, 500);
    game.add.tween(e.guiBaseCanvas).from({alpha: 0}, 1e3, Phaser.Easing.Linear.None, !0, 500);
    game.add.tween(e.gameCanvas).from({alpha: 0}, 1e3, Phaser.Easing.Linear.None, !0, 500);
    
    // Configurar mesa
    e.pockets = new Phaser.Sprite(game, 0, 0, "pockets");
    e.pockets.anchor = new Phaser.Point(.5, .5);
    e.tableCanvas.add(e.pockets);
    e.tunnelCanvas = new Phaser.Group(game, e.tableCanvas, "tunnels");
    e.cloth = new Phaser.Sprite(game, 0, 0, "cloth");
    e.cloth.anchor = new Phaser.Point(.5, .5);
    e.tableCanvas.add(e.cloth);
    e.shadowCanvas = new Phaser.Group(game, e.tableCanvas, "shadows");
    e.tableTop = new Phaser.Sprite(game, 0, 0, "tableTop");
    e.tableTop.anchor = new Phaser.Point(.5, .5);
    e.tableCanvas.add(e.tableTop);
    
    // Configurar bolsos
    var n = 600 * e.adjustmentScale;
    e.pocketArray = new Array;
    e.vertexArray = new Array;
    e.lineArray = new Array;
    
    // Configurar bolas
    e.ballArray = new Array;
    var a = setBallPositions(e);
    e.numBalls = a.length;
    
    for (var t = 0; t < e.numBalls; t++) {
        var n = new Object;
        n.shadow = new Phaser.Sprite(game, 0, 0, "shadow");
        e.shadowCanvas.add(n.shadow);
        n.shadow.anchor = new Point(.5, .5);
        n.shadow.width = e.ballRadius * e.physScale * 4;
        n.shadow.height = e.ballRadius * e.physScale * 4;
        n.shadow.alpha = .7;
        n.marker = new Phaser.Sprite(game, 0, 0, "marker");
        e.ballCanvas.addChild(n.marker);
        n.marker.anchor = new Point(.5, .5);
        n.marker.animations.add("markerAnim", Phaser.Animation.generateFrameNames("marker", 1, 60, "", 4), 60, !0);
        n.marker.visible = !1;
        
        // Configurar frame da bola
        switch (t) {
            case 0: 0; break;
            case 1: 12; break;
            case 2: 13; break;
            case 3: 8; break;
            case 4: 14; break;
            case 5: 3; break;
            case 6: 11; break;
            case 7: 4; break;
            case 8: 15; break;
            case 9: 5; break;
            case 10: 1; break;
            case 11: 6; break;
            case 12: 10; break;
            case 13: 7; break;
            case 14: 9; break;
            case 15: 2; break;
        }
        
        n.mc = new Ball(e.ballRadius * e.physScale, t);
        e.ballCanvas.add(n.mc);
        
        if (0 == t) {
            n.mover = new Phaser.Sprite(game, 0, 0, "mover");
            e.ballCanvas.add(n.mover);
            n.mover.anchor = new Point(.5, .5);
            n.mover.inputEnabled = !0;
            n.mover.visible = !1;
        }
        
        if (t < 8 && 0 != t) {
            n.targetType = "SOLIDS";
        }
        if (t > 8) {
            n.targetType = "STRIPES";
        }
        if (8 == t) {
            n.targetType = "8 BALL";
        }
        
        n.position = new Vector2D(a[t].x, a[t].y);
        n.velocity = new Vector2D(0, 0);
        n.lastCollisionObject = null;
        n.id = t;
        n.active = !0;
        n.firstContact = !1;
        n.contactArray = new Array;
        
        if (0 == t) {
            n.screw = 0;
            n.english = 0;
            n.deltaScrew = new Vector2D(0, 0);
        }
        
        n.grip = 1;
        n.ySpin = 0;
        n.pocketTweenComplete = !0;
        n.propelling = !1;
        e.ballArray.push(n);
    }
    
    // Configurar guia
    e.guide = new Phaser.Graphics(game);
    e.guideCanvas.addChild(e.guide);
    
    // Configurar elementos da interface
    e.debugText = new Phaser.BitmapText(game, game.width - 1, 20, "font7", "", 34);
    e.guiCanvas.addChild(e.debugText);
    e.debugText.anchor.x = 1;
    e.debugText.visible = !1;
    
    // Configurar spinSetter
    e.spinSetter = new Phaser.Sprite(game, 0, 0, "spinSetterSmall");
    e.guiCanvas.addChild(e.spinSetter);
    e.spinSetter.anchor = new Point(.5, .5);
    e.spinSetter.inputEnabled = !0;
    e.spinSetter.ignoreChildInput = !0;
    e.cueBallSpot = new Phaser.Sprite(game, 0, 0, "cueBallSpot");
    e.spinSetter.addChild(e.cueBallSpot);
    e.cueBallSpot.anchor = new Point(.5, .5);
    e.spinSetterZoom = new Phaser.Sprite(game, 0, 0, "spinSetterZoom");
    e.guiCanvas.addChild(e.spinSetterZoom);
    e.spinSetterZoom.anchor = new Point(.5, .5);
    e.spinSetterZoom.inputEnabled = !0;
    e.spinSetterZoom.ignoreChildInput = !0;
    e.cueBallSpotZoom = new Phaser.Sprite(game, 0, 0, "cueBallSpotZoom");
    e.spinSetterZoom.addChild(e.cueBallSpotZoom);
    e.cueBallSpotZoom.anchor = new Point(.5, .5);
    e.spinSetterZoom.visible = !1;
    
    // Configurar rackSolids
    e.rackSolids = new Phaser.Group(game, e.guiCanvas, "rackSolids");
    e.rackBGSolids = new Phaser.Sprite(game, 0, 0, "rackBG");
    e.rackSolids.addChild(e.rackBGSolids);
    e.rackBGSolids.x = 1;
    e.rackBGSolids.y = 0;
    e.rackBGSolids.anchor = new Point(.5, 1);
    e.rackSolidsArray = new Array;
    e.rackSpotNumberArray = new Array;
    
    for (var i = 0; i < 7; i++) {
        e.rackSolidsArray[i] = new Phaser.Sprite(game, 0, 0, "guiSolids", i);
        e.rackSolids.addChild(e.rackSolidsArray[i]);
        e.rackSolidsArray[i].x = 50 * i - 200;
        e.rackSolidsArray[i].y = 7;
        e.rackSolidsArray[i].anchor = new Point(0, 1);
        e.rackSolidsArray[i].visible = !1;
        e.rackSpotNumberArray[i + 1] = e.rackSolidsArray[i];
    }
    
    e.rackSolids8ball = new Phaser.Sprite(game, 0, 0, "8ball");
    e.rackSolids.addChild(e.rackSolids8ball);
    e.rackSolids8ball.x = -185;
    e.rackSolids8ball.y = -11;
    e.rackSolids8ball.anchor = new Point(0, 1);
    e.rackSolids8ball.visible = !1;
    
    // Configurar rackStripes
    e.rackStripes = new Phaser.Group(game, e.guiCanvas, "rackStripes");
    e.rackBGStripes = new Phaser.Sprite(game, 0, 0, "rackBG");
    e.rackStripes.addChild(e.rackBGStripes);
    e.rackBGStripes.x = 1;
    e.rackBGStripes.y = 0;
    e.rackBGStripes.anchor = new Point(.5, 1);
    e.rackStripesArray = new Array;
    
    for (i = 0; i < 7; i++) {
        e.rackStripesArray[i] = new Phaser.Sprite(game, 0, 0, "guiStripes", i);
        e.rackStripes.addChild(e.rackStripesArray[i]);
        e.rackStripesArray[i].x = 50 * i - 200;
        e.rackStripesArray[i].y = 7;
        e.rackStripesArray[i].anchor = new Point(0, 1);
        e.rackStripesArray[i].visible = !1;
        e.rackSpotNumberArray[i + 9] = e.rackStripesArray[i];
    }
    
    e.rackStripes8ball = new Phaser.Sprite(game, 0, 0, "8ball");
    e.rackStripes.addChild(e.rackStripes8ball);
    e.rackStripes8ball.x = -185;
    e.rackStripes8ball.y = -11;
    e.rackStripes8ball.anchor = new Point(0, 1);
    e.rackStripes8ball.visible = !1;
    
    // Configurar turnArrows
    e.turnArrow1 = new Phaser.Sprite(game, 0, 0, "turnArrow");
    e.guiCanvas.addChild(e.turnArrow1);
    e.turnArrow1.anchor = new Point(.5, 1);
    e.turnArrow1.scale = new Point(.5, .5);
    e.turnArrow2 = new Phaser.Sprite(game, 0, 0, "turnArrow");
    e.guiCanvas.addChild(e.turnArrow2);
    e.turnArrow2.anchor = new Point(.5, 1);
    e.turnArrow2.scale = new Point(-.5, .5);
    
    // Configurar humanIcon
    e.humanIcon = new Phaser.Sprite(game, 0, 0, "humanIcon");
    if (2 == projectInfo.mode) {
        var l = new Phaser.BitmapText(game, 124, -(e.humanIcon.height - 204), "font7", "1", 80);
        l.anchor = new Phaser.Point(.5, .5);
        l.tint = 0;
        e.humanIcon.addChild(l);
    }
    e.guiCanvas.addChild(e.humanIcon);
    e.humanIcon.anchor = new Point(0, 1);
    e.humanIcon.scale = new Point(.5, .5);
    
    // Configurar aiIcon
    if (1 == projectInfo.mode) {
        e.aiIcon = new Phaser.Sprite(game, 0, 0, "aiIcon");
    } else {
        e.aiIcon = new Phaser.Sprite(game, 0, 0, "humanIcon");
        var c = new Phaser.BitmapText(game, 124, -(e.humanIcon.height - 81), "font7", "2", 80);
        c.anchor = new Phaser.Point(.5, .5);
        c.tint = 0;
        e.aiIcon.addChild(c);
    }
    e.guiCanvas.addChild(e.aiIcon);
    e.aiIcon.anchor = new Point(1, 1);
    e.aiIcon.scale = new Point(.5, .5);
    
    // Configurar guiPanels
    e.guiPanel1 = new Phaser.Sprite(game, 0, 0, "guiPanel1");
    e.guiBaseCanvas.addChild(e.guiPanel1);
    e.guiPanel1.anchor.x = 1;
    e.guiPanel1.anchor.y = 1;
    e.guiPanel2 = new Phaser.Sprite(game, 0, 0, "guiPanel1");
    e.guiBaseCanvas.addChild(e.guiPanel2);
    e.guiPanel2.anchor.x = .5;
    e.guiPanel2.anchor.y = 1;
    e.guiPanel3 = new Phaser.Sprite(game, 0, 0, "guiPanel1");
    e.guiBaseCanvas.addChild(e.guiPanel3);
    e.guiPanel3.anchor.x = 0;
    e.guiPanel3.anchor.y = 1;
    
    // Configurar textos
    e.timerText = new Phaser.BitmapText(game, 0, 0, "font7", "0:00", 56);
    e.guiCanvas.addChild(e.timerText);
    e.timerText.anchor.x = .5;
    e.timerText.anchor.y = 1;
    e.scoreText = new Phaser.BitmapText(game, 0, 0, "font7", projectInfo.score, 56);
    e.guiCanvas.addChild(e.scoreText);
    e.scoreText.anchor.x = .5;
    e.scoreText.anchor.y = 1;
    e.multiplierText = new Phaser.BitmapText(game, 0, 0, "font7", "x" + e.multiplier, 56);
    e.guiCanvas.addChild(e.multiplierText);
    e.multiplierText.anchor.x = .5;
    e.multiplierText.anchor.y = 1;
    
    if (2 == projectInfo.mode) {
        e.timerText.visible = !1;
        e.scoreText.visible = !1;
        e.multiplierText.visible = !1;
    }
    
    // Configurar menuButton
    e.menuButton = new Phaser.Button(game, 0, 0, "menuButton", n, this, 1, 0, 1);
    e.menuButton.scale = new Phaser.Point(.5, .5);
    e.guiCanvas.addChild(e.menuButton);
    e.menuButton.anchor = new Phaser.Point(.5, 0);
    
    // Configurar powerBar para touch
    if (game.device.touch) {
        e.powerBar = new Phaser.Group(game, e.guiCanvas, "powerBar");
        e.powerBarBG = new Phaser.Sprite(game, 0, 0, "powerBarBG");
        e.powerBarBG.anchor = new Point(.5, .5);
        e.powerBar.addChild(e.powerBarBG);
        e.powerBarBase = new Phaser.Sprite(game, 0, -13, "powerBarBase");
        e.powerBarBase.anchor = new Point(.5, .5);
        e.powerBar.addChild(e.powerBarBase);
        e.powerBarMask = game.add.graphics(e.powerBar.x, e.powerBar.y);
        e.powerBarBase.mask = e.powerBarMask;
        e.powerBarTop = new Phaser.Sprite(game, 0, -13, "powerBarTop");
        e.powerBarTop.anchor = new Point(.5, .5);
        e.powerBar.addChild(e.powerBarTop);
        e.powerBarCue = new Phaser.Sprite(game, 250, 13, "cue");
        e.powerBar.addChild(e.powerBarCue);
        e.powerBarCue.anchor = new Point(1, .5);
        e.powerBarCueMask = game.add.graphics(e.powerBar.x, e.powerBar.y);
        e.powerBarCue.mask = e.powerBarCueMask;
    }
    
    // Configurar gameOverPanel
    e.gameOverPanel = new Phaser.Group(game, e.guiCanvas, "gameOverPanel");
    e.gameOverPanel.anchor = new Point(.5, .5);
    e.gameOverPanel.visible = !1;
    e.gameOverPanelBG = new Phaser.Sprite(game, 0, 0, "panel3");
    e.gameOverPanelBG.anchor = new Point(.5, .5);
    e.gameOverPanel.addChild(e.gameOverPanelBG);
    
    // Configurar popUpPanel
    e.popUpPanel = new Phaser.Group(game, e.guiCanvas, "popUpPanel");
    e.popUpPanel.anchor = new Point(.5, .5);
    e.popUpPanel.visible = !1;
    e.popUpPanelBG = new Phaser.Sprite(game, 0, 0, "panel2");
    e.popUpPanelBG.scale = new Point(.75, 1);
    e.popUpPanelBG.anchor = new Point(.5, .5);
    e.popUpPanel.addChild(e.popUpPanelBG);
    
    // Configurar foulWindow
    e.foulWindow = new Phaser.Group(game, e.guiCanvas, "foulWindow");
    e.foulWindow.visible = !1;
    e.foulWindow.background = new Phaser.Sprite(game, 0, 0, "foulDisplay");
    e.foulWindow.addChild(e.foulWindow.background);
    e.foulWindow.background.anchor = new Point(.5, .5);
    
    // Configurar cue
    e.cueShadow = new Phaser.Sprite(game, 0, 0, "cueShadow");
    e.cueCanvas.addChild(e.cueShadow);
    e.cueShadow.anchor = new Point(1, 8 / 53);
    e.cue = new Phaser.Sprite(game, 0, 0, "cue");
    e.cueCanvas.addChild(e.cue);
    e.cue.anchor = new Point(1, .5);
    
    // Configurar física
    this.contactEvent = new Phaser.Signal;
    this.contactEvent.add(onContact, this);
    
    e.phys = new billiardPhysics(this.contactEvent, e.ballArray, e.lineArray, e.vertexArray, e.pocketArray, 0);
    e.phys.friction = e.friction;
    e.phys.ballRadius = e.ballRadius;
    e.phys.pocketRadius = e.pocketRadius;
    e.phys.physScale = e.physScale;
    e.phys.minVelocity = e.minVelocity;
    e.phys.cushionRestitution = e.cushionRestitution;
    e.phys.ballRestitution = e.ballRestitution;
    
    // Renderizar tela
    renderScreen();
    
    // Configurar levelText
    e.levelText = new Phaser.BitmapText(game, 0, -100, "font1", projectInfo.level, 48);
    e.timerCanvas.addChild(e.levelText);
    e.levelText.anchor.x = .5;
    e.levelText.anchor.y = .5;
    e.levelText.alpha = .2;
    e.successIcon = new Phaser.Sprite(game, 0, 0, "success");
    e.timerCanvas.addChild(e.successIcon);
    e.successIcon.visible = !1;
    e.successIcon.anchor = new Point(.5, .5);
    e.successIcon.alpha = .25;
    
    if (1 == projectInfo.tutorial) {
        e.levelText.visible = !1;
    }
    e.levelText.visible = !1;
    
    // Configurar tutorial
    if (1 == projectInfo.tutorial) {
        if (game.device.touch) {
            e.hand = new Phaser.Sprite(game, 0, 0, "hand");
            e.tutCanvas.addChild(e.hand);
            e.hand.alpha = 0;
        } else {
            e.mouseSprite = new Phaser.Sprite(game, 0, 0, "mouseSprite");
            e.tutCanvas.addChild(e.mouseSprite);
            e.mouseSprite.alpha = 0;
            e.mouseSprite.anchor = new Point(1, -.5);
        }
    }
    
    // Configurar turno inicial
    if ("none" == projectInfo.lastBreaker) {
        if (Math.random() < .5) {
            e.turn = "p1";
            e.turnArrow1.frame = 1;
            e.turnArrow2.frame = 0;
        } else {
            e.turn = "p2";
            e.turnArrow1.frame = 0;
            e.turnArrow2.frame = 1;
        }
    } else if ("p2" == projectInfo.lastBreaker) {
        e.turn = "p1";
        e.turnArrow1.frame = 1;
        e.turnArrow2.frame = 0;
    } else {
        e.turn = "p2";
        e.turnArrow1.frame = 0;
        e.turnArrow2.frame = 1;
    }
    
    // Configurar skipText
    e.skipText = new Phaser.BitmapText(game, game.world.centerX, game.world.centerY + 230, "font3", "Click to skip", 64);
    e.guiCanvas.addChild(e.skipText);
    e.skipText.anchor.x = .5;
    e.skipText.anchor.y = .5;
    e.skipText.alpha = .8;
    if (projectInfo.tutorial) {
        e.skipText.visible = !0;
    }
    e.skipText.visible = !1;
    
    // Configurar tutorialText
    e.tutorialText = new Phaser.BitmapText(game, 0, 0, "font3", "Tutorial", 78);
    e.guiCanvas.addChild(e.tutorialText);
    e.tutorialText.anchor.x = .5;
    e.tutorialText.anchor.y = .5;
    e.tutorialText.alpha = .8;
    if (projectInfo.tutorial) {
        e.tutorialText.visible = !0;
    }
    e.tutorialText.visible = !1;
    
    // Aplicar resize
    resizeGame();
    e.gameRunning = !0;
};

// Funções auxiliares
function n() {
    if (1 != e.foulWindow.visible && 0 == e.gameOver) {
        window.famobi_analytics.trackScreen("SCREEN_PAUSE");
        e.gameRunning = !1;
        e.popUpPanel.visible = !0;
        e.quitButtonPU.input.enabled = !0;
        e.replayButtonPU.input.enabled = !0;
        e.playButtonPU.input.enabled = !0;
        e.muteButtonPU.input.enabled = !0;
    }
}

playState.resumeGame = function() {
    var e = this.gameInfo;
    if (1 != e.gameOver) {
        window.famobi_analytics.trackScreen("SCREEN_LEVEL");
        e.gameRunning = !0;
    }
    e.popUpPanel.visible = !1;
    e.quitButtonPU.input.enabled = !1;
    e.replayButtonPU.input.enabled = !1;
    e.playButtonPU.input.enabled = !1;
    e.muteButtonPU.input.enabled = !1;
};

playState.shutdown = function() {
    var e = this.gameInfo;
    e.gameCanvas.destroy();
    e.guiCanvas.destroy();
    e.guiBaseCanvas.destroy();
    e.cueBaseCanvas.destroy();
};
