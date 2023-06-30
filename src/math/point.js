// physics-enabled joint/vertex/particle

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
    
    update(dt, all_ents){
        
        this.vel = this.vel.add( gravity.mul(dt) )
        if( this.pos.y > puddleHeight ){
            submergedPointCount += 1
            this.vel = this.vel.add( bouyancy.mul(dt*this.bouyancyMultiplier) )
            this.vel = this.vel.add( puppySwimForce.mul(dt) )
        }
        this.vel = this.vel.mul( (1.0-airFriction*dt) )
        
        var dp = this.vel.mul(dt)
        var nextPos = this.pos.add(dp)
        
        if( !this.passThroughWalls ) {
            all_ents.flatMap( o => o.getWallChildren())
                    .forEach( w => {
                
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
                
                // nearest point on wall
                var nPos = w.getNp(this.pos)
                if( nPos == null ){
                    return
                }
                
                // nearest point on edge of my radius
                nPos = this.pos.add( Vector.polar( nPos.sub(this.pos).getAngle(), this.rad ) )
                
                // collision check
                var intr = computeIntersection(nPos, nPos.add(dp), w.a, w.b)
                if( intr != null ){
                    
                    // bounce
                    var speed = this.vel.getMagnitude()
                    var angle = this.vel.getAngle()
                    var newAngle = 2*w.angle - angle
                    this.vel = Vector.polar(newAngle,speed*(1.0-bounceLoss))
                    if( w.vel ){
                        var dv = w.vel.sub(this.vel)
                        this.vel = this.vel.add( dv.mul(wallFriction).mul(Math.cos(intr)) )
                    }
                    nextPos = this.pos.add(this.vel.mul(dt))
                }
            })
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