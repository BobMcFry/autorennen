function init() {
	var run = new Run();
}





var View = function(stage){
	this.stage = stage;
}

View.prototype.STREET = 1;
View.prototype.BUMPER = 2;
View.prototype.GRASS = 3;

View.prototype.prepareMenu = function() {
	// display background

	// display Header

	// display Play Button with clickevent and nice haptic mouseover

	// display sound on/off symbol with clickevent
};

View.prototype.animateMovement = function(obj, loc, speed, time, fps) {
	createjs.Tween.get(obj, { loop: false })
  	.to({ x: loc.x, y: loc.y }, time, createjs.Ease.getPowInOut(speed));
  	
  	createjs.Ticker.setFPS(fps);
	createjs.Ticker.addEventListener("tick", this.stage);
};

View.prototype.drawLine = function(type, fromLoc, toLoc) {

};

View.prototype.drawColoredCircle = function(color, loc, size) {
	var circle = new createjs.Shape();
	circle.graphics.beginFill("CornflowerBlue").drawCircle(0, 0, size);
	circle.x = loc.x;
	circle.y = loc.y;
	this.stage.addChild(circle);
	return circle;
};

View.prototype.drawPicture = function(pic, loc) {
	switch(type){
		case View.STREET: console.log("Draw Street"); break;
		case View.BUMPER: console.log("Draw Bumper"); break;
		case View.GRASS: console.log("Draw Grass"); break;
		default: console.log("Default"); break;
	}
};

View.prototype.drawScore = function(no, player) {
	
};

View.prototype.updateScore = function(no, player) {
	
};





var Run = function(game){
	this.stage = new createjs.Stage("board");
	// HARD CODED SIZES!!!!!!!!
	this.game = new Game(500, 300);
	this.view = new View(this.stage);
	this.view.prepareMenu();
	
	// TESTS!!!!!!!!!!!
	var circle = this.view.drawColoredCircle(undefined, new Location(100,100), 50);
	this.view.animateMovement(circle, new Location(200,200), 2, 1000, 60);
}

/* Is called by a click-event Listener */
Run.prototype.movePlayer = function(x,y) {
	var loc = game.convertCoordToLoc(x,y);
	this.game.turn(loc);
	// create animation that displays movement from last to current pos

	// update addons

	// update score

	// check if won?

};

Run.prototype.toggleSound = function() {
	// if on turn off and vice versa
};

Run.prototype.method_name = function(first_argument) {
	// body...
};