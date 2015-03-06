/* Status of Track Preparation used in prepareTrack() */
BUILD_TRACK  = 0;
SET_START  = 1;
PLACE_PLAYERS = 2;
PREPARE_TURN  = 3;

/* Circle Size used to draw them to the canvas */
CIRCLE_SIZE = 5;

// XXX: define layers that are used by addChild as second argument...so one can assure, that everything is on the right height

// XXX: make pics to global vars to make editing afterwards easier
/* Images and Sounds used in the game. This manifest is loaded with preload. */
manifest = [
	{src:"img/background.jpg", id:"background"},
	{src:"img/background.jpg", id:"hud1"},
	{src:"img/background.jpg", id:"hud2"},
	{src:"img/background.jpg", id:"hud3"},
	{src:"img/background.jpg", id:"hud4"}
];

/* This functin is called on pageload */
function init() {

	/* **************** */
	/* GLOBAL VARIABLES */
	/* **************** */

	stage = new createjs.Stage("board");
	// XXX: HARD CODED SIZES!!!!!!!!
	w = stage.canvas.width;//1000;//500;
	h = stage.canvas.height;//600;//300;
	game = new Game(w, h);
	
	
	/* Container that allow for faster allocation of Objects */
	// Background
	backgroundContainer = new createjs.Container();
	stage.addChildAt( backgroundContainer, 0 );
	// finishLinePoints
	finishLineContainer = new createjs.Container();
	stage.addChildAt( finishLineContainer, 1 );
	// TrackPoints
	trackContainer = new createjs.Container();
	stage.addChildAt( trackContainer, 2 );
	// Painting from creation
	paintContainer = new createjs.Container();
	stage.addChildAt( paintContainer, 3 );
	// Lines from Cars
	lineContainer = new createjs.Container();
	stage.addChildAt( lineContainer, 4 );
	// addOns/PickUps/Items
	addOnContainer = new createjs.Container();
	stage.addChildAt( addOnContainer, 5 );
	// Playerobjects
	playerContainer = new createjs.Container();
	stage.addChildAt( playerContainer, 6 );
	// Next Fields
	choiceContainer = new createjs.Container();
	stage.addChildAt( choiceContainer, 7 );
	// MenuObjects
	menuContainer = new createjs.Container();
	stage.addChildAt( menuContainer, 8 );
	// HUD
	HUDContainer = new createjs.Container();
	stage.addChildAt( HUDContainer, 9 );
	// XXX: STUFF TEMPPPPP
	stuffContainer = new createjs.Container();
	stage.addChildAt( stuffContainer, 10 );


	/* ************** */
	/* PRELOAD IMAGES */
	/* ************** */

	// XXX: false is for local loading (?), true is for the internet stuff
	// var preload = new createjs.LoadQueue(false);
	// // // XXX: PUT NICE BAR WITH GLOBAL PROGRESS VALUE THAT INDICATES LOAD OF ASSET STATUS
	// // // preload.on("progress", handleProgress);
	// preload.on("fileload", handleLoadedStuff);
	// preload.on("complete", prepareMenu);
	// preload.loadManifest(manifest);

	/* *********************** */
	/* Initialize DOM Elements */
	/* *********************** */

	for (var i = 0; i < game.MAXPLAYERS; i++){
		var input = document.getElementById("input-player-"+i);
		var dom = new createjs.DOMElement(input);
		dom.name = "input-player-"+i;
		var width = dom.htmlElement.clientWidth;
		var height = dom.htmlElement.clientHeight;
		var OFFSET = 20;
		switch(i){
			case 0: dom.x = OFFSET; dom.y = OFFSET; break;
			case 1: dom.x = w-width-OFFSET; dom.y = OFFSET; break;
			case 2: dom.x = OFFSET; dom.y = h-height-OFFSET; break;
			case 3: dom.x = w-width-OFFSET; dom.y = h-height-OFFSET; break;
		}
		menuContainer.addChild(dom);
	}
	// XXX: TEMPORARILY COMMENTED OUT FOR TESTING STUFF)
	prepareMenu(); // XXX: TEMP
	/* ****** */
	/* TICKER */
	/* ****** */
	
	// XXX: MAYBE OK WITHOUT TICKER???
	// This is for stuff that happens randomly 
	// createjs.Ticker._interval = 1000;
	// createjs.Ticker.addEventListener("tick", handleTick);
	// stage.addChild(menuContainer);
	createjs.Ticker.addEventListener("tick", stage);
	
}

