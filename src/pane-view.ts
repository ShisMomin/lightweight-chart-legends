// import { Coordinate, IPrimitivePaneView } from 'lightweight-charts';
// import { PracPluginPaneRenderer } from './pane-renderer';
// import { PracPluginDataSource } from './data-source';

// export interface ViewPoint {
//     x: Coordinate | null;
//     y: Coordinate | null;
// }

// export class PracPluginPaneView implements IPrimitivePaneView {
//     _source: PracPluginDataSource;
//     _p1: ViewPoint = { x: null, y: null };
//     _p2: ViewPoint = { x: null, y: null };

//     constructor(source: PracPluginDataSource) {
//         console.log(source);
//         this._source = source;
//     }

//     update() {
//         // console.log(this._source.series.getPane().getHTMLElement());
//         const series = this._source.series;
//         const y1 = series.priceToCoordinate(this._source.p1.price);
//         const y2 = series.priceToCoordinate(this._source.p2.price);
//         const timeScale = this._source.chart.timeScale();
//         const x1 = timeScale.timeToCoordinate(this._source.p1.time);
//         const x2 = timeScale.timeToCoordinate(this._source.p2.time);
//         this._p1 = { x: x1, y: y1 };
//         this._p2 = { x: x2, y: y2 };
//     }

//     renderer() {
//         return new PracPluginPaneRenderer(
//             this._p1,
//             this._p2,
//             this._source.options.fillColor
//         );
//     }
// }

import { IPrimitivePaneView } from 'lightweight-charts';
import { LegendPaneRenderer } from './pane-renderer';
import { Item, LegendItems } from './options';

// export class LegendPaneView implements IPrimitivePaneView {
//     private _items: LegendItems = [];

//     constructor(legendItems: LegendItems) {
//         this._items = [...legendItems];
//     }

//     update() {
//         // No dynamic data yet
//     }
//     addItem(newItem: Item) {
//         this._items.push({ ...newItem });
//     }
//     updateItems(newItems: LegendItems = []) {
//         for (const item of newItems) {
//             const ind = this._items.findIndex((it) => it.id === item.id);
//             if (ind < 0) continue;
//             // Update the existing item
//             this._items[ind] = {
//                 ...this._items[ind],
//                 ...item,
//             };
//         }
//     }
//     renderer() {
//         return new LegendPaneRenderer(this._items);
//     }
// }

export class LegendPaneView implements IPrimitivePaneView {
    private _items: LegendItems = [];
    private _renderer: LegendPaneRenderer;

    constructor(legendItems: LegendItems) {
        this._items = [...legendItems];
        this._renderer = new LegendPaneRenderer(this._items);
    }

    update() {
        this._renderer.updateItems(this._items);
    }

    addItem(newItem: Item) {
        this._items = [...this._items, { ...newItem }];
    }

    updateItems(newItems: LegendItems = []) {
        this._items = this._items.map((it) => {
            const updated = newItems.find((n) => n.id === it.id);
            return updated ? { ...it, ...updated } : it;
        });
    }

    renderer() {
        return this._renderer;
    }
}
