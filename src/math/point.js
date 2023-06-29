class Point {
    constructor( pos, vel, rad ){
        this.pos = pos
        this.vel = vel
        this.rad = rad
        
        this.bouyancyMultiplier = 1
    }
    
    applyForce(f,dt){
        this.vel = this.vel.add(f.mul(dt))
    }
    
    update(dt, all_objects){
        let all_walls = all_objects.filter(o => o instanceof Wall)
        this.vel = this.vel.add( gravity.mul(dt) )
        if( this.pos.y > puddleHeight ){
            submergedPointCount += 1
            this.vel = this.vel.add( bouyancy.mul(dt*this.bouyancyMultiplier) )
        }
        this.vel = this.vel.mul( (1.0-airFriction*dt) )
        var nextPos = this.pos.add(this.vel.mul(dt))
        
        if( !this.passThroughWalls ) {
            for( var i = 0 ; i < all_walls.length ; i++ ){
                var w = all_walls[i]
                
                /*
                var npos = w.getNp(this.pos)
                if( npos == null ){
                    continue
                }
                
                var d = npos.sub(this.pos).getMagnitude()
                if( d < this.rad ){
                    
                    // bounce
                    var speed = this.vel.getMagnitude()
                    var angle = this.vel.getAngle()
                    var newAngle = 2*w.angle - angle
                    this.vel = Vector.polar(newAngle,speed)
                }
                */
                
                var intr = computeIntersection(this.pos, nextPos, w.a, w.b)
                if( intr != null ){
                    
                    // bounce
                    var speed = this.vel.getMagnitude()
                    var angle = this.vel.getAngle()
                    var newAngle = 2*w.angle - angle
                    this.vel = Vector.polar(newAngle,speed*(1.0-bounceFriction))
                    nextPos = this.pos.add(this.vel.mul(dt))
                }
            }
        }
        
        this.pos  = nextPos
    }
    
    draw(g){
        g.fillStyle = this.debug ? 'red' : 'black'
        g.beginPath()
        g.arc( this.pos.x, this.pos.y, this.rad, 0, Math.PI*2 )
        g.fill()
    }
}