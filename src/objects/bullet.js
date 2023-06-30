class Bullet extends PhysicsObject {
    
    constructor(p){
        super()
        
        this.p = p
        this.prevPos = p.pos
        this.children = [p]
    }
    
    update(g,all_ents){
        this.prevPos = p.pos
        super.update(g,all_ents)
        
    }
    
    draw(g){
        super.draw(g)
        g.strokeStyle = 'black'
        g.moveto( this.prevPos.x, this.prevPos.y )
        g.lineTo( this.p.pos.x, this.p.pos.y )
        g.stroke()
    }
}