# Select

Do something when an element is attached to or detached from document.

## Install

```html
<script src="https://audinue.github.io/plugins/select/index.js"></script>
```

## Usage

```js
function attached (element) {
  // Do something...
}

function detached (element) {
  // Do something...
}

select('selector', attached)
select('selector', attached, detached)
```
