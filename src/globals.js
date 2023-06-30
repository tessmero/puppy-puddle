
// graphics context
var canvas;
var ctx;
var graphics_scale = 1;

// tranlsate pixels on canvas to internal units
var canvasOffsetX = 0
var canvasOffsetY = 0
var canvasScale = 0

var paused = false
var score = 0


var puppyColor = "#777"
var backgroundColor = "#CCC"

// mouse
var canvasMousePos = new Vector(0,0) //pixels on canvas
var mousePos = 0 //internal units


// puppy physics
var gravity = new Vector( 0, 1e-6 ) // accel per ms
var puppyDamage = 0 // damage level (0-10)
var startingBouyancy = new Vector( 0, -1.5e-6 ) // accel per ms
var damageBouyancyPenalty = .9 // bouyancy multiplier per damage point
var puppySwimForce = new Vector( 0, 0 ) // accel per ms 
var airFriction = 1e-3 // fraction of speed lost per ms
var bounceLoss = .2 // fraction of speed lost per bounce
var wallFriction = .9 // puppy sliding on surface 0=slippery
var bulletForce = 1e-3 // delta-v per bullet

// puddle physics
var defaultPuddleHeight = .7 // y-axis position
var puddleHeight = defaultPuddleHeight
var recordPuddleHeight = defaultPuddleHeight
var dhPerPoint = .001 // increase in puddle height per submerged point
var submergedPointCount = 0

// game objects
var all_ents = []

//outer walls
var p = .05
//all_ents.push( new Platform( -p/2,p/2,2,p ) )
all_ents.push( new Platform( -p/2,p/2,p,2 ) )
all_ents.push( new Platform( 1-p/2,0,p,2 ) )
//all_ents.push( new Platform( 0,1,2,p ) )

//moving ledge
var ledge = new Platform(0,.3,.6,.05,angle=0) 
ledge.vel = new Vector(-3e-3,0)
all_ents.push( ledge )


var ledge2 = new Platform(.59,.27,.3,.05,angle=-.2) 
ledge2.vel = new Vector(-3e-3,0)
all_ents.push( ledge2 )

all_ents.push( new Platform(.5,.5,.4,.06,angle=-.3)  )

// ad puppy to last to draw on top
all_ents.push( new Puppy( new Vector( .2, -.05 ), .1, 4 ) )