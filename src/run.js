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

SKEW_CARS_MENU = 0.8;
SKEW_CARS_TRACK = 0.3;

// XXX: CHANGE EVERY VARIABLE TO CAMELCASE EXCEPT FOR CONSTANTS (ALL CAPITAL LETTERS)
menu_car_positions = [0,0,0,0];
tracks = [];
track_position = 0;

loadingProgress = 0;

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
	{ src:"img/sprite_car_1.png", 		id:"sprite_car_1" },
	{ src:"img/sprite_car_2.png", 		id:"sprite_car_2" },
	{ src:"img/sprite_car_3.png", 		id:"sprite_car_3" },
	{ src:"img/trackname_own.png", 		id:"trackname_own" },
	{ src:"img/trackname_doodoo.png", 	id:"trackname_doodoo" },
	{ src:"img/trackname_drag.png", 	id:"trackname_drag" },
	{ src:"img/trackname_lummerland.png", id:"trackname_lummerland" },
	{ src:"img/trackname_spaceship.png", id:"trackname_spaceship" }
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
	game = new Game();
	
	initializeTracks();
	
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
	var text = drawText( Math.floor( loadingProgress/manifest.length )+"%", "progressBar", new Location( w/2, h/2 ), Math.floor(20*w/1000)+"px", "Arial", "black", false, "left", "top" );
	menuContainer.addChild( text );
	preload.on( "progress", handleProgress );
	preload.on( "fileload", handleLoadedStuff );
	preload.on( "complete", prepareMenu );
	preload.loadManifest( manifest );
	
	/* ****** */
	/* TICKER */
	/* ****** */
	
	// XXX: MAYBE OK WITHOUT TICKER???
	createjs.Ticker.addEventListener( "tick", stage );
	
}

function handleProgress( evt ){
	var text = menuContainer.getChildByName( "progressBar" );
	text.text = Math.floor( loadingProgress/manifest.length*100 )+"%";
}

function handleLoadedStuff( evt ){
	loadingProgress++;
	console.log( evt.item.id + " loaded" );
	switch( evt.item.id ){
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
		break;
		default: console.log( "SCREW YOU!" ); break;
	}
}

