export const getServerRootFrom = (req = {}) => {
  const isServer = typeof window === 'undefined'
  const protocol = isServer
    ? req.headers['x-forwarded-proto'] || 'http'
    : window.location.protocol.slice(0, -1)
  const host = isServer ? req.headers.host : window.location.host

  return `${protocol}://${host}`
}
