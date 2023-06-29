class FaceGib extends Gib {
    
    constructor(p1,p2,rad){
        super()
        
        this.p1 = p1
        this.p2 = p2
        this.p = p2
        this.rad = rad
    }
    
    update(dt){
        
    }
    
    draw(g){
        var angle = this.p2.pos.sub(this.p1.pos).getAngle()-.5
        var pos = this.p2.pos
        
        
        g.fillStyle = (this.debug ? 'red' : puppyColor)
        g.beginPath();
        g.arc(this.p.pos.x,this.p.pos.y,this.rad,0,Math.PI*2)
        g.fill();
        
        
        const eaDist = .04
        const eaDa = .7
        const eaRad = .015
        const eaO = Vector.polar( angle, 0 )
        const eaCenters = [
            pos.add( Vector.polar( angle+eaDa, eaDist ).add(eaO) ),
            pos.add( Vector.polar( angle-eaDa, eaDist ).add(eaO) )
        ] 
        g.fillStyle = puppyColor;
        eaCenters.forEach(p => {
            g.beginPath();
            g.arc(p.x,p.y, eaRad,0,Math.PI*2);
            g.fill();
        })
        
        drawCutePuppyFace( g, this.p.pos, angle )
    }
}
    
function drawCutePuppyFace(g, pos, angle) {
  
    const mDist = .02
    const mDa = .3
    const mRad = .008
    const mArc = .7
    const mO = Vector.polar( angle, -.022 )
    const mCenters = [
    pos.add( Vector.polar( angle+mDa, mDist ).add(mO) ),
    pos.add( Vector.polar( angle-mDa, mDist ).add(mO) )
    ] 
    const tCenter = pos.add(Vector.polar( angle, -.005 ))
    const tDa = Math.PI/2
    
    if( false ){
        //tongue
        g.fillStyle = 'red';
        g.beginPath();
        g.ellipse(tCenter.x,tCenter.y,.02,.006,angle,Math.PI-tDa,Math.PI+tDa);
        g.fill();

        //mouth
        g.fillStyle = puppyColor;
        mCenters.forEach(p => {
            g.beginPath();
            g.arc(p.x,p.y, mRad,0,Math.PI*2);
            g.fill();
        })
    }
    g.strokeStyle = 'black';
    g.lineWidth = .002
    mCenters.forEach(p => {
        g.beginPath();
        g.arc(p.x,p.y, mRad, Math.PI + angle-mArc, Math.PI + angle+mArc);
        g.stroke();
    })
    
    //nose
    const nCenter = pos.add(Vector.polar( angle, -.0065 ))
    g.fillStyle = 'black';
    g.beginPath();
    g.ellipse(nCenter.x,nCenter.y,.002,.003,angle,0,Math.PI*2);
    g.fill();
  
  
  // eyes
  const eyeDist = .015
  const eyeDa = .8
  const eyeRad = .005
  const eyeCenters = [
    pos.add( Vector.polar( angle+eyeDa, eyeDist ) ),
    pos.add( Vector.polar( angle-eyeDa, eyeDist ) )
  ]
  
  g.fillStyle = 'black';
  eyeCenters.forEach(p => {
      g.beginPath();
      g.arc(p.x,p.y, eyeRad, 0, 2 * Math.PI);
      g.fill();
  })
}