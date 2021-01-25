function search() {
  var searchText = $("#word").val();
  $(".searchText:contains('" + searchText + "')").css("background","#FF0");
}


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

// $(window).scroll(function(event) {
  
//   $(".slide").each(function(i, el) {
//     var el = $(el);
//     if (el.visible(true)) {
//       el.addClass("slide-in"); 
//     } 
//   });
  
// });

/*** Navbar Transition on Scroll ***/

$(window).scroll(function(){
  $('nav').toggleClass('fixed-top', $(this).scrollTop() > 100);
  $('nav').toggleClass('', $(this).scrollTop() > 100);
  $('.navbar').toggleClass('transparent', $(this).scrollTop() > 100);
  $('.nav-link').toggleClass('nav-link-scrolled', $(this).scrollTop() > 100);
  $('.scroll-up').toggleClass('scrolled', $(this).scrollTop() > 100);
  $('.side-list').toggleClass('display', $(this).scrollTop() > 100);
  $('.list').toggleClass('display', $(this).scrollTop() > 100);


  // $('.sec-nav').toggleClass('hold', $(this).scrollTop() > 200);
});

/*** Carousel ***/

$(document).ready(function () {
    $('.slider').slick({
        dots: false,
        infinite: true,
        cssEase: 'linear',
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
});


    
    function change() {
                var change = document.getElementById("toggle");
                if (change.innerHTML == "+ EXPAND FOR MORE DETAILS")
                {
                    change.innerHTML = "- EXPAND FOR MORE DETAILS";
                }
                else {
                    change.innerHTML = "+ EXPAND FOR MORE DETAILS";
                }
            }

    function question(n) {
                var change = document.getElementById(n);
                if (change.innerHTML == "+")
                {
                    change.innerHTML = "-";
                }
                else {
                    change.innerHTML = "+";
                }
            }

    function tech(p) {
                var change = document.getElementById(p);
                if (change.innerHTML == '<div class="plus">+</div>')
                {
                    change.innerHTML = '<div class="plus">-</div>';
                }
                else {
                    change.innerHTML = '<div class="plus">+</div>';
                }
                console.log('working')
            }

tech();
change();


function search() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByClassName('searchli');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("search-title")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}





    