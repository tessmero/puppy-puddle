

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
    
    if( !paused ){
        
        submergedPointCount = 0
        all_ents.forEach(e => e.update(dt, all_ents))
        all_ents = all_ents.filter( e => !e.deleteMe )
        puddleHeight = defaultPuddleHeight - submergedPointCount*dhPerPoint
        
        // reset if puppy off-screen
        var puppy = all_ents.find(e => e instanceof Puppy)
        if( puppy.deleteMe ){
            
        }
    }
}