import { truncate, inspectList, inspectProperty } from './helpers'

const errorKeys = new Set(['stack', 'line', 'column', 'name', 'message', 'fileName', 'lineNumber', 'columnNumber'])

export default function inspectObject(error, options) {
  const properties = Object.getOwnPropertyNames(error).filter(key => !errorKeys.has(key))
  const name = error.name
  options.truncate -= name.length
  let message = ''
  if (typeof error.message === 'string') {
    message = truncate(error.message, options.truncate)
  } else {
    properties.unshift('message')
  }
  message = message ? `: ${message}` : ''
  options.truncate -= message.length + 5
  const propertyContents = inspectList(
    properties.map(key => [key, error[key]]),
    options,
    inspectProperty
  )
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ''}`
}
