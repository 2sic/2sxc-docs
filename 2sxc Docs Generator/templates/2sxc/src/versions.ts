export function setVersionButtonLink() {
  const versionSelector = document.getElementsByClassName('version-button')[0] as HTMLAnchorElement;
  var oldLink = versionSelector.href;
  var newLink = oldLink + '?version=17.00&path=' + window.location.pathname;
  versionSelector.setAttribute('href', newLink);
}
