

const tags = ['a', 'li', 'ul', 'h1', 'pre', 'span', 'div']


const el = (tag = 'div', props = {}, children = []) => {
  const elem = document.createElement(tag)
  for (k in props) {
    if (k === 'style')
      for (k2 in props.style)
        elem.style[k2] = props.style[k2]
    else
      elem[k] = props[k]
  }

  for (c of children)
    elem.append(c)

  return elem
}

elCreators = tags.reduce((elCreators, tag) => {
  elCreators[tag] = (props = {}, children = []) => el(tag, props, children)
  return elCreators
}, {})

const getHash = () => {
  return decodeURIComponent(document.location.hash.slice(1))
}

const Frame = (...children) => el('div', {}, children)

const txt = (text) => el('span', { textContent: text })

const root = document.getElementById('app-root')
const render = (Els) => {
  root.replaceChildren()

  if (Array.isArray(Els))
    for (El of Els)
      root.append(El())
  else
    root.append(Els())
}

Object.assign(window, { el, getHash, render, txt, Frame }, elCreators)