// function handleTick() {
//     stage.update();
//     // Maybe here can be done some action someday..like adding addons ...
// }

function handleLoadedStuff(e){
	var x = 0;
	var y = 0;
	var width = 0;
	var height = 0;
	var container = undefined;
	var image = true;
	switch(e.item.id){
		case "background": 	
				x = 0;    y = 0;    
				width = w; height = h;
				container = backgroundContainer;
		break;
		case "hud1": 		
				x = 0;    y = 0;    
				width = 75; height = 50;
				container = HUDContainer;
		break;
		case "hud2": 		
				x = w-75; y = 0;    
				width = 75; height = 50;
				container = HUDContainer;
		break;
		case "hud3": 		
				x = 0;    y = h-50; 
				width = 75; height = 50;
				container = HUDContainer;
		break;
		case "hud4": 		
				x = w-75; y = h-50; 
				width = 75; height = 50;
				container = HUDContainer;
		break;
		default: console.log("SCREW YOU!"); break;
	}
	
	var obj;
	if (image){
		obj = drawPicture(e.result, new Location(x,y), width, height, e.item.id);	
	}else{
		// Sound
		// XXX: TODO 
	}
	
	container.addChild( obj );
}

function prepareMenu() {

	// XXX: Testing Purposes
	game.activePlayers.push(new Player("Furraro1", new Car(null, "#FF0066"), 0))
	game.activePlayers.push(new Player("Furraro2", new Car(null, "#66FF33"), 1))
	game.activePlayers.push(new Player("Furraro3", new Car(null, "#00CCFF"), 2))
	game.activePlayers.push(new Player("Furraro4", new Car(null, "#0033CC"), 3))
	game.players.push(game.activePlayers[0]);
	game.players.push(game.activePlayers[1]);
	game.players.push(game.activePlayers[2]);
	game.players.push(game.activePlayers[3]);

	// display HUD
	initScore();

	// XXX: USE DRAWTEXT METHOD
	// display Header
	var header = drawText ("AUTORENNEN", "header", new Location(w/2, 20), "18px", "Arial", "DeepSkyBlue", false);
	menuContainer.addChild(header);

	// display sound on/off symbol with clickevent

	// display choice of tracks. This should be painted to the canvas immediately on browsing through them (CACHING!!!!)
	// -The Listener sets and paints the track right away!
	// XXX: THIS NEEDS TO BE SET DEPENDANT ON CHOICE OF TRACK. EITHER CREATE OWN OR CHOOSE EXISTING
	buildStatus = BUILD_TRACK;
	// OR
	// buildStatus = PLACE_PLAYERS;

	// display choice of playerdesign (car, color,...)
	// -MOCKUP Version: simply change color on clicking trough...

	var header = drawText("PLAY", "header", new Location(w/2, h-80), "18px", "Arial", "DeepSkyBlue", true);
	menuContainer.addChild( header );
	
	// XXX: This is meant to be in the playbuttononclickevent
	prepareTrack();
};


/* BUILD STUFF */ 

function prepareTrack(){
	stage.removeAllEventListeners();
	finishLineContainer.removeAllEventListeners();
	// hide scores
	HUDContainer.visible = false;

	switch(buildStatus){
		case BUILD_TRACK:
			buildTrack();
		break;
		case SET_START:
			setStartPoints();
		break;
		case PLACE_PLAYERS:
			paintContainer.removeAllChildren();
			// Determine Locations of players
			setPlayers();
		break;
		case PREPARE_TURN:
			HUDContainer.visible = true;;
			doMove();
		break;
		default: console.log("Well OK?");
	}
}

