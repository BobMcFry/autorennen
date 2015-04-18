      //      /     //
     //            //
    //      /     //
   // AUTORENNEN //
  //      /     //
 //            //
//      /     //



// Status of Track Preparation used in prepareTrack()
BUILD_TRACK  = 0;
SET_START  = 1;
PLACE_PLAYERS = 2;
PREPARE_TURN  = 3;

// Types of Hints
HINT_WIN = 0;
HINT_DRAW = 1;
HINT_MENU = 2;
HINT_ALERT = 3;

// Circle and paint size used to draw them to the canvas
CIRCLE_SIZE = 6;
PAINT_SIZE = 6;

// HUD SIZE (percentage of width and height
HUD_SIZE = 0.2;
HUD_OFFSET = 0.25;

// Scale factor for cars
SKEW_CARS_MENU = 0.8;
SKEW_CARS_TRACK = 0.5;

// Color design
COLOR_HOVER = "#8B2A18";
COLOR_TRACK = "#A6A6A6";
COLOR_BORDER = "#8BACBB";
COLOR_FINISHLINE = "#1C63A0";
COLOR_SURR = "#575757";

// menu related variables
menuCarPositions = [0,0,0,0];
tracks = [];
trackPosition = 0;

// counter for loading screen 
loadingProgress = 0;

// Images and Sounds used in the game. This manifest is loaded with preload.
manifest = [
	{ src:"img/loading_01.png", 			id:"loading_01" },
	{ src:"img/loading_02.png", 			id:"loading_02" },
	{ src:"img/loading_03.png", 			id:"loading_03" },
	{ src:"img/loading_04.png", 			id:"loading_04" },
	{ src:"img/loading_05.png", 			id:"loading_05" },
	{ src:"img/loading_06.png", 			id:"loading_06" },
	{ src:"img/loading_07.png", 			id:"loading_07" },
	{ src:"img/loading_08.png", 			id:"loading_08" },
	{ src:"img/loading_09.png", 			id:"loading_09" },
	{ src:"img/loading_10.png", 			id:"loading_10" },
	{ src:"img/loading_11.png", 			id:"loading_11" },
	{ src:"img/loading_12.png", 			id:"loading_12" },
	{ src:"img/background.png", 			id:"background" },
	{ src:"img/numbers.png", 				id:"numbers" },
	{ src:"img/meter.png", 					id:"meter" },
	{ src:"img/kilometer.png", 				id:"kilometer" },
	{ src:"img/instruction_building_1.png",	id:"instruction_building_1" },
	{ src:"img/instruction_building_2.png",	id:"instruction_building_2" },
	{ src:"img/instruction_building_3.png",	id:"instruction_building_3" },
	{ src:"img/hud_le_to.png", 				id:"hud0" },
	{ src:"img/hud_ri_to.png", 				id:"hud1" },
	{ src:"img/hud_le_bo.png", 				id:"hud2" },
	{ src:"img/hud_ri_bo.png", 				id:"hud3" },
	{ src:"img/back_header.png", 			id:"back_header" },
	{ src:"img/back_name.png", 				id:"back_name" },
	{ src:"img/autorennen_header.png", 		id:"header" },
	{ src:"img/circle_normal_1.png", 		id:"circle_normal_1" },
	{ src:"img/circle_normal_2.png", 		id:"circle_normal_2" },
	{ src:"img/circle_normal_3.png", 		id:"circle_normal_3" },
	{ src:"img/circle_normal_4.png", 		id:"circle_normal_4" },
	{ src:"img/circle_finish_1.png", 		id:"circle_finish_1" },
	{ src:"img/circle_finish_2.png", 		id:"circle_finish_2" },
	{ src:"img/hintBox.png", 				id:"hintBox" },
	{ src:"img/cross_normal.png", 			id:"cross_normal" },
	{ src:"img/cross_hover.png", 			id:"cross_hover" },
	{ src:"img/left_hover.png", 			id:"left_hover" },
	{ src:"img/left_normal.png", 			id:"left_normal" },
	{ src:"img/right_hover.png", 			id:"right_hover" },
	{ src:"img/right_normal.png", 			id:"right_normal" },
	{ src:"img/music_on_normal.png", 		id:"music_on_normal" },
	{ src:"img/music_off_normal.png", 		id:"music_off_normal" },
	{ src:"img/music_on_hover.png", 		id:"music_on_hover" },
	{ src:"img/music_off_hover.png", 		id:"music_off_hover" },
	{ src:"img/play_normal.png", 			id:"play_normal" },
	{ src:"img/play_hover.png", 			id:"play_hover" },
	{ src:"img/next_normal.png", 			id:"next_normal" },
	{ src:"img/next_hover.png", 			id:"next_hover" },
	{ src:"img/reload_normal.png", 			id:"reload_normal" },
	{ src:"img/reload_hover.png", 			id:"reload_hover" },
	{ src:"img/return_normal.png", 			id:"return_normal" },
	{ src:"img/return_hover.png", 			id:"return_hover" },
	{ src:"img/continue_normal.png", 		id:"continue_normal" },
	{ src:"img/continue_hover.png", 		id:"continue_hover" },
	{ src:"img/sprite_none.png", 			id:"sprite_none" },
	{ src:"img/sprite_car_1.png", 			id:"sprite_car_1" },
	{ src:"img/sprite_car_2.png", 			id:"sprite_car_2" },
	{ src:"img/sprite_car_3.png", 			id:"sprite_car_3" },
	{ src:"img/trackname_own.png", 			id:"trackname_own" },
	{ src:"img/trackname_doodoo.png", 		id:"trackname_doodoo" },
	{ src:"img/trackname_drag.png", 		id:"trackname_drag" },
	{ src:"img/trackname_lummerland.png", 	id:"trackname_lummerland" },
	{ src:"img/trackname_spaceship.png", 	id:"trackname_spaceship" }
];

