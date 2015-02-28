/* ################## */
/* ####### CAR ###### */
/* ################## */

var Car = function(typ, col){
	/* Type of Car */
	this.typ = type;
	/* Color of Car */
	this.col = col;
}


/* ################## */
/* #### LOCATION #### */
/* ################## */

var Location = function(x,y){
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
	loc.addOn = Math.floor((Math.random() * loc.NEGNOOFITEMS * -1) + 1);
};

Location.prototype.getMove = function(lastLoc) {
	if (this.addOn == this.NONE){
		// TODO
	}
	if (this.addOn == this.SUPERFAST){
		// TODO
	}
	var newX = this.x + (this.x - lastLoc.x);
	var newY = this.y + (this.y - lastLoc.y);
	return new Location(newX, newY);
};

Location.prototype.distanceTo = function(loc) {
	var diffX = this.x - loc.x;
	var diffY = this.y - loc.y;
	return Math.sqrt(diffX * diffX + diffY * diffY);
};

Location.prototype.equals = function(loc) {
	if (this.x == loc.x && this.y == loc.y){
		return true;
	}

	return false;
};

Location.prototype.getRawSurrounding = function() {
	var surr = new Array();
	if (this.addOn == this.NONE){
		// TODO
	}
	if (this.addOn == this.DIZZY){
		// TODO
	}
	if (this.addOn == this.ELEGANT){
		// TODO
	}
	surr.push(new Location(this.x-1, this.y   ));
	surr.push(new Location(this.x-1, this.y+1 ));
	surr.push(new Location(this.x  , this.y+1 ));
	surr.push(new Location(this.x+1, this.y+1 ));
	surr.push(new Location(this.x+1, this.y   ));
	surr.push(new Location(this.x+1, this.y-1 ));
	surr.push(new Location(this.x  , this.y-1 ));
	surr.push(new Location(this.x-1, this.y-1 ));
};


/* ################## */
/* ###### TRACK ##### */
/* ################## */

var	Track = function(width, height){
	this.width = width;
	this.height = height;
	this.gamePoints = [height*width];

	var cnt = 0;
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			this.gamePoints[cnt++] = new Location(i,j);
		};
	};

	this.trackPoints = new Array();
	this.borderPoints = new Array();
}

Track.prototype.isOnTrack = function(loc) {
	for (var i = 0; i < trackPoints.length; i++) {
		if (trackPoints[i].equals(loc)){
			return true;
		}
	};
	return false;
};

Track.prototype.getSurrounding = function(loc) {
	var rawSurr = loc.getRawSurrounding;
	var realSurr = new Array();
	for (var i = 0; i < rawSurr.length; i++) {
		if (this.isOnTrack(rawSurr[i])){
			realSurr.push(rawSurr[i]);
		}
	};
	return realSurr;
};

/* ################## */
/* ###### Game ###### */
/* ################## */


var Game = function(width, height){
	this.width = width;
	this.height = height;
	// XXX: MAYBE THESE CAN BE SET SOMETIMES (SMALLER SCREENS)
	this.xBoxes = 50;
	this.yBoxes = 30;
	this.track = new Track(this.xBoxes, this.yBoxes);
	this.xDelta = this.width / this.xBoxes;
	this.yDelta = this.height / this.yBoxes;
	this.activePlayers = new Array();
	this.kickedPlayers = new Array();
	this.currentPlayer = 0;
	this.maxPlayers = 4;
	// XXX: MAYBE NOT NECESSARY
	this.status = this.START;
}
// XXX: MAYBE NOT NECESSARY
Game.prototype.START = 0;
// XXX: MAYBE NOT NECESSARY
Game.prototype.TURN = 1;


Game.prototype.turn = function(loc) {
	var crntPlayer = this.getCurrentPlayer();
	var nextLoc = crntPlayer.getNextLocation();
	this.track.getSurrounding(nextLoc);

	if (this.track.isOnTrack(nextLoc)){
		crntPlayer.setNextLocation(nextLoc);
		this.currentPlayer++;
	} else {
		var index = this.activePlayers.indexOf(crntPlayer);
    	this.activePlayers.splice(index, 1);
		this.kickedPlayers.push(crntPlayer);
	}

	if (this.activePlayers.length == 1){
		// XXX: BLBLBLBAAA
		console.log("WINNING GUY");
		return;
	}else{
		// Set next player
		this.currentPlayer = this.currentPlayer % this.activePlayers.length;
	}

	// Put AddOns on Track with certain probability
	// TEMP INACTIVE FOR TESTING PURPOSES
	// if (Math.random() > 0.85){
	// 	var pos = Math.floor((Math.random() * this.track.gamePoints.length) + 1);
	// 	this.track.gamePoints[pos].assignRandomItem();
	// }
	
};

Game.prototype.convertLocToXCoord = function(loc) {
	return loc.x * xDelta;
};

Game.prototype.convertLocToYCoord = function(loc) {
	return loc.y * yDelta;	
};

Game.prototype.convertCoordToLoc = function(x,y) {
	var xMult = parseInt(x / this.xDelta);
	var xDiff = x % this.xDelta;
	if (xDiff / this.xDelta > 0.5)
		xMult++;
	// var newX = xMult * this.xDelta;

	var yMult = parseInt(y / this.yDelta);
	var yDiff = y % this.yDelta;
	if (yDiff / this.yDelta > 0.5)
		yMult++;
	// var newy = yMult * this.yDelta;

	// return new Location(newX, newY);
	return new Location(xMult*this.xDelta, yMult*this.yDelta);
};

Game.prototype.getCurrentPlayer = function() {
	return this.activePlayers[this.currentPlayer];
};

/* ################## */
/* ##### PLAYER ##### */
/* ################## */


var	Player = function(name, car, no){
	this.name = name;
	this.car = car;
	this.avgSpeed = 0;
	this.distance = 0;
	this.historyLocs = new Array();
	this.no = no;
}

Player.prototype.crntLoc = function() {
	return this.historyLocs[this.historyLocs.length];
};

Player.prototype.lastLoc = function() {
	if (this.historyLocs.length == 1){
		return this.historyLocs[0];
	}

	return this.historyLocs[this.historyLocs.length-1];
};

Player.prototype.getNextLocation = function() {
	return this.crntLoc().getMove(this.lastLoc());
};

Player.prototype.setNextLocation = function(loc) {
	this.historyLocs.push(loc);
	this.setAVGSpeed(this.getSpeed());
	this.distance += this.lastLoc().distanceTo(crntLoc());
};

Player.prototype.getSpeed = function() {
	// XXX: STILL VERY SIMPLE
	return this.lastLoc().distanceTo(this.crntLoc());
};

Player.prototype.setAVGSpeed = function(speed){
	var speedSum = this.avgSpeed * (this.historyLocs.length-1);
	speedSum += speed;
	this.avgSpeed = speedSum / this.historyLocs.length;
}