// XXX: needs to be niceified
function buildTrack(){
	
	var outerTrackBorders = new Array();
	var start = true;

	var shape = new createjs.Shape();
	shape.name = "buildPainting1";
	paintContainer.addChild( shape );

	// set up our defaults:
	var color = "#0FF";
	var size = 4;
	var oldX, oldY;
	var paint = false;
	var timedown = 0;
	var timeup = Date.now();

	// add handler for stage mouse events:
	stage.on("stagemousedown", function(evt) {
		// XXX: THIS IS A TEMP FIX TO PREVENT THE STAGEEVENT FROM BEING FIRED WHEN THE DONE BUTTON IS CLICKED
		var obj = stage.getObjectUnderPoint(evt.stageX, evt.stageY);
		if (obj != null && obj.name == "doneButton"){
			return;
		}

		// capture press time
		timedown = Date.now();
		if (start){
			start = false;
		}
		paint = true;
	})                
	
	stage.on("stagemouseup", function(evt) {
		paint = false;
		// capture press time
		timeup = Date.now();
		// compare times and determine wether the user wants to fill a circle
		if (timeup - timedown < 300){
			// XXX: THIS IS A TEMP FIX TO PREVENT THE STAGEEVENT FROM BEING FIRED WHEN THE DONE BUTTON IS CLICKED
			var obj = stage.getObjectUnderPoint(evt.stageX, evt.stageY);
			if (obj != null && obj.name == "doneButton1"){
				return;
			}
			detectFilling(game.toLoc(evt.stageX, evt.stageY));
			
			for (var j = 0; j < game.track.surrPoints.length; j++){
				var circle = drawColoredCircle("green", game.track.surrPoints[j], CIRCLE_SIZE, true);
				var cacheRect = {};
				circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2, CIRCLE_SIZE*2 );
				trackContainer.addChild( circle );
			}
			// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
			try{
				trackContainer.updateCache(0, 0, w, h);
			} catch(err){
				trackContainer.cache(0, 0, w, h);
			}
		}
		else{
			// color = createjs.Graphics.getHSL(Math.random()*360, 100, 50);
			
			// add missing points between pushed points
			var newBorders = new Array();
			for (var i = 0; i < outerTrackBorders.length-1; i++){
				var srcLoc = outerTrackBorders[i];
				var destLoc = outerTrackBorders[i+1];
				var between = detectPointsInBetween(srcLoc, destLoc);
				
				newBorders.push(srcLoc);
				newBorders = newBorders.concat(between);
				newBorders.push(destLoc);
			}

			var doubled = false;
			for (var i = 0; i < newBorders.length; i++){
				doubled = false;
				if (!game.track.isBorder(newBorders[i])
						&& !game.track.isSurrounding(newBorders[i])){
					game.track.trackBorders.push(newBorders[i]);
				}
			}
			
			for (var j = 0; j < game.track.trackBorders.length; j++){
				// var circle = drawColoredCircle("red", game.track.trackBorders[j], 4, true);
				// circle.cache(-4, -4, 8,8);
				// trackContainer.addChild(circle);
				if (trackContainer.getChildByName(game.track.trackBorders[j].x+","+game.track.trackBorders[j].y) == null){
					var circle = drawColoredCircle("red", game.track.trackBorders[j], CIRCLE_SIZE, true);
					circle.cache(-CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2);
					trackContainer.addChild(circle);	
				}
			}
			// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
			try{
				trackContainer.updateCache(0, 0, w, h);
			} catch(err){
				trackContainer.cache(0, 0, w, h);
			}
			// clear outerTrackBorders
			outerTrackBorders.length = 0;
		}
	})
	 
	
    stage.on("stagemousemove", function(evt) {

		if (paint) {
			shape.graphics.beginStroke(color)
						  .setStrokeStyle(size, "round")
						  .moveTo(oldX, oldY)
						  .lineTo(evt.stageX, evt.stageY);
			stage.update();

			outerTrackBorders.push(game.toLoc(evt.stageX, evt.stageY));
			
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	// XXX: IMPLEMENT A BUTTON WITH LISTENER THAT SETS STATUS ON +1 AND CALLS BUILDTRACK() and removes itself and the buildpainting
	var text = drawText ("Done", "doneButton", new Location(w/2 - 80, h-30), "20px", "Arial", "DeepSkyBlue", true);
	
	stuffContainer.addChild(text);
	text.on("click", function (evt){
		buildStatus++;
		prepareTrack();
		var child = stage.getChildByName("doneButton");
		stuffContainer.removeChild(child);
		stage.update();
	});
	
}

function detectPointsInBetween(srcLoc, destLoc){

	var xDiff = srcLoc.x - destLoc.x;
	var yDiff = srcLoc.y - destLoc.y;
	var xMult = -1;
	var yMult = -1;

	if (xDiff < 0)
		xMult = 1;
	if (yDiff < 0)
		yMult = 1;

	var xPercent = 0;
	var yPercent = 0;
	var xCounter = 1;
	var yCounter = 1;
	var between = new Array();
	var x = srcLoc.x;
	var y = srcLoc.y;

	while (Math.abs(xPercent) < 1 || Math.abs(yPercent) < 1){
		xPercent = xCounter / xDiff;
		yPercent = yCounter / yDiff;

		if (Math.abs(yPercent) > Math.abs(xPercent)){
			x += xMult;
			xCounter++;
		}
		else {
			y += yMult;
			yCounter++;
		}
		between.push(new Location(x, y));
	}

	return between;
}

function detectFilling(loc){
	game.track.surrPoints.push(loc);
	var radialPoints = game.track.getSurrounding(loc, false);
	for (var i = 0; i < radialPoints.length; i++){
		if (!game.track.isBorder(radialPoints[i]) && !game.track.isSurrounding(radialPoints[i]) ){
			detectFilling(radialPoints[i]);
		}
	}
}


function setStartPoints(){
	
	var finishLine = new Array();

	var shape = new createjs.Shape();
	shape.name = "buildPainting2";
	paintContainer.addChild(shape);

	// set up our defaults:
	var color = "#00F";
	var size = 10;
	var oldX, oldY;
	var paint = false;
	var timedown = 0;
	var timeup = Date.now();

	// add handler for stage mouse events:
	stage.on("stagemousedown", function(evt) {
		// capture press time
		timedown = Date.now();
		paint = true;
	})                
	
	stage.on("stagemouseup", function(evt) {
		paint = false;
		// capture press time
		timeup = Date.now();
		// add missing points between pushed points
		var newFinishLine = new Array();
		for (var i = 0; i < finishLine.length-1; i++){
			var srcLoc = finishLine[i];
			var destLoc = finishLine[i+1];
			var between = detectPointsInBetween(srcLoc, destLoc);
			
			newFinishLine.push(srcLoc);
			newFinishLine = newFinishLine.concat(between);
			newFinishLine.push(destLoc);
		}

		for (var i = 0; i < newFinishLine.length; i++){	
			if (!game.track.isFinishLine(newFinishLine[i]) 
					&& !game.track.isBorder(newFinishLine[i]) 
					&& !game.track.isSurrounding(newFinishLine[i])){
				game.track.finishLine.push(newFinishLine[i]);
			}
		}
		for (var j = 0; j < game.track.finishLine.length; j++){
			if (finishLineContainer.getChildByName(game.track.finishLine[j].x+","+game.track.finishLine[j].y) == null){
				var circle = drawColoredCircle("blue", game.track.finishLine[j], CIRCLE_SIZE, true);
				circle.cache(-CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2);
				finishLineContainer.addChild(circle);	
			}
			
		}
		
		// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
		try{
			finishLineContainer.updateCache(0, 0, w, h);
		} catch(err){
			finishLineContainer.cache(0, 0, w, h);
		}
		// clear finishLine
		finishLine.length = 0;
		
	})
	
    stage.on("stagemousemove", function(evt) {
		if (paint) {
			shape.graphics.beginStroke(color)
						  .setStrokeStyle(size, "round")
						  .moveTo(oldX, oldY)
						  .lineTo(evt.stageX, evt.stageY);
			stage.update();
			finishLine.push(game.toLoc(evt.stageX, evt.stageY));
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	// XXX: IMPLEMENT A BUTTON WITH LISTENER THAT SETS STATUS ON +1 AND CALLS BUILDTRACK() and removes itself and the buildpainting
	var text = drawText ("Done", "doneButton", new Location(w/2 - 80, h-30), "20px", "Arial", "DeepSkyBlue", true);
	stuffContainer.addChild(text);
	text.on("click", function (evt){
		buildStatus++;
		prepareTrack();
		var c = evt.currentTarget;
		stuffContainer.removeChild(c);
		stage.update();
	});
	
}

function hover (evt, data){
	var c = evt.currentTarget;
	switch(data.obj){
		case "circle": c.graphics.beginFill( data.color ).drawCircle( 0, 0, CIRCLE_SIZE ).endFill(); break;
		case "text": c.color = data.color; break;
		default: console.log("Missing case in hover.");break;
	}
	
	// XXX: As long as there is the ticker with 60 fps we need not to do this everytime.........
	// stage.update()
}

function setPlayers(){
	finishLineContainer.uncache();
	var max = game.activePlayers.length;
	var no = 0;
	
	for (var i = 0; i < finishLineContainer.getNumChildren(); i++) {
		var child = finishLineContainer.getChildAt(i);
		child.uncache();
		child.cursor = "pointer";
		child.on("mouseover", hover, false, null, {color: "red", obj: "circle"});
		child.on("mouseout", hover, false, null, {color: "blue", obj: "circle"});
		child.on("click", function(evt){
			var c = evt.currentTarget;
			c.removeAllEventListeners();

			var loc = game.toLoc(evt.stageX, evt.stageY);
			game.activePlayers[no].historyLocs.push(loc);
			
			var playercircle = drawColoredCircle(game.activePlayers[no].car.color, loc, CIRCLE_SIZE+5, false);
			playerContainer.addChild(playercircle);
			stage.update();

			no++;
			if (no == max){
				// XXX: MAYBE MOVE THAT INTO PREPARE TRACK...SINCE THERE WILL BE DELETED EVERY EVENT LISTENER
				for (var j = 0; j < finishLineContainer.getNumChildren(); j++) {
					var ch = finishLineContainer.getChildAt(j);
					ch.removeAllEventListeners();
					// restore Look of FinishLine Point
					ch.graphics.beginFill( "blue" ).drawCircle( 0, 0, CIRCLE_SIZE ).endFill();
				}
				buildStatus++;
				game.calculateTrackPoints();
				prepareTrack();
				stage.update();
			}
		})
	};

}



function doMove(){
	// XXX: I think this could be useful at other locations in the code
	choiceContainer.removeAllChildren();

	var crntTurn = game.getTurn();

	updateScores();

	if (crntTurn.win){
		alert(crntTurn.player.name + "  hat gewonnen.");
		return;
	}
	if (crntTurn.draw){
		alert("Es ist unentschieden ausgegangen.");
		return;
	}

	var surr = crntTurn.surrounding;
	for (var i = 0; i < surr.length; i++){
		var circle = drawColoredCircle(crntTurn.player.car.color, surr[i], CIRCLE_SIZE, true);
		choiceContainer.addChild(circle);
		circle.on("click", function(evt){
			var loc = game.toLoc(evt.stageX, evt.stageY);
			updateCars(crntTurn.player, loc, /*crntPlayer.getSpeed()*/4, 1000, 60);
			// update addons
			// view.updateAddOns(loc);
			// update score
			game.turn(loc);
			doMove();
		});
	}
}


function toggleSound() {
	// if on turn off and vice versa
};


function updateAddOns(l) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l), l.addOn);
	// search for addonchild by name of its location
	var name = loc.x + "," +  loc.y;
	var addOn = addOnContainer.getChildByName(name);

	// XXX: replace loc.addon by Location.NONE...
	if (addOn != null && loc.addOn == 0){
		// ... and remove it from stage and array
    	addOnContainer.removeChild(addOn);
	} 
	if (addOn != null && loc.addOn != 0) {
		// ... and do nothing
	}
	if (addOn == null && loc.addOn == 0) {
		// ... and do nothing
	}
	if (addOn == null && loc.addOn != 0) {
		// ... and add it to the stage
		addOn = drawPicture(loc.addOn, loc);
		addOn.name = name;
	}
};

function drawLine(size, srcL, destL, color) {
	var srcLoc = new Location(game.toXCoord(srcL), game.toYCoord(srcL));
	var destLoc = new Location(game.toXCoord(destL), game.toYCoord(destL));
	var g = new createjs.Graphics();
 	g.setStrokeStyle(size);
 	g.beginStroke(color);
 	g.moveTo(srcLoc.x, srcLoc.y);
 	g.lineTo(destLoc.x, destLoc.y);
 	return new createjs.Shape(g);
};

function drawColoredCircle(color, l, radius, fill) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l), l.addOn);

	var circle = new createjs.Shape();
	if (fill){
		circle.graphics.beginFill(color).drawCircle(0, 0, radius);
	}else{
		circle.graphics.setStrokeStyle(4);
 		circle.graphics.beginStroke(color).drawCircle(0, 0, radius);
	}
	circle.name = l.x + "," +  l.y;
	circle.x = loc.x;
	circle.y = loc.y;
	circle.setBounds(loc.x-radius, loc.y-radius, radius*2, radius*2);

	return circle;
};
function drawText (content, name, loc, size, font, color, mouseover) {
	// display Play Button with clickevent and nice haptic mouseover
	var text = new createjs.Text(content, size + " " + font, color);
	text.name = name;
	text.x = loc.x;
	text.y = loc.y;
	// XXX: ALIGN?????????

	if (mouseover){
		stage.enableMouseOver();	
		text.cursor = "pointer";
		
		// Hitarea for Mouseover
		var s = new createjs.Shape();
		s.graphics.beginFill("#f00").drawRect(0,0,text.getMeasuredWidth(), text.getMeasuredHeight());
		text.hitArea = s;
		// XXX: THESE/THIS (?) DO NOT WORK IN FIREFOX???????? (EVENTTYPES)
		text.on("mouseover", hover, false, null, {color: "red", obj: "text"});
		text.on("mouseout", hover, false, null, {color: "DeepSkyBlue", obj: "text"});
	}
	
	return text;
}

