class PhysicsObject {
    
    constructor(){
        this.children = []
        this.deleteMe = false
    }
    
    update(dt, all_ents){
        if( !paused ){
            this.children.forEach(c => c.update(dt,all_ents))
        }
    }
    
    draw(g){
        this.children.forEach(c => c.draw(g))
    }
}