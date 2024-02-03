document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  validateElement(name, 'name');
  validateElement(email, 'email');
  validateElement(message, 'message');
});

function validateElement(element, key){
  var isValid = true;

  if (!element) {
    document.getElementById(key + '-error').textContent = 'Please enter your ' + key;
    isValid = false;
  } else {
    document.getElementById(key + '-error').textContent = '';
  }

  isValid(isValid);
}

function isValid(isValid){
  if (isValid) {
    // Simulating submission process with a progress bar animation
    var progressBar = document.querySelector('.progress');
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        // Reset form after submission
        document.getElementById('contact-form').reset();
      } else {
        width++;
        progressBar.style.width = width + '%';
      }
    }
  }
}
