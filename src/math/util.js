
// fit rectangle vertices to the given points 
function computeRectangle(points) {
  // Sort the input points in ascending order of x-coordinate
  points.sort((a, b) => a.x - b.x);

  // Calculate the midpoint of the first two points
  const midPoint1 = {
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2,
  };

  // Calculate the midpoint of the last two points
  const midPoint2 = {
    x: (points[2].x + points[3].x) / 2,
    y: (points[2].y + points[3].y) / 2,
  };

  // Calculate the slope of the line connecting the midpoints
  const slope = (midPoint2.y - midPoint1.y) / (midPoint2.x - midPoint1.x);

  // Calculate the angle of rotation to make the line horizontal
  const rotationAngle = Math.atan(slope);

  // Rotate the midpoints and obtain the new rectangle points
  const newPoints = [];
  for (let i = 0; i < 4; i++) {
    const dx = points[i].x - midPoint1.x;
    const dy = points[i].y - midPoint1.y;

    const rotatedX = dx * Math.cos(rotationAngle) - dy * Math.sin(rotationAngle);
    const rotatedY = dx * Math.sin(rotationAngle) + dy * Math.cos(rotationAngle);

    newPoints.push( new Vector( rotatedX + midPoint1.x,rotatedY + midPoint1.y ) );
  }

  newPoints.sort((a, b) => Math.atan2(a.y - midPoint1.y, a.x - midPoint1.x) - Math.atan2(b.y - midPoint1.y, b.x - midPoint1.x));

  return newPoints;
}

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
    const intersectionX = line1Start.x + ua * (line1End.x - line1Start.x);
    const intersectionY = line1Start.y + ua * (line1End.y - line1Start.y);
    return new Vector( intersectionX, intersectionY );
  } else {
    // The line segments do not intersect
    return null;
  }
}