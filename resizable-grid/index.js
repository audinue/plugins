(function () {
  var resizing = null

  function toFloat (value) {
    return parseFloat(value)
  }

  function parseSizes (string) {
    return string.split(' ').map(toFloat)
  }

  function parseAxes (sizes, gap, start) {
    function accumulate (result, size) {
      result.push(result[result.length - 1] + size + gap)
      return result
    }
    return sizes.slice(1, sizes.length - 1).reduce(accumulate, [sizes[0] + start])
  }

  function hitGap (value, gap) {
    return function (axis) {
      return value >= axis && value <= axis + gap
    }
  }

  function parse (event) {
    var grid = event.target
    if (!grid.matches || !grid.matches('.resizable-grid')) {
      return null
    }
    var x       = event.offsetX
    var y       = event.offsetY
    var style   = getComputedStyle(grid)
    var gap     = parseSizes(style.gridGap)
    var gapY    = gap[0]
    var gapX    = gap[1]
    var left    = parseFloat(style.paddingLeft)
    var top     = parseFloat(style.paddingTop)
    var rows    = parseSizes(style.gridTemplateRows)
    var columns = parseSizes(style.gridTemplateColumns)
    var ys      = parseAxes(rows, gap[0], left)
    var xs      = parseAxes(columns, gap[1], top)
    var row     = ys.findIndex(hitGap(y, gapY))
    var column  = xs.findIndex(hitGap(x, gapX))
    return {
      grid   : grid,
      rows   : rows,
      columns: columns,
      row    : row,
      column : column
    }
  }

  function toPx (value) {
    return value + 'px'
  }

  function toSizesString (sizes) {
    return sizes.map(toPx).join(' ')
  }

  addEventListener('mousedown', function mousedown (e) {
    var result = parse(e)
    if (result !== null && (result.row > -1 || result.column > -1)) {
      e.preventDefault()
      resizing = result
      result.grid.dispatchEvent(new CustomEvent('grid-resize-begin', {
        bubbles: true
      }))
    }
  })

  addEventListener('mousemove', function mousemove (e) {
    if (resizing === null) {
      var result = parse(e)
      if (result !== null) {
        var style = result.grid.style
        if (result.row > -1 && result.column > -1) {
          style.cursor = 'nwse-resize'
        } else if (result.row > -1) {
          style.cursor = 'ns-resize'
        } else if (result.column > -1) {
          style.cursor = 'ew-resize'
        } else {
          style.cursor = 'auto'
        }
      } else if (e.target.closest) {
        var grid = e.target.closest('.resizable-grid')
        if (grid !== null) {
          grid.style.cursor = 'auto'
        }
      }
    } else {
      if (resizing.row > -1) {
        resizing.rows[resizing.row]         += e.movementY
        resizing.rows[resizing.row + 1]     -= e.movementY
        resizing.grid.style.gridTemplateRows = toSizesString(resizing.rows)
      }
      if (resizing.column > -1) {
        resizing.columns[resizing.column]      += e.movementX
        resizing.columns[resizing.column + 1]  -= e.movementX
        resizing.grid.style.gridTemplateColumns = toSizesString(resizing.columns)
      }
      resizing.grid.dispatchEvent(new CustomEvent('grid-resize', {
        bubbles: true
      }))
    }
  })

  addEventListener('mouseup', function mouseup () {
    if (resizing !== null) {
      resizing.grid.dispatchEvent(new CustomEvent('grid-resize-end', {
        bubbles: true
      }))
      resizing = null
    }
  })
})()
