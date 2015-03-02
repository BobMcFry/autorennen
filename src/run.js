BUILD_TRACK  = 0;
BUILD_SET_START  = 1;
BUILD_DONE  = 2;
// XXX: make pics to global vars to make editing afterwards easier
manifest = [
	{src:"img/background_norights.jpg", id:"background"},
	{src:"img/background_norights.jpg", id:"hud1"},
	{src:"img/background_norights.jpg", id:"hud2"},
	{src:"img/background_norights.jpg", id:"hud3"},
	{src:"img/background_norights.jpg", id:"hud4"}
];
CIRCLE_SIZE = 10;

function init() {
	stage = new createjs.Stage("board");
	// XXX: HARD CODED SIZES!!!!!!!!
	w = 1000;//500;
	h = 600;//300;
	game = new Game(w, h);
	cars = new Array(4);
	finishLine = new Array();
	addOnContainer = new createjs.Container();
	addOnContainer.visible = false;
	menuContainer = new createjs.Container();
	menuContainer.visible = false;
	HUDContainer = new createjs.Container();
	HUDContainer.visible = false;
	trackContainer = new createjs.Container();
	finishLineContainer = new createjs.Container();
	
	buildStatus = BUILD_TRACK;
	
	// Preload stuff
	// XXX: false is for local loading (?), true is for the internet stuff
	var preload = new createjs.LoadQueue(false);
	// XXX: PUT NICE BAR WITH GLOBAL PROGRESS VALUE THAT INDICATES LOAD OF ASSET STATUS
	// preload.on("progress", handleProgress);
	preload.on("fileload", handleLoadedStuff);
	preload.on("complete", prepareMenu);
	preload.loadManifest(manifest);

	// This is for stuff that happens randomly 
	createjs.Ticker._interval = 1000;
	createjs.Ticker.addEventListener("tick", handleTick);
	
}

function handleTick() {
    stage.update();
    console.log("Scrumble");
    // Maybe here can be done some action someday..like adding addons ...
}

function handleLoadedStuff(e){
	var x = 0;
	var y = 0;
	var width = 0;
	var height = 0;
	var container = undefined;
	switch(e.item.id){
		case "background": 	
				x = 0;    y = 0;    
				width = w; height = h; 
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
	// XXX: Here comes the distinction between Pics and Sound e.g.
	pic = drawPicture(e.result, new Location(x,y), width, height, e.item.id);

	if (container == undefined){
		stage.addChild(pic);
		pic.visible = false;
	}
	else{
		container.addChild(pic);
		container.visible = false;
		stage.addChild(container);
	}
}

function prepareMenu() {
 	
	// display background
	stage.getChildByName("background").visible = true;

	// display HUD
	initScore();
	HUDContainer.visible = true;
	stage.addChild(HUDContainer);

	// XXX: USE DRAWTEXT METHOD
	// display Header
	var header = new createjs.Text("AUTORENNEN", "18px Arial", "DeepSkyBlue");
	header.name = "header";
	header.x = w/2;
	header.y = 20;
	menuContainer.addChild(header);

	// XXX: USE DRAWTEXT METHOD
	// display Play Button with clickevent and nice haptic mouseover
	var play = new createjs.Text("PLAY", "18px Arial", "DeepSkyBlue");
	play.name = "play";
	play.x = w/2;
	play.y = h - 40;
	stage.enableMouseOver();
	play.cursor = "pointer";
	// Hitarea for Mouseover
	var s = new createjs.Shape();
	s.graphics.beginFill("#f00").drawRect(0,0,play.getMeasuredWidth(), play.getMeasuredHeight());
	play.hitArea = s;
	play.on("mouseover", playMouseover);
	play.on("mouseout", playMouseout);
	// play.on("click", turn);
	function playMouseover(e){
		play.color = "red";
		stage.update();
	}
	function playMouseout(e){
		play.color = "DeepSkyBlue";
		stage.update();
	}
	menuContainer.addChild(play);
	menuContainer.visible = true;

	// display sound on/off symbol with clickevent

	// display choice of tracks. This should be painted to the canvas immediately on browsing through them
	// -The Listener sets and paints the track right away!

	// display choice of playerdesign (car, color,...)
	// -MOCKUP Version: simply change color on clicking trough...
	
	stage.addChild(menuContainer);
	
	game.activePlayers.push(new Player("Furraro1", new Car(null, null), 1))
	game.activePlayers.push(new Player("Furraro2", new Car(null, null), 2))
	game.activePlayers.push(new Player("Furraro3", new Car(null, null), 3))
	game.activePlayers.push(new Player("Furraro4", new Car(null, null), 4))

	prepareTrack();
	// stage.on("click", turn, null, false, undefined);
};

function prepareTurn(){

}

function doMove(evt){
	var loc = game.toLoc(evt.stageX, evt.stageY);

	game.turn(loc);
	// create animation that displays movement from last to current pos
	var crntPlayer = game.getCurrentPlayer();
	view.updateCars(crntPlayer.no, loc, crntPlayer.getSpeed(), 1000, 60);
	// update addons
	view.updateAddOns(loc);
	// update score
	updateScore(crntPlayer);
	// check if won?
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
    	stage.removeChild(addOn);
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

function drawLine(type, srcL, destL, color) {
	var srcLoc = new Location(game.toXCoord(srcL), game.toYCoord(srcL), srcL.addOn);
	var destLoc = new Location(game.toXCoord(destL), game.toYCoord(destL), destL.addOn);
};

function drawColoredCircle(color, l, radius, fill) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l), l.addOn);

	var circle = new createjs.Shape();
	if (fill){
		circle.graphics.beginFill(color).drawCircle(0, 0, radius);
	}else{
		circle.graphics.setStrokeStyle(1);
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
		text.on("mouseover", textMouseover);
		text.on("mouseout", textMouseout);

		function textMouseover(e){
			text.color = "red";
			stage.update();
		}
		function textMouseout(e){
			text.color = "DeepSkyBlue";
			stage.update();
		}
	}
	
	return text;
}

