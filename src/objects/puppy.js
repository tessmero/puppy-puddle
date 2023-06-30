class Puppy extends PhysicsObject {
    
    constructor(pos){
        super()
        
        // structure specs
        var points = [
            [0,0],[1,0], //01 hips
            [0,.3],[1,.3], //23 feat
            [0,-.5],[1.,-.5], //45 top
            [1.3,-.5], //6 head
            [-.2,-.6] //7 tail
        ]
        var springs = [
            [0,1], //0 belly
            [0,2], //1 leg
            [0,3],[1,2], //23 animated
            [1,3], //4 leg
            
            [0,4],[1,5],[4,5],[0,5],[1,4], // 567 top
            [2,4],[3,5], //89 anim limiters
            
            [1,6],[5,6],[4,6],[0,6], //head support
            [1,7],[5,7],[4,7],[0,7], //tail support
        ]
        var gibs = [
            //[0,1], // belly
            
            ['l',0,2],['l',1,3], // legs
            
            ['r',1,0,4,5], //  top
            
            [.04,1,6], //head
            ['l',4,7] //tail
        ]
        
        // structure scale/offset
        var m = .06
        var ox = 0
        var oy = 0
        
        // build structure
        var all_balls = []
        for( var i = 0 ; i < points.length ; i++ ){
            var p = new Vector( points[i][0]*m+ox, points[i][1]*m+oy ).add(pos)
            var vel = new Vector( 0, 0 )
            all_balls.push( new Point( p, vel, .02 ) )
        }
        var all_springs = []
        for( var i = 0 ; i < springs.length ; i++ ){
            var a = all_balls[springs[i][0]]
            var b = all_balls[springs[i][1]]
            var d = a.pos.sub(b.pos).getMagnitude()
            all_springs.push(new Spring( a,b, d ))
        }
        var all_gibs = []
        for( var i = 0 ; i < gibs.length ; i++ ){
            var ps = gibs[i].slice(1).map(bi  => all_balls[bi])
            if( gibs[i][0] == 'r' ){
                all_gibs.push(new RectGib( ps ))
            } else if( gibs[i][0] == 'l' ){
                all_gibs.push(new LineGib( ...ps ))
            } else {
                all_gibs.push(new FaceGib( ps[0],ps[1], gibs[i][0] ))
            }
        }
        
        //adjust bouyancy
        all_balls[6].bouyancyMultiplier = 3 //head
        all_balls[5].bouyancyMultiplier = 3 //shoulder
        all_balls[7].bouyancyMultiplier = 2 //tail
        all_balls[0].bouyancyMultiplier = .2 //back hip
        all_balls[4].bouyancyMultiplier = .2 //back hip
        all_balls[2].bouyancyMultiplier = .2 //rear leg
        
        // animation specs
        this.currDist = all_springs[3].restLength
        this.upDist = this.currDist
        this.shortDist = this.upDist * .9
        this.longDist = this.upDist * 1.1
        this.restDist = this.upDist * 1.3
        this.animTime = 0
        this.animSpeed = 1e-4 // dist units per ms
        this.phaseIndex = 0
        
        this.animPeriod = 150 // ms
        this.minPhaseDuration = 200 
        this.maxPhaseDuration = 8000 
        this.phaseCountdown = 0 
        
        
        // assign member vars
        this.all_springs = all_springs
        this.all_balls = all_balls
        
        this.children = all_balls.concat(all_springs).concat(all_gibs)
        
    }
    
    update(dt, all_ents){
        super.update(dt,all_ents)
       
        this.animTime += dt
        this.phaseCountdown -= dt
        if( this.phaseCountdown <= 0 ){
            this.phaseCountdown = this.minPhaseDuration + Math.random() * (this.maxPhaseDuration-this.minPhaseDuration)
            this.phaseIndex = 1//(this.phaseIndex+1)%3
        }
        
        var targetDist = this.currDist;
        if( this.phaseIndex == 0 ){
            
            //standing
            targetDist = this.upDist
            
        } else if (this.phaseIndex == 1){
            
            // excited
            var animIndex = Math.floor(this.animTime/this.animPeriod)%2
            if( animIndex == 0 ){
                targetDist = this.longDist
            } else {
                targetDist = this.shortDist
            }
            
        } else if (this.phaseIndex == 2){
            
            //resting
            targetDist = this.longDist
            
        }
        
        if( targetDist > this.currDist ){ 
            this.currDist = Math.min( this.currDist+this.animSpeed*dt, targetDist )
        } else {
            this.currDist = Math.max( this.currDist-this.animSpeed*dt, targetDist )
        }
        this.all_springs[3].restLength = this.currDist
        this.all_springs[2].restLength = this.currDist
    }
}