// Activate featherlite for quick lightboxes
$(document).ready(function() {
  //find all images, but not the logo, and add the lightbox
  $('img').not('#logo').not('.for-link').each(function() {
    var $img = $(this);
    // debug
    console.log('img', $img);
    var filename = $img.attr('src')
    //add cursor
    $img.css('cursor','zoom-in');
    $img.css('cursor','-moz-zoom-in');
    $img.css('cursor','-webkit-zoom-in');

    //add featherlight
    $img.attr('alt', filename);
    $img.featherlight(filename);
  });

  // attach current link to the version box
  const vButton = $('.version-button');
  vButton.attr('href', vButton.attr('href') + '?version=16.09&path=' + window.location.pathname);
});

// Fancybox
function attachFancybox() {
  var containers = $(".fancybox-auto");
  // add ID if missing
  containers.each(function(i, e) {
    if(!e.id) e.id = 'rndId-' + Math.floor(Math.random() * Math.floor(9999999))

    // check if we need to attach some classes from parent
    var pcls = $(e).parent().attr("class");
    if(pcls) {
      var clsList = pcls.split(' ');
      var contextCls = clsList.find(c => c.startsWith('context'));
      if(contextCls) $(e).addClass(contextCls);
    }
  });
  // attach click
  containers.click(function() {
    showDivWithSvg(this.id);
  });
} 
$(attachFancybox);

function showDivWithSvg(target) {
  var newName = target + '-clone';
  var clone = document.getElementById(newName);
  if(!clone) {
    clone = document.getElementById(target).cloneNode(true);
    clone.id = newName;
    clone.style.width = "95%";
    $(clone).click(function() { $.fancybox.close() })
    document.body.appendChild(clone);
  }
  $.fancybox.open( {
    src: '#' + newName,
    type: 'inline',
  });
}