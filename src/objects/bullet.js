class Bullet extends PhysicsObject {
    
    constructor(p){
        super()
        
        p.passThroughWalls = true
        
        this.p = p
        this.children = [p]
        this.lifetime = 1000
    }
    
    update(dt,all_ents){
        super.update(dt,all_ents)
        
        this.lifetime -= dt
        if( this.lifetime < 0 ){
            this.deleteMe = true
            return
        }
        
        // check points for collisions
        var a = this.p.pos
        var b = this.p.pos.sub(this.p.vel.mul(dt))
        
        // impact force
        var dv = Vector.polar(this.p.vel.getAngle(), bulletForce)
        
        //collide with balls
        all_ents.flatMap(e => e.children).filter(e => e instanceof Point).every(p=>{
            var np = computeNearestPointOnEdge(p.pos, a, b)
            if( np.sub(p.pos).getMagnitude() < p.rad ){
                //p.debug = true
                p.vel = p.vel.add(dv)
                p.hitByBullet = true
                //puppyDamage += 1
                this.deleteMe = true
                return true
            }   
            return true
        })
        
        //collide with springs
        all_ents.flatMap(e => e.children).filter(e => e instanceof Spring).every(s=>{
            if( (!s.breakable) | s.hitByBullet ){
                return true
            }
            if( computeIntersection(a,b,s.ball1.pos, s.ball2.pos ) ){
                //s.debug = true
                var balls = [s.ball1,s.ball2]
                balls.forEach(b => {
                    b.vel = b.vel.add(dv)
                    if( s.breakable ){
                        b.wallFrictionMultiplier = 0 
                        b.bouyancyMultiplier = .5
                    }
                })
                
                if( s.breakable ){
                    s.hitByBullet = true
                    puppyDamage += 1
                    this.deleteMe = true
                }
                return false
            }
            return true
        })
    }
    
    draw(g){
        super.draw(g)
        
        var tailPos = this.p.pos.sub(Vector.polar( this.p.vel.getAngle(), .1 ))
        
        g.strokeStyle = 'black'
        g.lineWidth = .01
        g.beginPath()
        g.moveTo( tailPos.x, tailPos.y )
        g.lineTo( this.p.pos.x, this.p.pos.y )
        g.stroke()
    }
}