spriteSheetsCar = [];
spriteSheetNumbers = [];

isHintDisplayed = false;

/* Method that is called initially on pageload */
function init() {

	/* **************** */
	/* GLOBAL VARIABLES */
	/* **************** */

	stage = new createjs.Stage( "board" );
	stage.enableMouseOver();
	// XXX: HARD CODED SIZES!!!!!!!!
	w = stage.canvas.width;
	h = stage.canvas.height;
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
	// contains button for painting
	buildingContainer = new createjs.Container();
	stage.addChildAt( buildingContainer, 10 );
	// contains objects for displaying an error or menu
	hintContainer = new createjs.Container();
	stage.addChildAt( hintContainer, 11 );

	/* ************** */
	/* PRELOAD IMAGES */
	/* ************** */

	preload = new createjs.LoadQueue( false );

	preload.on( "fileload", handleLoadedStuff );
	preload.on( "complete", prepareMenu );
	preload.loadManifest( manifest );
	/* ****** */
	/* TICKER */
	/* ****** */
	
	createjs.Ticker.addEventListener( "tick", stage );	
};

/* Handler for loaded objects */
function handleLoadedStuff( evt ){
	// update progresscounter
	loadingProgress++;
	var progress = loadingProgress/manifest.length*100

	// update loadingpicture
	var picNumber = Math.ceil( progress / 8 );
	var loadingPic = "loading_" + (picNumber < 10 ? "0"+picNumber: picNumber);
	if ( picNumber > 0 && picNumber < 13 && !menuContainer.getChildByName( loadingPic )){
		var pic = drawPicture( loadingPic, new Location(w/2-w*0.8/2, h/2-h*0.8/2), w*0.8, h*0.8, loadingPic, false );	
		menuContainer.addChild( pic );	
	}

	// console.log( evt.item.id + " loaded" );
};

