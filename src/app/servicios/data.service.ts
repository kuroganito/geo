import { Injectable } from '@angular/core';

export interface Point {
  lat: number,
  lng: number
  v?: number
}

export interface Poly {
  path: Array<Point>;
  color?: string
}

@Injectable()
export class DataService {
   dis: number = .1;
  constructor() { }

  getPoly(): Array<Poly> {

    let poly: Array<Poly> = new Array();
    let max: number = 0;
    let min: number = 1000;
    this.getData().forEach(point => {
      if (point.v > max) {
        max = point.v;
      }
      if (point.v < min) {
        min = point.v;
      }
    });
    this.getData().forEach(point => {
      poly.push({ path: this.setSquare(point, this.dis), color: `hsl(${this.setColor(max, min, point.v)}, 100%, 50%)` })
    });
    return poly;
  }

  getData(): Array<Point> {
    let mtx:Array<Point> = new Array();
    let rvar, indx, noise  = 7,szGrid = 10;
    let latIni:number = 19.2964413;
    let lngIni:number = -99.1603331;
    let r_earth: number = 6378;

    for (let i = 1; i <= szGrid; i++) {
      for (let j = 1; j <= szGrid; j++) {
        rvar = this.rndGen(i, j, noise);
        mtx.push({ 
          lat: latIni - ( (this.dis / r_earth) * (180 / Math.PI))*i, 
          lng: lngIni + ( (this.dis / r_earth) * (180 / Math.PI) / Math.cos( (latIni+ ( (this.dis / r_earth) * (180 / Math.PI))) * Math.PI / 180))*j, 
          v: rvar });
      }
    }

    return mtx;
  }

  setColor(max: number, min: number, v: number) {
    return 90 -( ((v - min) / (max - min)) * 90);
  }

  setSquare(p: Point, m: number): Array<Point> {
    let path: Array<Point> = new Array();
    let r_earth: number = 6378;
    // lat: - lng: -
    path.push({
      lat: p.lat - ((m / 2) / r_earth) * (180 / Math.PI),
      lng: p.lng - ((m / 2) / r_earth) * (180 / Math.PI) / Math.cos(p.lat * Math.PI / 180)
    })
    // lat: + lng: -
    path.push({
      lat: p.lat + ((m / 2) / r_earth) * (180 / Math.PI),
      lng: p.lng - ((m / 2) / r_earth) * (180 / Math.PI) / Math.cos(p.lat * Math.PI / 180)
    })
    // lat: + lng: +
    path.push({
      lat: p.lat + ((m / 2) / r_earth) * (180 / Math.PI),
      lng: p.lng + ((m / 2) / r_earth) * (180 / Math.PI) / Math.cos(p.lat * Math.PI / 180)
    })
    // lat: - lng: +
    path.push({
      lat: p.lat - ((m / 2) / r_earth) * (180 / Math.PI),
      lng: p.lng + ((m / 2) / r_earth) * (180 / Math.PI) / Math.cos(p.lat * Math.PI / 180)
    })
    return path;
  }

  rndGen(ren, col, max) {
    var x = ((1 * (col / 100)) + (1 * (ren / 100))) * (1 / Math.floor((Math.random() * max) + 1));
    return (x);

  }

}
