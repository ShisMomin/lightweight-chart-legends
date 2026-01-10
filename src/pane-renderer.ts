import { CanvasRenderingTarget2D } from 'fancy-canvas';
import { IPrimitivePaneRenderer } from 'lightweight-charts';
import { LegendItems } from './options';

function formatLabeledValue(
    label: string = '',
    value: string | number = '∅'
): string {
    if (label.length <= 0) return `${value}`;

    return `${label}: ${value}`;
}

export class LegendPaneRenderer implements IPrimitivePaneRenderer {
    private _items: LegendItems = [];

    constructor(items: LegendItems) {
        this._items = items;
    }

    updateItems(items: LegendItems) {
        this._items = items;
    }

    // draw(target: CanvasRenderingTarget2D) {
    //     target.useBitmapCoordinateSpace((scope) => {
    //         const ctx = scope.context;
    //         const hRatio = scope.horizontalPixelRatio;
    //         const vRatio = scope.verticalPixelRatio;

    //         let x = 10 * hRatio;
    //         const y = 10 * vRatio;
    //         const gap = 16 * hRatio;

    //         ctx.textBaseline = 'top';

    //         for (const item of this._items) {
    //             const text = formatLabeledValue(item.label, item.value);

    //             // ✅ DO NOT multiply fontSize by vRatio
    //             ctx.font = `${item.fontSize}px ${item.fontFamily}`;
    //             ctx.fillStyle = item.textColor!;

    //             ctx.fillText(text, x, y);

    //             const width = ctx.measureText(text).width;
    //             x += width + gap;
    //         }
    //     });
    // }

    draw(target: CanvasRenderingTarget2D) {
        target.useBitmapCoordinateSpace((scope) => {
            const ctx = scope.context;
            const hRatio = scope.horizontalPixelRatio;
            const vRatio = scope.verticalPixelRatio;

            const paddingX = 10 * hRatio;
            const paddingY = 10 * vRatio;
            const gapX = 16 * hRatio;
            const gapY = 6 * vRatio;

            const maxWidth = scope.bitmapSize.width;

            let x = paddingX;
            let y = paddingY;

            ctx.textBaseline = 'top';

            for (const item of this._items) {
                const text = formatLabeledValue(item.label, item.value);

                ctx.font = `${item.fontSize}px ${item.fontFamily}`;
                ctx.fillStyle = item.textColor!;

                const metrics = ctx.measureText(text);
                const textWidth = metrics.width;
                const textHeight =
                    metrics.actualBoundingBoxAscent +
                        metrics.actualBoundingBoxDescent ||
                    item.fontSize! * vRatio;

                // 👉 Wrap to next line if no space
                if (x + textWidth > maxWidth - paddingX) {
                    x = paddingX;
                    y += textHeight + gapY;
                }

                ctx.fillText(text, x, y);
                x += textWidth + gapX;
            }
        });
    }
}
