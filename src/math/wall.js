class Wall{
    constructor( a, b ){
        var d = b.sub(a)
        
        this.a = a
        this.b = b
        this.d = d 
        this.angle = d.getAngle()
    }
    
    update(){}
   
    draw(g){
        g.strokeStyle = 'black'
        g.lineWidth = .01
        g.beginPath()
        g.moveTo( this.a.x, this.a.y )
        g.lineTo( this.b.x, this.b.y )
        g.stroke()
    }
}