/* Initializes the objects for the menu */
function prepareMenu() {

	// Remove progress bar
	menuContainer.removeAllChildren();

	// helper for displaying objects (graphics and shapes)
	var obj, g, s;
	
	// display Background
	obj = drawPicture( "background", new Location(0, 0), w*1.01, h*1.02, "background", false );
	backgroundContainer.addChild(obj);
	
	// display Background of Header
	obj = drawPicture( "back_header", new Location(w/2-w*0.55/2, 0.0333), w*0.55, -1, "back_header", true );
	menuContainer.addChild( obj );
	
	// trackMenu: name box
	obj = drawPicture( "back_name", new Location(w/2-w*0.4/2, h/2-0.1666*h/2), w*0.4, 0.1666*h, "back_name", false );
	menuContainer.addChild( obj );

	// display Title of init Track
	obj = drawPicture( "trackname_"+game.track.name, new Location(w/2-w*0.3/2,h/2-0.1665*h/2), w*0.3, 0.1*h, "trackname", true );
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
		
		if ( isHintDisplayed ) 
			return;

		// if less than 2 cars are chosen
		var carcounter = 0;
		for( var i = 0; i < menuCarPositions.length; i++ ){
			if ( menuCarPositions[i] != 0 ){
				carcounter++;
			}
		}
		if ( carcounter < 2 ){
			displayHint( "Please choose at least 2 cars.", HINT_ALERT );
			return;
		}

		// prepare everything
		var visibility;
		for (var i = 0; i < menuCarPositions.length; i++){
			
			if (menuCarPositions[i] != 0){
				// XXX: Color needs to be read from menu...
				color = createjs.Graphics.getHSL( Math.random()*360, 100, 50 );
				var player = new Player( new Car( null, color ), i );
				game.activePlayers.push( player );
				game.players.push( player );
				visibility = true;
			} else {
				visibility = false;
			}

			HUDContainer.getChildByName("hud"+i).visible = visibility;
			HUDContainer.getChildByName("hud_speed_1_"+i).visible = visibility;
			HUDContainer.getChildByName("hud_speed_2_"+i).visible = visibility;
			HUDContainer.getChildByName("hud_distance_1_"+i).visible = visibility;
			HUDContainer.getChildByName("hud_distance_2_"+i).visible = visibility;
			HUDContainer.getChildByName("hud_distance_3_"+i).visible = visibility;
			HUDContainer.getChildByName("hud_meter_"+i).visible = visibility;
			HUDContainer.getChildByName("hud_kilometer_"+i).visible = visibility;
		}

		// if own is chosen set trackstatus to building, else to placing.
		if ( trackPosition == 0 ){
			buildStatus = BUILD_TRACK;
		} else {
			buildStatus = PLACE_PLAYERS;
		}
		prepareTrack();
	});
	menuContainer.addChild( s );
	
	// ANIMATIONS
	var animation, spriteSheet;
	spriteSheetsCar.push({
		images: [preload.getResult( "sprite_none" )],
		frames: {width:485/5, height:78},
		animations: {"move":[0,4], "hold":[0]}, // "move":[0,4,"hold",0.5]
		framerate: 7
 	});
	spriteSheetsCar.push({
		images: [preload.getResult( "sprite_car_1" )],
		frames: {width:658/7, height:77},
		animations: {"move":[0,6], "hold":[0]},
		framerate: 15
 	});
 	spriteSheetsCar.push({
		images: [preload.getResult( "sprite_car_2" )],
		frames: {width:70, height:61},
		animations: {"move":[0,6], "hold":[5]},
		framerate: 15
 	});
 	spriteSheetsCar.push({
		images: [preload.getResult( "sprite_car_3" )],
		frames: {width:292/3, height:88},
		animations: {"move":[0,2], "hold":[0]},
		framerate: 7
 	});

 	// numbers
	spriteSheetNumbers = {
		images: [preload.getResult( "numbers" )],
		frames: {width:250/10, height:26},
		animations: {zero:0, one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9},
 	};

 	
 	// Notice on scaling values: Due to the fact that the pictures were created
 	// based on a width of 1000 and height of 600, the scaling values need to
 	// be adjusted according to the new canvas size.
	var spriteSheet = new createjs.SpriteSheet(spriteSheetsCar[0]);
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

	// display HUD
	initScore();
};

