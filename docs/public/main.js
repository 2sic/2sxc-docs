// import * as hljsRazor from 'highlightjs-cshtml-razor';
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// https://stackoverflow.com/questions/9899372/vanilla-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-whe
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
function test() {
    console.log('test');
}
export default {
    configureHljs: (hljs) => {
        // todo
        // https://github.com/highlightjs/highlightjs-cshtml-razor
        // Customize hightlight.js here
        console.log('configureHljs');
        // hljs.registerLanguage('cshtml-razor', hljsRazor);
        // hljs.registerAliases('razor', { languageName: 'cshtml-razor' });
    },
};
docReady(function () {
    // find all image tags but not #logo, and add the lightbox
    // - all images
    // - but not images for links
    // - not the logo
    // - not a feature logo
    const imgSelector = 'img:not(#logo):not(.for-link):not(.feature)';
    const imgs = document.querySelectorAll(imgSelector);
    imgs.forEach(img => {
        // debug
        console.log('2dm img', img);
        const filename = img.src;
        // add cursor
        img.style.cursor = 'zoom-in';
        img.style.cursor = '-moz-zoom-in';
        img.style.cursor = '-webkit-zoom-in';
        // add alt if not already there
        if (!img.alt)
            img.setAttribute('alt', filename);
        // var link = img.parentElement as HTMLElement;
        // if ((link as HTMLAnchorElement)?.href) {
        //   console.log('2dm link', link);
        //   // link = img;
        //   (Fancybox as any).bind([link]);
        // } else {
        //   console.log('2dm link when img', link);
        //   link.addEventListener('click', function() {
        //     (Fancybox as any).fromNodes([img]);
        //   }, false);
        // }
        // add featherlight
        // img.addEventListener('click', function() {
        //   $.featherlight(filename);
        // });
        // Bind Fancybox 5
        // Fancybox.fromNodes([img], {
        //   // custom options tbd
        //   // defaultType: 'html',
        // });
    });
    Fancybox.bind(imgSelector);
    // var imgArray = Array.from(imgs);
    // var Fancybox = (window as any).Fancybox as Fancybox;
    // (Fancybox as any).fromNodes(imgArray);
    // set version button link
    setVersionButtonLink();
});
function generateLightboxHtml(img) {
}
function setVersionButtonLink() {
    const versionSelector = document.getElementsByClassName('version-button')[0];
    var oldLink = versionSelector.href;
    var newLink = oldLink + '?version=17.00&path=' + window.location.pathname;
    versionSelector.setAttribute('href', newLink);
}
