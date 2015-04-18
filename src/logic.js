/* ################## */
/* ####### CAR ###### */
/* ################## */

// XXX: remove car
var Car = function( typ, col ){
	/* Type of Car */
	this.type = typ;
	/* Color of Car */
	this.color = col;
}


/* ################## */
/* #### LOCATION #### */
/* ################## */

var Location = function( x, y, addOn ){
	this.x = x;
	this.y = y;
	this.addOn = addOn;
}

var Location = function( x, y ){
	this.x = x;
	this.y = y;
	this.addOn = this.NONE;
}

Location.prototype.NEGNOOFITEMS = -6;

Location.prototype.NONE = 0;
Location.prototype.DIZZY = 1;
Location.prototype.OTHERSDIZZY = 2;
Location.prototype.SUPERFAST = 3;
Location.prototype.OTHERSSUPERFAST = 4;
Location.prototype.ELEGANT = 5;
Location.prototype.OTHERSELEGANT = 6;

Location.prototype.assignRandomItem = function() {
	loc.addOn = Math.floor(( Math.random() * loc.NEGNOOFITEMS * -1 ) + 1 );
};

Location.prototype.getMove = function( lastLoc ) {
	if ( this.addOn == this.NONE ){
		// TODO
	}
	if ( this.addOn == this.SUPERFAST ){
		// TODO
	}
	var newX = this.x + ( this.x - lastLoc.x );
	var newY = this.y + ( this.y - lastLoc.y );
	return new Location( newX, newY );
};

Location.prototype.distanceTo = function( loc ) {
	var diffX = this.x - loc.x;
	var diffY = this.y - loc.y;
	return Math.sqrt( diffX * diffX + diffY * diffY );
};

Location.prototype.equals = function( loc ) {
	if ( this.x == loc.x && this.y == loc.y ){
		return true;
	}

	return false;
};

Location.prototype.getRawSurrounding = function() {
	var surr = new Array();
	if ( this.addOn == this.NONE ){
		// TODO
	}
	if ( this.addOn == this.DIZZY ){
		// TODO
	}
	if ( this.addOn == this.ELEGANT ){
		// TODO
	}
	surr.push( new Location( this.x  , this.y   ));
	surr.push( new Location( this.x-1, this.y   ));
	surr.push( new Location( this.x-1, this.y+1 ));
	surr.push( new Location( this.x  , this.y+1 ));
	surr.push( new Location( this.x+1, this.y+1 ));
	surr.push( new Location( this.x+1, this.y   ));
	surr.push( new Location( this.x+1, this.y-1 ));
	surr.push( new Location( this.x  , this.y-1 ));
	surr.push( new Location( this.x-1, this.y-1 ));
	return surr;
};

Location.prototype.isNeighbor = function( loc ){
	if ( -1 >= ( this.x - loc.x ) || (this.x - loc.x ) <= 1
			&&
			-1 >= ( this.y - loc.y ) || ( this.y - loc.y ) <= 1 ){
		return true;
	}

	return false;
}

Location.prototype.toString = function() {
	return "( "+this.x+","+ this.y+" )"
};


/* ################## */
/* ###### TRACK ##### */
/* ################## */

var	Track = function( width, height, name ){
	this.width = width;
	this.height = height;
	this.gamePoints = [height*width];
	// XXX: brauch ich das noch? wird das jemals verwendet?
	var cnt = 0;
	for ( var i = 0; i < height; i++ ) {
		for ( var j = 0; j < width; j++ ) {
			this.gamePoints[cnt++] = new Location( j,i );
		};
	};

	this.trackPoints = new Array();
	this.trackBorders = new Array();
	this.surrPoints = new Array();
	this.finishLine = new Array();
	this.name = name;
}

Track.prototype.isGamePoint = function( loc ) {
	return this.isIn( loc, this.gamePoints );
};

Track.prototype.isOnTrack = function( loc ) {
	return this.isIn( loc, this.trackPoints );
};

Track.prototype.isBorder = function( loc ) {
	return this.isIn( loc, this.trackBorders );
};

Track.prototype.isSurrounding = function( loc ) {
	return this.isIn( loc, this.surrPoints );
};

Track.prototype.isFinishLine = function( loc ) {
	return this.isIn( loc, this.finishLine );
};

