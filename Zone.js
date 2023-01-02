/**
 * Class Zone
 * const newZone = new Zone({coordinates : "10,10 20,11 20 12 10 20"})
 * 
 */

class Zone {
    coordinates=""

    constructor (props){
        this.coordinates= props.coordinates
    }

    getPointsCoordinates= ()=>{
        if (typeof this.coordinates == 'string'){
            // 1st is a space
            let tmp = ''
            if (this.coordinates[0]==' '){
                //remove first char
                tmp = this.coordinates.slice(1)
            }
            else
                tmp= this.coordinates

            //
            // "12,43 23,43" => "12 43 23 43"
            tmp = tmp.replace(/,/g, ' ')
            const coordinates= tmp.split(' ')
            let xyPoints =[]
            
            for (let index = 0; index <= coordinates.length-2; index=index+2){
                const xy={x:0, y:0}
                    xy.x =parseFloat(coordinates[index])    
                    xy.y= parseFloat(coordinates[index+1])
                xyPoints.push(xy)
            }
            return xyPoints
        }
        return []
    }
    isInside = (pointM) =>{
        const M= pointM
        if (typeof M==`object`&&
            typeof M.x==`number` &&
            typeof M.y == `number`)
{
            // http://xymaths.free.fr/MathAppli/Algorithme-Interieur-Polygone/    
            const xyPoints = this.getPointsCoordinates()
            // init
            let yMax=xyPoints[0].y;
            const n = xyPoints.length
            for (let inc=0;inc<n;inc++) {
                yMax = Math.max(yMax, xyPoints[inc].y)
            }
            // to make sure the ref point is outside
            yMax++
            // Reference Point
            const R= {x:M.x, y:yMax}

            let count=0
            for (let inc=0; inc<n; inc++){
                let next =1, previous=-1
                if (inc==xyPoints.length-1)
                    next=-inc
                if (inc==0)
                    previous=xyPoints.length-1
                let point = xyPoints[inc]
                let nextPoint= xyPoints[inc+next]
                let previousPoint= xyPoints[inc+previous]
                let m, p, xI, yI
                // if same x, then M can't be inside ..worse case scenario on the line
                if (point.x != nextPoint.x){
                    // constitution y=mx+p
                    m =(nextPoint.y-point.y)/(nextPoint.x-point.x)
                    p=point.y - m*point.x
                    
                    //intersection point I
                    xI=M.x
                    yI=m*M.x+p
                    
                    if (((xI-point.x)*(xI-nextPoint.x)<0 &&(yI - R.y)*(yI - M.y)<0) //  if intersection is  between the polygone point on x axis and intersection is between the R and M point 
                    ||
                     (M.x==point.x &&(yI - R.y)*(yI - M.y)<0 && (M.x-previousPoint.x)*(M.x-nextPoint.x)<0)        // If RM cross a summit and  M.x is between the next and the previous point x
                     ||
                    (count%2!=0 && point.y==M.y && point.x == M.x))  // if M is summit and has cross the limit odd times
                    {
                            count++
                        }
                    }
                }
                

            if (count%2==0) 
                return false
            else 
                return true
        }
        else {
            return null
        }
    }

}

module.exports = Zone