/* Initializes the objects for the HUD */
function initScore() {

	for ( var i = 0; i < 4; i++ ) {
		var parent = HUDContainer.getChildByName( "hud"+i );
		var loc = new Location( parent.x + parent.width*HUD_OFFSET, parent.y + parent.height*HUD_OFFSET );

		// XXX: Add average speed
		// XXX: Create/change number methoden schreiben um auszulagern...
		var obj, pic;
		var spriteSheet = new createjs.SpriteSheet( spriteSheetNumbers );
		// speed 1:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_speed_1_"+i;
		obj.x = loc.x;
		obj.y = loc.y;
		obj.visible = false;
		HUDContainer.addChild( obj );
		// speed 2:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_speed_2_"+i;
		obj.x = loc.x + obj.spriteSheet._frameWidth*4/5;
		obj.y = loc.y;
		obj.visible = false;
		HUDContainer.addChild( obj );
		// Kilometer
		loc.x += obj.spriteSheet._frameWidth*2;
		pic = drawPicture( "kilometer", loc, w*0.05, -1, "hud_kilometer_"+i, true );
		pic.visible = false;
		HUDContainer.addChild( pic );
		loc.x -= obj.spriteSheet._frameWidth*2;

		// distance 1:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_distance_1_"+i;
		obj.x = loc.x - obj.spriteSheet._frameWidth * 4/5;
		obj.y = loc.y + obj.spriteSheet._frameHeight;
		obj.visible = false;
		HUDContainer.addChild( obj );
		// distance 2:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_distance_2_"+i;
		obj.x = loc.x;
		obj.y = loc.y + obj.spriteSheet._frameHeight;
		obj.visible = false;
		HUDContainer.addChild( obj );
		// distance 3:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_distance_3_"+i;
		obj.x = loc.x + obj.spriteSheet._frameWidth * 4/5;
		obj.y = loc.y + obj.spriteSheet._frameHeight;
		obj.visible = false;
		HUDContainer.addChild( obj );
		// Meter
		loc.x += obj.spriteSheet._frameWidth*2;
		loc.y += obj.spriteSheet._frameHeight;
		pic = drawPicture( "meter", loc, w*0.025, -1, "hud_meter_"+i, true );
		pic.visible = false;
		HUDContainer.addChild( pic );
		loc.x -= obj.spriteSheet._frameWidth*2;
		loc.y -= obj.spriteSheet._frameHeight;
	};
};

/* Returns the english name of a number (0-9) */
function getNumberString( number ){
	switch ( number ){
		case 0: return "zero"; 
		case 1: return "one"; 
		case 2: return "two"; 
		case 3: return "three";
		case 4: return "four"; 
		case 5: return "five"; 
		case 6: return "six"; 
		case 7: return "seven";
		case 8: return "eight";
		case 9: return "nine"; 
		default: return null;
	}
	return "";
};

/* Updates the scores for every player */
function updateScores() {

	for ( var i = 0; i < game.activePlayers.length; i++ ){
		// XXX: Add Color Or CarPic
		var player = game.activePlayers[i];
		var no = player.no;
		var slicedSpeed = sliceNumberIntoPieces( Math.ceil( player.getSpeed() ) );
		var slicedDistance = sliceNumberIntoPieces( Math.ceil( player.distance ) );
		var obj;
		
		// change speed
		obj = HUDContainer.getChildByName( "hud_speed_1_" + no );
		if ( slicedSpeed[1] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedSpeed[1] ));	
		}
		obj = HUDContainer.getChildByName( "hud_speed_2_" + no );
		if ( slicedSpeed[0] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedSpeed[0] ));
		}
		// change distance
		obj = HUDContainer.getChildByName( "hud_distance_1_" + no );
		if ( slicedDistance[2] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedDistance[2] ));	
		}
		obj = HUDContainer.getChildByName( "hud_distance_2_" + no );
		if ( slicedDistance[1] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedDistance[1] ));	
		}
		obj = HUDContainer.getChildByName( "hud_distance_3_" + no );
		if ( slicedDistance[0] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedDistance[0] ));	
		}
	}
};

/* Puts the single digits of a number into an array */
function sliceNumberIntoPieces( number ){
	var pieces = [];
	while( number != 0 ){
		pieces.push( number%10 );
		number /= 10;
		number = Math.floor( number );
	}
	return pieces;
};

/* Changes the car in the menu */
function changeCar( evt, data ){

	if ( isHintDisplayed ) 
		return;

	var inc = ( data.dir == "right" ? +1 : -1 );
	menuCarPositions[data.no] = ( menuCarPositions[data.no] + inc ) % spriteSheetsCar.length; 
	if ( menuCarPositions[data.no] < 0 ) {
		menuCarPositions[data.no] = spriteSheetsCar.length-1; 
	}
	var c = menuContainer.getChildByName( data.target );
	c.spriteSheet = new createjs.SpriteSheet( spriteSheetsCar[menuCarPositions[data.no]] );
};

