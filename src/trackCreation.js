      //      /     //
     //            //
    //      /     //
   // AUTORENNEN //
  //      /     //
 //            //
//      /     //

/* Control method for track building */
function prepareTrack(){
	menuContainer.visible = false;
	stage.removeAllEventListeners();
	finishLineContainer.removeAllEventListeners();
	// hide scores
	HUDContainer.visible = false;
	HUDScoreContainer.visible = false;

	switch( buildStatus ){
		case BUILD_BUILD_TRACK:
			buildTrack();
		break;
		case BUILD_SET_START:
			setStartPoints();
		break;
		case BUILD_PLACE_PLAYERS:
			paintContainer.removeAllChildren();
			// Determine Locations of players
			setPlayers();
		break;
		case BUILD_PREPARE_TURN:
			HUDContainer.visible = true;
			HUDScoreContainer.visible = true;
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
			var content = {};
			content.type = HINT_ALERT;
			content.text = "moreFinishLine";
			displayHint( content );
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

			var playerNumber = game.activePlayers[no].no;
			var car = playerContainer.getChildByName( "car_"+playerNumber );
			if ( !car ){
				var spriteSheet = new createjs.SpriteSheet( spriteSheetsCar[menuCarPositions[playerNumber]] );
				var car = new createjs.Sprite( spriteSheet, "move" );
				car.name = "car_"+game.activePlayers[no].no;
				playerContainer.addChild( car );
			}
			
			car.scaleX = SKEW_CARS_TRACK;
			car.scaleY = SKEW_CARS_TRACK;
			car.visible = true;
			var bounds = car.spriteSheet.getFrameBounds(0);
			car.x = game.toXCoord(loc)-bounds.width*car.scaleX/2;
			car.y = game.toYCoord(loc)-bounds.height*car.scaleY/2;

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