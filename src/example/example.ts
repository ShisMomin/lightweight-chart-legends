import {
    CandlestickData,
    CandlestickSeries,
    LineSeries,
    createChart,
} from 'lightweight-charts';
import dayjs from 'dayjs';
import { generateLineData } from '../sample-data';
// import { PracPlugin } from '../pracplugin';
import { PaneLegend, CrosshairListener } from '../pracplugin';
const createStubArray = (length: number) => new Array(length).fill(0);

const generateOHLCData = (length: number): CandlestickData<string>[] => {
    const start = dayjs().subtract(length, 'day');
    let previousClose = Math.max(1, Math.random() * 100);

    return createStubArray(length).map((_, i) => {
        const open = previousClose;
        const high = open + Math.random() * 10;
        let low = open - Math.random() * 10;

        low = Math.max(0, low);

        const minimalDistance = 0.01;
        const adjustedHigh = Math.max(high, low + minimalDistance);

        const close = low + Math.random() * (adjustedHigh - low);

        previousClose = close;

        return {
            time: start.add(i, 'day').format('YYYY-MM-DD'),
            open,
            high: adjustedHigh,
            low,
            close,
        };
    });
};
const chart = ((window as unknown as any).chart = createChart('chart', {
    autoSize: true,
}));

const lineSeries = chart.addSeries(
    LineSeries,
    {
        color: '#000000',
    },
    1,
);
const candleStickSeries = chart.addSeries(CandlestickSeries);

const candleStickData = generateOHLCData(100);
const data = generateLineData();
lineSeries.setData(data);
candleStickSeries.setData(candleStickData);
const legend = new PaneLegend();
const legend2 = new PaneLegend();

legend.addLegendItem({
    // title: 'per',
    id: 1,
    label: 'BTCUSDT',
    value: '∅',
});
legend2.addLegendItem({
    // title: 'per',
    id: 'open',
    label: 'O',
    value: '∅',
});
legend2.addLegendItem({
    // title: 'per',
    id: 'high',
    label: 'H',
    value: '∅',
});
legend2.addLegendItem({
    // title: 'per',
    id: 'low',
    label: 'L',
    value: '∅',
});
legend2.addLegendItem({
    // title: 'per',
    id: 'close',
    label: 'C',
    value: '∅',
});
legend2.addLegendItem({
    id: 'percentage',
    label: '',
    value: '∅',
});

// lineSeries.attachPrimitive(legend);

const pane0 = candleStickSeries.getPane();
const pane1 = lineSeries.getPane();
pane1.attachPrimitive(legend);
pane0.attachPrimitive(legend2);
legend.addLegendItem({
    // title: 'simple',
    id: 2,
    label: '',
    value: `+(${23})`,
    textColor: 'green',
});
const crosshairListener = new CrosshairListener(legend, [
    {
        // title: 'per',
        id: 1,
        label: 'BTCUSDT',
        value: '∅',
    },
]);
const crosshairListene2 = new CrosshairListener(legend2, [
    {
        // title: 'per',
        id: 'open',
        label: 'O',
        value: '∅',
    },
    {
        // title: 'per',
        id: 'high',
        label: 'H',
        value: '∅',
    },
    {
        // title: 'per',
        id: 'low',
        label: 'L',
        value: '∅',
    },
    {
        // title: 'per',
        id: 'close',
        label: 'C',
        value: '∅',
    },
    {
        // title: 'per',
        id: 'percentage',
        label: '',
        value: '∅',
    },
]);
lineSeries.attachPrimitive(crosshairListener);
candleStickSeries.attachPrimitive(crosshairListene2);
// chart.subscribeCrosshairMove((param) => {
//     // const value = param.seriesData;
//     const data = param.seriesData.get(lineSeries) as LineData;
//     const value = data?.value;
//     if (!value) return;
//     legend.updateLegendItems([{ id: 1, label: 'BTCUSDT', value }]);
// });
