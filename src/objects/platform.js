
class Platform extends PhysicsObject {
    
    constructor(x,y,w,h){
        super()
        
        var all_corners = [[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]]
        for( var i = 0 ; i < 4 ; i++ ){
            var a = new Vector(...all_corners[i])
            var b = new Vector(...all_corners[i+1])
            this.children.push( new Wall(a,b) )
        }
    }
    
    update(dt, all_objects){
        if( !paused ){
            
            if( this.vel ){
                var dp = this.vel.mul(dt)
                this.children.forEach(c =>{
                    c.a = c.a.add(dp)
                    c.b = c.b.add(dp)
                    c.vel = this.vel
                })
            }
            
        }
    }
    
    draw(g){
        this.children.forEach(c => c.draw(g))
    }
}