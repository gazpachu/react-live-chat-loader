import STATES from '../utils/states'

const domain = 'https://js.driftt.com'

const loadScript = () => {
  if (window.drift) return

  !(function() {
    var t = (window.driftt = window.drift = window.driftt || [])
    if (!t.init) {
      if (t.invoked) {
        return void (
          window.console &&
          //eslint-disable-next-line no-console
          console.error &&
          //eslint-disable-next-line no-console
          console.error('Drift snippet included twice.')
        )
      }
      //eslint-disable-next-line no-extra-semi
      ;(t.invoked = !0),
        (t.methods = [
          'identify',
          'config',
          'track',
          'reset',
          'debug',
          'show',
          'ping',
          'page',
          'hide',
          'off',
          'on'
        ]),
        (t.factory = function(e) {
          return function() {
            var n = Array.prototype.slice.call(arguments)
            return n.unshift(e), t.push(n), t
          }
        }),
        t.methods.forEach(function(e) {
          t[e] = t.factory(e)
        }),
        (t.load = function(t) {
          var e = 3e5,
            n = Math.ceil(new Date() / e) * e,
            o = document.createElement('script')
          ;(o.type = 'text/javascript'),
            (o.async = !0),
            (o.crossorigin = 'anonymous'),
            (o.src = 'https://js.driftt.com/include/' + n + '/' + t + '.js')
          var i = document.getElementsByTagName('script')[0]
          i.parentNode.insertBefore(o, i)
        })
    }
  })()
}

const load = ({ providerKey, setState }) => {
  loadScript()
  window.drift.load(providerKey)
  window.drift.SNIPPET_VERSION = '0.3.1'
  window.drift.on('ready', () => {
    setState(STATES.OPEN)
    setTimeout(() => setState(STATES.COMPLETE), 2000)
  })
}

const open = () => window.drift.on('ready', api => api.showWelcomeMessage())

const close = () => window.drift.on('ready', api => api.hideWelcomeMessage())

export default {
  domain,
  load,
  open,
  close
}
