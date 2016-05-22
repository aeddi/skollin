import {Injectable} from 'angular2/core';

@Injectable()
export class GlobalVars {
  constructor() {
    this.coords = null;
    this.address = null;
    this.tabsNav = null;
    this.lastLock = null;
    this.pois = [
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 1,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87064,
          lng: 2.3340
        },
        dist: 53,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 3,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87059,
          lng: 2.3347
        },
        dist: 55,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 2,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87070,
          lng: 2.3353
        },
        dist: 80,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 1,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87014,
          lng: 2.3335
        },
        dist: 112,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 2,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87034,
          lng: 2.3320
        },
        dist: 186,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 3,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.86850,
          lng: 2.3430
        },
        dist: 230,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 4,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87164,
          lng: 2.320
        },
        dist: 265,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
      {
        name: 'Bar le Dock',
        desc: "Situés dans le quartier de l'Opéra, nous vous accueillerons dans une ambiance festive. Plusieurs salles sont à votre disposition afin que vous vous sentiez comme à la maison",
        type: 2,
        address: "Dock 25, rue Louis le Grand 75002",
        coords: {
          lat: 48.87015,
          lng: 2.3340
        },
        dist: 310,
        pics: [
          'dock-1.jpg',
          'dock-2.jpg',
          'dock-3.jpg'
        ],
        promo: 30,
        duration: 90
      },
    ];
  }
}
