const isBeta = window.location.hostname.includes('dev')
const isProduction = !isBeta && window.location.hostname.includes('tufirma.digital')
const baseURL = isProduction
  ? 'https://api.tufirma.digital'
  : isBeta ? 'http://dev.api.orion.hosting' : `http://${window.location.hostname}:3000`

export default baseURL
