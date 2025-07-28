// Password toggle
const loginPassword = document.getElementById('loginPassword');
const loginPasswordToggle = document.getElementById('loginPasswordToggle');
loginPasswordToggle.addEventListener('click', function () {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Login logic
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    const users = JSON.parse(localStorage.getItem('e-maniel-users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('e-maniel-current-user', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = "Invalid email or password. Please try again.";
        errorMessage.style.display = "block";
        setTimeout(() => { errorMessage.style.display = "none"; }, 3000);
    }
});