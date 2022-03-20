
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

let _UI = (state = {}) => el('div')
let _reducer = (state) => state
let _state = {}
let cause = (beforeState, action, afterState) => true
let effect = (beforeState, action, afterState, dispatchAfter) =>
  console.log(action.type, action, afterState)
let _causeEffectPairs = [
  [cause, effect],
]

export const init = (
  UI = _UI,
  reducer = _reducer,
  state = _state,
  causeEffectPairs = _causeEffectPairs
) => {
  _UI = UI
  _reducer = reducer
  _state = state
  _causeEffectPairs = causeEffectPairs
}

const dispatchAfter = (action) => window.setTimeout(() => dispatch(action))

export const dispatch = (action) => {
  const beforeState = _state
  _state = _reducer(_state, action)

  for (const [p, r] of _causeEffectPairs) {
    if (p(beforeState, action, _state))
      r(beforeState, action, _state, dispatchAfter)
  }

  document.body.replaceChildren()
  document.body.append(_UI(_state))
}
