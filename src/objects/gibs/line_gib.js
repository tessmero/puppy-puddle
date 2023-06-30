class LineGib extends Gib {
    
    constructor(p1,p2){
        super()
        
        this.p1 = p1
        this.p2 = p2
        
        this.lineWidth = .04
    }
    
    draw(g){
        var pos1 = this.p1.pos
        var pos2 = this.p2.pos
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