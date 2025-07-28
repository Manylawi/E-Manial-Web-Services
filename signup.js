// Password toggles
const password = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
passwordToggle.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
confirmPasswordToggle.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Signup logic
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const passwordVal = password.value;
    const confirmPasswordVal = confirmPassword.value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    if (passwordVal !== confirmPasswordVal) {
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = "block";
        return;
    }
    if (passwordVal.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long!";
        errorMessage.style.display = "block";
        return;
    }
    const users = JSON.parse(localStorage.getItem('e-maniel-users')) || [];
    if (users.find(user => user.email === email)) {
        errorMessage.textContent = "This email is already registered!";
        errorMessage.style.display = "block";
        return;
    }
    const newUser = {
        fullName,
        email,
        password: passwordVal,
        phone,
        address,
        wallet: {
            balance: 1000,
            transactions: []
        },
        reservations: [],
        profilePicture: "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName) + "&background=8B4513&color=fff"
    };
    users.push(newUser);
    localStorage.setItem('e-maniel-users', JSON.stringify(users));
    successMessage.textContent = "Account created successfully! Redirecting to login...";
    successMessage.style.display = "block";
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});