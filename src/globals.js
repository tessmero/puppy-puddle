
// graphics context
var canvas;
var ctx;
var graphics_scale = 1;

var paused = true


var puppyColor = "white"
var backgroundColor = "#AAA"

// mouse
var canvasMouseX = 0 //pixels
var canvasMouseY = 0 //pixels



var gravity = new Vector( 0, 1e-6 ) // accel per ms
var bouyancy = new Vector( 0, -1.5e-6 ) // accel per ms
var airFriction = 1e-3 // fraction of speed lost per ms
var bounceFriction = .9 // fraction of speed lost per bounce


var defaultPuddleHeight = .7 // y-axis position
var puddleHeight = defaultPuddleHeight
var dhPerPoint = .001 // increase in puddle height per submerged point
var submergedPointCount = 0

// game objects
var all_ents = []
var all_walls = []

//outer walls
var p = .001
var all_corners = [[p,p],[1-p,p],[1-p,1-p],[p,1-p],[p,p]]
for( var i = 0 ; i < 4 ; i++ ){
    var a = new Vector(...all_corners[i])
    var b = new Vector(...all_corners[i+1])
    all_walls.push( new Wall(a,b) )
}

//ledge
var ledgeSize = .15
var specs = [[0,.2],[ledgeSize,.25],[ledgeSize,.4],[0,.4]]
for( var i = 1 ; i < specs.length ; i++ ){
    var a = new Vector(...specs[i-1])
    var b = new Vector(...specs[i])
    all_walls.push( new Wall(a,b) )
}

all_ents = all_ents.concat(all_walls)
all_ents.push( new Puppy( new Vector( .05, .15 ), .1, 4 ) )