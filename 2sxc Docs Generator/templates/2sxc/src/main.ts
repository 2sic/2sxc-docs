// import * as hljsRazor from 'highlightjs-cshtml-razor';


// https://stackoverflow.com/questions/9899372/vanilla-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-whe
function docReady(fn: Function) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn as EventListenerOrEventListenerObject);
  }
}    

function test() {
  console.log('test')
}

export default {
  configureHljs: (hljs: any) => {
    // todo
    // https://github.com/highlightjs/highlightjs-cshtml-razor
    // Customize hightlight.js here
    console.log('configureHljs');
    // hljs.registerLanguage('cshtml-razor', hljsRazor);
    // hljs.registerAliases('razor', { languageName: 'cshtml-razor' });
  },

}

docReady(function() {
  // find all image tags but not #logo, and add the lightbox
  const imgs : NodeListOf<HTMLImageElement> = document.querySelectorAll('img:not(#logo):not(.for-link)');
  imgs.forEach(img => {
    // debug
    console.log('2dm img', img);
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
    // window.Fancybox.bind(img, {
    //   // custom options tbd
    // });
  });

  // Find the version selector and update the URL
  // const vButton = $('.version-button');
  // vButton.attr('href', vButton.attr('href') + '?version=16.09&path=' + window.location.pathname);

  const versionSelector = document.getElementsByClassName('version-button')[0] as HTMLAnchorElement;
  var oldLink = versionSelector.href;
  var newLink = oldLink + '?version=17.00&path=' + window.location.pathname
  versionSelector.setAttribute('href', newLink);
});