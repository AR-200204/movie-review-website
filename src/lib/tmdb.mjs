// TMDB API Configuration
const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Fetch popular movies from TMDB
 */
export async function getPopularMovies(page = 1) {
    if (!TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not defined in environment variables');
    }

    try {
        const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

/**
 * Fetch movie details by ID from TMDB
 */
export async function getMovieDetails(movieId) {
    if (!TMDB_API_KEY) {
        throw new Error('TMDB_API_KEY is not defined in environment variables');
    }

    try {
        const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
        throw error;
    }
}

/**
 * Helper function to get full image URL
 */
export function getImageUrl(path, size = 'w500') {
    if (!path) {
        return '/placeholder-movie.png';
    }
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Helper function to format rating
 */
export function formatRating(rating) {
    return (rating || 0).toFixed(1);
}

/**
 * Helper function to get year from date
 */
export function getYear(dateString) {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).getFullYear().toString();
    } catch (e) {
        return 'N/A';
    }
}

/**
 * Format runtime (minutes to hours and minutes)
 */
export function formatRuntime(runtime) {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
}

/**
 * Format genres (array to comma-separated string)
 */
export function formatGenres(genres) {
    if (!genres || !genres.length) return 'N/A';
    return genres.map(g => g.name).join(', ');
}
