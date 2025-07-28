document.addEventListener('DOMContentLoaded', () => {
      const routeForm = document.getElementById('route-search');
      const fromSelect = document.getElementById('from-select');
      const toSelect = document.getElementById('to-select');
      const routeStatusDiv = document.getElementById('route-status');
      const mapInfoSection = document.getElementById('map-info-section');

      function getTransportationRecommendation(destination) {
        destination = destination.toLowerCase();

        if (destination.includes("metro") || destination.includes("tahrir square") || destination.includes("ramses station") || destination.includes("sayeda zeinab")) {
          return {
            primary: { mode: "Metro or Microbus/Bus", icon: "fas fa-subway" },
            details: "Connects to Line 1 stations (El-Malek El-Saleh, Al-Sayeda Zeinab) or direct Microbus/Bus routes."
          };
        } else if (destination.includes("giza pyramids") || destination.includes("dokki") || destination.includes("mohandessin") || destination.includes("zamalek")) {
          return {
            primary: { mode: "Microbus or Bus", icon: "fas fa-shuttle-van" },
            details: "Routes crossing the bridges to Giza/Zamalek."
          };
        } else if (destination.includes("maadi") || destination.includes("nasr city") || destination.includes("heliopolis") || destination.includes("new cairo") || destination.includes("6th of october city")) {
          return {
            primary: { mode: "Bus or Microbus", icon: "fas fa-bus-alt" },
            details: "Longer routes, potentially requiring transfers. Check specific route cards below."
          };
        } else if (destination.includes("cairo international airport")) {
          return {
            primary: { mode: "Taxi/Ride-Sharing or Bus", icon: "fas fa-taxi" },
            details: "Taxi/Ride-Sharing is most direct. Bus may require transfers."
          };
        } else if (destination.includes("khan el-khalili")) {
          return {
            primary: { mode: "Microbus or Bus", icon: "fas fa-shuttle-van" },
            details: "Routes towards Downtown/Islamic Cairo."
          };
        } else {
          return {
            primary: { mode: "Bus or Microbus", icon: "fas fa-bus" },
            details: "General routes available along main streets."
          };
        }
      }

      routeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fromValue = fromSelect.value;
        const toValue = toSelect.value;
        const fromText = fromSelect.options[fromSelect.selectedIndex].text;
        const toText = toSelect.options[toSelect.selectedIndex].text;

        if (!fromValue || !toValue) {
          routeStatusDiv.innerHTML = '<p style="color: #ff6b6b; font-weight: bold;">Please select both a starting point and a destination.</p>';
          routeStatusDiv.style.backgroundColor = '#2a1a1a';
          mapInfoSection.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        const encodedFrom = encodeURIComponent(fromValue);
        const encodedTo = encodeURIComponent(toValue);
        const googleMapsUrl = `https://www.google.com/maps/dir/${encodedFrom}/${encodedTo}/?travelmode=transit`;

        const recommendation = getTransportationRecommendation(toValue);

        routeStatusDiv.innerHTML = `
          <p>From <strong>${fromText}</strong> to <strong>${toText}</strong>:</p>
          <div class="recommendation-display">
            <i class="${recommendation.primary.icon}"></i>
            <div class="recommendation-details">
              <strong>Recommended: ${recommendation.primary.mode}</strong>
              <span>${recommendation.details}</span>
            </div>
          </div>
          <p style="margin-top: 1rem; color: #b8b8b8;">Click the button below to see the public transport route on Google Maps for detailed options, timings, and transfers.</p>
          <button id="open-google-maps-btn" style="padding: 0.8rem 1.5rem; background-color: #ffd700; color: #121212; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1rem; margin-top: 1rem;">
            <i class="fas fa-map"></i> Open on Google Maps
          </button>
        `;
        routeStatusDiv.style.backgroundColor = '#1e1e1e';

        mapInfoSection.scrollIntoView({ behavior: 'smooth' });

        document.getElementById('open-google-maps-btn').addEventListener('click', () => {
          window.open(googleMapsUrl, '_blank');
        });
      });

      function clearStatus() {
        if (routeStatusDiv.innerHTML.includes("From <strong") || routeStatusDiv.innerHTML.includes("Please select")) {
          routeStatusDiv.innerHTML = '<p>Select your start point in Manial and your destination, then click "Show Route on Map" to open public transport directions in Google Maps.</p>';
          routeStatusDiv.style.backgroundColor = '#1e1e1e';
        }
      }

      fromSelect.addEventListener('change', clearStatus);
      toSelect.addEventListener('change', clearStatus);
    });