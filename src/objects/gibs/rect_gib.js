class RectGib extends Gib {
    
    constructor(points){
        super()
        
        this.points = points
    }
    
    draw(g){
        
        var rp = this.points.map(p=>p.pos)
        //rp = computeRectangle(rp)
        
        g.strokeStyle = (this.debug ? 'red' : puppyColor)
        g.fillStyle = (this.debug ? 'red' : puppyColor)
        g.lineWidth = .04;
        g.lineCap = "round";
        g.lineJoin = "round";
        
        g.beginPath();
        g.moveTo(rp[0].x,rp[0].y);
        g.lineTo(rp[1].x,rp[1].y);
        g.lineTo(rp[2].x,rp[2].y);
        g.lineTo(rp[3].x,rp[3].y);
        g.lineTo(rp[0].x,rp[0].y);
        g.stroke();
        
        g.beginPath();
        g.moveTo(rp[0].x,rp[0].y);
        g.lineTo(rp[1].x,rp[1].y);
        g.lineTo(rp[2].x,rp[2].y);
        g.lineTo(rp[3].x,rp[3].y);
        g.lineTo(rp[0].x,rp[0].y);
        g.fill();
    }
}