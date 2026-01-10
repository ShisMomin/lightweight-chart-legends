// import { CanvasRenderingTarget2D } from 'fancy-canvas';
// import { IPrimitivePaneRenderer } from 'lightweight-charts';
// import { ViewPoint } from './pane-view';
// import { positionsBox } from './helpers/dimensions/positions';

// export class PracPluginPaneRenderer implements IPrimitivePaneRenderer {
//     _p1: ViewPoint;
//     _p2: ViewPoint;
//     _fillColor: string;

//     constructor(p1: ViewPoint, p2: ViewPoint, fillColor: string) {
//         this._p1 = p1;
//         this._p2 = p2;
//         this._fillColor = fillColor;
//     }

//     draw(target: CanvasRenderingTarget2D) {
//         target.useBitmapCoordinateSpace((scope) => {
//             if (
//                 this._p1.x === null ||
//                 this._p1.y === null ||
//                 this._p2.x === null ||
//                 this._p2.y === null
//             )
//                 return;
//             const ctx = scope.context;
//             const horizontalPositions = positionsBox(
//                 this._p1.x,
//                 this._p2.x,
//                 scope.horizontalPixelRatio
//             );
//             const verticalPositions = positionsBox(
//                 this._p1.y,
//                 this._p2.y,
//                 scope.verticalPixelRatio
//             );
//             ctx.fillStyle = this._fillColor;
//             ctx.fillRect(
//                 horizontalPositions.position,
//                 verticalPositions.position,
//                 horizontalPositions.length,
//                 verticalPositions.length
//             );
//         });
//     }
// }

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

// export class LegendPaneRenderer implements IPrimitivePaneRenderer {
//     private _items: LegendItems = [];

//     constructor(legendItems: LegendItems) {
//         this._items = [...legendItems];
//     }

//     draw(target: CanvasRenderingTarget2D) {
//         target.useBitmapCoordinateSpace((scope) => {
//             const ctx = scope.context;
//             const hRatio = scope.horizontalPixelRatio;
//             const vRatio = scope.verticalPixelRatio;

//             let x = 10 * hRatio; // left padding
//             const y = 10 * vRatio; // top padding
//             const gap = 16 * hRatio; // space between items
//             ctx.textBaseline = 'top';
//             for (const item of this._items) {
//                 // Build display text
//                 // const text = `${item.label}: ${item.value}`;
//                 const text = formatLabeledValue(item.label, item.value);

//                 // Apply font per item
//                 ctx.font = `${item.fontSize! * vRatio}px ${item.fontFamily}`;
//                 ctx.fillStyle = item.textColor!;

//                 // Draw text
//                 ctx.fillText(text, x, y);

//                 // Measure width for flex-like layout
//                 const metrics = ctx.measureText(text);
//                 x += metrics.width + gap;
//             }
//         });
//     }
// }

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
