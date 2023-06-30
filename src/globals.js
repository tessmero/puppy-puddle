
// graphics context
var canvas;
var ctx;
var graphics_scale = 1;

var paused = false


var puppyColor = "white"
var backgroundColor = "#AAA"

// mouse
var canvasMouseX = 0 //pixels
var canvasMouseY = 0 //pixels



var gravity = new Vector( 0, 1e-6 ) // accel per ms
var bouyancy = new Vector( 0, -1.5e-6 ) // accel per ms
var puppySwimForce = new Vector( 1e-7, 0 ) // accel per ms 
var airFriction = 1e-3 // fraction of speed lost per ms
var bounceLoss = .2 // fraction of speed lost per bounce
var wallFriction = .8 // points sliding against wall


var defaultPuddleHeight = .7 // y-axis position
var puddleHeight = defaultPuddleHeight
var dhPerPoint = .001 // increase in puddle height per submerged point
var submergedPointCount = 0

// game objects
var all_ents = []

//outer walls
var p = .001
var all_corners = [[p,p],[1-p,p],[1-p,1-p],[p,1-p],[p,p]]
for( var i = 0 ; i < 4 ; i++ ){
    var a = new Vector(...all_corners[i])
    var b = new Vector(...all_corners[i+1])
    all_ents.push( new Wall(a,b) )
}

//ledge
var ledge = new Platform(0,.4,.4,.1) 
ledge.vel = new Vector(-3e-5,0)
all_ents.push( ledge )

all_ents.push( new Puppy( new Vector( .2, .15 ), .1, 4 ) )