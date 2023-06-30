

function fitToContainer(){
  canvas.style.width='100%';
  canvas.style.height='100%';  
  canvas.width  = canvas.offsetWidth/graphics_scale;
  canvas.height = canvas.offsetHeight/graphics_scale;
  
    
    var padding = 10; // Padding around the square region
    var dimension = Math.min(canvas.width, canvas.height) - padding * 2;
    canvasScale = dimension;
    canvasOffsetX = (canvas.width - dimension) / 2;
    canvasOffsetY = (canvas.height - dimension) / 2;
    if(paused){
        scale *= 5
    }
}

function update(dt) {
    fitToContainer()
    
    if( paused ) return
    
        
    // update entities and puddle
    submergedPointCount = 0
    all_ents.forEach(e => e.update(dt, all_ents))
    puddleHeight = defaultPuddleHeight - submergedPointCount*dhPerPoint
    if( puddleHeight < recordPuddleHeight ){
        recordPuddleHeight = puddleHeight
    }
    
    // remove entities marked for deletion
    all_ents = all_ents.filter( e => !e.deleteMe )
    
    // reset/advance if puppy is off-screen
    var pup = all_ents.find(e => e instanceof Puppy)
    if( pup.isOffScreen() ){
        all_ents = all_ents.filter(e => !(e instanceof Puppy))
        all_ents.push( new Puppy( new Vector( .6, -.05 ), .1, 4 ) )
        puppyDamage = 0
        defaultPuddleHeight = puddleHeight
        score += 1
    }
}