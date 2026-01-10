import { PluginBase } from './plugin-base';
import { LegendPaneView } from './pane-view';
import { Item, LegendItems, defaultItem, defaultItems } from './options';

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