Track.prototype.isIn = function( loc, arr ) {
	for ( var i = 0; i < arr.length; i++ ) {
		if ( arr[i].equals( loc )){
			return true;
		}
	};
	return false;		
};

Track.prototype.getSurrounding = function( loc, track ) {
	var rawSurr = loc.getRawSurrounding();
	var realSurr = new Array();
	for ( var i = 0; i < rawSurr.length; i++ ) {
		// checks validity of Locations on trackPoints
		if ( track ){
			if ( this.isOnTrack( rawSurr[i] )){
				realSurr.push( rawSurr[i] );
			}
		}
		// checks validity of Locations on possible gamepoints
		else{
			if ( this.isGamePoint( rawSurr[i]) ){
				realSurr.push( rawSurr[i] );
			}
		}
	};
	return realSurr;
};

/* ################## */
/* ###### Game ###### */
/* ################## */


var Game = function(){
	this.width = w;
	this.height = h;
	this.xBoxes = Math.floor(0.054*w);
	this.yBoxes = Math.floor(0.054*h);
	this.track = new Track( this.xBoxes, this.yBoxes, "own" );
	this.xDelta = this.width / this.xBoxes;
	this.yDelta = this.height / this.yBoxes;
	// XXX: Replace Array(); by [];
	this.players = new Array();
	this.activePlayers = new Array();
	this.kickedPlayers = new Array();
	this.initializeGame();
}
// XXX: MAYBE NOT NECESSARY
Game.prototype.START = 0;
// XXX: MAYBE NOT NECESSARY
Game.prototype.TURN = 1;

Game.prototype.initializeGame = function() {
	this.currentPlayer = 0;
	this.round = 0;
	// XXX: MAYBE NOT NECESSARY
	this.status = this.START;
};

Game.prototype.restoreKickedPlayers = function() {
	
	this.activePlayers = this.players;

	// // add kicked players to active players
	// for ( var i = 0; i < this.kickedPlayers.length; i++ ){
	// 	this.activePlayers.push( this.kickedPlayers[i] );
	// }

	// // clear kickedPlayers array
	// this.kickedPlayers.length = 0;

	// // restore order of active players
	// var newActivePlayers = [];
	// for ( var i = 0; i < this.activePlayers.length; i++ ){
	// 	newActivePlayers[this.activePlayers[i].no] = this.activePlayers[i];
	// }

	// this.activePlayers = newActivePlayers;
}

/* Checks surrounding for Occupation by other Players */
Game.prototype.getSurrounding = function( loc, track ) {
	var surr = this.track.getSurrounding( loc, track );
	var newSurr = new Array();
	for ( var i = 0; i < surr.length; i++ ){
		if ( !this.isOccupied(surr[i]) ){
			newSurr.push( surr[i] );
		}
	}
	return newSurr;
};

Game.prototype.isOccupied = function( loc ) {
	for ( var i = 0; i < this.activePlayers.length; i++ ){
		if ( loc.equals( this.activePlayers[i].crntLoc() )){
			return true;
		}
	}
	return false;
};

Game.prototype.isKicked = function( player ) {
	for ( var i = 0; i < this.kickedPlayers.length; i++ ){
		if ( this.kickedPlayers[i].no == player.no ){
			return true;
		}
	}
	return false;
};

Game.prototype.getTurn = function() {
	var ret = {};
	var noValidPlayer = true;
	while( noValidPlayer ){

		ret.win = this.determineWinner();
		if ( ret.win ){
			return ret;
		}

		ret.player = this.getCurrentPlayer();
		ret.surrounding = this.getSurrounding( ret.player.getNextLocation(), true );
		

		// If player has no more choices kick him/her
		if ( ret.surrounding.length == 0 && ( !ret.win || !ret.draw ) ){
			var index = this.activePlayers.indexOf( ret.player );
			this.activePlayers.splice( index, 1 );
			this.kickedPlayers.push( ret.player );
			this.currentPlayer = this.currentPlayer % this.activePlayers.length;
			noValidPlayer = true;
			continue;
		}
		noValidPlayer = false;
	}
	return ret;
};

