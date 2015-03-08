/* Status of Track Preparation used in prepareTrack() */
BUILD_TRACK  = 0;
SET_START  = 1;
PLACE_PLAYERS = 2;
PREPARE_TURN  = 3;

/* Circle Size used to draw them to the canvas */
CIRCLE_SIZE = 5;

/* HUD SIZE (percentage of width and height*/
HUD_SIZE = 0.2;
HUD_OFFSET = 0.1;

// XXX: maybe put the code that is related to drawing stuff somewhere else

// XXX: make pics to global vars to make editing afterwards easier
/* Images and Sounds used in the game. This manifest is loaded with preload. */
manifest = [
	{ src:"img/background.jpg", 		id:"background" },
	{ src:"img/hud_le_to.png", 			id:"hud0" },
	{ src:"img/hud_ri_to.png", 			id:"hud1" },
	{ src:"img/hud_le_bo.png", 			id:"hud2" },
	{ src:"img/hud_ri_bo.png", 			id:"hud3" },
	{ src:"img/back_header.png", 		id:"back_header" },
	{ src:"img/back_name.png", 			id:"back_name" },
	{ src:"img/autorennen_header.png", 	id:"header" },
	{ src:"img/circle_normal_1.png", 	id:"circle_normal_1" },
	{ src:"img/circle_normal_2.png", 	id:"circle_normal_2" },
	{ src:"img/circle_normal_3.png", 	id:"circle_normal_3" },
	{ src:"img/circle_normal_4.png", 	id:"circle_normal_4" },
	{ src:"img/circle_finish_1.png", 	id:"circle_finish_1" },
	{ src:"img/circle_finish_2.png", 	id:"circle_finish_2" },
	{ src:"img/left_hover.png", 		id:"left_hover" },
	{ src:"img/left_normal.png", 		id:"left_normal" },
	{ src:"img/right_hover.png", 		id:"right_hover" },
	{ src:"img/right_normal.png", 		id:"right_normal" },
	{ src:"img/music_on_normal.png", 	id:"music_on_normal" },
	{ src:"img/music_off_normal.png", 	id:"music_off_normal" },
	{ src:"img/music_on_hover.png", 	id:"music_on_hover" },
	{ src:"img/music_off_hover.png", 	id:"music_off_hover" },
	{ src:"img/play_normal.png", 		id:"play_normal" },
	{ src:"img/play_hover.png", 		id:"play_hover" },
	{ src:"img/sprite_none.png", 		id:"sprite_none" },
	{ src:"img/sprite_car_1.png", 		id:"sprite_car_1" }
];

spriteSheets = [];

/* This functin is called on pageload */
function init() {

	/* **************** */
	/* GLOBAL VARIABLES */
	/* **************** */

	stage = new createjs.Stage( "board" );
	stage.enableMouseOver();
	// XXX: HARD CODED SIZES!!!!!!!!
	w = stage.canvas.width;//1000;//500;
	h = stage.canvas.height;//600;//300;
	game = new Game( w, h );
	
	
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
	// HUD
	HUDContainer = new createjs.Container();
	stage.addChildAt( HUDContainer, 8 );
	// MenuObjects
	menuContainer = new createjs.Container();
	stage.addChildAt( menuContainer, 9 );
	// XXX: STUFF TEMPPPPP
	stuffContainer = new createjs.Container();
	stage.addChildAt( stuffContainer, 10 );


	/* ************** */
	/* PRELOAD IMAGES */
	/* ************** */

	// XXX: false is for local loading ( ? ), true is for the internet stuff
	preload = new createjs.LoadQueue( false );
	// // // XXX: PUT NICE BAR WITH GLOBAL PROGRESS VALUE THAT INDICATES LOAD OF ASSET STATUS
	// // // preload.on( "progress", handleProgress );
	preload.on( "fileload", handleLoadedStuff );
	preload.on( "complete", prepareMenu );
	preload.loadManifest( manifest );

	// XXX: DO I NEED THIS???
	// /* *********************** */
	// /* Initialize DOM Elements */
	// /* *********************** */
	// for ( var i = 0; i < game.MAXPLAYERS; i++ ){
	// 	var input = document.getElementById( "input-player-"+i );
	// 	var dom = new createjs.DOMElement( input );
	// 	dom.name = "input-player-"+i;
	// 	var width = dom.htmlElement.clientWidth;
	// 	var height = dom.htmlElement.clientHeight;
	// 	var OFFSET = 20;
	// 	switch( i ){
	// 		case 0: dom.x = OFFSET; dom.y = OFFSET; break;
	// 		case 1: dom.x = w-width-OFFSET; dom.y = OFFSET; break;
	// 		case 2: dom.x = OFFSET; dom.y = h-height-OFFSET; break;
	// 		case 3: dom.x = w-width-OFFSET; dom.y = h-height-OFFSET; break;
	// 	}
	// 	menuContainer.addChild( dom );
	// }
	
	/* ****** */
	/* TICKER */
	/* ****** */
	
	// XXX: MAYBE OK WITHOUT TICKER???
	createjs.Ticker.addEventListener( "tick", stage );
	
}

