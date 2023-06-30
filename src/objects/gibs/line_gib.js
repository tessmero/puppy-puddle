class LineGib extends Gib {
    
    constructor(spring){
        super()
        
        this.spring = spring
        
        this.lineWidth = .04
    }
    
    draw(g){
        
        if( this.spring.hitByBullet ){
            
            //draw broken
            g.fillStyle = (this.debug ? 'red' : puppyColor)
            var balls = [this.spring.ball1,this.spring.ball2]
            balls.forEach(b =>{
                g.beginPath();
                g.arc( b.pos.x, b.pos.y, this.lineWidth/2, 0, Math.PI*2 )
                g.fill();
            })
            
        } else {
            
            // draw connected
            var pos1 = this.spring.ball1.pos
            var pos2 = this.spring.ball2.pos
            if( this.wagAngle ){
                var d = pos2.sub(pos1)
                pos2 = pos1.add( Vector.polar( d.getAngle()+this.wagAngle, d.getMagnitude() ) )
            }
            
            g.strokeStyle = (this.debug ? 'red' : puppyColor)
            g.lineWidth = this.lineWidth;
            g.lineCap = "round";
            g.beginPath();
            g.moveTo(pos1.x, pos1.y);
            g.lineTo(pos2.x, pos2.y);
            g.stroke();
        }
    }
}