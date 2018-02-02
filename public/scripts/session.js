$(document).ready(function() {

  function loadNav() {
    
    $.ajax({
      type: 'GET',
      url: '/nav',
      success: function(data) {
        console.log(data);
  
        if (data.body === 'register/login' ) {
          $('.register-login').show();
        };
  
        if (data.body === 'compose/logout' ) {
          $('.compose-logout').show();
        };

      }
    });  
  }
  
  loadNav();

});