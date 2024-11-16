function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
  
    if (!name || !email || !password || !dob || !gender) {
      alert("Please fill in all required fields.");
      return false;
    }
    
    const passwordPattern = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 8 characters long and contain both letters and numbers.");
      return false;
    }
    
    alert("Registration successful!");
    return true;
  }