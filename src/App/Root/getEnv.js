export default function() {
  const isBeta = window.location.hostname.includes('dev.dashboard.orion.hosting')
  const isProduction = !isBeta && window.location.hostname.includes('dashboard.orion.hosting')
  return isProduction ? 'prod' : 'dev'
}
