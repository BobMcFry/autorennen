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
	// XXX: make pics to global vars to make editing afterwards easier
	manifest = [
	{src:"img/background_norights.jpg", id:"background"},
	{src:"img/background_norights.jpg", id:"hud1"},
	{src:"img/background_norights.jpg", id:"hud2"},
	{src:"img/background_norights.jpg", id:"hud3"},
	{src:"img/background_norights.jpg", id:"hud4"}
	];

	preloadStuff();
	
	// TESTS!!!!!!!!!!!
	// var circle = this.view.drawColoredCircle(undefined, new Location(100,100), 50);
	// this.view.updateCars(circle, new Location(200,200), 2, 1000, 60);
	// var text = this.view.initScore(true);
	createjs.Ticker.addEventListener("tick", handleTick);	
}

function handleTick() {
    stage.update();
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
	}
	function playMouseout(e){
		play.color = "DeepSkyBlue";
	}
	menuContainer.addChild(play);
	menuContainer.visible = true;

	// display sound on/off symbol with clickevent

	// display choice of tracks. This should be painted to the canvas immediately on browsing through them
	// -The Listener sets and paints the track right away!
	for (var y = 0; y < game.height; y+= game.yDelta){
		for (var x = 0; x < game.width; x+= game.xDelta){
			console.log(x+"|"+y);
			var loc = game.convertCoordToLoc(x,y);
			// console.log(loc);
			stage.addChild(drawColoredCircle("red", loc, 5));
		}
	}

	// display choice of playerdesign (car, color,...)
	// -MOCKUP Version: simply change color on clicking trough...
	
	stage.addChild(menuContainer);
};

function turn(e){

	console.log(e);
	var x = e.rawX;
	var y = e.rawY;

	
}






/* Is called by a click-event Listener */
function movePlayer(x,y) {
	var loc = game.convertCoordToLoc(x,y);
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


function updateAddOns(loc) {
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

function drawLine(type, fromLoc, toLoc, color) {

};

function drawColoredCircle(color, loc, size) {
	var circle = new createjs.Shape();
	circle.graphics.beginFill("CornflowerBlue").drawCircle(0, 0, size);
	circle.x = loc.x;
	circle.y = loc.y;
	return circle;
};


function drawPicture(pic, loc, width, height, name) {
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
	for (var i = 0; i < finishLine.length; i++){

	}
};

function updateCars(no, loc, speed, time, fps) {
	createjs.Tween.get(cars[no], { loop: false })
  	.to({ x: loc.x, y: loc.y }, time, createjs.Ease.getPowInOut(speed));
};




