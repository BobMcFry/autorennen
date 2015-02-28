BUILD_Track  = 0;
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


function init() {
	stage = new createjs.Stage("board");
	// XXX: HARD CODED SIZES!!!!!!!!
	w = 500;
	h = 300;
	game = new Game(w, h);
	cars = new Array(4);
	finishLine = new Array();
	addOnContainer = new createjs.Container();
	addOnContainer.visible = false;
	menuContainer = new createjs.Container();
	menuContainer.visible = false;
	HUDContainer = new createjs.Container();
	HUDContainer.visible = false;
	buildStatus = BUILD_OUTER_BORDER;
	preloadStuff();
	
	// TESTS!!!!!!!!!!!
	// var circle = this.view.drawColoredCircle(undefined, new Location(100,100), 50);
	// this.view.updateCars(circle, new Location(200,200), 2, 1000, 60);
	// var text = this.view.initScore(true);
	// This is for stuff that happens randomly 
	createjs.Ticker._interval = 1000;
	createjs.Ticker.addEventListener("tick", handleTick);
	
}

function handleTick() {
    stage.update();
    console.log("Scrumble");
    // Maybe here can be done some action someday..like adding addons ...
}

function preloadStuff(){
	// XXX: false is for local loading (?), true is for the internet stuff
	var preload = new createjs.LoadQueue(false);
	// XXX: PUT NICE BAR WITH GLOBAL PROGRESS VALUE THAT INDICATES LOAD OF ASSET STATUS
	// preload.on("progress", handleProgress);
	preload.on("fileload", handleLoadedStuff);
	preload.on("complete", prepareMenu);

	preload.loadManifest(manifest);
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

	// display Header
	var header = new createjs.Text("AUTORENNEN", "18px Arial", "DeepSkyBlue");
	header.name = "header";
	header.x = w/2;
	header.y = 20;
	menuContainer.addChild(header);

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
	play.on("mouseover", playMouseover, null, false, undefined);
	play.on("mouseout", playMouseout, null, false, undefined);
	play.on("click", turn, null, false, undefined);
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
	// XXX: IF CUSTOM TRACK IS CHOSEN
	buildTrack();
	// stage.on("click", turn, null, false, undefined);
};

function turn(e){
	var x = e.stageX;
	var y = e.stageY;

	var loc = game.toLoc(x,y);
	console.log(loc.x+"|"+loc.y);
}






/* Is called by a click-event Listener */
function movePlayer(x,y) {
	var loc = game.toLoc(x,y);
	game.turn(loc);
	// create animation that displays movement from last to current pos
	var crntPlayer = game.getCurrentPlayer();
	view.updateCars(crntPlayer.no, loc, crntPlayer.getSpeed(), 1000, 60);
	// update addons
	view.updateAddOns(loc);
	// update score
	updateScore(crntPlayer);
	// check if won?

};

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

function drawColoredCircle(color, l, size, fill) {
	var loc = new Location(game.toXCoord(l), game.toYCoord(l), l.addOn);

	var circle = new createjs.Shape();
	if (fill){
		circle.graphics.beginFill(color).drawCircle(0, 0, size);
	}else{
		circle.graphics.setStrokeStyle(1);
 		circle.graphics.beginStroke(color).drawCircle(0, 0, size);
	}
	circle.x = loc.x;
	circle.y = loc.y;
	return circle;
};

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
 	displayedText = player.name + "\n" 
 					+ player.getSpeed() + "(" + player.avgSpeed + ")\n"
 					+ player.distance;
 	var text = stage.getChildByName("hud"+player.no+"_text");
 	text = displayedText;
};

