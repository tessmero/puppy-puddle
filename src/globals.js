
// graphics context
var canvas;
var ctx;
var graphics_scale = 1;

// tranlsate pixels on canvas to internal units
var canvasOffsetX = 0
var canvasOffsetY = 0
var canvasScale = 0

var paused = false


var puppyColor = "white"
var backgroundColor = "#AAA"

// mouse
var canvasMousePos = new Vector(0,0) //pixels on canvas
var mousePos = 0 //internal units


// puppy physics
var gravity = new Vector( 0, 1e-6 ) // accel per ms
var puppyDamage = 0 // damage level (0-10)
var startingBouyancy = new Vector( 0, -1.5e-6 ) // accel per ms
var damageBouyancy = new Vector( 0, 5e-7 ) // accel per ms per damage point
var puppySwimForce = new Vector( 0, 0 ) // accel per ms 
var airFriction = 1e-3 // fraction of speed lost per ms
var bounceLoss = .7 // fraction of speed lost per bounce
var wallFriction = .9 // puppy sliding on surface 0=slippery
var bulletForce = 1e-3 // delta-v per bullet

// puddle physics
var defaultPuddleHeight = .7 // y-axis position
var puddleHeight = defaultPuddleHeight
var dhPerPoint = .001 // increase in puddle height per submerged point
var submergedPointCount = 0

// game objects
var all_ents = []

//outer walls
var p = .05
all_ents.push( new Platform( -p,-p,2,p ) )
all_ents.push( new Platform( -p,-p,p,2 ) )
all_ents.push( new Platform( 1,0,p,2 ) )
//all_ents.push( new Platform( 0,1,2,p ) )

//moving ledge
var ledge = new Platform(0,.3,.7,.1) 
ledge.vel = new Vector(-10e-5,0)
all_ents.push( ledge )

all_ents.push( new Platform(.4,.5,.4,.06,angle=-.4)  )

// ad puppy to last to draw on top
all_ents.push( new Puppy( new Vector( .2, .15 ), .1, 4 ) )