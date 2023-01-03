//"use strict"
const PolygonUtilities = require ('../PolygonUtilities')

describe('PolygonUtilities', ()=>{
    test ('Point is inside Convex Polygone', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:12,y:15}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(true)
    })
    
    test ('Point is outside Convex Polygone', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:16,y:10}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(false)
    })

    test ('Point is outside Convex Polygone passing by summit not crossing the polygone', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:5,y:15}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(false)
    })

    test ('Point is outside Convex Polygone passing by summit crossing the polygone', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:15,y:10}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(false)
    })

    test ('Point is on polygone limit', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:20,y:12}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(false)
    })

    test ('Point is on polygone summit crossing limit (odd times)', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:10,y:20}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(false)
    })

    test ('Point is on polygone summit without crossing limit (even times)', ()=>{
        const coordinates = "10 10 5 15 10 20 20 15 20 10 15 15"
        const point ={x:15,y:15}     
        const newPolygonUtilities = new PolygonUtilities({coordinates})
        const res = newPolygonUtilities.isInside(point)
        expect(res).toBe(false)
    })

}) 