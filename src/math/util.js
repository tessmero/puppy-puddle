
function computeNearestPointOnPolygon(point, polygon) {

  let nearestPoint = null;
  let shortestDistance = Infinity;

  // Iterate through each edge of the polygon
  for (let i = 0; i < polygon.length; i++) {
    const currentPoint = polygon[i];
    const nextPoint = polygon[(i + 1) % polygon.length];

    // Compute the nearest point on the current edge
    const edgePoint = computeNearestPointOnEdge(point, currentPoint, nextPoint);

    // Compute the distance between the input point and the edge point
    const distance = computeDistance(point, edgePoint);

    // Update the nearest point if the distance is shorter
    if (distance < shortestDistance) {
      nearestPoint = edgePoint;
      shortestDistance = distance;
    }
  }

  return nearestPoint;
}

function computeNearestPointOnEdge(point, start, end) {
  // Compute the vector representing the edge
  const edgeVector = { x: end.x - start.x, y: end.y - start.y };

  // Compute the vector from the start point to the input point
  const pointVector = { x: point.x - start.x, y: point.y - start.y };

  // Compute the dot product of the edge vector and the point vector
  const dotProduct = pointVector.x * edgeVector.x + pointVector.y * edgeVector.y;

  // Compute the squared length of the edge vector
  const edgeLengthSquared = edgeVector.x * edgeVector.x + edgeVector.y * edgeVector.y;

  // Compute the parameter value along the edge
  const t = dotProduct / edgeLengthSquared;

  // Clamp the parameter value to the range [0, 1]
  const clampedT = Math.max(0, Math.min(1, t));

  // Compute the nearest point on the edge
  const nearestPoint = new Vector(
    start.x + clampedT * edgeVector.x,
    start.y + clampedT * edgeVector.y
  );

  return nearestPoint;
}

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

function isPointInsidePolygon(point, polygon) {
  // Ray casting algorithm to determine if the point is inside the polygon
  let isInside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
          yi = polygon[i].y;
    const xj = polygon[j].x,
          yj = polygon[j].y;

    const intersect = ((yi > point.y) != (yj > point.y)) &&
      (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
}


function computeDistance(point1, point2) {
  // Compute the Euclidean distance between two points
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}





