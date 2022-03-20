import { init, dispatch, txt, elCreators, Frame } from './lib.js'
const { div, h1, ul, pre, a, li, input } = elCreators

const engines = [
  ['Dict', 'https://www.dict.cc/?s=%s'],
  ['Brave', 'https://search.brave.com/search?q=%s'],
  ['GMX', 'https://search.gmx.com/web/result?q=%s&origin=web&comp=web_start_sf&p=gmx-com'],
  ['Wikipedia', 'https://en.wikipedia.org/w/index.php?title=Special:Search&search=%s'],
  ['MDN', 'https://developer.mozilla.org/search?q=%s'],
  ['Python', 'https://docs.python.org/3/search.html?q=%s&check_keywords=yes&area=default'],
  ['Git', 'https://git-scm.com/search/results?search=%s'],
  ['PyPI', 'https://pypi.org/search/?q=%s'],
  ['CTAN', 'https://ctan.org/search?phrase=%s'],
  ['tex.stackexchange', 'https://tex.stackexchange.com/search?q=%s'],
  ['Google Scholar', 'https://scholar.google.at/scholar?q=%s'],
  ['Searchalot', 'https://www.searchalot.com/?q=%s'],
  ['DuckDuckGo', 'https://duckduckgo.com/?q=%s'],
  ['DuckDuckLight', 'https://lite.duckduckgo.com/lite/?q=%s'],
  ['who.is', 'https://who.is/whois-ip/ip-address/%s'],
  ['Yarn', 'https://yarnpkg.com/?q=%s'],
  ['GitHub', 'https://github.com/search?q=%s&ref=opensearch'],
  ['Stack Overflow', 'https://stackoverflow.com/search?q=%s'],
  ['YouTube', 'https://www.youtube.com/results?search_query=%s'],
  ['amazon.de', 'https://www.amazon.de/s?k=%s'],
  ['Google', 'https://www.google.com/search?q=%s'],
  ['Bing', 'https://www.bing.com/search?q=%s'],
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'input':
      return { q: action.value }
    case 'hash':
    case 'init':
      return { q: action.hash }
    default:
      return state
  }
}

const SearchField = ({ q }) => input({
  value: q,
  onchange: (e) => dispatch({ type: 'input', value: e.target.value })
})

const Link = ({ pattern = '%s', q = 'term', name = 'Engine' }) => {
  const href = pattern.replace('%s', encodeURIComponent(q))
  return a({ href }, txt(`${name} - ${href}`))
}

const UI = (state) => App({ q: state.q })

const App = ({ q }) => Frame(
  div({ className: 'search' }, txt(`Search:`), SearchField({ q })),
  ul({}, ...engines
    .map(([name, pattern]) => Link({ pattern, q, name }))
    .map(a => li({}, a)))
)

window.onhashchange = () => dispatch({
  type: 'hash',
  hash: decodeURIComponent(document.location.hash.slice(1))
})

const changeTitle = [
  (_, action) => ['input', 'hash', 'init'].includes(action.type),
  (_, __, afterState) => document.title = `${afterState.q} - Search Interceptor`,
]
const logActions = [
  () => true,
  (_, action, afterState) => console.log(action.type, action, afterState)
]
const causeEffectPairs = [changeTitle, logActions]
const initState = { q: '' }

init(UI, reducer, initState, causeEffectPairs)

dispatch({
  type: 'init',
  hash: decodeURIComponent(document.location.hash.slice(1).replace(/\+/g, ' ')),
})