function drawPicture(pic, l, width, height, name) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l), l.addOn);

	var bg = new createjs.Bitmap(pic);
    bg.name = name;
    bg.x = loc.x;
    bg.y = loc.y;
    // XXX: SCALES WITH FIXED RATIO
    // var ratio = bg.image.width/bg.image.height;
    bg.scaleX = width/bg.image.width;
    bg.scaleY = height/bg.image.height;
    // XXX: SCALES WITH FIXED RATIO
    // bg.scaleY = bg.scaleX * (1/ratio);
    return bg;
};

function updateScores() {
	// XXX: MAKE NICER
	for (var i = 0; i < game.players.length; i++){
		var player = game.players[i];
		var displayedText = player.name + (game.isKicked(player) ? " KICKED": "") + "\n" 
 					 + player.getSpeed().toFixed(1) + "kmh (" + player.avgSpeed.toFixed(1) + "dschn.kmh)\n"
 					 + player.distance.toFixed(1) +"m";
	 	var t = HUDContainer.getChildByName("hud"+player.no+"_text");
	 	t.text = displayedText;
	 	// XXX: needs to be set in initScore!!!
	 	// XXX: needs to be on top of everything!!!
	 	t.color = player.car.color;	
	}
};

function initScore() {
	for (var i = 0; i < 4; i++) {
		// XXX: USE DRAWTEXT METHOD
		var text = new createjs.Text("Player"+i, "18px Arial", "DeepSkyBlue");
		text.name = "hud"+i+"_text";
		switch (i){
			case 0: text.x = 10;   text.y = 30;   text.textAlign = "left"; break;
			case 1: text.x = w-40; text.y = 30;   text.textAlign = "right"; break;
			case 2: text.x = 10;   text.y = h-80; text.textAlign = "left"; break;
			case 3: text.x = w-40; text.y = h-80; text.textAlign = "right"; break;
		}
		text.textBaseline = "alphabetic";
		HUDContainer.addChild(text);
	};
	stage.update();
};

function initCars(visible) {

};

function updateCars(player, l, speed, time, fps) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l));
	var car = playerContainer.getChildAt(player.no);
	createjs.Tween.get(car, { loop: false })
  	.to({ x: loc.x, y: loc.y }, time, createjs.Ease.getPowInOut(speed));
  	// XXX: These can be cached!
  	var line = drawLine(1, player.crntLoc(), l, player.car.color);
  	lineContainer.addChild(line);
};











