
class Platform extends PhysicsObject {
    
    constructor(x,y,w,h,angle=0){
        super()
        
        var all_corners = [[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]]
        var ctr = new Vector( x+w/2, y+h/2 )
        all_corners = all_corners.map( c => new Vector(...c).sub(ctr).rotate(angle).add(ctr) )
        
        this.all_verts = all_corners
        this.resetChildren()
    }
    
    draw(g){
        super.draw(g)
        g.fillStyle = 'white'
        g.beginPath()
        g.moveTo(this.all_verts[0][0],this.all_verts[0][1])
        for( var i = 1 ; i < all_verts.length ; i++ ){
            g.lineTo(this.all_verts[i][0],this.all_verts[i][1])
        }
        g.fill()
    }
    
    resetChildren(){
        this.children = []
        for( var i = 0 ; i < 4 ; i++ ){
            var w = new Wall(this.all_verts[i],this.all_verts[i+1])
            w.vel = this.vel
            w.parentPlatform = this
            this.children.push( w )
        }
    }
    
    update(dt, all_objects){
        if( !paused ){
            
            if( this.vel ){
                var dp = this.vel.mul(dt)
                this.all_verts = this.all_verts.map(v => v.add(dp))
                this.resetChildren()
            }
            
        }
    }
    
    // if p not inside platform return null
    // otherwise return nearest point on edge of platform
    inPlatform(p){
        if (!isPointInsidePolygon(p,this.all_verts)) {
            return null;
        }
        return computeNearestPointOnPolygon(p,this.all_verts)
    }
    
    draw(g){
        this.children.forEach(c => c.draw(g))
    }
}