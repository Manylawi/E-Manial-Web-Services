   document.addEventListener('DOMContentLoaded', () => {
      const filterButtons = document.querySelectorAll('.movies-filter .filter-btn');
      const movieCards = document.querySelectorAll('.movies-grid .movie-card');
      const viewMoviesButtons = document.querySelectorAll('.cinema-card .view-btn');
      const cinemaCards = document.querySelectorAll('.cinema-card');
      const moviesGrid = document.querySelector('.movies-grid');
      const cinemaNames = Array.from(cinemaCards).map(card => card.dataset.cinemaName);
      let currentCinemaFilter = 'all';

      movieCards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cinemaNames.length);
        const assignedCinema = cinemaNames[randomIndex];
        card.dataset.cinema = assignedCinema;
        const cinemaDisplayP = card.querySelector('.movie-cinemas');
        if (cinemaDisplayP) {
          cinemaDisplayP.textContent = `Showing at: ${assignedCinema}`;
        }
      });

      const filterMovies = () => {
        const activeGenreFilter = document.querySelector('.movies-filter .filter-btn.active')?.getAttribute('data-filter') || 'all';
        movieCards.forEach(card => {
          const movieCinema = card.dataset.cinema;
          const movieCategory = card.dataset.category;
          const cinemaMatch = currentCinemaFilter === 'all' || movieCinema === currentCinemaFilter;
          const categoryMatch = activeGenreFilter === 'all' || movieCategory === activeGenreFilter;
          card.style.display = (cinemaMatch && categoryMatch) ? 'block' : 'none';
        });
        moviesGrid.style.gridTemplateColumns = '';
        requestAnimationFrame(() => {
          moviesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
        });
      };

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          document.querySelector('.movies-filter .filter-btn.active')?.classList.remove('active');
          button.classList.add('active');
          filterMovies();
        });
      });

      viewMoviesButtons.forEach(button => {
        button.addEventListener('click', () => {
          const cinemaCard = button.closest('.cinema-card');
          const targetCinema = cinemaCard.dataset.cinemaName;
          currentCinemaFilter = targetCinema;
          filterMovies();
          filterButtons.forEach(btn => {
            if (btn.dataset.filter === 'all') btn.classList.add('active');
            else btn.classList.remove('active');
          });
          const moviesSection = document.getElementById('movies-section');
          if (moviesSection) moviesSection.scrollIntoView({ behavior: 'smooth' });
        });
      });
    });