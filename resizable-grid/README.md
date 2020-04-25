# resizable-grid

Make [CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) resizable. See [demo](https://audinue.github.io/plugins/resizable-grid/demo.html).

## Install

```html
<script src="https://audinue.github.io/plugins/resizable-grid/index.js"></script>
```

## Usage

```html
<style>
  .example {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto auto auto;
  }
</style>

<div class="example resizable-grid">
  <div>foo</div>
  <div>bar</div>
  <div>baz</div>
</div>
```

- This plugin modifies `grid-template-rows` and `grid-template-columns`.
- On resize:
  - `resizable-grid-start`, `resizable-grid-move` and `resizable-grid-end` events will be dispatched.
  - `resizable-grid-resize` class will be added on resize.

## Limitations

- Supports mouse only.
- Weird stuff happens when grid item has `padding`s on it.
