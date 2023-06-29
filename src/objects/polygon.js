class Polygon extends PhysicsObject {
    
    constructor(pos,rad,n){
        super()
        
        var all_balls = []
        var a = .1
        var da = 2*Math.PI/n
        for( var i = 0 ; i < n ; i++ ){
            var pd = Vector.polar( a+da*i, rad )
            var p = pos.add( pd )
            var vel = new Vector( 0, 0 )
            all_balls.push( new Point( p, vel, .01 ) )
        }

        var all_springs = []
        for( var i = 0 ; i < n ; i++ ){
            for( var j = i+1 ; j < n ; j++ ){
                var a = all_balls[i]
                var b = all_balls[j]
                var d = a.pos.sub(b.pos).getMagnitude()
                all_springs.push(new Spring( a,b, d ))
            }
        }
        
        this.children = this.children.concat(all_balls).concat(all_springs)
    }
}