Game.prototype.turn = function( loc ) {
	
	var crntPlayer = this.getCurrentPlayer();
	crntPlayer.winner = false;
	crntPlayer.setNextLocation( loc );
	
	// checks wether there is finishLine in last move. Then the player wins
	var between = detectPointsInBetween( crntPlayer.lastLoc(),loc );
	for ( var i = 0; i < between.length; i++ ){
		if ( this.track.isFinishLine( between[i] )){
			crntPlayer.winner = true;
			break;
		}
	}

	this.currentPlayer++;
	this.currentPlayer = this.currentPlayer % this.activePlayers.length;
	if ( this.currentPlayer == 0 ){
		this.round++;
	}
	// Put AddOns on Track with certain probability
	// TEMP INACTIVE FOR TESTING PURPOSES
	// if ( Math.random() > 0.85 ){
	// 	var pos = Math.floor( (Math.random() * this.track.gamePoints.length) + 1 );
	// 	this.track.gamePoints[pos].assignRandomItem();
	// }
	
};
// returns null, if still playing
// returns empty array for draw
// returns array with players for winners
Game.prototype.determineWinner = function() {

	var winners = [];

	// If no player is left, it is a draw situation
	if( this.activePlayers.length == 0 ){
		return winners;
	}



	// check wether it is one of the first 2 or 3 moves
	if ( this.round < 3 ){
		return null;
	}

	// Only check if whole round is done (after last in a row made a move)
	if ( this.currentPlayer != 0 ){
		return null;
	}

	// check for every player wether in the points between their last move contained the finishLine
	var winners = [];
	for ( var i = 0; i < this.activePlayers.length; i++ ){
		var player = this.activePlayers[i];
		// if there is finishLine in it display Winning Hint
		if ( player.winner ){
			winners.push( player );
		}
	}

	return winners.length == 0 ? null : winners;
};

Game.prototype.calculateTrackPoints = function() {
	for ( var i = 0; i < this.track.gamePoints.length; i++ ){
		var p = this.track.gamePoints[i];
		if ( !this.track.isBorder(p ) 
				&& !this.track.isSurrounding( p )
				&& !this.track.isFinishLine( p )){
			this.track.trackPoints.push( p );
		}
	}
};

Game.prototype.toXCoord = function( loc ) {
	return loc.x * this.xDelta;
};

Game.prototype.toYCoord = function( loc ) {
	return loc.y * this.yDelta;	
};

Game.prototype.toLoc = function( x,y ) {
	var xMult = parseInt( x / this.xDelta );
	var xDiff = x % this.xDelta;
	if ( xDiff / this.xDelta > 0.5 )
		xMult++;

	var yMult = parseInt( y / this.yDelta );
	var yDiff = y % this.yDelta;
	if ( yDiff / this.yDelta > 0.5 )
		yMult++;

	return new Location( xMult, yMult );
};

Game.prototype.getCurrentPlayer = function() {
	return this.activePlayers[this.currentPlayer];
};

/* ################## */
/* ##### PLAYER ##### */
/* ################## */

// XXX: remove car
var	Player = function( car, no ){
	this.initializePlayer()
	this.car = car;
	this.no = no;
	
}

Player.prototype.initializePlayer = function() {
	this.avgSpeed = 0;
	this.distance = 0;
	this.historyLocs = new Array();
	this.winner = false;
};

Player.prototype.crntLoc = function() {
	return this.historyLocs[this.historyLocs.length-1];
};

Player.prototype.lastLoc = function() {
	if ( this.historyLocs.length == 1 ){
		return this.historyLocs[0];
	}

	return this.historyLocs[this.historyLocs.length-2];
};

Player.prototype.getNextLocation = function() {
	return this.crntLoc().getMove( this.lastLoc() );
};

Player.prototype.setNextLocation = function( loc ) {
	this.historyLocs.push( loc );
	this.setAVGSpeed( this.getSpeed() );
	this.distance += this.lastLoc().distanceTo( this.crntLoc() );
};

Player.prototype.getSpeed = function() {
	// XXX: STILL VERY SIMPLE
	return this.lastLoc().distanceTo( this.crntLoc() );
};

Player.prototype.setAVGSpeed = function( speed ){
	var speedSum = this.avgSpeed * ( this.historyLocs.length-1 );
	speedSum += speed;
	this.avgSpeed = speedSum / this.historyLocs.length;
}

