class PhysicsObject {
    
    constructor(){
        this.children = []
    }
    
    update(dt, all_objects){
        if( !paused ){
            this.children.forEach(c => c.update(dt,all_objects))
        }
    }
    
    draw(g){
        this.children.forEach(c => c.draw(g))
    }
}