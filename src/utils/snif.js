/**
 * Snif function created by @ariiiman on github
 * https://github.com/ariiiman/s/blob/master/src/Core/Ease.js
 */

/*
──────────────────────────────────────────
──────────────────────────────────────────
SNIF
──────────────────────────────────────────
──────────────────────────────────────────
const isSafari = Snif.isSafari
const version = Snif.version
const isTouch = Snif.isTouch
*/

export default {
  uA: navigator.userAgent.toLowerCase(),

  get isMobileIE () {
    return /iemobile/i.test(this.uA)
  },

  get isMobileOpera () {
    return /opera mini/i.test(this.uA)
  },

  get isIOS () {
    return /iphone|ipad|ipod/i.test(this.uA)
  },

  get isBlackberry () {
    return /blackberry/i.test(this.uA)
  },

  get isMobileAndroid () {
    return /android.*mobile/.test(this.uA)
  },

  get isAndroid () {
    return (
      this.isMobileAndroid ||
      (!this.isMobileAndroid && /android/i.test(this.uA))
    )
  },

  get isFirefox () {
    return this.uA.indexOf('firefox') > -1
  },

  get safari () {
    return this.uA.match(/version\/[\d.]+.*safari/)
  },

  get isSafari () {
    return !!this.safari && !this.isAndroid
  },

  get isSafariOlderThan8 () {
    var limit = 8
    var version = limit
    if (this.isSafari) {
      var versionWithVersionWord = this.safari[0].match(/version\/\d{1,2}/)
      version = +versionWithVersionWord[0].split('/')[1]
    }
    return version < limit
  },

  get isIEolderThan11 () {
    return this.uA.indexOf('msie') > -1
  },

  get isIE11 () {
    return navigator.appVersion.indexOf('Trident/') > 0
  },

  get isIE () {
    return this.isIEolderThan11 || this.isIE11
  },

  get isEdge () {
    return /Edge\/\d./i.test(this.uA)
  },

  get isMac () {
    return navigator.platform.toLowerCase().indexOf('mac') > -1
  },

  get isMobile () {
    return (
      this.isMobileAndroid ||
      this.isBlackberry ||
      this.isIOS ||
      this.isMobileOpera ||
      this.isMobileIE
    )
  },

  get isTouch () {
    return 'ontouchstart' in window
  }
}
