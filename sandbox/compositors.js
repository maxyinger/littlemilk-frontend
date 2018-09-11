const { merge, tween, action, physics } = require('popmotion')

merge(
  tween(),
  action(({ update }) => update(1)),
  physics({ velocity: 1000 })
).start(v => console.log(v))
