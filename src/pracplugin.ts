// import {
//     AutoscaleInfo,
//     Logical,
//     Time,
//     DataChangedScope,
// } from 'lightweight-charts';
// import {
//     PracPluginPriceAxisPaneView,
//     PracPluginTimeAxisPaneView,
// } from './axis-pane-view';
// import { PracPluginPriceAxisView, PracPluginTimeAxisView } from './axis-view';
// import { Point, PracPluginDataSource } from './data-source';
// import { PracPluginOptions, defaultOptions } from './options';
// import { PracPluginPaneView } from './pane-view';
// import { PluginBase } from './plugin-base';

// export class PracPlugin extends PluginBase implements PracPluginDataSource {
//     _options: PracPluginOptions;
//     _p1: Point;
//     _p2: Point;
//     _paneViews: PracPluginPaneView[];
//     _timeAxisViews: PracPluginTimeAxisView[];
//     _priceAxisViews: PracPluginPriceAxisView[];
//     _priceAxisPaneViews: PracPluginPriceAxisPaneView[];
//     _timeAxisPaneViews: PracPluginTimeAxisPaneView[];

//     constructor(
//         p1: Point,
//         p2: Point,
//         options: Partial<PracPluginOptions> = {}
//     ) {
//         super();
//         this._p1 = p1;
//         this._p2 = p2;
//         this._options = {
//             ...defaultOptions,
//             ...options,
//         };
//         console.log(this);
//         this._paneViews = [new PracPluginPaneView(this)];
//         this._timeAxisViews = [
//             new PracPluginTimeAxisView(this, p1),
//             new PracPluginTimeAxisView(this, p2),
//         ];
//         this._priceAxisViews = [
//             new PracPluginPriceAxisView(this, p1),
//             new PracPluginPriceAxisView(this, p2),
//         ];
//         this._priceAxisPaneViews = [
//             new PracPluginPriceAxisPaneView(this, true),
//         ];
//         this._timeAxisPaneViews = [new PracPluginTimeAxisPaneView(this, false)];
//     }

//     updateAllViews() {
//         //* Use this method to update any data required by the
//         //* views to draw.
//         this._paneViews.forEach((pw) => pw.update());
//         this._timeAxisViews.forEach((pw) => pw.update());
//         this._priceAxisViews.forEach((pw) => pw.update());
//         this._priceAxisPaneViews.forEach((pw) => pw.update());
//         this._timeAxisPaneViews.forEach((pw) => pw.update());
//     }

//     priceAxisViews() {
//         //* Labels rendered on the price scale
//         return this._priceAxisViews;
//     }

//     timeAxisViews() {
//         //* labels rendered on the time scale
//         return this._timeAxisViews;
//     }

//     paneViews() {
//         //* rendering on the main chart pane
//         return this._paneViews;
//     }

//     priceAxisPaneViews() {
//         //* rendering on the price scale
//         return this._priceAxisPaneViews;
//     }

//     timeAxisPaneViews() {
//         //* rendering on the time scale
//         return this._timeAxisPaneViews;
//     }

//     autoscaleInfo(
//         startTimePoint: Logical,
//         endTimePoint: Logical
//     ): AutoscaleInfo | null {
//         //* Use this method to provide autoscale information if your primitive
//         //* should have the ability to remain in view automatically.
//         if (
//             this._timeCurrentlyVisible(
//                 this.p1.time,
//                 startTimePoint,
//                 endTimePoint
//             ) ||
//             this._timeCurrentlyVisible(
//                 this.p2.time,
//                 startTimePoint,
//                 endTimePoint
//             )
//         ) {
//             return {
//                 priceRange: {
//                     minValue: Math.min(this.p1.price, this.p2.price),
//                     maxValue: Math.max(this.p1.price, this.p2.price),
//                 },
//             };
//         }
//         return null;
//     }

//     dataUpdated(_scope: DataChangedScope): void {
//         //* This method will be called by PluginBase when the data on the
//         //* series has changed.
//     }

//     _timeCurrentlyVisible(
//         time: Time,
//         startTimePoint: Logical,
//         endTimePoint: Logical
//     ): boolean {
//         const ts = this.chart.timeScale();
//         const coordinate = ts.timeToCoordinate(time);
//         if (coordinate === null) return false;
//         const logical = ts.coordinateToLogical(coordinate);
//         if (logical === null) return false;
//         return logical <= endTimePoint && logical >= startTimePoint;
//     }

//     public get options(): PracPluginOptions {
//         return this._options;
//     }

//     applyOptions(options: Partial<PracPluginOptions>) {
//         this._options = { ...this._options, ...options };
//         this.requestUpdate();
//     }

//     public get p1(): Point {
//         return this._p1;
//     }

//     public get p2(): Point {
//         return this._p2;
//     }
// }

import { PluginBase } from './plugin-base';
import { LegendPaneView } from './pane-view';
import { Item, LegendItems, defaultItem, defaultItems } from './options';

// export class PracPlugin extends PluginBase {
//     private _paneViews: LegendPaneView[];

//     constructor(legendItems: LegendItems = defaultItems) {
//         super();
//         this._paneViews = [new LegendPaneView([...legendItems])];
//     }
//     addLegendItem(item: Item) {
//         const paneViewObj = this._paneViews[0];
//         paneViewObj.addItem({ ...defaultItem, ...item });
//     }
//     updateLegendItems(newItems: LegendItems = []) {
//         const paneViewObj = this._paneViews[0];
//         paneViewObj.updateItems(newItems);
//     }
//     paneViews() {
//         return this._paneViews;
//     }
// }

export class PracPlugin extends PluginBase {
    private _paneViews: LegendPaneView[];

    constructor(legendItems: LegendItems = defaultItems) {
        super();
        this._paneViews = [new LegendPaneView([...legendItems])];
    }

    updateAllViews() {
        //* Use this method to update any data required by the
        //* views to draw.
        this._paneViews.forEach((pw) => pw.update());
    }
    addLegendItem(item: Item) {
        this._paneViews[0].addItem({ ...defaultItem, ...item });
        this.requestUpdate(); // ✅ REQUIRED
    }

    updateLegendItems(newItems: LegendItems = []) {
        this._paneViews[0].updateItems(newItems);
        this.requestUpdate(); // ✅ REQUIRED
    }

    paneViews() {
        return this._paneViews;
    }
}