function initScore() {
	for (var i = 1; i < 5; i++) {
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

function buildTrack(){
	stage.removeAllEventListeners();
	
	switch(buildStatus){
		case BUILD_Track:
			buildTrack();
		break;
		case BUILD_SET_START:
			setStartPoints();
		break;
		case BUILD_DONE:
			// TURN???
		break;
		default: console.log("Well OK?");
	}

// XXX: needs to be niceified
function buildTrack(){
	var outerTrackBorders = new Array();
	var start = true;
	var startLoc = undefined;

	shape = new createjs.Shape();
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
		// capture press time
		timedown = Date.now();
		if (start){
			var circle = drawColoredCircle("red", game.toLoc(evt.stageX, evt.stageY), 10, false);
			// XXX: CONTAINER
			stage.addChild(circle);
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
			detectFilling(game.toLoc(evt.stageX, evt.stageY));
			for (var j = 0; j < game.track.surrPoints.length; j++){
				var circle = drawColoredCircle("red", game.track.surrPoints[j], 4, true);
				// XXX: CONTAINER
				stage.addChild(circle);
			}

		}
		else{
			color = createjs.Graphics.getHSL(Math.random()*360, 100, 50);
			
			var newBorders = new Array();
			// add missing points between pushed points
			for (var i = 0; i < outerTrackBorders.length-1; i++){
				var srcLoc = outerTrackBorders[i];
				var destLoc = outerTrackBorders[i+1];
				var between = detectPointsInBetween(srcLoc, destLoc);
				
				newBorders.push(srcLoc);
				newBorders = newBorders.concat(between);
				newBorders.push(destLoc);
			}
			
			// console.log(newBorders);

			var doubled = false;
			for (var i = 0; i < newBorders.length; i++){
				doubled = false;
				for (var j = 0; j < game.track.trackBorders.length; j++){
					if (newBorders[i].equals(game.track.trackBorders[j])){
						doubled = true;
						break;
					}
				}
				if (!doubled){
					game.track.trackBorders.push(newBorders[i]);
				}
			}
			for (var j = 0; j < game.track.trackBorders.length; j++){
				var circle = drawColoredCircle("red", game.track.trackBorders[j], 4, true);
				// XXX: CONTAINER
				stage.addChild(circle);
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

	// XXX: IMPLEMENT A BUTTON WITH LISTENER THAT SETS STATUS ON +1 AND CALLS BUILDTRACK()
}

// XXX: needs to be ported (translated)
function detectPointsInBetween(srcLoc, destLoc){

	var xDiff = srcLoc.x - destLoc.x;
	var yDiff = srcLoc.y - destLoc.y;
	var xMult = -1;
	var yMult = -1;
	// var x = x1;
	// var y = y1;

	if (xDiff < 0)
		xMult = 1;
	if (yDiff < 0)
		yMult = 1;

	// hier muss immer ein Delta vorangeschritten werden, von x oder y...
	// wobei immer von dem delta vorangeschritten wird, welches prozentual
	// zurückliegt
	var xProzent = 0;
	var yProzent = 0;
	var xCounter = 1;
	var yCounter = 1;
	var between = new Array();
	var x = srcLoc.x;
	var y = srcLoc.y;

	// oder, damit es nicht gleich aufhoert, sobald x oder y auf höhe sind
	while (Math.abs(xProzent) < 1 || Math.abs(yProzent) < 1){
		xProzent = xCounter / xDiff;
		yProzent = yCounter / yDiff;

		if (Math.abs(yProzent) > Math.abs(xProzent)){
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
	// XXX: This if needs to be checked before putting stuff on the stack...
	if (game.track.isBorder(loc) || game.track.isSurrounding(loc) ){
		return;
	}
	game.track.surrPoints.push(loc);
	var radialPoints = game.track.getSurrounding(loc, false);

	for (var i = 0; i < radialPoints.length; i++){
		detectFilling(radialPoints[i]);
	}
}

// XXX: needs to be ported
function defineOuterTrackFilling(){
	$('#board').on('click', function(e){
			$('#board').off('click');
			var x2 = e.pageX-this.offsetLeft;
			var y2 = e.pageY-this.offsetTop;
    		
    		x2 = polishXCoordinate(x2);
    		y2 = polishYCoordinate(y2);
			
			detectFilling(x2,y2, true);
			circleLayer.clear();
			circleLayer.draw();
			buildingProcess++;
			buildTrack();
	});
}

// XXX: needs to be ported
function buildInnerTrack(){
	innerTrackBorders = new Array();
	start = true;
	xStart = -1;
	yStart = -1;

	$('#board').on('click', function(e){
		var x2 = e.pageX-this.offsetLeft;
		var y2 = e.pageY-this.offsetTop;
		
		x2 = polishXCoordinate(x2);
		y2 = polishYCoordinate(y2);

		if (start){
			xStart = x2;
			yStart = y2;
			innerTrackBorders.push(x2);
			innerTrackBorders.push(y2);
			start = false;
		}
		else{
			var x1 = innerTrackBorders[innerTrackBorders.length-2];
			var y1 = innerTrackBorders[innerTrackBorders.length-1];
			var line = new Kinetic.Line({
				points: [x1, y1, x2, y2],
				stroke: 'red',
				strokeWidth: 2,
				lineCap: 'round',
				lineJoin: 'round',
			});
			// store points in between
			innerTrackBorders = innerTrackBorders.concat(detectPointsInBetween(x1,y1,x2,y2));

			// store TargetPoint if not the starting Point
			if (x2 == xStart && y2 == yStart){
				//start = true;
				$('#board').off('click');
				buildingProcess++;
				buildTrack();
			}    					
			else{
				innerTrackBorders.push(x2);
				innerTrackBorders.push(y2);
			}
			
			trackLayer.add(line);
			trackLayer.draw();
		}
	});
}

// XXX: needs to be ported
function defineInnerTrackFilling(){
	$('#board').on('click', function(e){
		$('#board').off('click');
		var x2 = e.pageX-this.offsetLeft;
		var y2 = e.pageY-this.offsetTop;
		
		x2 = polishXCoordinate(x2);
		y2 = polishYCoordinate(y2);
		
		detectFilling(x2,y2,false);
		gamePoints = flatten(gamePoints);
		for (var i = 0; i < gamePoints.length; i += 2){
			var x = gamePoints[i];
			var y = gamePoints[i+1];
			if (isBorder(x,y,false)){
				gamePoints[i] = undefined;
				gamePoints[i+1] = undefined;
			}
		}
		flatten(gamePoints);
		circleLayer.clear();
		circleLayer.draw();
		buildingProcess++;
		paintTrack();
		buildTrack();
	});
}

// XXX: needs to be ported
function setStartPoints(){
	startPointCounter = 0;
	$('#board').on('click', function(e){
		var x2 = e.pageX-this.offsetLeft;
		var y2 = e.pageY-this.offsetTop;
		
		x2 = polishXCoordinate(x2);
		y2 = polishYCoordinate(y2);
		startPoints.push(x2);
		startPoints.push(y2);
		console.log(x2);
		console.log(y2);
		var circle = new Kinetic.Circle({
	        x: x2,
	        y: y2,
	        radius: 5,
	        stroke: 'blue',
	        strokeWidth: 2
	    });
	    trackLayer.add(circle);
	    trackLayer.draw();
		startPointCounter++;
		if (startPointCounter >= maxPlayer){	// genug startpoints???? Maxplayer bei null??????????????
			$('#board').off('click');
			buildingProcess++;
			buildTrack();		
		}
	});
}


}




