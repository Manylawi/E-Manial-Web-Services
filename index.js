function getCurrentUser() {
    return JSON.parse(localStorage.getItem('e-maniel-current-user'));
}
function logoutUser() {
    localStorage.removeItem('e-maniel-current-user');
    location.reload();
}
function renderUserNav(user) {
    const userNav = document.getElementById('userNav');
    const navLinks = document.querySelectorAll('.dropdown-item, .nav-link');
    if (user) {
        userNav.innerHTML = `
                    <img src="${user.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName) + '&background=8B4513&color=fff'}" style="width:35px;height:35px;border-radius:50%;border:2px solid var(--accent-color);margin-right:8px;" alt="User Avatar" />
                    <span class="me-2">${user.fullName}</span>
                    <button class="btn btn-sm btn-outline-light" onclick="logoutUser()">Logout</button>
                `;
        navLinks.forEach(link => {
            link.classList.remove('disabled');
            link.setAttribute('tabindex', '0');
            if (link.dataset.href) link.setAttribute('href', link.dataset.href);
        });
    } else {
        userNav.innerHTML = `
                    <a href="login.html" class="btn btn-outline-light btn-sm me-2">Login</a>
                    <a href="signup.html" class="btn btn-outline-light btn-sm">Sign Up</a>
                `;
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.classList.add('disabled');
                link.setAttribute('tabindex', '-1');
                if (link.getAttribute('href')) {
                    link.dataset.href = link.getAttribute('href');
                    link.removeAttribute('href');
                }
            }
        });
    }
}
function renderHome(user) {
    document.getElementById('mainContent').innerHTML = `
                <section class="hero">
                    <div class="hero-content container">
                        <h1>Welcome to e-Manial</h1>
                        <p>Your digital gateway to all city services in Manial, Cairo. Discover, book, and manage services with ease.</p>
                        <a href="#services" class="btn hero-btn">Explore Services</a>
                    </div>
                </section>
                <section class="gallery-section">
                    <div class="container">
                        <div class="gallery-title">Gallery: Manial & Attractions</div>
                        <div class="row g-3">
                            <div class="col-md-4 col-6">
                                <img src="https://img.youm7.com/ArticleImgs/2019/8/5/45616-640px-Nilometer_Rhoda_Island_Cairo_June_1966.jpg" alt="Manial Island" class="gallery-img">
                            </div>
                            <div class="col-md-4 col-6">
                                <img src="https://www.albawabhnews.com/Upload/libfiles/607/6/881.jpg" alt="Manial Gardens" class="gallery-img">
                            </div>
                            <div class="col-md-4 col-6">
                                <img src="https://www.inside-egypt.com/img/thumbs/w1200h800q85/news/e6182033cd0eda91f3ef.jpeg" alt="Palace" class="gallery-img">
                            </div>
                        </div>
                    </div>
                </section>
                <section class="wikipedia-section">
                    <div class="container">
                        <div class="wikipedia-title">About Manial (Google)</div>
                        <div class="wikipedia-content">
                            <p>
                                <strong>Manial</strong> also known as Rhoda Island, is home to the lavish Prince Mohamed Ali Palace, a former royal residence with carved ceilings, chandeliers, and an ornate clock tower amid landscaped gardens. Manasterly Palace houses the Umm Kolthoum Museum, dedicated to the famed Egyptian singer, and the 861-built Nilometer, once used to measure the level of the Nile. Riverfront paths are popular for cycling and strolls. ― Google
                                <br>
                                <small>
                                    <a href="https://www.google.com/search?q=%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%84&oq=%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%84&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyBwgBEC4YgAQyBggCEAAYHjIGCAMQABgeMgYIBBAAGB4yBggFEAAYHjIGCAYQRRg8MgYIBxBFGDzSAQgzOTM5ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8" target="_blank" style="color:var(--accent-color);">Learn more on Google</a>
                                </small>
                            </p>
                        </div>
                    </div>
                </section>
                <section class="user-profile" id="myAccount">
                    <div class="container">
                        <div class="profile-card row g-0 shadow">
                            <div class="col-md-4 text-center profile-header d-flex flex-column align-items-center justify-content-center">
                                <img id="profileImg" src="${user.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName) + '&background=8B4513&color=fff'}" alt="Profile Photo" class="profile-img mb-2">
                                <div class="profile-name" id="profileName">${user.fullName}</div>
                                <small id="profileEmail" style="color:#fff;">${user.email}</small>
                                <div class="wallet-card mt-4 w-100">
                                    <div>Wallet Balance</div>
                                    <div class="wallet-balance" id="walletAmount">EGP ${(user.wallet?.balance || 0).toFixed(2)}</div>
                                </div>
                            </div>
                            <div class="col-md-8 profile-info">
                                <div class="info-title">Account Details</div>
                                <form id="profileForm" class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="inputName" value="${user.fullName}">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Email</label>
                                        <input type="email" class="form-control" id="inputEmail" value="${user.email}">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Phone</label>
                                        <input type="text" class="form-control" id="inputPhone" value="${user.phone || ''}">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Address</label>
                                        <input type="text" class="form-control" id="inputAddress" value="${user.address || ''}">
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
                                    </div>
                                </form>
                                <div class="info-title mt-4">Recent Activity</div>
                                <div class="reservation-item">Soccer Field booked for May 2, 2025, 5:00 PM</div>
                                <div class="reservation-item">Paid EGP 150 for Electricity Bill</div>
                                <div class="reservation-item">Cinema tickets purchased for April 28, 2025</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="services" id="services">
                    <div class="container">
                        <h2 class="section-title">Our Services</h2>
                        <div class="row g-4">
                            <div class="col-lg-3 col-md-6">
                                <div class="service-card">
                                    <div class="service-icon"><i class="fas fa-utensils"></i></div>
                                    <div class="service-content">
                                        <h3 class="service-title">Restaurants</h3>
                                        <p class="service-text">Discover local restaurants, make reservations, and explore the culinary scene of Manial.</p>
                                        <a href="Restaurants/Restaurants.html" class="service-link" target="_blank">Explore <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="service-card">
                                    <div class="service-icon"><i class="fas fa-hospital"></i></div>
                                    <div class="service-content">
                                        <h3 class="service-title">Health Services</h3>
                                        <p class="service-text">Find clinics, book appointments with doctors, and access emergency health services.</p>
                                        <a href="Health/Health.html" class="service-link" target="_blank">Find Care <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="service-card">
                                    <div class="service-icon"><i class="fas fa-film"></i></div>
                                    <div class="service-content">
                                        <h3 class="service-title">Cinema</h3>
                                        <p class="service-text">Check movie schedules, book tickets, and enjoy the latest films at local theaters.</p>
                                        <a href="Cinema/Cinema.html" class="service-link" target="_blank">See Movies <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="service-card">
                                    <div class="service-icon"><i class="fas fa-masks-theater"></i></div>
                                    <div class="service-content">
                                        <h3 class="service-title">Entertainment</h3>
                                        <p class="service-text">Events, theaters, and fun activities for all ages in Manial.</p>
                                        <a href="Entertainment/Entertainment.html" class="service-link" target="_blank">See Events <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="service-card">
                                    <div class="service-icon"><i class="fas fa-bus"></i></div>
                                    <div class="service-content">
                                        <h3 class="service-title">Transport</h3>
                                        <p class="service-text">Public transport, taxi, and navigation options in Manial.</p>
                                        <a href="Transport/Transport.html" class="service-link" target="_blank">See Routes <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="service-card">
                                    <div class="service-icon"><i class="fas fa-file-invoice-dollar"></i></div>
                                    <div class="service-content">
                                        <h3 class="service-title">Bills</h3>
                                        <p class="service-text">Pay your utility and city bills online, securely and easily.</p>
                                        <a href="Bills/Bills.html" class="service-link" target="_blank">Pay Now <i class="fas fa-arrow-right ms-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="about-manial" id="about">
                    <div class="container">
                        <h2 class="section-title">About Manial</h2>
                        <div class="about-content">
                            <p>Manial is a historic district in Cairo, Egypt, known for the Manial Palace and Museum built by Prince Mohammed Ali Tewfik between 1899 and 1929. The palace complex includes residential quarters, ceremonial halls, a museum, and extensive gardens.</p>
                            <p>Today, Manial is a vibrant community with a rich cultural heritage, modern amenities, and a growing population. Our e-Manial platform connects residents and visitors to all the services and attractions this beautiful district has to offer.</p>
                        </div>
                    </div>
                </section>
                <section class="map-section">
                    <div class="container">
                        <h2 class="section-title">Find Us</h2>
                        <div class="map-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2519362046773!2d31.2276!3d30.0274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145846c1e6d7e7e1%3A0x2d4c9b3e7c0b1e7e!2sManial%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1714486400000!5m2!1sen!2seg" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </section>
            `;
}
function renderLoginPrompt() {
    document.getElementById('mainContent').innerHTML = `
                <div class="not-logged-in">
                    <div class="login-prompt">
                        <h2>Welcome to e-Manial</h2>
                        <p>Please login or sign up to access your account and city services.</p>
                        <a href="login.html" class="btn btn-primary me-2">Login</a>
                        <a href="signup.html" class="btn btn-outline-primary">Get Started</a>
                    </div>
                </div>
            `;
}
function saveProfile() {
    const user = getCurrentUser();
    if (!user) return alert('No user logged in');
    user.fullName = document.getElementById('inputName').value;
    user.email = document.getElementById('inputEmail').value;
    user.phone = document.getElementById('inputPhone').value;
    user.address = document.getElementById('inputAddress').value;
    localStorage.setItem('e-maniel-current-user', JSON.stringify(user));
    // Also update in users array
    const users = JSON.parse(localStorage.getItem('e-maniel-users')) || [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx >= 0) {
        users[idx] = user;
        localStorage.setItem('e-maniel-users', JSON.stringify(users));
    }
    alert('Profile updated!');
    renderUserNav(user);
    renderHome(user);
}
(function () {
    const user = getCurrentUser();
    renderUserNav(user);
    if (user) {
        renderHome(user);
    } else {
        renderLoginPrompt();
    }
})();