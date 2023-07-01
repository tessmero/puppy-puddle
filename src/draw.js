


function avg(p0,p1,r){
    return [p0[0]*(1.0-r)+p1[0]*r,p0[1]*(1.0-r)+p1[1]*r]
}
    
// Render graphics
function draw(fps, t) {
   
    ctx.fillStyle = backgroundColor
    ctx.fillRect( 0, 0, canvas.width, canvas.height )
    ctx.setTransform(canvasScale, 0, 0, canvasScale, canvasOffsetX, canvasOffsetY);
    // test
    //ctx.fillStyle = 'black'
    //ctx.fillRect( .25,.25,.5,.5 )
    
    
    // draw game objects
    for( var i = 0 ; i < all_ents.length ; i++ ){
        all_ents[i].draw(ctx)
    }
    
    //draw water
    ctx.fillStyle = "rgba(255, 50, 50, 0.5)";
    ctx.fillRect(0,recordPuddleHeight,1,1)
    
    //clip edges
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,1,1)
    ctx.globalCompositeOperation = 'source-over'
    
    // draw mouse position
    //ctx.fillStyle = 'red'
    //ctx.beginPath()
    //ctx.arc(mousePos.x,mousePos.y,.02,0,2*Math.PI)
    //ctx.fill()
    
    
    //draw score at puddle height
    ctx.font = ".04px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    var x = .03
    var y = recordPuddleHeight
    ctx.fillText("Score: " + score, x, y);
    
    // Draw FPS on the screen
    //ctx.font = ".025px Arial";
    //ctx.textAlign = "left";
    //ctx.fillStyle = "black";
    //var x = .4
    //var y = .4
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
    //y += .03
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += .03
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}