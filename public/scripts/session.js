$(document).ready(function() {

  function loadNav() {
    
    $.ajax({
      type: 'GET',
      url: '/nav',
      success: function(res) {
        // console.log(res);
  
        if (res.body === 'register/login' ) {
          $('.register-login').show();
        };
  
        if (res.body === 'compose/logout' ) {
          $('.compose-logout').show();
        };

      }
    });  
  }
  
  loadNav();

  $('.register').submit((event) => {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/register',
      data: $(".register input[type='text']").serialize(),
      success: function(res) {
        console.log(res);

        if (res.body === 'username taken') {
          $('.username-taken').slideDown(function() {
            setTimeout(function() {
              $('.username-taken').slideUp();
            }, 3000);
          });
          return;
        };

        if (res.body === 'username created') {
           $('.username-created').slideDown(function() {
            setTimeout(function() {
              $('.username-created').slideUp();
            }, 3000);
          });
          return;
        };
      }
    });

  });

});