'use strict';
window.onload = function() {
  var state = [0, 0, 0, 0, 0];
  var current = 0;

  var q0 = document.getElementById('q0');
  var q1 = document.getElementById('q1');
  var q2 = document.getElementById('q2');
  var q3 = document.getElementById('q3');
  var q4 = document.getElementById('q4');
  var q5 = document.getElementById('q5');
  var e0 = document.getElementById('e0');
  var e1 = document.getElementById('e1');
  var e2 = document.getElementById('e2');
  var s = document.getElementById('submit');

  var validateEmail = function(email) {
    return !!email.match(/.+@.+\..+/);
  };
  var updateState = function() {
    var n = 0;
    state.forEach(function(v) {
      n = n + v;
    });
    var str = '' + current + 'to' + n;
    if (current !== n) {
      current = n;
      document.body.setAttribute('state', str);
      if (n >= 5) {
        s.classList.add('on');
        s.removeAttribute('disabled');
      } else {
        s.classList.remove('on');
        s.setAttribute('disabled', true);
      }
    }
  };
  var changeState = function(n, bool) {
    if (bool) {
      state[n] = 1;
      if (n === 0) {
        e0.classList.remove('on');
      } else if (n === 1) {
        e1.classList.remove('on');
      } else if (n === 2) {
        e2.classList.remove('on');
      }
    } else {
      state[n] = 0;
      if (n === 0) {
        e0.classList.add('on');
      } else if (n === 1) {
        e1.classList.add('on');
      } else if (n === 2) {
        e2.classList.add('on');
      }
    }
    updateState();
  };

  q0.addEventListener('change', function() {
    changeState(0, validateEmail(this.value));
  });
  q1.addEventListener('change', function() {
    changeState(1, this.value.length >= 8);
    changeState(2, q1.value === q2.value);
  });
  q2.addEventListener('change', function() {
    changeState(2, q1.value === q2.value);
  });
  q3.addEventListener('change', function() {
    changeState(3, !!this.value);
  });
  q4.addEventListener('change', function() {
    changeState(4, q4.value || q5.value);
  });
  q5.addEventListener('change', function() {
    changeState(4, q4.value || q5.value);
  });

  // setTimeout(function() {
  //   s.classList.add('on');
  //   s.removeAttribute('disabled');
  // }, 1000);

};
