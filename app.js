const engines = [
  ['DuckDuckGo', 'https://duckduckgo.com/?q=%s'],
  ['DuckDuckLight', 'https://lite.duckduckgo.com/lite/?q=%s'],
  ['YouTube', 'https://www.youtube.com/results?search_query=%s'],
  ['Brave', 'https://search.brave.com/search?q=%s'],
  ['who.is', 'https://who.is/whois-ip/ip-address/%s'],
  ['amazon.de', 'https://www.amazon.de/s?k=%s'],
  ['Yarn', 'https://yarnpkg.com/?q=%s'],
  ['GitHub', 'https://github.com/search?q=%s&ref=opensearch'],
  ['Wikipedia', 'https://en.wikipedia.org/w/index.php?title=Special:Search&search=%s'],
  ['Google', 'https://www.google.com/search?q=%s'],
  ['tex.stackexchange', 'https://tex.stackexchange.com/search?q=%s'],
  ['CTAN', 'https://ctan.org/search?phrase=%s'],
  ['Searchalot', 'https://www.searchalot.com/?q=%s'],
  ['MDN', 'https://developer.mozilla.org/search?q=%s'],
  ['Stack Overflow', 'https://stackoverflow.com/search?q=%s&s=77e9f150-aa9c-4536-9f2f-9c474891f32a'],
  ['Bing', 'https://www.bing.com/search?q=%s'],
  ['GMX', 'https://search.gmx.com/web/result?q=%s'],
]

const Link = ({ pattern = '%s', q = 'term', name = 'Engine' }, children = []) => {
  const href = pattern.replace('%s', encodeURIComponent(q))

  return a({ href }, [
    pre({ style: { display: 'inline-block' } }, [
      txt(`${name}: ${href}`)
    ])
  ])
}

const Root = () => App({ q: getHash() })

const App = ({ q }) => Frame(
  h1({}, [txt(`Search for: "${q}"`)]),
  ul({}, engines
    .map(([name, pattern]) => Link({ pattern, q, name }))
    .map(a => el('li', {}, [a])))
)

window.onhashchange = () => render(Root)
render(Root)
