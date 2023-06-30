// physics-enabled joint/vertex/particle

class Point {
    constructor( pos, vel, rad ){
        this.pos = pos
        this.vel = vel
        this.rad = rad
        
        this.bouyancyMultiplier = 1
        this.wallFrictionMultiplier = 0
        this.springs = []
    }
    
    copy(){
        return new Point(this.pos.copy(), this.vel.copy(), this.rad )
    }
    
    applyForce(f,dt){
        this.vel = this.vel.add(f.mul(dt))
    }
    
    update(dt, all_ents){
        
        this.vel = this.vel.add( gravity.mul(dt) )
        if( this.pos.y > puddleHeight ){
            if( this.parentPuppy ){
                this.parentPuppy.submerged = true
                submergedPointCount += 1
                this.vel = this.vel.add( startingBouyancy.mul(dt*this.bouyancyMultiplier*Math.pow(damageBouyancyPenalty,puppyDamage)) )
                this.vel = this.vel.add( puppySwimForce.mul(dt) )
            }
        }
        this.vel = this.vel.mul( (1.0-airFriction*dt) )
        
        var dp = this.vel.mul(dt)
        
        if( !this.passThroughWalls ) {
            //this.debug = false
            all_ents.filter( e => e instanceof Platform )
                    .forEach( plt => {
                
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
                
                // check current position
                var curr_cwnp = plt.collisionCheck(this)
                if( curr_cwnp ){
                    this.pos = curr_cwnp[0]
                }
                
                //check next positoin
                var next_p = this.copy()
                next_p.pos = this.pos.add(dp)
                var next_cwnp = plt.collisionCheck(next_p)
                if( next_cwnp ){
                    var w = next_cwnp[1]
                    var intr = computeIntersection(this.pos, next_p.pos, w.a, w.b)
                        
                        // bounce
                        var speed = this.vel.getMagnitude()
                        var angle = this.vel.getAngle()
                        var newAngle = 2*w.angle - angle
                        this.vel = Vector.polar(newAngle,speed*(1.0-bounceLoss))
                        if( w.vel ){
                            var dv = w.vel.sub(this.vel)
                            this.vel = this.vel.add( dv.mul(this.wallFrictionMultiplier*wallFriction*Math.cos(intr)) )
                        }
                }
                
            })
        }
        
        this.pos = this.pos.add(this.vel.mul(dt))
    }
    
    draw(g, debugColor='black'){
        if( this.debug ){
            g.fillStyle =  debugColor
            g.beginPath()
            g.arc( this.pos.x, this.pos.y, this.rad, 0, Math.PI*2 )
            g.fill()
        }
    }
}