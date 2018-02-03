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
  
  // register a username
  $('.register').submit((event) => {
    event.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: '/register',
      data: $(".register input[type='text']").serialize(),
      success: function(res) {
        console.log(res);
        
        if (res.body === 'username taken') {
          $('.popup-msg').text('This username is already taken.').addClass('popup-red').slideDown(function() {
            setTimeout(function() {
              $('.popup-msg').slideUp();
            }, 3000);
          });
        };
        
        if (res.body === 'username created') {
          $('.popup-msg').text('Username successfully created').addClass('.popup-green').slideDown(function() {
            setTimeout(function() {
              $('.popup-msg').slideUp();
            }, 3000);
          });
          
          $('.register-login').hide();
          $('.compose-logout').show();
        };
      }
    });
  });
  
  // log in 
  $('.login').submit((event) => {
    console.log(event);
    event.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: '/login',
      data: $(".login input[type='text']").serialize(),
      success: function(res) {
        console.log(res);
        
        if (res.body === "it's not a valid username") {
          console.log("it's not a valid username");
          $('.popup-msg').text("it's not a valid username").addClass('popup-red').slideDown(function() {
            setTimeout(function() {
              $('.popup-msg').slideUp();
            }, 3000);
          });
        };
        
        if (res.body === "awesome, you're logged in") {
          // console.log("awesome, you're logged in");
          $('.popup-msg').text("awesome, you're logged in").addClass('popup-green').slideDown(function() {
            setTimeout(function() {
              $('.popup-msg').slideUp();
            }, 3000);
          });
          
          $('.register-login').hide();
          $('.compose-logout').show();
        };
      }
    });
  });
  
});