      //      /     //
     //            //
    //      /     //
   // AUTORENNEN //
  //      /     //
 //            //
//      /     //



// Status of Track Preparation used in prepareTrack()
BUILD_BUILD_TRACK  = 0;
BUILD_SET_START  = 1;
BUILD_PLACE_PLAYERS = 2;
BUILD_PREPARE_TURN  = 3;

// Types of Hints
HINT_WIN = 0;
HINT_DRAW = 1;
HINT_MENU = 2;
HINT_ALERT = 3;
HINT_TUTORIAL = 4;

// Circle and paint size used to draw them to the canvas
CIRCLE_SIZE = 6;
PAINT_SIZE = 6;

// HUD SIZE (percentage of width and height
HUD_SIZE = 0.2;
HUD_X_OFFSET = 0.25;
HUD_Y_OFFSET = 0.1;

// Scale factor for cars
SKEW_CARS_MENU = 0.8;
SKEW_CARS_TRACK = 0.5;
SKEW_CARS_HINT = 0.6;

// Color design
COLOR_HOVER 	= "#8B2A18";
COLOR_TRACK 	= "#A6A6A6";
COLOR_BORDER 	= "#8BACBB";
COLOR_FINISHLINE= "#1C63A0";
COLOR_SURR 		= "#575757";
colors 			= ["#4D94B8", "#BF94FF", "#FF4D4D", "#99FF66"];

// Modes
// XXX: Implement this feature (only a checkbox somewhere)
MODE_LOC_HINT = 0;
MODE_NO_LOC_HINT = 1;

// menu related variables
menuCarPositions = [0,0,0,0];
tracks = [];
trackPosition = 0;
tutorialPos = 0;

// Spritesheets for cars and numbers
spriteSheetsCar = [];
spriteSheetNumbers = [];

