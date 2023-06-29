class LineGib extends Gib {
    
    constructor(p1,p2){
        super()
        
        this.p1 = p1
        this.p2 = p2
    }
    
    draw(g){
        g.strokeStyle = (this.debug ? 'red' : puppyColor)
        g.lineWidth = .04;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(this.p1.pos.x, this.p1.pos.y);
        g.lineTo(this.p2.pos.x, this.p2.pos.y);
        g.stroke();
    }
}