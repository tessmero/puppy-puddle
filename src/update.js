

function fitToContainer(){
  canvas.style.width='100%';
  canvas.style.height='100%';  
  canvas.width  = canvas.offsetWidth/graphics_scale;
  canvas.height = canvas.offsetHeight/graphics_scale;
}

function update(dt) {
    fitToContainer()
    
    if( !paused ){
        
        
        submergedPointCount = 0
        for( var i = 0 ; i < all_ents.length ; i++ ){
            all_ents[i].update(dt, all_ents)
        }
        puddleHeight = defaultPuddleHeight - submergedPointCount*dhPerPoint
    }
}