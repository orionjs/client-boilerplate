export default function() {
  const isBeta = window.location.hostname.includes('dev')
  const isProduction = !isBeta && window.location.hostname.includes('.com')
  return isProduction ? 'prod' : 'dev'
}
