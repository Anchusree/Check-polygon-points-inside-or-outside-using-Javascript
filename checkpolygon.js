
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y
    }
}

let polygon1 =[
    new Point(25.24992938299594, 51.248292856517956),
    new Point(25.244801830759517, 51.255819067522424),
    new Point(25.23914359097289, 51.249465772518654),
    new Point(25.240734997539715, 51.23871404251228),
    new Point(25.247188821652344, 51.24047341651332)
  ];

  let INF = 1000;

  let n = polygon1.length
  let p = new Point(35.24992938299594, 25.248292856517956)
  if(isInside(polygon1,n,p)){
    console.log("Yes,Inside");
  }
  else{
    console.log("No, Outside");
  }

//To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
  function orientation(p,q,r){
    let val = (q.y - p.y) * (r.x - q.x)
    - (q.x - p.x) * (r.y - q.y);
    if (val == 0) {
        return 0; // collinear
    }
    return (val > 0) ? 1 : 2; // clock or counterclock wise
  }

  //given three collinear points p,q,r. func checks if point q lies on line segment pr
  function onSegment(p,q,r){
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) {
        return true;
    }
    return false;

  }


  function doIntersect(p1,q1,p2,q2){
    //Find the four orientation needed for general and special cases
    let o1 = orientation(p1,q1,p2)
    let o2 = orientation(p1,q1,q2)
    let o3 = orientation(p2,q2,p1)
    let o4 = orientation(p2,q2,q1)
    //general case
    if(o1 != o2 && o3 != o4){
        return true;
    }

    //Special cases- p1,q1,p2 are collinear and p2 lies on segment p1q1
    if(o1== 0 && onSegment(p1,p2,q1)){
        return true
    }
    //if p1,q1,p2 are collinear and q2 lies on segment p1q1
    if(o2== 0 && onSegment(p1,q2,q1)){
        return true
    }
     //if p2,q2,p1 are collinear and p1 lies on segment p2q2
     if(o3== 0 && onSegment(p2,p1,q2)){
        return true
    }
    //if p2,q2,q1 are collinear and q1 lies on segment p2q2
    if(o4 == 0 && onSegment(p2,q1,q2)){
        return true
    }
    //doesnt match any, return false
    return false


  }

  function isInside(polygon, n, p){
    //There must be atleast 3 vertices in polygon
    if(n < 3){
        return false;
    }
    //Create a point for line segment from p to infinite
    let extreme = new Point(INF,p.y)

    //Count intersection of the abouve code
    let count = 0, i=0;

    do{
        let next = (i+1)%n;
        //Check if line segment from p to extreme intersects from polygon[i] to polygon[next]
        if(doIntersect(polygon[i],polygon[next],p, extreme)){
            //Check if the line segment from p to extreame 
            //if point p is collinear with line segment i-next then chekc if it lies on segment. If it lies, return true else false
            if(orientation(polygon[i],p,polygon[next]) == 0 ){
                return onSegment(polygon[i],p,polygon[next])
            }
            count++
        }
        i= next;
    }
    while(i != 0){
        //return true if count is odd, else false
        return (count % 2 == 1);
    }

  }

