      //      /     //
     //            //
    //      /     //
   // AUTORENNEN //
  //      /     //
 //            //
//      /     //


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
	{ src:"img/autorennen_header.png", 		id:"header" },
	{ src:"img/back_header.png", 			id:"back_header" },
	{ src:"img/back_name.png", 				id:"back_name" },
	{ src:"img/background.png", 			id:"background" },
	// { src:"img/circle_finish_1.png", 		id:"circle_finish_1" },
	// { src:"img/circle_finish_2.png", 		id:"circle_finish_2" },
	// { src:"img/circle_normal_1.png", 		id:"circle_normal_1" },
	// { src:"img/circle_normal_2.png", 		id:"circle_normal_2" },
	// { src:"img/circle_normal_3.png", 		id:"circle_normal_3" },
	// { src:"img/circle_normal_4.png", 		id:"circle_normal_4" },
	// { src:"img/checkbox_blank.png",			id:"checkbox_blank" },
	// { src:"img/checkbox_checked.png", 		id:"checkbox_checked" },
	{ src:"img/chooseCars.png", 			id:"chooseCars" },
	{ src:"img/continue_normal.png", 		id:"continue_normal" },
	{ src:"img/continue_hover.png", 		id:"continue_hover" },
	{ src:"img/cross_normal.png", 			id:"cross_normal" },
	{ src:"img/cross_hover.png", 			id:"cross_hover" },
	{ src:"img/draw.png", 					id:"draw" },
	{ src:"img/easyMode.png", 				id:"easyMode" },
	{ src:"img/gotoMenu.png", 				id:"gotoMenu" },
	{ src:"img/hintBox.png", 				id:"hintBox" },
	{ src:"img/hud_le_to.png", 				id:"hud0" },
	{ src:"img/hud_ri_to.png", 				id:"hud1" },
	{ src:"img/hud_le_bo.png", 				id:"hud2" },
	{ src:"img/hud_ri_bo.png", 				id:"hud3" },
	{ src:"img/instruction_building_1.png",	id:"instruction_building_1" },
	{ src:"img/instruction_building_2.png",	id:"instruction_building_2" },
	{ src:"img/instruction_building_3.png",	id:"instruction_building_3" },
	{ src:"img/kilometer.png", 				id:"kilometer" },
	{ src:"img/left_hover.png", 			id:"left_hover" },
	{ src:"img/left_normal.png", 			id:"left_normal" },
	{ src:"img/meter.png", 					id:"meter" },
	{ src:"img/menu_hover.png",				id:"menu_hover" },
	{ src:"img/menu_normal.png",			id:"menu_normal" },
	{ src:"img/moreFinishLine.png",			id:"moreFinishLine" },
	{ src:"img/music_off_hover.png", 		id:"music_off_hover" },
	{ src:"img/music_off_normal.png", 		id:"music_off_normal" },
	{ src:"img/music_on_hover.png", 		id:"music_on_hover" },
	{ src:"img/music_on_normal.png", 		id:"music_on_normal" },
	{ src:"img/next_hover.png", 			id:"next_hover" },
	{ src:"img/next_normal.png", 			id:"next_normal" },
	{ src:"img/numbers.png", 				id:"numbers" },
	{ src:"img/play_hover.png", 			id:"play_hover" },
	{ src:"img/play_normal.png", 			id:"play_normal" },
	{ src:"img/player.png", 				id:"player" },
	{ src:"img/players.png", 				id:"players" },
	{ src:"img/question_hover.png",			id:"question_hover" },
	{ src:"img/question_normal.png",		id:"question_normal" },
	{ src:"img/reload_hover.png", 			id:"reload_hover" },
	{ src:"img/reload_normal.png", 			id:"reload_normal" },
	{ src:"img/restartGame.png", 			id:"restartGame" },
	{ src:"img/return_hover.png", 			id:"return_hover" },
	{ src:"img/return_normal.png", 			id:"return_normal" },
	{ src:"img/right_hover.png", 			id:"right_hover" },
	{ src:"img/right_normal.png", 			id:"right_normal" },
	{ src:"img/sprite_car_1.png", 			id:"sprite_car_1" },
	{ src:"img/sprite_car_2.png", 			id:"sprite_car_2" },
	{ src:"img/sprite_car_3.png", 			id:"sprite_car_3" },
	{ src:"img/sprite_car_4.png", 			id:"sprite_car_4" },
	{ src:"img/sprite_none.png", 			id:"sprite_none" },
	{ src:"img/trackname_doodoo.png", 		id:"trackname_doodoo" },
	{ src:"img/trackname_drag.png", 		id:"trackname_drag" },
	{ src:"img/trackname_lummerland.png", 	id:"trackname_lummerland" },
	{ src:"img/trackname_own.png", 			id:"trackname_own" },
	{ src:"img/trackname_spaceship.png", 	id:"trackname_spaceship" },
	{ src:"img/trackname_wiring.png", 		id:"trackname_wiring" }
	{ src:"img/tutorial_0.png", 			id:"tutorial_0" },
	{ src:"img/tutorial_1.png", 			id:"tutorial_1" },
	{ src:"img/tutorial_2.png", 			id:"tutorial_2" },
	{ src:"img/tutorial_3.png",				id:"tutorial_3" },
	{ src:"img/win.png", 					id:"win" },
	{ src:"img/wins.png", 					id:"wins" },
];



