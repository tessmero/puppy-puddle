
// return angle of incidence or null
function computeIntersection(line1Start, line1End, line2Start, line2End) {
  const denominator =
    (line2End.y - line2Start.y) * (line1End.x - line1Start.x) -
    (line2End.x - line2Start.x) * (line1End.y - line1Start.y);

  if (denominator === 0) {
    // The lines are parallel or coincident, so there is no intersection
    return null;
  }

  const ua =
    ((line2End.x - line2Start.x) * (line1Start.y - line2Start.y) -
      (line2End.y - line2Start.y) * (line1Start.x - line2Start.x)) /
    denominator;
  const ub =
    ((line1End.x - line1Start.x) * (line1Start.y - line2Start.y) -
      (line1End.y - line1Start.y) * (line1Start.x - line2Start.x)) /
    denominator;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    // The line segments intersect, so compute the intersection point
    //const intersectionX = line1Start.x + ua * (line1End.x - line1Start.x);
    //const intersectionY = line1Start.y + ua * (line1End.y - line1Start.y);
    //return new Vector( intersectionX, intersectionY );
    return Math.PI/2
        + Math.atan2( line2End.y-line2Start.y, line2End.x-line2Start.x )
        - Math.atan2( line1End.y-line1Start.y, line1End.x-line1Start.x )
  } else {
    // The line segments do not intersect
    return null;
  }
}