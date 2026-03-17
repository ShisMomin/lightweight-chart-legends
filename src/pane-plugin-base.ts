import {
    DataChangedScope,
    IChartApi,
    IPanePrimitive,
    SeriesAttachedParameter,
    Time,
} from 'lightweight-charts';
import { ensureDefined } from './helpers/assertions';

//* PluginBase is a useful base to build a plugin upon which
//* already handles creating getters for the chart and series,
//* and provides a requestUpdate method.
export abstract class PanePluginBase implements IPanePrimitive<Time> {
    private _chart: IChartApi | undefined = undefined;

    protected dataUpdated?(scope: DataChangedScope): void;
    protected requestUpdate(): void {
        if (this._requestUpdate) this._requestUpdate();
    }
    private _requestUpdate?: () => void;

    public attached({ chart, requestUpdate }: SeriesAttachedParameter<Time>) {
        this._chart = chart;
        this._requestUpdate = requestUpdate;
        this.requestUpdate();
    }

    public detached() {
        this._chart = undefined;
        this._requestUpdate = undefined;
    }

    public get chart(): IChartApi {
        return ensureDefined(this._chart);
    }
}
