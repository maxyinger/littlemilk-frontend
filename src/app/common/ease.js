/**
 * Ease function created by @ariiiman on github
 * https://github.com/ariiiman/s/blob/master/src/Core/Ease.js
 */

/*
──────────────────────────────────────────
──────────────────────────────────────────
EASE
──────────────────────────────────────────
──────────────────────────────────────────
PROPERTIES
──────────
i           In
o           Out
io          InOut
1           Sine
2           Quad
3           Cubic
4           Quart
5           Quint
6           Expo
USAGE
─────
{ ease: Ease['linear'] }
*/

export default {
  linear : m => m,
  i1     : m => -Math.cos(m * (Math.PI / 2)) + 1,
  o1     : m => Math.sin(m * (Math.PI / 2)),
  io1    : m => -0.5 * (Math.cos(Math.PI * m) - 1),
  i2     : m => m * m,
  o2     : m => m * (2 - m),
  io2    : m => (m < 0.5 ? 2 * m * m : -1 + (4 - 2 * m) * m),
  i3     : m => m * m * m,
  o3     : m => --m * m * m + 1,
  io3    : m => {
    return m < 0.5 ? 4 * m * m * m : (m - 1) * (2 * m - 2) * (2 * m - 2) + 1
  },
  i4  : m => m * m * m * m,
  o4  : m => 1 - --m * m * m * m,
  io4 : m => (m < 0.5 ? 8 * m * m * m * m : 1 - 8 * --m * m * m * m),
  i5  : m => m * m * m * m * m,
  o5  : m => 1 + --m * m * m * m * m,
  io5 : m => {
    return m < 0.5 ? 16 * m * m * m * m * m : 1 + 16 * --m * m * m * m * m
  },
  i6  : m => (m === 0 ? 0 : Math.pow(2, 10 * (m - 1))),
  o6  : m => (m === 1 ? 1 : -Math.pow(2, -10 * m) + 1),
  io6 : m => {
    if (m === 0) return 0
    if (m === 1) return 1
    if ((m /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (m - 1))
    return 0.5 * (-Math.pow(2, -10 * --m) + 2)
  }
}
