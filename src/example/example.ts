import { LineSeries, createChart } from 'lightweight-charts';
import { generateLineData } from '../sample-data';
import { PracPlugin } from '../pracplugin';

const chart = ((window as unknown as any).chart = createChart('chart', {
    autoSize: true,
}));

const lineSeries = chart.addSeries(
    LineSeries,
    {
        color: '#000000',
    },
    1
);

const data = generateLineData();
lineSeries.setData(data);
const legend = new PracPlugin();

legend.addLegendItem({
    // title: 'per',
    id: 1,
    label: 'BTCUSDT',
    value: '∅',
});

lineSeries.attachPrimitive(legend);
legend.addLegendItem({
    // title: 'simple',
    id: 2,
    label: '',
    value: `+(${23})`,
    textColor: 'green',
});
chart.subscribeCrosshairMove((param) => {
    // const value = param.seriesData;
    const data = param.seriesData.get(lineSeries);
    const value = data?.value;
    if (!value) return;
    legend.updateLegendItems([{ id: 1, label: 'BTCUSDT', value }]);
});
