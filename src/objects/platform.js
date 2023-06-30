
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
        g.fillStyle = 'black'
        g.beginPath()
        g.moveTo(this.all_verts[0].x,this.all_verts[0].y)
        for( var i = 1 ; i < this.all_verts.length ; i++ ){
            g.lineTo(this.all_verts[i].x,this.all_verts[i].y)
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
    
    // if ball not intersecting platform return null
    // otherwise return better position for point
    collisionCheck(p){
        var wnp = this.getNearestWallPoint(p.pos)
        var w = wnp[0]
        var np = wnp[1]
        var inside = isPointInsidePolygon(p.pos,this.all_verts) 
        
        if( (!inside) & (np.sub(p.pos).getMagnitude()>=p.rad) ){
            return null // ball p not intersecting this platform
        }
        
        var normAngle = w.angle - Math.PI/2
        
        var corr = np.add(Vector.polar(normAngle,p.rad))
        
        return [corr,w,np]
    }
    



    getNearestWallPoint(point) {

      let nearestWall = null;
      let nearestPoint = null;
      let shortestDistance = Infinity;

      // Iterate through each edge of the polygon
      for (let i = 0; i < this.children.length; i++) {
          const w = this.children[i]
        const currentPoint = w.a
        const nextPoint = w.b

        // Compute the nearest point on the current edge
        const edgePoint = w.getNp(point)

        // Compute the distance between the input point and the edge point
        const distance = edgePoint.sub(point).getMagnitude()

        // Update the nearest point if the distance is shorter
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestWall = w;
          nearestPoint = edgePoint;
        }
      }

      
      return [nearestWall,nearestPoint];
    }
}