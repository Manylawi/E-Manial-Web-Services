 // Open modal with correct service
    document.querySelectorAll('[data-bs-target="#payModal"]').forEach(btn => {
      btn.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        document.getElementById('serviceType').value = service;
        document.getElementById('payModalLabel').textContent = `Pay ${service} Bill`;
      });
    });

    // Payment form submission and JSON output
    document.getElementById('paymentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const data = {
        invoice: {
          customer: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value
          },
          total_amount: document.getElementById('amount').value,
          description: `${document.getElementById('serviceType').value} Bill`,
          payment_method: document.getElementById('paymentMethod').value
        },
        store: { name: 'e-Maniel' }
      };
      
      // Show success message
      Swal.fire({
        title: 'Payment Successful!',
        html: `
          <div class="text-start">
            <p><strong>Service:</strong> ${data.invoice.description}</p>
            <p><strong>Amount:</strong> ${data.invoice.total_amount} EGP</p>
            <p><strong>Payment Method:</strong> ${data.invoice.payment_method}</p>
            <hr>
            <p><strong>Name:</strong> ${data.invoice.customer.name}</p>
            <p><strong>Email:</strong> ${data.invoice.customer.email}</p>
            <p><strong>Phone:</strong> ${data.invoice.customer.phone}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#ff6f3c'
      }).then((result) => {
        // Reset form and close modal
        this.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('payModal'));
        modal.hide();
      });
    });