// XXX: HERE A PROGRESSVALUE IS INCREASED ON EVERY LOAD OF AN OBJECT
function handleLoadedStuff( e ){
	switch( e.item.id ){
		case "background": 	
		case "hud0":
		case "hud1":
		case "hud2":
		case "hud3":
		case "header":
		case "back_header":
		case "back_name":
		case "left_normal":
		case "right_normal":
		case "music_on_normal":
		case "play_normal":
		case "circle_normal_1":
		case "circle_normal_2":
		case "circle_normal_3":
		case "circle_normal_4":
		case "circle_finish_1":
		case "circle_finish_2":
		case "left_hover":
		case "right_hover":
		case "music_on_hover":
		case "music_off_normal":
		case "music_off_hover":
		case "play_hover":
			console.log( e.item.id + " loaded" );
			return;
		break;
		default: console.log( "SCREW YOU!" ); break;
	}
}

function initScore() {
	// XXX: FONT AENDERN....
	for ( var i = 0; i < 4; i++ ) {
		var parent = HUDContainer.getChildByName( "hud"+i );
		var loc = new Location( parent.x + parent.width*HUD_OFFSET, parent.y + parent.height*HUD_OFFSET );
		var text = drawText( "", "hud"+i+"_text", loc, "20px", "Arial", "black", false, "left", "top" );
		HUDContainer.addChild( text );
	};
};

function updateScores() {
	for ( var i = 0; i < game.players.length; i++ ){
		var player = game.players[i];
		var displayedText = ( game.isKicked(player) ? "KICKED\n": "" ) + 
 					 + player.getSpeed().toFixed( 1 ) + " (\u00D8 " + player.avgSpeed.toFixed(1) + " )kmh\n"
 					 + player.distance.toFixed( 1 ) +"m";
	 	var t = HUDContainer.getChildByName( "hud"+player.no+"_text" );
	 	t.text = displayedText;
	 	t.color = player.car.color;	
	}
};

