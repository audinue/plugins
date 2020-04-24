function select (selector, attached, detached = () => {}) {
  Array.from(document.querySelectorAll(selector)).forEach(attached)
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const isElement = node => node instanceof HTMLElement
      const toMatched = (matched, element) => [
        ...matched,
        ...(element.matches(selector) ? [element] : []),
        ...element.querySelectorAll(selector)
      ]
      Array.from(mutation.addedNodes)
        .filter(isElement)
        .reduce(toMatched, [])
        .forEach(attached)
      Array.from(mutation.removedNodes)
        .filter(isElement)
        .reduce(toMatched, [])
        .forEach(detached)
    })
  }).observe(document, { childList: true, subtree: true })
}
