
// https://stackoverflow.com/questions/9899372/vanilla-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-whe
function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}    

function test() {
  console.log('test')
}

export default {
  configureHljs: (hljs) => {
    // todo
    // https://github.com/highlightjs/highlightjs-cshtml-razor
    // Customize hightlight.js here
    // hljs.registerLanguage('razor', hljsCshtml);
    console.log('configureHljs');
    hljs.registerAliases('razor', { languageName: 'cshtml-razor' });
  },

}

docReady(function() {
  // find all image tags but not #logo, and add the lightbox
  const imgs = document.querySelectorAll('img:not(#logo):not(.for-link)');
  imgs.forEach(img => {
    // debug
    console.log('img', img);
    const filename = img.src;
    // add cursor
    img.style.cursor = 'zoom-in';
    img.style.cursor = '-moz-zoom-in';
    img.style.cursor = '-webkit-zoom-in';

    // add alt if not already there
    if (!img.alt) img.setAttribute('alt', filename);
    
    // add featherlight
    // img.addEventListener('click', function() {
    //   $.featherlight(filename);
    // });
    // Bind Fancybox 5
    window.Fancybox.bind(img, {
      // custom options tbd
    });
  });
});