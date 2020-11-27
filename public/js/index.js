/*** Scroll Transitons ***/

(function($) {
  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

$(window).scroll(function(event) {
  
  $(".main-box").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});

$(window).scroll(function(event) {
  
  $(".slide").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("slide-in"); 
    } 
  });
  
});

/*** Navbar Transition on Scroll ***/

$(window).scroll(function(){
  $('nav').toggleClass('fixed-top', $(this).scrollTop() > 100);
  $('.navbar-brand').toggleClass('scrolled', $(this).scrollTop() > 100);
  $('.nav-link').toggleClass('nav-link-scrolled', $(this).scrollTop() > 100);
});