function initScore() {
	// XXX: FONT AENDERN....
	for ( var i = 0; i < 4; i++ ) {
		var parent = HUDContainer.getChildByName( "hud"+i );
		var loc = new Location( parent.x + parent.width*HUD_OFFSET, parent.y + parent.height*HUD_OFFSET );
		var text = drawText( "", "hud"+i+"_text", loc, Math.floor(20*w/1000)+"px", "Arial", "black", false, "left", "top" );
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

function prepareMenu() {

	// Remove progress bar
	menuContainer.removeChild( menuContainer.getChildByName( "progressBar" ) );

	// helper for displaying objects (graphics and shapes)
	var obj, g, s;
	
	// display Background
	obj = drawPicture( "background", new Location(0, 0), w, h, "background", false );
	backgroundContainer.addChild(obj);
	
	// display Background of Header
	obj = drawPicture( "back_header", new Location(w/2-w*0.55/2, 0.0333), w*0.55, -1, "back_header", true );
	menuContainer.addChild( obj );
	// display Title of init Track
	obj = drawPicture( "trackname_"+game.track.name, new Location(w/2-w*0.3/2,h/2-60/2), w*0.3, 0.1*h, "trackname", true );
	menuContainer.addChild( obj );

	// display Header
	obj = drawPicture( "header", new Location(w/2-w*0.35/2, 0.0666*h), w*0.35, -1, "header", true );
	menuContainer.addChild( obj );
	
	// display sound on/off symbol with clickevent
	obj = drawPicture( "music_on_normal", new Location(3*w/4, h-0.1333*h), w*0.05, -1, "music_toggle", true );
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
	obj = drawPicture( "right_normal", new Location(w-w*0.1, h/2-0.1*h/2), w*0.05, 0.1*h, "right_normal_track", false );
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
	obj = drawPicture( "left_normal", new Location(w*0.1-w*0.05, h/2-0.1*h/2), w*0.05, 0.1*h, "left_normal_track", false );
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
	obj = drawPicture( "back_name", new Location(w/2-w*0.4/2, h/2-0.1666*h/2), w*0.4, 0.1666*h, "back_name", false );
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
	obj = drawPicture( "right_normal", new Location(w*0.14, 0.0666*h), w*0.02, 0.05*h, "right_normal_car_0", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_0_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_0", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_0", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_0", dir: "right", no:0});
	menuContainer.addChild( s );

	// carchoice: left top: left arrow
	obj = drawPicture( "left_normal", new Location(w*0.04, 0.0666*h), w*0.02, 0.05*h, "left_normal_car_0", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_0_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_0", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_0", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_0", dir: "left", no:0});
	menuContainer.addChild( s );
	
	// carchoice: right top: right arrow
	obj = drawPicture( "right_normal", new Location(w-w*0.04, 0.0666*h), w*0.02, 0.05*h, "right_normal_car_1", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_1_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_1", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_1", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_1", dir: "right", no:1});
	menuContainer.addChild( s );

	// carchoice: right top: left arrow
	obj = drawPicture( "left_normal", new Location(w-w*0.14, 0.0666*h), w*0.02, 0.05*h, "left_normal_car_1", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_1_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_1", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_1", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_1", dir: "left", no:1});
	menuContainer.addChild( s );
	
	// carchoice: left bottom: right arrow
	obj = drawPicture( "right_normal", new Location(w*0.14, h-0.08333*h-0.05*h), w*0.02, 0.05*h, "right_normal_car_2", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_2_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_2", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_2", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_2", dir: "right", no:2});
	menuContainer.addChild( s );

	// carchoice: left bottom: left arrow
	obj = drawPicture( "left_normal", new Location(w*0.04, h-0.0833*h-0.05*h), w*0.02, 0.05*h, "left_normal_car_2", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_2_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_2", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_2", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_2", dir: "left", no:2});
	menuContainer.addChild( s );

	// carchoice: right bottom: right arrow
	obj = drawPicture( "right_normal", new Location(w-w*0.04, h-0.0833*h-0.05*h), w*0.02, 0.05*h, "right_normal_car_3", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "right_normal_car_3_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "right_normal_car_3", img: "right_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "right_normal_car_3", img: "right_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_3", dir: "right", no:3});
	menuContainer.addChild( s );

	// carchoice: right bottom: left arrow
	obj = drawPicture( "left_normal", new Location(w-w*0.14, h-0.0833*h-0.05*h), w*0.02, 0.05*h, "left_normal_car_3", false );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "left_normal_car_3_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "left_normal_car_3", img: "left_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "left_normal_car_3", img: "left_normal", obj: "pic"} );
	s.on( "click", changeCar, false, null, {target: "car_3", dir: "left", no:3});
	menuContainer.addChild( s );

	// display Play button with hover
	obj = drawPicture( "play_normal", new Location(w/2-w*0.15/2, h-0.1666*h), w*0.15, -1, "play_normal", true );
	menuContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: menuContainer, target: "play_normal", img: "play_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: menuContainer, target: "play_normal", img: "play_normal", obj: "pic"} );
	s.on( "click", function( evt ){
		for (var i = 0; i < menu_car_positions.length; i++){
			if (menu_car_positions[i] != 0){
				// XXX: Color needs to be read from menu...
				color = createjs.Graphics.getHSL( Math.random()*360, 100, 50 );
				var player = new Player( new Car( null, color ), i );
				game.activePlayers.push( player );
				game.players.push( player );
				HUDContainer.getChildByName("hud"+i).visible = true;
			} else {
				HUDContainer.getChildByName("hud"+i).visible = false;
			}
		}

		if ( track_position == 0 ){
			buildStatus = BUILD_TRACK;
		} else {
			buildStatus = PLACE_PLAYERS;
		}
		prepareTrack();
	});
	menuContainer.addChild( s );
	
	// display HUD
	initScore();
	
	// ANIMATIONS
	var animation, spriteSheet;
	spriteSheets.push({
		images: [preload.getResult( "sprite_none" )],
		frames: {width:485/5, height:78},
		animations: {"move":[0,4], "hold":[0]}, // "move":[0,4,"hold",0.5]
		framerate: 7
 	});
	spriteSheets.push({
		images: [preload.getResult( "sprite_car_1" )],
		frames: {width:658/7, height:77},
		animations: {"move":[0,6], "hold":[0]},
		framerate: 15
 	});
 	spriteSheets.push({
		images: [preload.getResult( "sprite_car_2" )],
		frames: {width:70, height:61},
		animations: {"move":[0,6], "hold":[5]},
		framerate: 15
 	});
 	spriteSheets.push({
		images: [preload.getResult( "sprite_car_3" )],
		frames: {width:292/3, height:88},
		animations: {"move":[0,2], "hold":[0]},
		framerate: 7
 	});

 	// Notice on scaling values: Due to the fact that the pictures were created
 	// based on a width of 1000 and height of 600, the scaling values need to
 	// be adjusted according to the new canvas size.
	var spriteSheet = new createjs.SpriteSheet(spriteSheets[0]);
	var animation = new createjs.Sprite(spriteSheet, "move" );
	animation.name = "car_0";
	animation.x = w*0.06;
	animation.y = 0.05*h;
	animation.scaleX = SKEW_CARS_MENU*w/1000;
	animation.scaleY = SKEW_CARS_MENU*h/600;
	menuContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "car_1";
	animation.scaleX = SKEW_CARS_MENU*w/1000;
	animation.scaleY = SKEW_CARS_MENU*h/600;
	animation.x = w-w*0.06-w*0.06;
	animation.y = 0.05*h;
	menuContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "car_2";
	animation.x = w*0.06;
	animation.y = h-0.0666*h-0.0833*h;
	animation.scaleX = SKEW_CARS_MENU*w/1000;
	animation.scaleY = SKEW_CARS_MENU*h/600;
	menuContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "car_3";
	animation.x = w-w*0.06-w*0.06;
	animation.y = h-0.0666*h-0.0833*h;
	animation.scaleX = SKEW_CARS_MENU*w/1000;
	animation.scaleY = SKEW_CARS_MENU*h/600;
	menuContainer.addChild(animation);
};

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
	finishLineContainer.removeAllChildren();
	trackContainer.removeAllChildren();
	// XXX: Remove child by name???
	menuContainer.removeChild(menuContainer.getChildByName("trackname"));

	// sets a position of the current chosen track
	track_position = (track_position + (data.dir == "right" ? +1 : -1)) % tracks.length;
	if ( track_position < 0 ) {
		track_position = tracks.length-1; 
	}
	// XXX: Display the corresponding name in the middle
	game.track = tracks[track_position];
	var trackTitle = drawPicture( "trackname_"+game.track.name, new Location(w/2-w*0.3/2,h/2-0.1*h/2), w*0.3, h*0.1, "trackname", true );
	menuContainer.addChild(trackTitle);
	paintTrack( game.track.trackBorders, 0 );
	// paintTrack( game.track.surrPoints, 1 );
	paintTrack( game.track.finishLine, 2 );
	paintTrack( game.track.trackPoints, 3 );
}





/* = ************* = */
/* =  BUILD STUFF  = */
/* = ************* = */

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

function buildTrack(){
	
	var outerTrackBorders = new Array();
	var start = true;
	var shape = new createjs.Shape();
	shape.name = "buildPainting1";
	paintContainer.addChild( shape );

	// set up our defaults:
	var color = "#0FF";
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
			paintTrack( game.track.surrPoints, 1 );
		}
		else{
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
			paintTrack( game.track.trackBorders, 0 );
			// clear outerTrackBorders
			outerTrackBorders.length = 0;
		}
	})
	 
	
    stage.on( "stagemousemove", function( evt ) {

		if ( paint ) {
			shape.graphics.beginStroke( color )
						  .setStrokeStyle( CIRCLE_SIZE, "round" )
						  .moveTo( oldX, oldY )
						  .lineTo( evt.stageX, evt.stageY );
			stage.update();

			outerTrackBorders.push( game.toLoc( evt.stageX, evt.stageY ));
			
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	var text = drawText ( "Done", "doneButton", new Location( w/2 - 0.08*w, h-0.05*h ), Math.floor(20*w/1000)+"px", "Arial", "DeepSkyBlue", true, "left", "top" );
	
	stuffContainer.addChild( text );
	text.on( "click", function ( evt ){
		buildStatus++;
		prepareTrack();
		var child = stage.getChildByName( "doneButton" );
		stuffContainer.removeChild( child );
		stage.update();
	});
}

function paintTrack( array, type ){
	var container;
	switch( type ) {
		case 0: 
			container = trackContainer;
			for ( var j = 0; j < array.length; j++ ){
				if ( trackContainer.getChildByName( array[j].x+","+array[j].y ) == null ){
					var circle = drawColoredCircle( "DeepSkyBlue", array[j], CIRCLE_SIZE, true );
					circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2 );
					trackContainer.addChild( circle );	
				}
			}	
		break;
		case 1: 
			container = trackContainer;
			for ( var j = 0; j < array.length; j++ ){
				var circle = drawColoredCircle( "green", array[j], CIRCLE_SIZE, true );
				circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2, CIRCLE_SIZE*2 );
				trackContainer.addChild( circle );
			}	
		break;
		case 2: 
			container = finishLineContainer;
			for ( var j = 0; j < array.length; j++ ){
				if ( finishLineContainer.getChildByName( array[j].x+","+array[j].y ) == null ){
					var circle = drawColoredCircle( "blue", array[j], CIRCLE_SIZE, true );
					circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2 );
					finishLineContainer.addChild( circle );	
				}
			}	
		break;
		case 3: 
			console.log ( "Not implemented: track colorization" );
			container = trackContainer;
		break;
		default: console.log( "SCREW YOU!" ); break;
	}
	// // XXX: HERE SHOULD BE CORRECT BOUNDS...NOW EVERYTHING IS CACHED...
	try{
		container.updateCache( 0, 0, w, h );
	} catch( err ){
		container.cache( 0, 0, w, h );
	}

}

// XXX: TO COMPLETE
function displayTip( content ){
	var g = new createjs.Graphics();
 	g.beginFill("#FFFFFF");
 	g.drawRect(0,0,w,h);
 	var shape = new createjs.Shape(g);
 	shape.alpha=0.7;
 	// XXX: create own container, such that it will always be the top container.
 	stuffContainer.addChild(shape);
 	// XXX: Here an image of a box needs to be ...
 	var g = new createjs.Graphics();
 	g.beginFill("#FFFFFF");
 	g.drawRect(w/2-w*0.3/2,h/2-h*0.3/2,w*0.3,h*0.3);
 	shape = new createjs.Shape(g);
 	stuffContainer.addChild(shape);

 	var text = drawText ( content, "tipText", new Location( w/2-w*0.2/2,h/2-h*0.2/2 ), Math.floor(15*w/1000)+"px", "Arial", "black", false, "left", "top" );
 	stuffContainer.addChild(text);
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
		paintTrack( game.track.finishLine, 2 );
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

	var text = drawText ( "Done", "doneButton", new Location( w/2 - 0.08*w, h-0.05*h ), Math.floor(20*w/1000)+"px", "Arial", "DeepSkyBlue", true, "left", "top" );
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

			var car = menuContainer.getChildByName("car_"+game.activePlayers[no].no);
			menuContainer.removeChild(car);
			car.name = "car_"+game.activePlayers[no].no;
			car.scaleX = SKEW_CARS_TRACK;
			car.scaleY = SKEW_CARS_TRACK;
			var bounds = car.spriteSheet.getFrameBounds(0);
			car.x = game.toXCoord(loc)-bounds.width*car.scaleX/2;
			car.y = game.toYCoord(loc)-bounds.height*car.scaleY/2;
			playerContainer.addChild( car );
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
				// XXX: for creating tracks
				// printArray( game.track.trackBorders, "track.trackBorders" );
				// printArray( game.track.finishLine, "track.finishLine" );
				// printArray( game.track.surrPoints, "track.surrPoints" );
				// printArray( game.track.trackPoints, "track.trackPoints" );
				prepareTrack();
				stage.update();
			}
		})
	};
}
// XXX: for creating tracks
// function printArray ( array, name ){
// 	var string = "";
// 	for ( var i = 0; i < array.length; i++ ){
// 		string += name+".push( new Location" + array[i].toString()+");";
// 	}
// 	console.log( string );
// }



function doMove(){
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
	// // XXX: TESTING PURPOSES
	// displayTip("Ziehe nun mit der Maus eine Linie,\nsodass blablabla\nfkdsfhjdklsfjdskfldjsfdksfljssfdsfs\nfdskfjksldjfksdjfls");
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
	var car = playerContainer.getChildByName( "car_"+player.no );
	var bounds = car.spriteSheet.getFrameBounds(0);
	var newScale = SKEW_CARS_TRACK;
	// flip right
	if ( player.crntLoc().x >= l.x ){
		newScale=-newScale;
	} 
	createjs.Tween.get( car, {loop: false} )
  	.to( { x: loc.x-bounds.width/2*newScale, y: loc.y-bounds.height/2*car.scaleY }, time, createjs.Ease.getPowInOut( speed ));
  	car.scaleX = newScale;
  	// XXX: These can be cached!
  	var line = drawLine( 1, player.crntLoc(), l, player.car.color );
  	lineContainer.addChild( line );
};











