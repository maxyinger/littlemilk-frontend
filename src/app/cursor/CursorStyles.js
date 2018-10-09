const normal = {
  strokeStart  : 0,
  strokeEnd    : 100,
  radius       : 20,
  opacity      : 1,
  lineWidth    : 1,
  arrowOffset  : 30,
  arrowOpacity : 0
}

const initial = {
  strokeStart : 0,
  strokeEnd   : 0
}

const link = {
  radius  : 0,
  opacity : 0
}

const drag = {
  radius       : 15,
  arrowOpacity : 1,
  arrowOffset  : 5
}
const noCursor = {
  radius: 0
}

const sticky = {
  radius    : 50,
  lineWidth : 0.5
  // opacity : 0.6
}

const exitTransition = {
  strokeEnd : 0,
  opacity   : 0
}

const enterTransition = {
  strokeEnd : 100,
  radius    : 30,
  opacity   : 1
}

export default {
  initial,
  normal,
  link,
  drag,
  sticky,
  exitTransition,
  enterTransition,
  noCursor
}
