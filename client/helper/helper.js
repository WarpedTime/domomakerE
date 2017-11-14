let color = 'blue';

const changeTheme = (color) =>{
  document.querySelector('body').classList = color;
};

const handleError = (message) => {
  $('#errorMessage').text(message);
  $('#domoMessage').animate({width:'toggle'}, 350);
};

const redirect = (response) => {
  $('#domoMessage').animate({width:'hide'},350);
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function(xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

const connectButtons = () => {
  document.querySelector('#red').onclick = () => {
    color = 'red'; changeTheme(color);
  };
  document.querySelector('#blue').onclick = () => {
    color = 'blue'; changeTheme(color);
  };
  document.querySelector('#green').onclick = () => {
    color = 'green'; changeTheme(color);
  };
  document.querySelector('#orange').onclick = () => {
    color = 'orange'; changeTheme(color);
  };
  document.querySelector('#purple').onclick = () => {
    color = 'purple'; changeTheme(color);
  };
};