function drawPicture(pic, l, width, height, name) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l), l.addOn);

	var bg = new createjs.Bitmap(pic);
    bg.name = name;
    bg.x = loc.x;
    bg.y = loc.y;
    bg.scaleX = width/bg.image.width;
    bg.scaleY = height/bg.image.height;
    return bg;
};

function updateScore(player) {
	// XXX: USE DRAWTEXT METHOD
 	displayedText = player.name + "\n" 
 					+ player.getSpeed() + "(" + player.avgSpeed + ")\n"
 					+ player.distance;

 	var text = HUDContainer.getChildByName("hud"+player.no+"_text");
 	text = displayedText;
};

function initScore() {
	for (var i = 1; i < 5; i++) {
		// XXX: USE DRAWTEXT METHOD
		var text = new createjs.Text("Player"+i, "18px Arial", "DeepSkyBlue");
		text.name = "hud"+i+"_text";
		switch (i){
			case 1: text.x = 10;   text.y = 30;   text.textAlign = "left"; break;
			case 2: text.x = w-10; text.y = 30;   text.textAlign = "right"; break;
			case 3: text.x = 10;   text.y = h-20; text.textAlign = "left"; break;
			case 4: text.x = w-10; text.y = h-20; text.textAlign = "right"; break;
		}
		text.textBaseline = "alphabetic";
		HUDContainer.addChild(text);
	};
};

function initCars(visible) {

};

function updateCars(no, l, speed, time, fps) {
	var loc = new Location(game.toXCoord(loc), game.toYCoord(loc), l.addOn);
	createjs.Tween.get(cars[no], { loop: false })
  	.to({ x: loc.x, y: loc.y }, time, createjs.Ease.getPowInOut(speed));
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
		case BUILD_SET_START:
			setStartPoints();
		break;
		case BUILD_DONE:
			stage.removeChild(stage.getChildByName("buildPainting1"));
			stage.removeChild(stage.getChildByName("buildPainting2"));
			HUDContainer.visible = false;
			// Determine Locations of players
			setPlayers();
			// prepareTurn();
			// TURN???
			// turn()
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
	stage.addChild(shape);

	// set up our defaults:
	var color = "#0FF";
	var size = 10;
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
				circle.cache(-CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2);
				trackContainer.addChild(circle);
			}
			
			// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
			try{
				trackContainer.updateCache(0, 0, w, h);
			} catch(err){
				trackContainer.cache(0, 0, w, h);
			}

			stage.addChild(trackContainer);
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
			stage.addChild(trackContainer);

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
	
	stage.addChild(text);
	text.on("click", function (evt){
		console.log("DONE");
		buildStatus++;
		prepareTrack();
		var child = stage.getChildByName("doneButton");
		stage.removeChild(child);
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
	stage.addChild(shape);

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
		stage.addChild(finishLineContainer);
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
	
	stage.addChild(text);
	text.on("click", function (evt){
		console.log("DONE");
		
		buildStatus++;
		prepareTrack();
		var child = stage.getChildByName("doneButton");
		stage.removeChild(child);
		// child.removeAllEventListeners("click");
	});
	
}

function setPlayers(){
	finishLineContainer.uncache();
	var max = game.activePlayers.length;
	no = 0;
	
	for (var i = 0; i < finishLineContainer.getNumChildren(); i++) {
		var child = finishLineContainer.getChildAt(i);
		child.uncache();

		var currentCircle;
		
		child.on("mouseover", function(evt){
			console.log("OVER");
			var loc = game.toLoc(evt.stageX, evt.stageY);
			finishLineContainer.removeChild(currentCircle);
			currentCircle = drawColoredCircle("yellow", loc , CIRCLE_SIZE, true);
			currentCircle.cursor = "pointer";
			currentCircle.on("click", function(evt){
				console.log("Click No: "+no);
				game.activePlayers[no++].historyLocs.push(game.toLoc(evt.stageX, evt.stageY));
				finishLineContainer.removeChild(currentCircle);
				var c = finishLineContainer.getChildByName(loc.x + "," + loc.y);
				c.removeAllEventListeners();
				stage.update();
				if (no == max){
					finishLineContainer.removeChild(currentCircle);
					for (var j = 0; j < finishLineContainer.getNumChildren(); j++) {
						var ch = finishLineContainer.getChildAt(j);
						ch.removeAllEventListeners();
					}
					buildStatus++;
					prepareTrack();
					return;
				}
			})

			finishLineContainer.addChild(currentCircle);
			stage.update()
		})

		child.on("mouseout", function(evt){
			if (finishLineContainer.getObjectUnderPoint() == currentCircle){
				return
			}
			var loc = game.toLoc(evt.stageX, evt.stageY);
			finishLineContainer.removeChild(currentCircle);
			stage.update()
		})
	};

}




