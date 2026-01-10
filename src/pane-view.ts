import { IPrimitivePaneView } from 'lightweight-charts';
import { LegendPaneRenderer } from './pane-renderer';
import { Item, LegendItems } from './options';

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
