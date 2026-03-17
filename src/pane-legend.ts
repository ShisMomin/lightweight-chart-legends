// import { PluginBase } from './plugin-base';
import { LegendPaneView } from './pane-view';
import { Item, LegendItems, defaultItem, defaultItems } from './options';
import { PanePluginBase } from './pane-plugin-base';

export class PaneLegend extends PanePluginBase {
    private _paneViews: LegendPaneView[];

    constructor(legendItems: LegendItems = defaultItems) {
        super();
        this._paneViews = [new LegendPaneView([...legendItems])];
        // this._paneView = new LegendPaneView([...legendItems]);
    }

    updateAllViews() {
        //* Use this method to update any data required by the
        //* views to draw.
        this._paneViews.forEach((pw) => pw.update());
        // this._paneView.update();
    }
    addLegendItem(item: Item) {
        this._paneViews[0].addItem({ ...defaultItem, ...item });
        this.requestUpdate();
    }

    updateLegendItems(newItems: LegendItems = []) {
        this._paneViews[0].updateItems(newItems);
        this.requestUpdate();
    }
    isLegendItemExist(id: number | string) {
        return this._paneViews[0].checkIsItemExistById(id);
    }
    removeLegendItem(id: number | string) {
        this._paneViews[0].removeItem(id);
        this.requestUpdate();
    }
    paneViews() {
        return this._paneViews;
    }
}
