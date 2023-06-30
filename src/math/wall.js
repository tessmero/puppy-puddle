// anchored obstacle for points to collide with

class Wall{
    constructor( a, b ){
        var d = b.sub(a)
        
        this.a = a
        this.b = b
        this.d = d 
        this.angle = d.getAngle()
        this.det = d.x*d.x + d.y*d.y
    }
    
    // get point on this wall, nearest to p
    getNp(p){
        var dp = p.sub(this.a)
        var r = (dp.x*this.d.x + dp.y*this.d.y) / this.det
        if((r<0) | (r>1)){
            return null
        }
        return this.a.add(this.d.mul(r))
    }
    
    getWallChildren(){ return this; }
    
    update(){}
   
    draw(g){
        g.strokeStyle = 'black'
        g.lineWidth = .001
        g.beginPath()
        g.moveTo( this.a.x, this.a.y )
        g.lineTo( this.b.x, this.b.y )
        g.stroke()
    }
}