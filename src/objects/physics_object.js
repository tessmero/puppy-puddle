class PhysicsObject {
    
    constructor(){
        this.children = []
    }
    
    update(dt, all_ents){
        if( !paused ){
            this.children.forEach(c => c.update(dt,all_ents))
        }
    }
    
    draw(g){
        this.children.forEach(c => c.draw(g))
    }
    
    getWallChildren(){
        return this.children.filter( c => c instanceof Wall )
    }
}