import debug from 'debug'

export default target => {
  const logger = {
    log: debug(`dock:${target}`),
    error: debug(`dock:${target}`)
  }

  logger.log.log = console.log.bind(console) // eslint-disable-line
  logger.error.log = console.error.bind(console) // eslint-disable-line

  return logger
}
