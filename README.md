# Legends - Lightweight Charts™ Plugin

A custom **Legend plugin** built for **Lightweight Charts™** using the official **primitive plugin architecture**.

This plugin renders a fully customizable legend **inside the chart pane**, supports **dynamic updates**, **crosshair-based value syncing**, and automatically **wraps legend items to the next line** when space runs out — ensuring the legend never overflows the chart.

## ✨ Features

-   📌 Renders legend **inside the chart pane**
-   🔄 Updates legend values on **crosshair move**
-   📐 Automatic line wrapping (flex-like layout)
-   🎨 Per-item styling (color, font, size)
-   ⚡ High-DPI (retina) safe rendering
-   🧩 Built using **Lightweight Charts primitives**

## 📦 Built With

-   [Lightweight Charts™](https://github.com/tradingview/lightweight-charts)
-   Primitive Plugin API (`ISeriesPrimitive`)
-   `fancy-canvas` for high-DPI rendering
-   TypeScript

**Compatible with:**  
`lightweight-charts@v5.0.0`

## Running Locally

```shell
npm install
npm run dev
```

Visit `localhost:5173` in the browser.

## Compiling

```shell
npm run compile
```

Check the output in the `dist` folder.