/* Method that is called initially on pageload */
function init() {

	/* **************** */
	/* GLOBAL VARIABLES */
	/* **************** */

	stage = new createjs.Stage( "board" );
	stage.enableMouseOver();
	
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
	// Scores that are displayed in the HUD
	HUDScoreContainer = new createjs.Container();
	stage.addChildAt( HUDScoreContainer, 9 );
	// MenuObjects
	menuContainer = new createjs.Container();
	stage.addChildAt( menuContainer, 10 );
	// contains button for painting
	buildingContainer = new createjs.Container();
	stage.addChildAt( buildingContainer, 11 );
	// contains objects for displaying an error or menu
	hintContainer = new createjs.Container();
	stage.addChildAt( hintContainer, 12 );

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
	// XXX: No music here right now...
	// obj = drawPicture( "music_on_normal", new Location(w-w*0.07, h*HUD_SIZE), w*0.07, -1, "music_toggle", true );
	// HUDContainer.addChild( obj );
	// g = new createjs.Graphics();
	// g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	// s = new createjs.Shape( g );
	// s.alpha = 0.01;
	// s.name = "music_toggle_hitArea";
	// s.cursor = "pointer";
	// s.on( "mouseover", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_hover", obj: "pic"} );
	// s.on( "mouseout", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_normal", obj: "pic"} );
	// s.on( "click" , toggleSound, false, null, {img: "music_off_normal"});
	// HUDContainer.addChild( s );

	// display Tutorial
	obj = drawPicture( "question_normal", new Location(w-w*0.07, h*HUD_SIZE), w*0.07, -1, "tutorialButton", true );
	HUDContainer.addChild( obj );
	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( obj.x, obj.y, obj.width, obj.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "tutorialButton_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: HUDContainer, target: "tutorialButton", img: "question_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: HUDContainer, target: "tutorialButton", img: "question_normal", obj: "pic"} );
	s.on( "click" , function( evt ){
		var content = {};
		content.type = HINT_TUTORIAL;
		displayHint( content )
	});	
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
			var content = {};
			content.type = HINT_ALERT;
			content.text = "chooseCars";
			displayHint( content );
			return;
		}

		// prepare everything
		var visibility;
		for (var i = 0; i < menuCarPositions.length; i++){
			
			if (menuCarPositions[i] != 0){
				color = colors[i];
				var player = new Player( color, i );
				game.activePlayers.push( player );
				game.players.push( player );
				visibility = true;
			} else {
				visibility = false;
			}

			HUDContainer.getChildByName("hud"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_speed_1_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_speed_2_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_distance_1_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_distance_2_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_distance_3_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_meter_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_kilometer_"+i).visible = visibility;
			HUDScoreContainer.getChildByName("hud_car_"+i).visible = visibility;
		}

		// if own is chosen set trackstatus to building, else to placing.
		if ( trackPosition == 0 ){
			buildStatus = BUILD_BUILD_TRACK;
		} else {
			buildStatus = BUILD_PLACE_PLAYERS;
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
		frames: {width:691/8, height:70},
		animations: {"move":[0,7], "hold":[0]},
		framerate: 10
 	});
 	spriteSheetsCar.push({
		images: [preload.getResult( "sprite_car_3" )],
		frames: {width:292/3, height:88},
		animations: {"move":[0,2], "hold":[0]},
		framerate: 7
 	});
 	spriteSheetsCar.push({
		images: [preload.getResult( "sprite_car_4" )],
		frames: {width:358/4, height:90},
		animations: {"move":[0,3], "hold":[0]},
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

	HUDScoreContainer.visible = false;

	for ( var i = 0; i < 4; i++ ) {
		var parent = HUDContainer.getChildByName( "hud"+i );
		var loc;
		var widthScores = parent.width*3/8;
		var heightScores = parent.height*2/5;
		switch( i ){
			case 0: loc = new Location( parent.x + parent.width*HUD_X_OFFSET, parent.y + parent.height*HUD_Y_OFFSET); break;
			case 1: loc = new Location( parent.x + parent.width - widthScores - parent.width*HUD_X_OFFSET, parent.y + parent.height*HUD_Y_OFFSET ); break;
			case 2: loc = new Location( parent.x + parent.width*HUD_X_OFFSET, parent.y + parent.height - parent.height*HUD_Y_OFFSET - heightScores ); break;
			case 3: loc = new Location( parent.x + parent.width - widthScores - parent.width*HUD_X_OFFSET, parent.y + parent.height - parent.height*HUD_Y_OFFSET - heightScores ); break;
		}
		
		// XXX: Add average speed
		// XXX: Create/change number methoden schreiben um auszulagern...
		var obj, pic;
		var spriteSheet = new createjs.SpriteSheet( spriteSheetNumbers );
		// speed 1:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_speed_1_"+i;
		obj.x = loc.x;
		obj.y = loc.y;
		HUDScoreContainer.addChild( obj );
		// speed 2:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_speed_2_"+i;
		obj.x = loc.x + obj.spriteSheet._frameWidth*4/5;
		obj.y = loc.y;
		HUDScoreContainer.addChild( obj );
		// Kilometer
		loc.x += obj.spriteSheet._frameWidth*2;
		pic = drawPicture( "kilometer", loc, w*0.05, -1, "hud_kilometer_"+i, true );
		HUDScoreContainer.addChild( pic );
		loc.x -= obj.spriteSheet._frameWidth*2;

		// distance 1:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_distance_1_"+i;
		obj.x = loc.x - obj.spriteSheet._frameWidth * 4/5;
		obj.y = loc.y + obj.spriteSheet._frameHeight;
		HUDScoreContainer.addChild( obj );
		// distance 2:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_distance_2_"+i;
		obj.x = loc.x;
		obj.y = loc.y + obj.spriteSheet._frameHeight;
		HUDScoreContainer.addChild( obj );
		// distance 3:
	 	obj = new createjs.Sprite( spriteSheet, getNumberString( 0 ) );
	 	obj.name = "hud_distance_3_"+i;
		obj.x = loc.x + obj.spriteSheet._frameWidth * 4/5;
		obj.y = loc.y + obj.spriteSheet._frameHeight;
		HUDScoreContainer.addChild( obj );
		// Meter
		loc.x += obj.spriteSheet._frameWidth*2;
		loc.y += obj.spriteSheet._frameHeight;
		pic = drawPicture( "meter", loc, w*0.025, -1, "hud_meter_"+i, true );
		HUDScoreContainer.addChild( pic );
		loc.x -= obj.spriteSheet._frameWidth*2;
		loc.y -= obj.spriteSheet._frameHeight;
	};
	
	// XXX: Make coordinates dependent on HUD Sizes/positions
	var spriteSheet = new createjs.SpriteSheet(spriteSheetsCar[0]);
	var animation = new createjs.Sprite(spriteSheet, "move" );
	animation.name = "hud_car_0";
	animation.no = 0;
	animation.x = w*0.06;
	animation.y = 0.1*h;
	animation.scaleX = SKEW_CARS_TRACK*w/1000;
	animation.scaleY = SKEW_CARS_TRACK*h/600;
	HUDScoreContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "hud_car_1";
	animation.no = 0;
	animation.scaleX = SKEW_CARS_TRACK*w/1000;
	animation.scaleY = SKEW_CARS_TRACK*h/600;
	animation.x = w-w*0.06-w*0.06;
	animation.y = 0.1*h;
	HUDScoreContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "hud_car_2";
	animation.no = 0;
	animation.x = w*0.06;
	animation.y = h-0.09*h-0.0833*h;
	animation.scaleX = SKEW_CARS_TRACK*w/1000;
	animation.scaleY = SKEW_CARS_TRACK*h/600;
	HUDScoreContainer.addChild(animation);

	animation = new createjs.Sprite(spriteSheet, "move");
	animation.name = "hud_car_3";
	animation.no = 0;
	animation.x = w-w*0.06-w*0.06;
	animation.y = h-0.09*h-0.0833*h;
	animation.scaleX = SKEW_CARS_TRACK*w/1000;
	animation.scaleY = SKEW_CARS_TRACK*h/600;
	HUDScoreContainer.addChild(animation);


	// add menu button
	var menuButton = drawPicture( "menu_normal", new Location(w-2*w*0.07, h*HUD_SIZE), w*0.07, -1, "menuButton", true );
	HUDScoreContainer.addChild( menuButton );

	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( menuButton.x, menuButton.y, menuButton.width, menuButton.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "menuButton_hitArea";
	s.cursor = "pointer";
	s.on( "mouseover", hover, false, null, {container: HUDScoreContainer, target: "menuButton", img: "menu_hover", obj: "pic"} );
	s.on( "mouseout", hover, false, null, {container: HUDScoreContainer, target: "menuButton", img: "menu_normal", obj: "pic"} );
	s.on( "click" , function( evt ){
		var content = {};
		content.type = HINT_MENU;
		displayHint( content );
	});
	HUDScoreContainer.addChild( s );
};