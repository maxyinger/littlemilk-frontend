// stopAction :: action -> _
export const stopAction = action => {
  if (Object.prototype.hasOwnProperty.call(action, 'stop')) {
    action.stop()
  }
  if (Array.isArray(action)) return action.forEach(stopAction)
}

// stopActions :: [] || {} -> _
export const stopActions = actions => {
  if (Array.isArray(actions)) return actions.forEach(stopAction)
  /** If actions is JSON convert values to array */
  Object.values(actions).forEach(stopAction)
}