// XXX: Make sizes and stuff more dependant on the canvas size (See HUD_SIZE as an example)
function prepareMenu() {

	// XXX: Testing Purposes
	// XXX: CAR CAN BE DELETED...NOT NECESARRY ANYMORE
	game.activePlayers.push( new Player( new Car( null, "#FF0066" ), 0 ));
	game.activePlayers.push( new Player( new Car( null, "#66FF33" ), 1 ));
	game.activePlayers.push( new Player( new Car( null, "#00CCFF" ), 2 ));
	game.activePlayers.push( new Player( new Car( null, "#0033CC" ), 3 ));
	game.players.push( game.activePlayers[0] );
	game.players.push( game.activePlayers[1] );
	game.players.push( game.activePlayers[2] );
	game.players.push( game.activePlayers[3] );

	// helper for displaying objects (graphics and shapes)
	var obj, g, s;
	
	// display Background
	obj = drawPicture( "background", new Location(0, 0), w, h, "background", false );
	backgroundContainer.addChild(obj);
	
	// display Background of Header
	obj = drawPicture( "back_header", new Location(w/2-550/2, 20), 550, -1, "back_header", true );
	menuContainer.addChild( obj );
	// display Header
	obj = drawPicture( "header", new Location(w/2-350/2, 40), 350, -1, "header", true );
	menuContainer.addChild( obj );
	
	// display sound on/off symbol with clickevent
	obj = drawPicture( "music_on_normal", new Location(3*w/4, h-80), 50, -1, "music_toggle", true );
	HUDContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "music_toggle_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_normal", obj: "pic"} );
	s.on( "click" , toggleSound, false, null, {img: "music_off_normal"});
	HUDContainer.addChild( s );
	
	// trackMenu: display right arrow
	obj = drawPicture( "right_normal", new Location(w-100, h/2-60/2), 50, 60, "right_normal_track", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_track", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_track", img: "right_normal", obj: "pic"} );
	s.on( "click" , changeTrack, false, null, {dir: "right"});
	menuContainer.addChild( s );
	// trackMenu: display left arrow
	obj = drawPicture( "left_normal", new Location(100-50, h/2-60/2), 50, 60, "left_normal_track", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_track", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_track", img: "left_normal", obj: "pic"} );
	s.on( "click" , changeTrack, false, null, {dir: "left"});
	menuContainer.addChild( s );
	// trackMenu: name box
	obj = drawPicture( "back_name", new Location(w/2-400/2, h/2-100/2), 400, 100, "back_name", false );
	menuContainer.addChild( obj );
	
	// HUD: left top
	obj = drawPicture( "hud0", new Location(0, 0), w*HUD_SIZE, h*HUD_SIZE, "hud0", false );
	HUDContainer.addChild( obj );
	// HUD: right top
	obj = drawPicture( "hud1", new Location(w-w*HUD_SIZE, 0), w*HUD_SIZE, h*HUD_SIZE, "hud1", false );
	HUDContainer.addChild( obj );
	// HUD: left bottom
	obj = drawPicture( "hud2", new Location(0, h-h*HUD_SIZE), w*HUD_SIZE, h*HUD_SIZE, "hud2", false );
	HUDContainer.addChild( obj );
	// HUD: right bottom
	obj = drawPicture( "hud3", new Location(w-w*HUD_SIZE, h-h*HUD_SIZE), w*HUD_SIZE, h*HUD_SIZE, "hud3", false );
	HUDContainer.addChild( obj );
	
	// carchoice: left top: right arrow
	obj = drawPicture( "right_normal", new Location(140, 40), 20, 30, "right_normal_car_0", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_0_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_0", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_0", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud0", dir: "right", no:0});
	// XXX: ONCLICK
	menuContainer.addChild( s );
	// carchoice: left top: left arrow
	obj = drawPicture( "left_normal", new Location(40, 40), 20, 30, "left_normal_car_0", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_0_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_0", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_0", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud0", dir: "left", no:0});
	// XXX: ONCLICK
	menuContainer.addChild( s );
	
	// carchoice: right top: right arrow
	obj = drawPicture( "right_normal", new Location(w-40, 40), 20, 30, "right_normal_car_1", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_1_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_1", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_1", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud1", dir: "right", no:1});
	// XXX: ONCLICK
	menuContainer.addChild( s );
	// carchoice: right top: left arrow
	obj = drawPicture( "left_normal", new Location(w-140, 40), 20, 30, "left_normal_car_1", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_1_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_1", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_1", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud1", dir: "left", no:1});
	menuContainer.addChild( s );
	
	// carchoice: left bottom: right arrow
	obj = drawPicture( "right_normal", new Location(140, h-50-30), 20, 30, "right_normal_car_2", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_2_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_2", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_2", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud2", dir: "right", no:2});
	menuContainer.addChild( s );
	// carchoice: left bottom: left arrow
	obj = drawPicture( "left_normal", new Location(40, h-50-30), 20, 30, "left_normal_car_2", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_2_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_2", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_2", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud2", dir: "left", no:2});
	menuContainer.addChild( s );

	// carchoice: right bottom: right arrow
	obj = drawPicture( "right_normal", new Location(w-40, h-50-30), 20, 30, "right_normal_car_3", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_3_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_3", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_3", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud3", dir: "right", no:3});
	menuContainer.addChild( s );
	// carchoice: right bottom: left arrow
	obj = drawPicture( "left_normal", new Location(w-140, h-50-30), 20, 30, "left_normal_car_3", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_3_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_3", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_3", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "sprite_hud3", dir: "left", no:3});
	menuContainer.addChild( s );

	// display Play button with hover
	obj = drawPicture( "play_normal", new Location(w/2-150/2, h-100), 150, -1, "play_normal", true );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "play_normal", img: "play_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "play_normal", img: "play_normal", obj: "pic"} );
	// XXX: onClick
	s.on( "click", prepareTrack);
	menuContainer.addChild( s );
	
	// display HUD
	initScore();

	// XXX: THIS NEEDS TO BE SET DEPENDANT ON CHOICE OF TRACK. EITHER CREATE OWN OR CHOOSE EXISTING
	buildStatus = BUILD_TRACK;
	// OR
	// buildStatus = PLACE_PLAYERS;

	// ANIMATIONS
	var animation, spriteSheet;
	spriteSheets.push({
		images: [preload.getResult("sprite_none")],
		frames: {width:100, height:78},
		animations: {move:[0,4], hold:[0]},
		framerate: 7
 	});
	spriteSheets.push({
		images: [preload.getResult("sprite_car_1")],
		frames: {width:100, height:77},
		animations: {move:[0,6], hold:[0]},
		framerate: 15
 	});
 	menu_car_positions = [0,0,0,0];
	var spriteSheet = new createjs.SpriteSheet(spriteSheets[0]);
	var animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "sprite_hud0";
	animation.x = 60;
	animation.y = 30;
	animation.scaleX = .8;
	animation.scaleY = .8;
	menuContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "sprite_hud1";
	animation.scaleX = .8;
	animation.scaleY = .8;
	animation.x = w-60-60;
	animation.y = 30;
	menuContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "sprite_hud2";
	animation.x = 60;
	animation.y = h-40-50;
	animation.scaleX = .8;
	animation.scaleY = .8;
	menuContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "sprite_hud3";
	animation.x = w-60-60;
	animation.y = h-40-50;
	animation.scaleX = .8;
	animation.scaleY = .8;
	menuContainer.addChild(animation);
};


/* BUILD STUFF */ 

function prepareTrack(){
	menuContainer.visible = false;
	stage.removeAllEventListeners();
	finishLineContainer.removeAllEventListeners();
	// hide scores
	HUDContainer.visible = false;

	switch( buildStatus ){
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
			HUDContainer.visible = true;
			doMove();
		break;
		default: console.log( "Well OK?" );
	}
}

function changeCar( evt, data ){
	var inc = (data.dir == "right" ? +1 : -1);
	menu_car_positions[data.no] = (menu_car_positions[data.no] + inc) % spriteSheets.length; 
	if ( menu_car_positions[data.no] < 0 ) {
		menu_car_positions[data.no] = spriteSheets.length-1; 
	}
	var c = menuContainer.getChildByName(data.target);
	c.spriteSheet = new createjs.SpriteSheet(spriteSheets[menu_car_positions[data.no]]);
}

function changeTrack ( evt, data ) {
	// XXX: changes the canvas background to the corresponding picture (!) of a track
	// sets a position of the current chosen track
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
	stage.on( "stagemousedown", function( evt ) {
		// XXX: THIS IS A TEMP FIX TO PREVENT THE STAGEEVENT FROM BEING FIRED WHEN THE DONE BUTTON IS CLICKED
		var obj = stage.getObjectUnderPoint( evt.stageX, evt.stageY );
		if ( obj != null && (obj.name == "doneButton" )){
			return;
		}

		// capture press time
		timedown = Date.now();
		if ( start ){
			start = false;
		}
		paint = true;
	})                
	
	stage.on( "stagemouseup", function( evt ) {
		paint = false;
		// capture press time
		timeup = Date.now();
		// compare times and determine wether the user wants to fill a circle
		if ( timeup - timedown < 300 ){
			// XXX: THIS IS A TEMP FIX TO PREVENT THE STAGEEVENT FROM BEING FIRED WHEN THE DONE BUTTON IS CLICKED
			var obj = stage.getObjectUnderPoint( evt.stageX, evt.stageY );
			if ( obj != null && obj.name == "doneButton1" ){
				return;
			}
			detectFilling( game.toLoc( evt.stageX, evt.stageY ));
			
			for ( var j = 0; j < game.track.surrPoints.length; j++ ){
				var circle = drawColoredCircle( "green", game.track.surrPoints[j], CIRCLE_SIZE, true );
				var cacheRect = {};
				circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2, CIRCLE_SIZE*2 );
				trackContainer.addChild( circle );
			}
			// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
			try{
				trackContainer.updateCache( 0, 0, w, h );
			} catch( err ){
				trackContainer.cache( 0, 0, w, h );
			}
		}
		else{
			// color = createjs.Graphics.getHSL( Math.random()*360, 100, 50 );
			
			// add missing points between pushed points
			var newBorders = new Array();
			for ( var i = 0; i < outerTrackBorders.length-1; i++ ){
				var srcLoc = outerTrackBorders[i];
				var destLoc = outerTrackBorders[i+1];
				var between = detectPointsInBetween( srcLoc, destLoc );
				
				newBorders.push( srcLoc );
				newBorders = newBorders.concat( between );
				newBorders.push( destLoc );
			}

			var doubled = false;
			for ( var i = 0; i < newBorders.length; i++ ){
				doubled = false;
				if ( !game.track.isBorder(newBorders[i] )
						&& !game.track.isSurrounding( newBorders[i]) ){
					game.track.trackBorders.push( newBorders[i] );
				}
			}
			
			for ( var j = 0; j < game.track.trackBorders.length; j++ ){
				// var circle = drawColoredCircle( "red", game.track.trackBorders[j], 4, true );
				// circle.cache( -4, -4, 8,8 );
				// trackContainer.addChild( circle );
				if ( trackContainer.getChildByName( game.track.trackBorders[j].x+","+game.track.trackBorders[j].y ) == null ){
					var circle = drawColoredCircle( "red", game.track.trackBorders[j], CIRCLE_SIZE, true );
					circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2 );
					trackContainer.addChild( circle );	
				}
			}
			// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
			try{
				trackContainer.updateCache( 0, 0, w, h );
			} catch( err ){
				trackContainer.cache( 0, 0, w, h );
			}
			// clear outerTrackBorders
			outerTrackBorders.length = 0;
		}
	})
	 
	
    stage.on( "stagemousemove", function( evt ) {

		if ( paint ) {
			shape.graphics.beginStroke( color )
						  .setStrokeStyle( size, "round" )
						  .moveTo( oldX, oldY )
						  .lineTo( evt.stageX, evt.stageY );
			stage.update();

			outerTrackBorders.push( game.toLoc( evt.stageX, evt.stageY ));
			
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	var text = drawText ( "Done", "doneButton", new Location(w/2 - 80, h-30), "20px", "Arial", "DeepSkyBlue", true, "left", "top" );
	
	stuffContainer.addChild( text );
	text.on( "click", function ( evt ){
		buildStatus++;
		prepareTrack();
		var child = stage.getChildByName( "doneButton" );
		stuffContainer.removeChild( child );
		stage.update();
	});
	
}

function detectPointsInBetween( srcLoc, destLoc ){

	var xDiff = srcLoc.x - destLoc.x;
	var yDiff = srcLoc.y - destLoc.y;
	var xMult = -1;
	var yMult = -1;

	if ( xDiff < 0 )
		xMult = 1;
	if ( yDiff < 0 )
		yMult = 1;

	var xPercent = 0;
	var yPercent = 0;
	var xCounter = 1;
	var yCounter = 1;
	var between = new Array();
	var x = srcLoc.x;
	var y = srcLoc.y;

	while ( Math.abs( xPercent ) < 1 || Math.abs( yPercent ) < 1 ){
		xPercent = xCounter / xDiff;
		yPercent = yCounter / yDiff;

		if ( Math.abs( yPercent ) > Math.abs( xPercent ) ){
			x += xMult;
			xCounter++;
		}
		else {
			y += yMult;
			yCounter++;
		}
		between.push( new Location( x, y ) );
	}

	return between;
}

function detectFilling( loc ){
	game.track.surrPoints.push( loc );
	var radialPoints = game.track.getSurrounding( loc, false );
	for ( var i = 0; i < radialPoints.length; i++ ){
		if ( !game.track.isBorder( radialPoints[i] ) && !game.track.isSurrounding( radialPoints[i] )){
			detectFilling( radialPoints[i] );
		}
	}
}


function setStartPoints(){
	
	var finishLine = new Array();

	var shape = new createjs.Shape();
	shape.name = "buildPainting2";
	paintContainer.addChild( shape );

	// set up our defaults:
	var color = "#00F";
	var size = 10;
	var oldX, oldY;
	var paint = false;
	var timedown = 0;
	var timeup = Date.now();

	// add handler for stage mouse events:
	stage.on( "stagemousedown", function( evt ) {
		// capture press time
		timedown = Date.now();
		paint = true;
	})                
	
	stage.on( "stagemouseup", function( evt ) {
		paint = false;
		// capture press time
		timeup = Date.now();
		// add missing points between pushed points
		var newFinishLine = new Array();
		for ( var i = 0; i < finishLine.length-1; i++ ){
			var srcLoc = finishLine[i];
			var destLoc = finishLine[i+1];
			var between = detectPointsInBetween( srcLoc, destLoc );
			
			newFinishLine.push( srcLoc );
			newFinishLine = newFinishLine.concat( between );
			newFinishLine.push( destLoc );
		}

		for ( var i = 0; i < newFinishLine.length; i++ ){	
			if ( !game.track.isFinishLine( newFinishLine[i] ) 
					&& !game.track.isBorder( newFinishLine[i] ) 
					&& !game.track.isSurrounding( newFinishLine[i] )){
				game.track.finishLine.push( newFinishLine[i] );
			}
		}
		for ( var j = 0; j < game.track.finishLine.length; j++ ){
			if ( finishLineContainer.getChildByName( game.track.finishLine[j].x+","+game.track.finishLine[j].y ) == null ){
				var circle = drawColoredCircle( "blue", game.track.finishLine[j], CIRCLE_SIZE, true );
				circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2 );
				finishLineContainer.addChild( circle );	
			}
			
		}
		
		// XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
		try{
			finishLineContainer.updateCache( 0, 0, w, h );
		} catch( err ){
			finishLineContainer.cache( 0, 0, w, h );
		}
		// clear finishLine
		finishLine.length = 0;
		
	})
	
    stage.on( "stagemousemove", function( evt ) {
		if ( paint ) {
			shape.graphics.beginStroke( color )
						  .setStrokeStyle( size, "round" )
						  .moveTo( oldX, oldY )
						  .lineTo( evt.stageX, evt.stageY );
			stage.update();
			finishLine.push( game.toLoc( evt.stageX, evt.stageY ));
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	var text = drawText ( "Done", "doneButton", new Location( w/2 - 80, h-30 ), "20px", "Arial", "DeepSkyBlue", true, "left", "top" );
	stuffContainer.addChild( text );
	text.on( "click", function ( evt ){
		buildStatus++;
		prepareTrack();
		var c = evt.currentTarget;
		stuffContainer.removeChild( c );
		stage.update();
	});
	
}

function hover ( evt, data ){
	var c = evt.currentTarget;
	switch( data.obj ){
		case "circle": c.graphics.beginFill( data.color ).drawCircle( 0, 0, CIRCLE_SIZE ).endFill(); break;
		case "text": c.color = data.color; break;
		case "pic":
			var target = data.container.getChildByName( data.target );
			target.image = preload.getResult( data.img );
		break;
		default: console.log( "Missing case in hover." ); break;
	}
}

function setPlayers(){
	finishLineContainer.uncache();
	var max = game.activePlayers.length;
	var no = 0;
	
	for ( var i = 0; i < finishLineContainer.getNumChildren(); i++ ) {
		var child = finishLineContainer.getChildAt( i );
		child.uncache();
		child.cursor = "pointer";
		child.on( "mouseover", hover, false, null, {color: "red", obj: "circle"} );
		child.on( "mouseout", hover, false, null, {color: "blue", obj: "circle"} );
		child.on( "click", function( evt ){
			var c = evt.currentTarget;
			c.removeAllEventListeners();

			var loc = game.toLoc( evt.stageX, evt.stageY );
			game.activePlayers[no].historyLocs.push( loc );
			
			var playercircle = drawColoredCircle( game.activePlayers[no].car.color, loc, CIRCLE_SIZE+5, false );
			playerContainer.addChild( playercircle );
			stage.update();

			no++;
			if ( no == max ){
				for ( var j = 0; j < finishLineContainer.getNumChildren(); j++ ) {
					var ch = finishLineContainer.getChildAt( j );
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

	if ( crntTurn.win ){
		alert( crntTurn.player.name + "  hat gewonnen." );
		return;
	}
	if ( crntTurn.draw ){
		alert( "Es ist unentschieden ausgegangen." );
		return;
	}

	var surr = crntTurn.surrounding;
	for ( var i = 0; i < surr.length; i++ ){
		var circle = drawColoredCircle( crntTurn.player.car.color, surr[i], CIRCLE_SIZE, true );
		choiceContainer.addChild( circle );
		circle.on( "click", function( evt ){
			var loc = game.toLoc( evt.stageX, evt.stageY );
			updateCars( crntTurn.player, loc, crntTurn.player.getSpeed()+1, 1000, 60 );
			// update addons
			// view.updateAddOns( loc );
			game.turn( loc );
			doMove();
		});
	}
}


function toggleSound( evt, data ) {
	var hitArea = HUDContainer.getChildByName( "music_toggle_hitArea" );
	var pic = HUDContainer.getChildByName( "music_toggle" );
	hitArea.removeAllEventListeners();
	if ( data.on ){
		pic.image = preload.getResult( "music_on_normal" );
		hitArea.on( "mouseover", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_hover", obj: "pic"} );
		hitArea.on( "mouseout", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_normal", obj: "pic"} );
		hitArea.on( "click" , toggleSound, false, null, {on: false});
		// XXX: Toggle sound
	} else {
		pic.image = preload.getResult( "music_off_normal" );
		hitArea.on( "mouseover", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_off_hover", obj: "pic"} );
		hitArea.on( "mouseout", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_off_normal", obj: "pic"} );
		hitArea.on( "click" , toggleSound, false, null, {on: true});
		// XXX: Toggle sound
	}
};


function updateAddOns( l ) {
	var loc = new Location( game.toXCoord(l), game.toYCoord(l), l.addOn );
	// search for addonchild by name of its location
	var name = loc.x + "," +  loc.y;
	var addOn = addOnContainer.getChildByName( name );

	// XXX: replace loc.addon by Location.NONE...
	if ( addOn != null && loc.addOn == 0 ){
		// ... and remove it from stage and array
    	addOnContainer.removeChild( addOn );
	} 
	if ( addOn != null && loc.addOn != 0 ) {
		// ... and do nothing
	}
	if ( addOn == null && loc.addOn == 0 ) {
		// ... and do nothing
	}
	if ( addOn == null && loc.addOn != 0 ) {
		// ... and add it to the stage
		// addOn = drawPicture( loc.addOn, loc );
	}
};

function drawLine( size, srcL, destL, color ) {
	var srcLoc = new Location( game.toXCoord( srcL ), game.toYCoord( srcL ));
	var destLoc = new Location( game.toXCoord( destL ), game.toYCoord( destL ));
	var g = new createjs.Graphics();
 	g.setStrokeStyle( size );
 	g.beginStroke( color );
 	g.moveTo( srcLoc.x, srcLoc.y );
 	g.lineTo( destLoc.x, destLoc.y );
 	return new createjs.Shape( g );
};

function drawColoredCircle( color, l, radius, fill ) {
	var loc = new Location( game.toXCoord( l ), game.toYCoord( l ), l.addOn );

	var circle = new createjs.Shape();
	if ( fill ){
		circle.graphics.beginFill( color ).drawCircle( 0, 0, radius );
	}else{
		circle.graphics.setStrokeStyle( 4 );
 		circle.graphics.beginStroke( color ).drawCircle( 0, 0, radius );
	}
	circle.name = l.x + "," +  l.y;
	circle.x = loc.x;
	circle.y = loc.y;
	circle.setBounds( loc.x-radius, loc.y-radius, radius*2, radius*2 );

	return circle;
};

/* Creates a Text Object. */
function drawText ( content, name, loc, size, font, color, mouseover, textAlign, textBaseline ) {
	
	// display Play Button with clickevent and nice haptic mouseover
	var text = new createjs.Text( content, size + " " + font, color );
	text.name = name;
	text.x = loc.x;
	text.y = loc.y;
	text.textAlign = textAlign;
	text.textBaseline = textBaseline;

	if ( mouseover ){
		text.cursor = "pointer";
		
		// Hitarea for Mouseover
		var s = new createjs.Shape();

		// XXX: Take care if align and baseline is set, that the rect is not at the spot one would assume
		s.graphics.beginFill( "#f00").drawRect(0,0,text.getMeasuredWidth(), text.getMeasuredHeight() );
		text.hitArea = s;
		
		// XXX: THESE/THIS ( ?) DO NOT WORK IN FIREFOX???????? (EVENTTYPES )
		text.on( "mouseover", hover, false, null, {color: "red", obj: "text"} );
		text.on( "mouseout", hover, false, null, {color: "DeepSkyBlue", obj: "text"} );
	}
	
	return text;
}

function drawPicture( pic, loc, width, height, name, keepRatio ) {
	var img = preload.getResult( pic );
	var bg = new createjs.Bitmap( img );
	// console.log(bg);
    bg.name = name;
    bg.x = loc.x;
    bg.y = loc.y;
    if ( keepRatio ){
    	bg.scaleX = width/bg.image.width;
    	bg.scaleY = getNewScaleY( width, bg.image.width, bg.image.height );
    } else {
	    bg.scaleX = width/bg.image.width;
	    bg.scaleY = height/bg.image.height;
	}
	bg.width = bg.image.width*bg.scaleX;
    bg.height = bg.image.height*bg.scaleY;
    return bg;
};

function getNewScaleY( newWidth, oldWidth, oldHeight ){
	var ratio = oldWidth/oldHeight;
	var scaleX = newWidth/oldWidth;
	return oldWidth * scaleX * (1/(ratio*oldHeight));
}

function initCars( visible ) {

};

function updateCars( player, l, speed, time, fps ) {
	var loc = new Location( game.toXCoord( l ), game.toYCoord( l ));
	var car = playerContainer.getChildAt( player.no );
	createjs.Tween.get( car, {loop: false} )
  	.to( { x: loc.x, y: loc.y }, time, createjs.Ease.getPowInOut( speed ));
  	// XXX: These can be cached!
  	var line = drawLine( 1, player.crntLoc(), l, player.car.color );
  	lineContainer.addChild( line );
};