/* Changes the Track in the Menu */
function changeTrack ( evt, data ) {
	
	if ( isHintDisplayed ) 
		return;

	finishLineContainer.removeAllChildren();
	trackContainer.removeAllChildren();
	// XXX: Remove child by name???
	menuContainer.removeChild( menuContainer.getChildByName("trackname") );

	// sets a position of the current chosen track
	trackPosition = (trackPosition + (data.dir == "right" ? +1 : -1)) % tracks.length;
	if ( trackPosition < 0 ) {
		trackPosition = tracks.length-1; 
	}
	// XXX: Display the corresponding name in the middle
	game.track = tracks[trackPosition];
	var trackTitle = drawPicture( "trackname_"+game.track.name, new Location( w/2-w*0.3/2,h/2-0.1665*h/2 ), w*0.3, h*0.1, "trackname", true );
	menuContainer.addChild(trackTitle);
	paintTrack( game.track.trackBorders, 0 );
	paintTrack( game.track.surrPoints, 1 );
	paintTrack( game.track.finishLine, 2 );
	paintTrack( game.track.trackPoints, 3 );
};

/* Control method for track building */
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
			// XXX: Display ingame MenuButton
			doMove();
		break;
		default: console.log( "Well OK?" );
	}
};

/* Building Engine for painting an own track */
function buildTrack(){
	
	// set instruction background
	var instr = drawPicture( "instruction_building_1", new Location(0, 0), w, h, "instruction_building_1", false );
	instr.alpha = 0.4;
	backgroundContainer.addChild( instr );

	var outerTrackBorders = new Array();
	var start = true;
	var shape = new createjs.Shape();
	shape.name = "buildPainting1";
	paintContainer.addChild( shape );

	// set up our defaults:
	var oldX, oldY;
	var paint = false;
	var timedown = 0;
	var timeup = Date.now();

	// add handler for stage mouse events:
	stage.on( "stagemousedown", function( evt ) {
		
		if ( isHintDisplayed ) 
			return;

		// XXX: THIS IS A TEMP FIX TO PREVENT THE STAGEEVENT FROM BEING FIRED WHEN THE DONE BUTTON IS CLICKED
		var obj = stage.getObjectUnderPoint( evt.stageX, evt.stageY );
		if ( obj != null && (obj.name == "doneButton_hitarea" )){
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

		if ( isHintDisplayed ) 
			return;
		
		paint = false;
		// capture press time
		timeup = Date.now();
		// compare times and determine wether the user wants to fill a circle
		if ( timeup - timedown < 300 ){
			// XXX: THIS IS A TEMP FIX TO PREVENT THE STAGEEVENT FROM BEING FIRED WHEN THE DONE BUTTON IS CLICKED
			var obj = stage.getObjectUnderPoint( evt.stageX, evt.stageY );
			if ( obj != null && obj.name == "doneButton_hitarea" ){
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

    	if ( isHintDisplayed ) 
			return;

		if ( paint ) {
			shape.graphics.beginStroke( COLOR_BORDER )
						  .setStrokeStyle( PAINT_SIZE, "round" )
						  .moveTo( oldX, oldY )
						  .lineTo( evt.stageX, evt.stageY );
			stage.update();

			outerTrackBorders.push( game.toLoc( evt.stageX, evt.stageY ));
			
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	var text = drawPicture( "next_normal", new Location( 1/8*w, 3/4*h ), 0.15*w, 0.1*h, "doneButton", false );
	buildingContainer.addChild( text );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( text.x, text.y, text.width, text.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "doneButton_hitarea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: buildingContainer, target: "doneButton", img: "next_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: buildingContainer, target: "doneButton", img: "next_normal", obj: "pic"} );
	s.on( "click", function ( evt ){

		if ( isHintDisplayed ) 
			return;

		buildStatus++;
		prepareTrack();
		var child = buildingContainer.getChildByName( "doneButton_hitarea" );
		buildingContainer.removeChild( child );
		var child = buildingContainer.getChildByName( "doneButton" );
		buildingContainer.removeChild( child );
	});
	buildingContainer.addChild( s );
};

/* Sets the startPoints for the game */
function setStartPoints(){
	// remove old instruction background
	var oldInstr = backgroundContainer.getChildByName( "instruction_building_1" );
	backgroundContainer.removeChild( oldInstr );
	// set new instruction background
	var instr = drawPicture( "instruction_building_2", new Location(0, 0), w, h, "instruction_building_2", false );
	instr.alpha = 0.4;
	backgroundContainer.addChild( instr );

	
	var finishLine = new Array();

	var shape = new createjs.Shape();
	shape.name = "buildPainting2";
	paintContainer.addChild( shape );

	// set up our defaults:
	var oldX, oldY;
	var paint = false;
	var timedown = 0;
	var timeup = Date.now();

	// add handler for stage mouse events:
	stage.on( "stagemousedown", function( evt ) {

		if ( isHintDisplayed ) 
			return;

		// capture press time
		timedown = Date.now();
		paint = true;
	})                
	
	stage.on( "stagemouseup", function( evt ) {

		if ( isHintDisplayed ) 
			return;

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

    	if ( isHintDisplayed ) 
			return;

		if ( paint ) {
			shape.graphics.beginStroke( COLOR_FINISHLINE )
						  .setStrokeStyle( PAINT_SIZE, "round" )
						  .moveTo( oldX, oldY )
						  .lineTo( evt.stageX, evt.stageY );
			stage.update();
			finishLine.push( game.toLoc( evt.stageX, evt.stageY ));
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	var text = drawPicture( "next_normal", new Location( 1/8*w, 3/4*h ), 0.15*w, 0.1*h, "doneButton", false );
	buildingContainer.addChild( text );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( text.x, text.y, text.width, text.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "doneButton_hitarea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: buildingContainer, target: "doneButton", img: "next_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: buildingContainer, target: "doneButton", img: "next_normal", obj: "pic"} );
	s.on( "click", function ( evt ){
		
		if ( isHintDisplayed ) 
			return;

		if ( game.track.finishLine.length < game.activePlayers.length ){
			displayHint( "Please draw more finish-line points.",HINT_ALERT );
			return;
		}
		buildStatus++;
		
		// XXX: Save track after Building

		prepareTrack();
		var child = buildingContainer.getChildByName( "doneButton_hitarea" );
		buildingContainer.removeChild( child );
		var child = buildingContainer.getChildByName( "doneButton" );
		buildingContainer.removeChild( child );
		
	});
	buildingContainer.addChild( s );
};

/* Sets the player for the game */
function setPlayers(){

	// remove old instruction background
	var oldInstr = backgroundContainer.getChildByName( "instruction_building_2" );
	backgroundContainer.removeChild( oldInstr );
	// set new instruction background
	var instr = drawPicture( "instruction_building_3", new Location(0, 0), w, h, "instruction_building_3", false );
	instr.alpha = 0.4;
	backgroundContainer.addChild( instr );

	finishLineContainer.uncache();
	var max = game.activePlayers.length;
	var no = 0;
	
	for ( var i = 0; i < finishLineContainer.getNumChildren(); i++ ) {
		var child = finishLineContainer.getChildAt( i );
		child.uncache();
		
		child.cursor = "pointer";
		child.on( "mouseover", hover, false, null, {color: COLOR_HOVER, obj: "circle"} );
		child.on( "mouseout", hover, false, null, {color: COLOR_FINISHLINE, obj: "circle"} );
		child.on( "click", function( evt ){

			if ( isHintDisplayed ) 
			return;

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

			no++;
			if ( no == max ){
				for ( var j = 0; j < finishLineContainer.getNumChildren(); j++ ) {
					var ch = finishLineContainer.getChildAt( j );
					ch.removeAllEventListeners();
					// restore Look of FinishLine Point
					ch.graphics.beginFill( COLOR_FINISHLINE ).drawCircle( 0, 0, CIRCLE_SIZE ).endFill();
				}
				// remove old instruction background
				var oldInstr = backgroundContainer.getChildByName( "instruction_building_3" );
				backgroundContainer.removeChild( oldInstr );
				buildStatus++;
				game.calculateTrackPoints();
				// XXX: for creating tracks
				// printArray( game.track.trackBorders, "track.trackBorders" );
				// printArray( game.track.finishLine, "track.finishLine" );
				// printArray( game.track.surrPoints, "track.surrPoints" );
				// printArray( game.track.trackPoints, "track.trackPoints" );
				prepareTrack();
			}
		})
	};
};
// XXX: for creating tracks
// function printArray ( array, name ){
// 	var string = "";
// 	for ( var i = 0; i < array.length; i++ ){
// 		string += name+".push( new Location" + array[i].toString()+");";
// 	}
// 	console.log( string );
// }

/* Colorizes/Displays certain type of the track */
function paintTrack( array, type ){
	var container;
	switch( type ) {
		case 0: 
			container = trackContainer;
			for ( var j = 0; j < array.length; j++ ){
				if ( trackContainer.getChildByName( array[j].x+","+array[j].y ) == null ){
					var circle = drawColoredCircle( COLOR_BORDER, array[j], CIRCLE_SIZE, true );
					circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2,CIRCLE_SIZE*2 );
					trackContainer.addChild( circle );	
				}
			}	
		break;
		case 1: 
			container = trackContainer;
			for ( var j = 0; j < array.length; j++ ){
				var circle = drawColoredCircle( COLOR_SURR, array[j], CIRCLE_SIZE, true );
				circle.alpha = 0.15;
				circle.cache( -CIRCLE_SIZE, -CIRCLE_SIZE, CIRCLE_SIZE*2, CIRCLE_SIZE*2 );
				trackContainer.addChild( circle );
			}	
		break;
		case 2: 
			container = finishLineContainer;
			for ( var j = 0; j < array.length; j++ ){
				if ( finishLineContainer.getChildByName( array[j].x+","+array[j].y ) == null ){
					var circle = drawColoredCircle( COLOR_FINISHLINE, array[j], CIRCLE_SIZE, true );
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
};

/* Displays a hint or menu */
function displayHint( content, type ){

	if ( isHintDisplayed ) 
		return;

	isHintDisplayed = true;
	var g = new createjs.Graphics();
 	g.beginFill("#000000");
 	g.drawRect(0,0,w,h);
 	var shape = new createjs.Shape(g);
 	shape.name = "hintBoxBackground";
 	shape.alpha=0.7;
 	hintContainer.addChild(shape);
 	
 	var hintBox = drawPicture( "hintBox", new Location(w/2-w*0.4/2, h/2-h*0.4/2), w*0.4, h*0.4, "hintBox", false );
 	hintContainer.addChild( hintBox );

 	var hintBoxCloseButton = drawPicture( "cross_normal", new Location(hintBox.x+hintBox.width-w*0.06/2, hintBox.y-h*0.1/2), w*0.06, h*0.1, "hintBoxCloseButton", false );
 	hintContainer.addChild( hintBoxCloseButton );
 	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( hintBoxCloseButton.x, hintBoxCloseButton.y, hintBoxCloseButton.width, hintBoxCloseButton.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "hintBoxCloseButton_hitarea";
	s.cursor = "pointer";
 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxCloseButton", img: "cross_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxCloseButton", img: "cross_normal", obj: "pic"} );
	s.on( "click", function ( evt ){
		isHintDisplayed = false;
		hintContainer.removeAllChildren();
	});
	hintContainer.addChild( s );

	var text = drawText ( content, "hintBoxText", new Location( w/2-w*0.2/2,h/2-h*0.2/2 ), Math.floor(15*w/1000)+"px", "Arial", "black", false, "left", "top" );
 	hintContainer.addChild(text);

	// Add content dependent on type of hint
	if ( type == HINT_MENU || type == HINT_WIN || type == HINT_DRAW){
		var reload = drawPicture( "reload_normal", new Location( hintBox.x+0.333*hintBox.width-w*0.06/2, hintBox.y+0.666*hintBox.height-h*0.1/2 ), w*0.06, h*0.1, "hintBoxReloadButton", false );
		 	hintContainer.addChild( reload );
		 	g = new createjs.Graphics();
			g.beginFill("#f00").drawRect( reload.x, reload.y, reload.width, reload.height ).endFill();
			s = new createjs.Shape( g );
			s.alpha = 0.01;
			s.name = "hintBoxReloadButton_hitarea";
			s.cursor = "pointer";
		 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxReloadButton", img: "reload_hover", obj: "pic"} );
			s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxReloadButton", img: "reload_normal", obj: "pic"} );
			s.on( "click", function ( evt ){
				// XXX: TODO what to do if reload is wanted
				isHintDisplayed = false;
				hintContainer.removeAllChildren();
			});
			hintContainer.addChild( s );
			
			var returnMenu = drawPicture( "return_normal", new Location( hintBox.x+0.666*hintBox.width-w*0.06/2, hintBox.y+0.666*hintBox.height-h*0.1/2 ), w*0.06, h*0.1, "hintBoxReturnButton", false );
		 	hintContainer.addChild( returnMenu );
		 	g = new createjs.Graphics();
			g.beginFill("#f00").drawRect( returnMenu.x, returnMenu.y, returnMenu.width, returnMenu.height ).endFill();
			s = new createjs.Shape( g );
			s.alpha = 0.01;
			s.name = "hintBoxReturnButton_hitarea";
			s.cursor = "pointer";
		 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxReturnButton", img: "return_hover", obj: "pic"} );
			s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxReturnButton", img: "return_normal", obj: "pic"} );
			s.on( "click", function ( evt ){
				// XXX: TODO what to do if return is wanted
				isHintDisplayed = false;
				hintContainer.removeAllChildren();
			});
			hintContainer.addChild( s );
	}
};

/* Detects points that lie on a line between srs and dest */
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
};

/* Caculates the gamepoints in a closed point area */
function detectFilling( loc ){
	game.track.surrPoints.push( loc );
	var radialPoints = game.track.getSurrounding( loc, false );
	for ( var i = 0; i < radialPoints.length; i++ ){
		if ( !game.track.isBorder( radialPoints[i] ) && !game.track.isSurrounding( radialPoints[i] )){
			detectFilling( radialPoints[i] );
		}
	}
};

/* Progresses hover effects */
function hover ( evt, data ){

	if ( isHintDisplayed && !data.target.startsWith("hintBox") ) 
			return;

	var c = evt.currentTarget;
	switch( data.obj ){
		case "circle": c.graphics.beginFill( data.color ).drawCircle( 0, 0, CIRCLE_SIZE ).endFill(); break;
		case "text": c.color = data.color; break;
		case "pic":
			var target = data.container.getChildByName( data.target );
			if ( target == null )
				return;
			target.image = preload.getResult( data.img );
		break;
		default: console.log( "Missing case in hover." ); break;
	}
};

/* Performs a Move of a player */
function doMove(){

	var crntTurn = game.getTurn();

	updateScores();
	
	if ( crntTurn.win ){
		if ( crntTurn.win.length == 0 ){
			displayHint( "Draw Situation", HINT_DRAW );
			return;
		}
		var winningString = "Player" + (crntTurn.win.length > 1 ? "s " : " ");
		for (var i = 0; i < crntTurn.win.length; i++){
			winningString += crntTurn.win[i].no;
			if ( i < crntTurn.win.length-1 ){
				winningString += " and "
			}
		}
		if ( crntTurn.win.length > 1 ){
			winningString += " have ";
		}
		else {
			winningString += " has ";
		}
		winningString += "won.";

		displayHint( winningString, HINT_WIN );
		// XXX: Maybe detection was wrong and therefore game shall continue from here on (so no return statement)
		// XXX: think about consequences and difficulties to implement that...
		// 		XXX: detection from then on on/off?
		// 		XXX: ...?
		// XXX: should only happen IF there are more than one player left
		// XXX: AND if there are choices left (the same as the IF before???)
		return;
	}

	var surr = crntTurn.surrounding;
	// XXX: TODO. Needs to remove temporarily objects that block the choices.
	removeBlockingObjects( surr );
	for ( var i = 0; i < surr.length; i++ ){
		var circle = drawColoredCircle( crntTurn.player.car.color, surr[i], CIRCLE_SIZE, true );
		choiceContainer.addChild( circle );
		circle.on( "click", function( evt ){
			choiceContainer.removeAllChildren();
			var loc = game.toLoc( evt.stageX, evt.stageY );
			updateCars( crntTurn.player, loc, crntTurn.player.getSpeed()+1, 1000, 60 );
			// update addons
			// view.updateAddOns( loc );
			game.turn( loc );
			doMove();
		});
	}
};

// XXX: TODO
/* Removes objects of menu or HUD that blocks the gameplay */
function removeBlockingObjects( surr ){
};
//XXX: TODO
/* Toggles Sound on of */
function toggleSound( evt, data ) {
	// XXX: Maybe not useful...turning of music during hint, why not?
	if ( isHintDisplayed ) 
		return;

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
//XXX: TODO
/* Updates status of AddOns */
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

/* Draws a line */
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

/* Creates a colored circle. */
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

/* Creates a text object. */
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
};

function drawPicture( pic, loc, width, height, name, keepRatio ) {
	var img = preload.getResult( pic );
	var bg = new createjs.Bitmap( img );
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
};

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
//XXX: TODO
function restartGame (){
	// move players from kickedPlayers to activePlayers (mind the order)
	// game.restoreplayers....
	// clear all Players
	// player.initialiizePlayer....
	
	// remove lines

	// start by setplayers.

};
//XXX: TODO
function returnToMenu(){

};
//XXX: TODO
function showTutorial(){

}
