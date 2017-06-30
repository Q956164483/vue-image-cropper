export function setDPR () {
  var viewport = document.querySelector('meta[name=viewport]');
  // var initialScale = 1/window.devicePixelRatio
  // viewport.setAttribute('content', 'width=device-width,initial-scale=' + initialScale + ', maximum-scale=' + initialScale + ', minimum-scale=' + initialScale + ', user-scalable=no');
  if (window.devicePixelRatio === 1) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
  }
  if (window.devicePixelRatio === 2) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
  }
  if (window.devicePixelRatio === 3) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
  }
}
export function remChange () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var widthProportion = function () {
    var doc = document.body || document.documentElement;
    var p = doc.clientWidth;
    return Math.floor(p / 7.5);
  };
  var changePage = function () {
    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + widthProportion() + 'px');
  };
  changePage();
  window.addEventListener(resizeEvt, changePage, false);
}

