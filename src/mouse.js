function updateMousePos(event){
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    
    canvasMousePos = new Vector( 
        (event.clientX - rect.left) * scaleX, 
        (event.clientY - rect.top) * scaleY 
    
    )
    mousePos = new Vector( 
        virtualMouseX = (canvasMousePos.x-canvasOffsetX)/canvasScale, 
        virtualMouseY = (canvasMousePos.y-canvasOffsetY)/canvasScale
    )
}

function mouseClicked(event){
    paused = false
    
    updateMousePos(event)
    
    // random startign point on edge of screen
    var pos = computeNearestPointOnPolygon(
        {x:Math.random(),y:Math.random()}, 
        [{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}])
    
    var d = mousePos.sub(pos)
    var vel = Vector.polar( d.getAngle(), 5e-3 )
    all_ents.push( new Bullet(new Point(pos,vel) ) )
}