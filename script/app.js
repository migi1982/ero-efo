'use strict';
window.onload = function() {
  var q = [{
    target: document.getElementById('q0'),
    error: document.getElementById('e0'),
    state: 0,
  }, {
    target: document.getElementById('q1'),
    error: document.getElementById('e1'),
    state: 0,
  }, {
    target: document.getElementById('q2'),
    error: document.getElementById('e2'),
    state: 0,
  }, {
    target: document.getElementById('q3'),
    state: 0,
  }, {
    target: document.getElementById('q4'),
    state: 0,
  }, {
    target: document.getElementById('q5'),
    error: document.getElementById('e1'),
    state: 0,
  }];
  var s = document.getElementById('submit');

  var current = 0;

  var validateEmail = function(email) {
    return !!email.match(/.+@.+\..+/);
  };
  var updateState = function() {
    var n = 0;
    q.forEach(function(v) {
      n = n + v.state;
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
      q[n].state = 1;
      if (q[n].error) {
        q[n].error.classList.remove('on');
      }
    } else {
      q[n].state = 0;
      if (q[n].error) {
        q[n].error.classList.add('on');
      }
    }
    updateState();
  };

  q[0].target.addEventListener('change', function() {
    changeState(0, validateEmail(this.value));
  });
  q[1].target.addEventListener('change', function() {
    changeState(1, this.value.length >= 8);
    changeState(2, q[1].target.value === q[2].target.value);
  });
  q[2].target.addEventListener('change', function() {
    changeState(2, q[1].target.value === q[2].target.value);
  });
  q[3].target.addEventListener('change', function() {
    changeState(3, !!this.value);
  });
  q[4].target.addEventListener('change', function() {
    changeState(4, q[4].target.value || q[5].target.value);
  });
  q[5].target.addEventListener('change', function() {
    changeState(4, q[4].target.value || q[5].target.value);
  });

};
