/* ################## */
/* ####### CAR ###### */
/* ################## */

var Car = function(loc, typ, col){
	/* Last Location for prediction of next Location*/
	this.lastLoc = loc;
	/* current Location */
	this.loc = loc;
	/* Type of Car */
	this.typ = type;
	/* Color of Car */
	this.col = col;
}

Car.prototype.getNextLocation = function() {
	return loc.getMove(lastLoc);
};

Car.prototype.setNextLocation = function(loc) {
	this.lastLoc = this.loc;
	this.loc = loc.doMove(loc);
};

Car.prototype.getSpeed = function() {
	diffX = this.loc.x - this.lastLoc.x
	diffY = this.loc.y - this.lastLoc.y
	return Math.sqrt(diffX * diffX + diffY * diffY);
};


/* ################## */
/* #### LOCATION #### */
/* ################## */

var Location = function(x,y){
	this.x = x;
	this.y = y;
}

Location.prototype.doMove = function(loc) {
	this.x += this.x - loc.x;
	this.y += this.y - loc.y;
};

Location.prototype.getMove = function(loc) {
	newX = this.x + (this.x - loc.x);
	newY = this.y + (this.y - loc.y);
	return new Location(newX, newY);
};

Location.prototype.equals = function(loc) {
	if (this.x == loc.x && this.y == loc.y){
		return true;
	}

	return false;
};

Location.prototype.getRawSurrounding = function() {
	surr = [];
	surr.append(new Location(this.x-1, this.y   ));
	surr.append(new Location(this.x-1, this.y+1 ));
	surr.append(new Location(this.x  , this.y+1 ));
	surr.append(new Location(this.x+1, this.y+1 ));
	surr.append(new Location(this.x+1, this.y   ));
	surr.append(new Location(this.x+1, this.y-1 ));
	surr.append(new Location(this.x  , this.y-1 ));
	surr.append(new Location(this.x-1, this.y-1 ));
};


/* ################## */
/* ###### TRACK ##### */
/* ################## */

var	Track = function(width, height){
	this.width = width;
	this.height = height;
	this.gamePoints = [height*width];

	cnt = 0;
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			this.gamePoints[cnt++] = new Location(i,j);
		};
	};

	this.trackPoints = [];
	this.borderPoints = [];
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
	rawSurr = loc.getRawSurrounding;
	realSurr = [];
	for (var i = 0; i < rawSurr.length; i++) {
		if (this.isOnTrack(rawSurr[i]){
			realSurr.append(rawSurr[i]);
		}
	};
	return realSurr;
};


var Game = function(){

}


var	Player = function(name, car){
	this.name = name;
	this.car = car;
	this.avgSpeed = 0;
	this.distance = 0;
	this.status = this.DIZZY;
}

// XXX: GEHT DAS?????
Player.prototype.DIZZY = 1;
Player.prototype.SUPERFAST = 2;
Player.prototype.ELEGANT = 3;





