// constraint between to points

class Spring {
    constructor(ball1, ball2, restLength) {
        this.ball1 = ball1;
        this.ball2 = ball2;
        this.restLength = restLength;
        this.prevLength = restLength;
        this.springConstant = 1.6e-3;
        this.dampingConstant = 1;
        
        ball1.springs.push(this)
        ball2.springs.push(this)
    }

    update(dt) {
        if( this.hitByBullet ){
            return
        }
        
        // Calculate the vector between the two balls
        let displacement = this.ball2.pos.sub(this.ball1.pos);

        // Calculate the current length of the spring
        let currentLength = displacement.getMagnitude();
        let dAngle = displacement.getAngle()

        // Calculate the force exerted by the spring
        let forceMagnitude = this.springConstant * (currentLength - this.restLength);
        let tooLong = true
        if( forceMagnitude < 0 ){
            tooLong = false
            dAngle += Math.PI
            forceMagnitude *= -1
        }

        // apply damping
        let relativeSpeed = (currentLength - this.prevLength) / dt
        if( tooLong == (relativeSpeed < 0) ){
            let dampingMagnitude = Math.abs(relativeSpeed) * this.dampingConstant
            forceMagnitude = Math.max( 0, forceMagnitude - dampingMagnitude )
        }
        this.prevLength = currentLength
        
        // Calculate the force vector
        let force = Vector.polar( dAngle, forceMagnitude )
        
        // Apply damping
        //let dampingForce = relativeVelocity.mul(this.dampingConstant);
        //force = force.sub(dampingForce);

        // Apply the force to the balls
        this.ball1.applyForce(force,dt);
        this.ball2.applyForce(force.mul(-1),dt);
    }

    draw(g) {
        if( this.debug ){
            g.strokeStyle = (this.hitByBullet ? 'red' : 'gray')
            g.lineWidth = .01;
            g.beginPath();
            g.moveTo(this.ball1.pos.x, this.ball1.pos.y);
            g.lineTo(this.ball2.pos.x, this.ball2.pos.y);
            g.stroke();
        }
    }
}






