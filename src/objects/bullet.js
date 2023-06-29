class Bullet extends PhysicsObject {
    
    constructor(start,end){
        super()
        
        let d = end-start
        
        this.pos = start.copy()
        this.vel = Vector.polar( d.getAngle(), .01 ) 
    }
    
    update(dt, all_objects){
        if( !paused ){
            this.children.forEach(c => c.update(dt,all_walls))
        }
    }
    
    draw(g){
        this.children.forEach(c => c.draw(g))
    }
}