// other global variables
hidingObjects = [];
isHintDisplayed = false;
mode = MODE_NO_LOC_HINT;


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
		
		var player = game.activePlayers[i];
		var no = player.no;

		// Set carPicture if not the one intended
		var child = HUDScoreContainer.getChildByName( "hud_car_"+no );
		if ( child.no != menuCarPositions[no] ){
			child.spriteSheet = new createjs.SpriteSheet( spriteSheetsCar[menuCarPositions[no]] );
			child.no = menuCarPositions[no];
		}

		var speed, distance;
		try{
			speed = player.getSpeed();
		} catch( err ){
			speed = 0;
		}
		try{
			distance = player.distance;
		} catch( err ){
			distance = 0;
		}
		var slicedSpeed = sliceNumberIntoPieces( Math.ceil( speed ) );
		var slicedDistance = sliceNumberIntoPieces( Math.ceil( distance ) );
		var obj;
		
		// change speed
		obj = HUDScoreContainer.getChildByName( "hud_speed_1_" + no );
		if ( slicedSpeed[1] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedSpeed[1] ));	
		}
		obj = HUDScoreContainer.getChildByName( "hud_speed_2_" + no );
		obj.gotoAndPlay( getNumberString( slicedSpeed[0] == null ? 0: slicedSpeed[0] ));
		
		// change distance
		obj = HUDScoreContainer.getChildByName( "hud_distance_1_" + no );
		if ( slicedDistance[2] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedDistance[2] ));	
		}
		obj = HUDScoreContainer.getChildByName( "hud_distance_2_" + no );
		if ( slicedDistance[1] == null ){
			obj.visible = false;
		} else {
			obj.visible = true;
			obj.gotoAndPlay( getNumberString( slicedDistance[1] ));	
		}
		obj = HUDScoreContainer.getChildByName( "hud_distance_3_" + no );
		obj.gotoAndPlay( getNumberString( slicedSpeed[0] == null ? 0: slicedSpeed[0] ));
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
	
	menuContainer.removeChild( menuContainer.getChildByName("trackname") );

	// sets a position of the current chosen track
	trackPosition = (trackPosition + (data.dir == "right" ? +1 : -1)) % tracks.length;
	if ( trackPosition < 0 ) {
		trackPosition = tracks.length-1; 
	}
	
	game.track = tracks[trackPosition];
	var trackTitle = drawPicture( "trackname_"+game.track.name, new Location( w/2-w*0.3/2,h/2-0.1665*h/2 ), w*0.3, h*0.1, "trackname", true );
	menuContainer.addChild(trackTitle);
	paintTrack( game.track.trackBorders, 0 );
	paintTrack( game.track.surrPoints, 1 );
	paintTrack( game.track.finishLine, 2 );
	paintTrack( game.track.trackPoints, 3 );
};

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
// XXX: Make width and height dependent on width and height
function displayHint( content ){

	if ( isHintDisplayed ) 
		return;

	isHintDisplayed = true;

	// Display Images
	var g = new createjs.Graphics();
 	g.beginFill("#000000");
 	g.drawRect(0,0,w,h);
 	var shape = new createjs.Shape(g);
 	shape.name = "hintBoxBackground";
 	shape.alpha=0.7;
 	hintContainer.addChild(shape);
 	
 	var hintBox;
 	if (content.type == HINT_TUTORIAL){
 		hintBox = drawPicture( "hintBox", new Location(w/2-w*0.8/2, h/2-h*0.8/2), w*0.8, h*0.8, "hintBox", false );
 	} else {
	 	hintBox = drawPicture( "hintBox", new Location(w/2-w*0.4/2, h/2-h*0.4/2), w*0.4, h*0.4, "hintBox", false );
	}
	hintContainer.addChild( hintBox );

 	var hintBoxCloseButton = drawPicture( "cross_normal", new Location(hintBox.x+hintBox.width-w*0.06/2, hintBox.y-h*0.1/2), w*0.06, h*0.1, "hintBoxCloseButton", false );
 	hintContainer.addChild( hintBoxCloseButton );
 	g = new createjs.Graphics();
	g.beginFill("#f00").drawRect( hintBoxCloseButton.x, hintBoxCloseButton.y, hintBoxCloseButton.width, hintBoxCloseButton.height ).endFill();
	s = new createjs.Shape( g );
	s.alpha = 0.01;
	s.name = "hintBoxCloseButton_hitarea";
	s.cursor = "pointer";
 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxCloseButton", img: "cross_hover", obj: "sprite"} );
	s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxCloseButton", img: "cross_normal", obj: "sprite"} );
	s.on( "click", function ( evt ){
		isHintDisplayed = false;
		hintContainer.removeAllChildren();
	});
	hintContainer.addChild( s );

	// Add content dependent on type of hint
	if ( content.type == HINT_MENU || content.type == HINT_WIN || content.type == HINT_DRAW){
		var reload = drawPicture( "reload_normal", new Location( hintBox.x+0.333*hintBox.width-w*0.06/2, hintBox.y+0.5*hintBox.height-h*0.1/2 ), w*0.06, h*0.1, "hintBoxReloadButton", false );
	 	hintContainer.addChild( reload );
	 	g = new createjs.Graphics();
		g.beginFill("#f00").drawRect( reload.x, reload.y, reload.width, reload.height ).endFill();
		var s = new createjs.Shape( g );
		s.alpha = 0.01;
		s.name = "hintBoxReloadButton_hitarea";
		s.cursor = "pointer";
	 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxReloadButton", img: "reload_hover", obj: "sprite"} );
		s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxReloadButton", img: "reload_normal", obj: "sprite"} );
		s.on( "click", function ( evt ){
			isHintDisplayed = false;
			hintContainer.removeAllChildren();
			restartGame();
		});
		hintContainer.addChild( s );
		var reload = drawPicture( "restartGame", new Location( hintBox.x+0.333*hintBox.width-w*0.1/2, hintBox.y+0.7*hintBox.height-h*0.05/2 ), w*0.1, h*0.05, "hintBoxReloadLabel", false );
	 	hintContainer.addChild( reload );
		
		var returnMenu = drawPicture( "return_normal", new Location( hintBox.x+0.666*hintBox.width-w*0.06/2, hintBox.y+0.5*hintBox.height-h*0.1/2 ), w*0.06, h*0.1, "hintBoxReturnButton", false );
	 	hintContainer.addChild( returnMenu );
	 	g = new createjs.Graphics();
		g.beginFill("#f00").drawRect( returnMenu.x, returnMenu.y, returnMenu.width, returnMenu.height ).endFill();
		s = new createjs.Shape( g );
		s.alpha = 0.01;
		s.name = "hintBoxReturnButton_hitarea";
		s.cursor = "pointer";
	 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxReturnButton", img: "return_hover", obj: "sprite"} );
		s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxReturnButton", img: "return_normal", obj: "sprite"} );
		s.on( "click", function ( evt ){
			isHintDisplayed = false;
			hintContainer.removeAllChildren();
			returnToMenu();
		});
		hintContainer.addChild( s );
		var returnMenu = drawPicture( "gotoMenu", new Location( hintBox.x+0.666*hintBox.width-w*0.1/2, hintBox.y+0.7*hintBox.height-h*0.05/2 ), w*0.1, h*0.05, "hintBoxReturnLabel", false );
	 	hintContainer.addChild( returnMenu );
	}

	// Display Texts
	switch( content.type ){
		case HINT_ALERT: 
 			var text = drawPicture( content.text, new Location( hintBox.x+0.5*hintBox.width-w*0.25/2, hintBox.y+hintBox.height/2-h*0.05 ), w*0.25, h*0.05, "hintBoxText", false );
			hintContainer.addChild( text );
		break;
		case HINT_DRAW: 
			var text = drawPicture( "draw", new Location( hintBox.x+0.5*hintBox.width-w*0.1/2, hintBox.y+0.15*hintBox.height ), w*0.1, h*0.05, "hintBoxText", false );
			hintContainer.addChild( text );
		break;
		case HINT_WIN: 
			// initialize singular texts
			var player = "player";
			var win = "wins";
			if ( content.winner.length > 1 ){
				player += "s";
				win = "win";
			}

			var text = drawPicture( player, new Location( hintBox.x+0.5*hintBox.width-w*0.07-content.winner.length*w*0.05/2, hintBox.y+0.2*hintBox.height ), w*0.07, h*0.05, "hintBoxTextPlayer", false );
			hintContainer.addChild( text );
			var text = drawPicture( win, new Location( hintBox.x+0.5*hintBox.width+content.winner.length*w*0.06/2, hintBox.y+0.15*hintBox.height ), w*0.05, h*0.05, "hintBoxTextWin", false );
			hintContainer.addChild( text );

			// Add picture of winnercars
			for ( var i = 0; i < content.winner.length; i++ ){
				var no = content.winner[i].no;
				var spriteSheet = new createjs.SpriteSheet( spriteSheetsCar[menuCarPositions[no]] );
				var car = new createjs.Sprite( spriteSheet, "move" );
				car.name = "hintBoxCar_" + no;
				car.scaleX = SKEW_CARS_HINT;
				car.scaleY = SKEW_CARS_HINT;
				car.visible = true;
				var bounds = car.spriteSheet.getFrameBounds(0);
				car.x = hintBox.x+0.5*hintBox.width-content.winner.length*w*0.05/2+i*0.05*w;
				car.y = hintBox.y+0.15*hintBox.height;
				hintContainer.addChild( car );
			}
			return;
		break;
		case HINT_MENU:
			// XXX: Add checkbox
			return;
		case HINT_TUTORIAL:
			tutorialPos = 0;
			var tutorial = drawPicture( "tutorial_0", new Location( hintBox.x+0.2*hintBox.width/2, hintBox.y ), 0.8*hintBox.width, 0.8*hintBox.height, "hintBoxTutorial", false );
	 		hintContainer.addChild( tutorial );

 			var spriteSheet = new createjs.SpriteSheet( spriteSheetNumbers );
	 		var no = new createjs.Sprite( spriteSheet, getNumberString( tutorialPos+1 ) );
	 		no.name = "hintBoxTutorialNumber";
	 		no.x = hintBox.x+hintBox.width*0.1;
	 		no.y = hintBox.y+hintBox.height-hintBox.height*0.25;
	 		hintContainer.addChild( no );

	 		var left = drawPicture( "left_normal", new Location( hintBox.x+0.05*hintBox.width, hintBox.y+hintBox.height*0.1 ), 0.05*hintBox.width, 0.1*hintBox.height, "hintBoxTutorialLeft", false );
	 		hintContainer.addChild( left );
	 		g = new createjs.Graphics();
	 		g.beginFill("#f00").drawRect( left.x, left.y, left.width, left.height ).endFill();
			s = new createjs.Shape( g );
			s.alpha = 0.01;
			s.name = "hintBoxTutorialLeft_hitarea";
			s.cursor = "pointer";
		 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxTutorialLeft", img: "left_hover", obj: "sprite"} );
			s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxTutorialLeft", img: "left_normal", obj: "sprite"} );
			s.on( "click", function ( evt ){
				var child = hintContainer.getChildByName( "hintBoxTutorial" );
				hintContainer.removeChild( child );
				tutorialPos = ((tutorialPos+4)-1)%4;
				var newTut = drawPicture( "tutorial_"+tutorialPos, new Location( hintBox.x+0.2*hintBox.width/2, hintBox.y ), 0.8*hintBox.width, 0.8*hintBox.height, "hintBoxTutorial", false );
	 			hintContainer.addChild( newTut );
	 			var no = hintContainer.getChildByName( "hintBoxTutorialNumber" );
	 			no.gotoAndPlay( getNumberString( tutorialPos+1 ));
			});
			hintContainer.addChild( s );

	 		var right = drawPicture( "right_normal", new Location( hintBox.x+hintBox.width-0.1*hintBox.width, hintBox.y+hintBox.height*0.1 ), 0.05*hintBox.width, 0.1*hintBox.height, "hintBoxTutorialRight", false );
	 		hintContainer.addChild( right );
	 		g = new createjs.Graphics();
	 		g.beginFill("#f00").drawRect( right.x, right.y, right.width, right.height ).endFill();
			s = new createjs.Shape( g );
			s.alpha = 0.01;
			s.name = "hintBoxTutorialRight_hitarea";
			s.cursor = "pointer";
		 	s.on( "mouseover", hover, false, null, {container: hintContainer, target: "hintBoxTutorialRight", img: "right_hover", obj: "sprite"} );
			s.on( "mouseout", hover, false, null, {container: hintContainer, target: "hintBoxTutorialRight", img: "right_normal", obj: "sprite"} );
			s.on( "click", function ( evt ){
				var child = hintContainer.getChildByName( "hintBoxTutorial" );
				hintContainer.removeChild( child );
				tutorialPos = (tutorialPos+1)%4;
				var newTut = drawPicture( "tutorial_"+tutorialPos, new Location( hintBox.x+0.2*hintBox.width/2, hintBox.y ), 0.8*hintBox.width, 0.8*hintBox.height, "hintBoxTutorial", false );
	 			hintContainer.addChild( newTut );
	 			var no = hintContainer.getChildByName( "hintBoxTutorialNumber" );
	 			no.gotoAndPlay( getNumberString( tutorialPos+1 ));
			});
			hintContainer.addChild( s );

	 		// XXX: Add left and/or right button
			return;
		break;
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

/* Progresses hover effects */
function hover ( evt, data ){
	if ( isHintDisplayed && !data.target.startsWith("hintBox") ) 
		return;

	var c = evt.currentTarget;
	switch( data.obj ){
		case "choiceCircle": 
			if ( data.type == "add" && !choiceContainer.getChildByName( "choiceLine" ) && data.srcL ){
				
				if ( mode = MODE_LOC_HINT ){
					var nextLoc = data.destL.getMove( data.srcL );	
				}else{
					var nextLoc = data.destL
				}

				var line = drawLine( 2, data.srcL, nextLoc, data.color );
				line.name = "choiceLine";
				choiceContainer.addChild( line );
			}
			if (data.type == "removal" ){
				var child = choiceContainer.getChildByName( "choiceLine" );
				choiceContainer.removeChild( child );
			}
			

		case "circle": c.graphics.beginFill( data.color ).drawCircle( 0, 0, CIRCLE_SIZE ).endFill(); break;
		case "text": c.color = data.color; break;
		case "pic":
			var target = data.container.getChildByName( data.target );
			if ( target == null )
				return;
			target.image = preload.getResult( data.img );
		break;
		case "sprite":
			var target = data.container.getChildByName( data.target );
			if (target == null ){
				return;
			}
			target.gotoAndPlay( data.img );
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
			var content = {};
			content.type = HINT_DRAW;
			displayHint( content );
			return;
		}

		var content = {};
		content.type = HINT_WIN;
		content.winner = [];
		for (var i = 0; i < crntTurn.win.length; i++){
			content.winner.push( crntTurn.win[i] );
		}

		displayHint( content );
		return;
	}

	var surr = crntTurn.surrounding;
	
	removeBlockingObjects( surr );
	for ( var i = 0; i < surr.length; i++ ){
		var player = crntTurn.player;
		var circle = drawColoredCircle( player.color, surr[i], CIRCLE_SIZE, true );
		circle.cursor = "pointer";
		circle.on( "mouseover", hover, false, null, {color: crntTurn.player.color, obj: "choiceCircle", type: "add", srcL:player.crntLoc(), destL: surr[i]} );
		circle.on( "mouseout", hover, false, null, {color: crntTurn.player.color, obj: "choiceCircle", type: "removal"} );

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

/* Removes objects of menu or HUD that blocks the gameplay */
function removeBlockingObjects( surr ){

	// unhide previous hidden objects and clear array
	for ( var i = 0; i < hidingObjects.length; i++ ){
		hidingObjects[i].visible = true;
	}
	hidingObjects.length = 0;

	
	var objects = [];
	for ( var i = 0; i < surr.length; i++ ){

		// check wether there is a HUD blocking the view
		if ( isHUDUnderPoint( surr[i] ) ){
			hidingObjects.push( HUDContainer );
			hidingObjects.push( HUDScoreContainer );
		}

		// XXX: Only working with easeljs 0.7.1 since in 0.8.0 it produces a security problem
		// XXX: Only handing back objects with mouseevents...
		var arr = stage.getObjectsUnderPoint( game.toXCoord( surr[i] ), game.toYCoord( surr[i] ));

		for ( var j = 0; j < arr.length; j++ ){
			objects.push( arr[j] );	
		}
		arr.length = 0;
	}

	var seen = false;
	for ( var i = 0; i < objects.length; i++ ){

		for ( var j = 0; j < hidingObjects.length; j++ ){
			if ( objects[i] === hidingObjects[j] ){
				seen = true;
			}
		}
		if ( !seen ){
			hidingObjects.push( objects[i] );
		}
	}


	// hide these objects
	for ( var i = 0; i < hidingObjects.length; i++ ){
		hidingObjects[i].visible = false;
		try{
			hidingObjects[i].parent.visible = false;
			hidingObjects.push( hidingObjects[i].parent );
		}catch( err ){
			console.log( "There is no parent here..." );
		}
	}

};
/* Checks wether there is a display element blocking the view */
function isHUDUnderPoint( loc ){

	var x = game.toXCoord( loc );
	var y = game.toYCoord( loc );
	// HUD top left
	if ( x > 0 && x < w*HUD_SIZE
	     && y > 0 && y < h*HUD_SIZE ){
		return true;
	}
	// HUD top right
	if ( x > w-w*HUD_SIZE && x < w
	     && y > 0 && y < h*HUD_SIZE ){
		return true;
	}
	// HUD bottom left
	if ( x > 0 && x < w*HUD_SIZE
	     && y > h-h*HUD_SIZE && y < h ){
		return true;
	}
	// HUD bottom right
	if ( x > w-w*HUD_SIZE && x < w
	     && y > h-h*HUD_SIZE && y < h ){
		return true;
	}

	return false;
}

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
		hitArea.on( "mouseover", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_hover", obj: "sprite"} );
		hitArea.on( "mouseout", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_on_normal", obj: "sprite"} );
		hitArea.on( "click" , toggleSound, false, null, {on: false});
		// XXX: TODO Toggle sound
	} else {
		pic.image = preload.getResult( "music_off_normal" );
		hitArea.on( "mouseover", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_off_hover", obj: "sprite"} );
		hitArea.on( "mouseout", hover, false, null, {container: HUDContainer, target: "music_toggle", img: "music_off_normal", obj: "sprite"} );
		hitArea.on( "click" , toggleSound, false, null, {on: true});
		// XXX: TODO Toggle sound
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

function drawPicture( pic, loc, width, height, name, keepRatio ) {
	var img = preload.getResult( pic );
	var bg = new createjs.Bitmap( img );
	if ( bg.image == null ){
		var spriteSheet;
		if (pic in trySpritesheet.animations){
			spriteSheet = new createjs.SpriteSheet( trySpritesheet );
		} else {
			console.log( pic );
		}
		bg = new createjs.Sprite ( spriteSheet,pic );
	}
    bg.name = name;
    bg.x = loc.x;
    bg.y = loc.y;
    var bounds = bg.getBounds();

    if ( keepRatio ){
    	bg.scaleX = width/bounds.width;
    	bg.scaleY = getNewScaleY( width, bounds.width, bounds.height );
    } else {
	    bg.scaleX = width/bounds.width;
	    bg.scaleY = height/bounds.height;
	}
	try{
		bg.width = bounds.width*bg.scaleX;
    	bg.height = bounds.height*bg.scaleY;	
	} catch( e ){
		console.log (e);
	}
	
    return bg;
};

function getNewScaleY( newWidth, oldWidth, oldHeight ){
	var ratio = oldWidth/oldHeight;
	var scaleX = newWidth/oldWidth;
	return oldWidth * scaleX * (1/(ratio*oldHeight));
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
  	var line = drawLine( 2, player.crntLoc(), l, player.color );
  	lineContainer.addChild( line );
};

function restartGame (){

	// remove all choices
	choiceContainer.removeAllChildren();

	// move players from kickedPlayers to activePlayers (mind the order)
	game.restoreKickedPlayers();
	
	// clear all Players
	for ( var i = 0; i < game.activePlayers.length; i++ ){
		game.activePlayers[i].initializePlayer();
	}
	
	// remove lines
	lineContainer.removeAllChildren();
	
	// // remove cars
	for ( var i = 0; i < game.activePlayers.length; i++ ){
		var no = game.activePlayers[i].no;
		var car = playerContainer.getChildByName( "car_"+no );
		car.visible = false;
	}

	// XXX: TODO remove Addons

	// restore HUD
	updateScores();

	// start at setplayers
	buildStatus = BUILD_PLACE_PLAYERS;
	prepareTrack();
};

function returnToMenu(){

	// Remove all playerdata
	game.activePlayers.length = 0;
	game.players.length = 0;
	game.kickedPlayers.length = 0;

	// remove lines
	lineContainer.removeAllChildren();

	// remove all cars from track
	playerContainer.removeAllChildren();

	// remove all choices
	choiceContainer.removeAllChildren();

	// XXX: TODO remove Addons

	// updateScores and hide them
	updateScores();
	HUDScoreContainer.visible = false;

	// make all Huds visible
	for ( var i = 0; i < 4; i++ ){
		var hud = HUDContainer.getChildByName( "hud" + i );
		hud.visible = true;
	}

	// display menu
	menuContainer.visible = true;
};
