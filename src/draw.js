


function avg(p0,p1,r){
    return [p0[0]*(1.0-r)+p1[0]*r,p0[1]*(1.0-r)+p1[1]*r]
}
    
// Render graphics
function draw(fps, t) {
   
    ctx.fillStyle = backgroundColor
    ctx.fillRect( 0, 0, canvas.width, canvas.height )
    
    var padding = 10; // Padding around the square region
    var dimension = Math.min(canvas.width, canvas.height) - padding * 2;
    var scale = dimension;
    var offsetX = (canvas.width - dimension) / 2;
    var offsetY = (canvas.height - dimension) / 2;
    if(paused){
        scale *= 5
    }
    ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
    // test
    //ctx.fillStyle = 'black'
    //ctx.fillRect( .25,.25,.5,.5 )
    
    
    // draw game objects
    for( var i = 0 ; i < all_ents.length ; i++ ){
        all_ents[i].draw(ctx)
    }
    
    //draw water
    ctx.fillStyle = "rgba(100, 100, 255, 0.5)";
    ctx.fillRect(0,puddleHeight,1,1)
    
    //clip edges
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,1,1)
    ctx.globalCompositeOperation = 'source-over'
    
    
    // Draw FPS on the screen
    //ctx.font = "25px Arial";
    //ctx.textAlign = "left";
    //ctx.fillStyle = "black";
    //var x = 10
    //var y = 100
    //ctx.fillText("FPS: " + fps, x, y);
    
    
    // draw mouse location
    //if( mouse_forget_countdown > 0 ){
    //    ctx.fillStyle = "red"
    //    ctx.beginPath()
    //    ctx.arc( canvasMouseX, canvasMouseY, 10, 0, Math.PI*2 )
    //    ctx.fill()
    //}
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}