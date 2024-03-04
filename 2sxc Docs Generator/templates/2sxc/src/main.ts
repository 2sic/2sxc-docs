import * as hljsRazor from 'highlightjs-cshtml-razor';
import { Fancybox } from "@fancyapps/ui";
import { Xref } from './xref/xref';
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

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
    // https://github.com/highlightjs/highlightjs-cshtml-razor
    // Customize hightlight.js here
    console.log('configureHljs');
    hljs.registerLanguage('cshtml-razor', hljsRazor);
    hljs.registerAliases('razor', { languageName: 'cshtml-razor' });
  },

}

docReady(function() {
  // find all image tags but not #logo, and add the lightbox
  // - all images
  // - but not images for links
  // - not the logo
  // - not a feature logo
  const imgSelector = 'img:not(#logo):not(.for-link):not(.feature)';

  const imgs : NodeListOf<HTMLImageElement> = document.querySelectorAll(imgSelector);
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
  });

  // Attach Fancybox to all these images
  (Fancybox as any).bind(imgSelector);

  // set version button link
  setVersionButtonLink();

  // add xref links if we're on xref.html
  // This is a bit special, but I don't know how to trigger code inside the JS-Module
  // from the page itself, so I'm just doing it here with url-checks
  Xref.runXrefPage();
});



function generateLightboxHtml(img: HTMLImageElement) {

}

console.log('2sxc main.ts 2');

function setVersionButtonLink() {
  const versionSelector = document.getElementsByClassName('version-button')[0] as HTMLAnchorElement;
  var oldLink = versionSelector.href;
  var newLink = oldLink + '?version=17.00&path=' + window.location.pathname;
  versionSelector.setAttribute('href', newLink);
}
