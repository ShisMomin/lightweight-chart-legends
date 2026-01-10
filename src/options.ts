export interface Item {
    id: number;
    label: string;
    value: number | string;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
}
export type LegendItems = Item[];
export const defaultItems: LegendItems = [];
export const defaultItem: Item = {
    id: Date.now(),
    label: '',
    value: '',
    textColor: 'black',
    fontSize: 12,
    fontFamily: 'Arial',
};
