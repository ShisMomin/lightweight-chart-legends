import {
	IChartApi,
	ISeriesApi,
	SeriesOptionsMap,
	Time,
} from 'lightweight-charts';
import { PracPluginOptions } from './options';

export interface Point {
	time: Time;
	price: number;
}

export interface PracPluginDataSource {
	chart: IChartApi;
	series: ISeriesApi<keyof SeriesOptionsMap>;
	options: PracPluginOptions;
	p1: Point;
	p2: Point;
}
