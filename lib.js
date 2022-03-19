
const tags = ['a', 'li', 'ul', 'h1', 'pre', 'span', 'div', 'input', 'table', 'tr', 'td']

export const el = (tag = 'div', props = {}, ...children) => {
  const elem = document.createElement(tag)

  for (const k in props) {
    if (k === 'style')
      for (const k2 in props.style)
        elem.style[k2] = props.style[k2]
    else
      elem[k] = props[k]
  }

  for (const c of children)
    elem.append(c)

  return elem
}

export const elCreators = tags.reduce((elCreators, tag) => {
  elCreators[tag] = (props = {}, ...children) => el(tag, props, ...children)
  return elCreators
}, {})

export const Frame = (...children) => el('div', {}, ...children)

export const txt = (text) => el('span', { textContent: text })

let _state = {}
let _Root = () => el('div')
let _reducer = (state) => state

export const init = (Root, reducer, state) => {
  _Root = Root
  _reducer = reducer
  _state = state
}

export const dispatch = (action) => {
  _state = _reducer(_state, action)
  console.log(action.type, action, _state)
  document.body.replaceChildren()
  document.body.append(_Root(_state))
}
