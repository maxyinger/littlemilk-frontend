// stopAction :: action -> _
export const stopAction = action => {
  if (Object.prototype.hasOwnProperty.call(action, 'stop')) {
    action.stop()
    return
  }
  if (Array.isArray(action)) {
    action.forEach(stopAction)
    return
  }
  if (Object.values(action).length > 0) {
    Object.values(action).forEach(stopAction)
  }
}

// stopActions :: [] || {} -> _
export const stopActions = actions => {
  if (actions === null || actions === undefined) return
  if (Object.keys(actions).length === 0 && actions.constructor === Object) {
    return
  }
  if (Object.prototype.hasOwnProperty.call(actions, 'stop')) {
    actions.stop()
    return
  }
  if (Array.isArray(actions)) {
    actions.map(stopActions)
    return
  }
  if (!(Object.keys(actions).length === 0 && actions.constructor === Object)) {
    Object.values(actions).map(stopActions)
  }
}
