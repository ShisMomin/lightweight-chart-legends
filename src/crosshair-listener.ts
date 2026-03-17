import { LegendItems } from './options';
import { PaneLegend } from './pane-legend';
import { PluginBase } from './plugin-base';
// import { LegendPaneView } from './pane-view';
// import { Item, LegendItems, defaultItem, defaultItems } from './options';

import {
    LineData,
    MouseEventParams,
    OhlcData,
    SeriesAttachedParameter,
    Time,
} from 'lightweight-charts';
export class CrosshairListener extends PluginBase {
    private _legendObj: PaneLegend | null = null;
    private _legendUpdateData: LegendItems = [];
    private _numDecimal = 2;
    constructor(
        legend: PaneLegend,
        updateData: LegendItems,
        numDecimal?: number,
    ) {
        super();
        this._legendObj = legend;
        this._legendUpdateData = updateData;
        if (numDecimal) this._numDecimal = numDecimal;
    }
    override attached(params: SeriesAttachedParameter<Time>) {
        const { chart } = params;
        super.attached({ ...params });
        if (this.series.seriesType() === 'Line') {
            chart.subscribeCrosshairMove(this.onLineSeriesCrosshairEvent);
        }
        if (this.series.seriesType() === 'Candlestick') {
            chart.subscribeCrosshairMove(
                this.onCandleStickSeriesCrosshairEvent,
            );
        }
    }
    override detached() {
        if (this.series.seriesType() === 'Line') {
            this.chart.unsubscribeCrosshairMove(
                this.onLineSeriesCrosshairEvent,
            );
        }
        if (this.series.seriesType() === 'Candlestick') {
            this.chart.unsubscribeCrosshairMove(
                this.onCandleStickSeriesCrosshairEvent,
            );
        }
        super.detached();
    }
    private _findIndexByTime(data: OhlcData[], time: Time): number {
        let left = 0;
        let right = data.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midTime = data[mid].time as Time;

            if (midTime === time) return mid;

            if (midTime < time) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    private updateohlcData({
        currohlcValues = [],
        lastohlcValues = [],
    }: {
        currohlcValues: number[];
        lastohlcValues: number[];
    }) {
        if (
            currohlcValues.length <= 0 ||
            lastohlcValues.length <= 0 ||
            !this._legendObj
        )
            return;
        for (let i = 0; i < 4; i++) {
            const ele = this._legendUpdateData[i];
            this._legendObj.updateLegendItems([
                {
                    ...ele,
                    textColor: `${
                        lastohlcValues[i] < currohlcValues[i]
                            ? '#26a69a'
                            : lastohlcValues[i] === currohlcValues[i]
                              ? '#7b08ede7'
                              : '#ef5350'
                    }
                        `,
                    value: currohlcValues[i].toFixed(this._numDecimal),
                },
            ]);
        }
    }
    private onCandleStickSeriesCrosshairEvent = (param: MouseEventParams) => {
        const data = param.seriesData.get(this.series) as OhlcData;
        // console.log(param);
        if (!data || !this._legendObj) return;
        const currohlcValues = Object.values(data);
        const seriesAllData = this.series.data() as OhlcData[];
        const { close: currClose } = data;
        const currdataIndex = this._findIndexByTime(
            seriesAllData,
            currohlcValues.at(-1),
        );

        const lastdataIndex = currdataIndex > 0 ? currdataIndex - 1 : 0;
        const lastohlcValues = Object.values(seriesAllData[lastdataIndex]);
        const { close: lastClose } = seriesAllData[lastdataIndex];
        const percentageChange = ((currClose - lastClose) / lastClose) * 100;
        if (this._legendObj.isLegendItemExist('percentage')) {
            this._legendObj.updateLegendItems([
                {
                    id: 'percentage',
                    label: '',
                    textColor: `${percentageChange > 0 ? '#26a69a' : '#ef5350'}
                        `,
                    value: `(${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(this._numDecimal)}%)`,
                },
            ]);
        }
        this.updateohlcData({ currohlcValues, lastohlcValues });
    };
    private onLineSeriesCrosshairEvent = (param: MouseEventParams) => {
        const data = param.seriesData.get(this.series) as LineData;
        if (!data || !this._legendObj) return;
        // console.log(this._legendObj);
        for (let i = 0; i < this._legendUpdateData.length; i++) {
            const ele = this._legendUpdateData[i];
            this._legendObj.updateLegendItems([
                { ...ele, value: data?.value.toFixed(this._numDecimal) },
            ]);
        }
        // console.log(data);
    };
}
