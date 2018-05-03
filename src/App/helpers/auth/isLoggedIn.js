export default function() {
  const publicKey = localStorage.getItem('session.publicKey')
  const secretKey = localStorage.getItem('session.secretKey')
  return publicKey && secretKey
}
