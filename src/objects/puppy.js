class Puppy extends PhysicsObject {
    
    constructor(pos){
        super()
        
        // structure specs
        var points = [
            [0,0],[1,0], //01 hips
            [0,.3],[1,.3], //23 feat
            [0,-.5],[1.,-.5], //45 top
            [1.3,-.5], //6 head
            [-.3,-.6] //7 tail
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
            var ball = new Point( p, vel, .02 )
            ball.parentPuppy = this
            all_balls.push( ball )
        }
        this.feet = [all_balls[2],all_balls[3]]
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
        all_gibs[4].lineWidth = .03
        
        //adjust bouyancy
        all_balls[6].bouyancyMultiplier = 3 //head
        all_balls[5].bouyancyMultiplier = 3 //shoulder
        all_balls[7].bouyancyMultiplier = 2 //tail
        all_balls[0].bouyancyMultiplier = .2 //back hip
        all_balls[4].bouyancyMultiplier = .2 //back hip
        all_balls[2].bouyancyMultiplier = .2 //rear leg
        
        // leg animation specs
        this.currDist = all_springs[3].restLength
        this.upDist = this.currDist
        this.shortDist = this.upDist * .8
        this.longDist = this.upDist * 1.3
        this.restDist = this.upDist * 1.3
        this.animTime = 0
        this.animSpeed = 1e-4 // dist units per ms
        this.phaseIndex = 1
        
        this.animPeriod = 150 // ms
        this.minPhaseDuration = 1000 
        this.maxPhaseDuration = 3000 
        this.phaseCountdown = 0 
        
        // wag animation specs
        this.currWag = 0 //radians
        this.minWag = 0 //radians
        this.maxWag = 1 //radians
        this.wagSpeed = 2e-2 // radians per ms
        this.wagPeriod = 100 // ms
        
        
        // assign member vars
        this.all_springs = all_springs
        this.all_balls = all_balls
        
        //this.children = all_balls.concat(all_springs).concat(all_gibs)
        this.children = all_gibs.concat(all_springs).concat(all_balls)
        
    }
    
    update(dt, all_ents){
        super.update(dt,all_ents)
       
        this.animTime += dt
        if( this.submerged ){
            this.phaseIndex = 1
        } else {
            this.phaseCountdown -= dt
            if( this.phaseCountdown <= 0 ){
                this.phaseCountdown = this.minPhaseDuration + Math.random() * (this.maxPhaseDuration-this.minPhaseDuration)
                this.phaseIndex = (this.phaseIndex+1)%2
            }
        }
        
        var targetDist = this.currDist;
        if( this.phaseIndex == 0 ){
            
            //standing legs
            targetDist = this.upDist
            this.feet[0].wallFrictionMultiplier = 1
            this.feet[1].wallFrictionMultiplier = 1
            
        } else if (this.phaseIndex == 1){
            
            // excited legs
            var animIndex = Math.floor(this.animTime/this.animPeriod)%2
            if( animIndex == 0 ){
                targetDist = this.longDist
                this.feet[0].wallFrictionMultiplier = 1
                this.feet[1].wallFrictionMultiplier = 0
            } else {
                targetDist = this.shortDist
                this.feet[0].wallFrictionMultiplier = 0
                this.feet[1].wallFrictionMultiplier = 1
            }
            
        } else if (this.phaseIndex == 2){
            
            //resting legs
            targetDist = this.longDist
            this.feet[0].wallFrictionMultiplier = 1
            this.feet[1].wallFrictionMultiplier = 1
        }
            
        // move legs
        if( targetDist > this.currDist ){ 
            this.currDist = Math.min( this.currDist+this.animSpeed*dt, targetDist )
        } else {
            this.currDist = Math.max( this.currDist-this.animSpeed*dt, targetDist )
        }
        this.all_springs[3].restLength = this.currDist
        this.all_springs[2].restLength = this.currDist
            
        // wag tail
        var wagIndex = Math.floor(this.animTime/this.wagPeriod)%2
        if( wagIndex == 0 ){ 
            this.currWag = Math.min( this.currWag+this.wagSpeed*dt, this.maxWag )
        } else {
            this.currWag = Math.max( this.currWag-this.wagSpeed*dt, this.minWag )
        }
        this.children[4].wagAngle = this.currWag
    }
}