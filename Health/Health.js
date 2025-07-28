document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.doctors-filter .filter-btn');
    const doctorCards = document.querySelectorAll('.doctors-grid .doctor-card');
    const viewDoctorsButtons = document.querySelectorAll('.hospital-card .view-btn');
    const hospitalCards = document.querySelectorAll('.hospital-card');
    const doctorsGrid = document.querySelector('.doctors-grid');
    const hospitalNames = Array.from(hospitalCards).map(card => card.dataset.hospitalName);
    let currentHospitalFilter = 'all';

    doctorCards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * hospitalNames.length);
        const assignedHospital = hospitalNames[randomIndex];
        card.dataset.hospital = assignedHospital;
        const hospitalDisplayP = card.querySelector('.doctor-hospitals');
        if (hospitalDisplayP) {
            hospitalDisplayP.textContent = `Available at: ${assignedHospital}`;
        }
    });

    const filterDoctors = () => {
        const activeSpecialtyFilter = document.querySelector('.doctors-filter .filter-btn.active')?.getAttribute('data-filter') || 'all';
        doctorCards.forEach(card => {
            const doctorHospital = card.dataset.hospital;
            const doctorCategory = card.dataset.category;
            const hospitalMatch = currentHospitalFilter === 'all' || doctorHospital === currentHospitalFilter;
            const categoryMatch = activeSpecialtyFilter === 'all' || doctorCategory === activeSpecialtyFilter;
            card.style.display = (hospitalMatch && categoryMatch) ? 'block' : 'none';
        });
        doctorsGrid.style.gridTemplateColumns = '';
        requestAnimationFrame(() => {
            doctorsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.doctors-filter .filter-btn.active')?.classList.remove('active');
            button.classList.add('active');
            filterDoctors();
        });
    });

    viewDoctorsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const hospitalCard = button.closest('.hospital-card');
            const targetHospital = hospitalCard.dataset.hospitalName;
            currentHospitalFilter = targetHospital;
            filterDoctors();
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === 'all') btn.classList.add('active');
                else btn.classList.remove('active');
            });
            const doctorsSection = document.getElementById('doctors-section');
            if (doctorsSection) doctorsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Open booking modal
    window.openBookingModal = function (doctorName) {
        document.getElementById('selectedDoctor').value = doctorName;

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('bookingDate').min = today;

        new bootstrap.Modal(document.getElementById('bookingModal')).show();
    };

    // Handle booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const userPhone = document.getElementById('userPhone').value;
        const bookingDate = document.getElementById('bookingDate').value;
        const startTime = document.getElementById('startTime').value;
        const hours = document.getElementById('hours').value;
        const doctorName = document.getElementById('selectedDoctor').value;

        const consultationFee = hours * 200;
        const deposit = consultationFee;

        const bookingDateFormatted = new Date(bookingDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));

        Swal.fire({
            title: 'Appointment Confirmed!',
            html: `
                <div class="text-start">
                    <p><strong>Doctor:</strong> ${doctorName}</p>
                    <p><strong>Date:</strong> ${bookingDateFormatted}</p>
                    <p><strong>Time:</strong> ${startTime} (${hours} hour${hours > 1 ? 's' : ''})</p>
                    <p><strong>Total Consultation Fee:</strong> ${consultationFee} EGP</p>
                    <p><strong>Deposit:</strong> ${deposit} EGP (non-refundable on cancellation)</p>
                    <hr>
                    <p><strong>Name:</strong> ${userName}</p>
                    <p><strong>Phone:</strong> ${userPhone}</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Great!',
            confirmButtonColor: '#3498db'
        }).then((result) => {
            bookingModal.hide();
            document.getElementById('bookingForm').reset();
        });
    });
});