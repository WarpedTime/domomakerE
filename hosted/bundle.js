'use strict';

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $('#domoMessage').animate({ width: 'hide' }, 350);

  if ($('#domoName').val() == '' || $('#domoAge').val() == '' || $('#domoFood').val() == '') {
    handleError("RAWR! All fields are required.");
    return false;
  }

  sendAjax('POST', $('#domoForm').attr('action'), $('#domoForm').serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var DomoForm = function DomoForm(props) {
  return React.createElement(
    'form',
    { id: 'domoForm',
      onSubmit: handleDomo,
      name: '/domoForm',
      action: '/maker',
      method: 'POST',
      className: 'domoForm'
    },
    React.createElement(
      'label',
      { htmlFor: 'name' },
      'Name: '
    ),
    React.createElement('input', { id: 'domoName', type: 'text', name: 'name', placeholder: 'Domo Name' }),
    React.createElement(
      'label',
      { htmlFor: 'age' },
      'Age: '
    ),
    React.createElement('input', { id: 'domoAge', type: 'text', name: 'age', placeholder: 'Domo Age' }),
    React.createElement(
      'label',
      { htmlFor: 'food' },
      'Fav Food: '
    ),
    React.createElement('input', { id: 'domoFood', type: 'text', name: 'food', placeholder: 'Favorite Food' }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('input', { classsName: 'makeDomoSubmit', type: 'submit', value: 'Make Domo' })
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      'div',
      { className: 'domoList' },
      React.createElement(
        'h3',
        { className: 'emptyDomo' },
        'No Domos yet'
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return React.createElement(
      'div',
      { key: domo._id, className: 'domo' },
      React.createElement('img', { src: '/assets/img/domoface.jpeg', alt: 'domo face', className: 'domoFace' }),
      React.createElement(
        'h3',
        { className: 'domoName' },
        'Name: ',
        domo.name
      ),
      React.createElement(
        'h3',
        { className: 'domoAge' },
        'Age: ',
        domo.age
      ),
      React.createElement(
        'h3',
        { className: 'domoFood' },
        'Favorite Food: ',
        domo.food
      )
    );
  });

  return React.createElement(
    'div',
    { className: 'domoList' },
    domoNodes
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector('#domos'));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector('#makeDomo'));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector('#domos'));

  loadDomosFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
  changeTheme(color);
  connectButtons();
});
'use strict';

var color = 'blue';

var changeTheme = function changeTheme(color) {
  document.querySelector('body').classList = color;
};

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#domoMessage').animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $('#domoMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var connectButtons = function connectButtons() {
  document.querySelector('#red').onclick = function () {
    color = 'red';changeTheme(color);
  };
  document.querySelector('#blue').onclick = function () {
    color = 'blue';changeTheme(color);
  };
  document.querySelector('#green').onclick = function () {
    color = 'green';changeTheme(color);
  };
  document.querySelector('#orange').onclick = function () {
    color = 'orange';changeTheme(color);
  };
  document.querySelector('#purple').onclick = function () {
    color = 'purple';changeTheme(color);
  };
};
