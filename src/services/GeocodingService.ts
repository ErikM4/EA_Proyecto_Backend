import Logging from '../library/Logging';

export const geocodeAddress = async (addressName: string): Promise<[number, number] | null> => {
    const query = addressName.trim();
    if (!query) return null;

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'EA-Proyecto-Backend/1.0'
            }
        });

        if (!response.ok) {
            Logging.warning(`Geocoding falló con estado HTTP ${response.status} para "${query}"`);
            return null;
        }

        const results = (await response.json()) as Array<{ lon: string; lat: string }>;
        if (!results || results.length === 0) {
            return null;
        }

        const lon = Number(results[0].lon);
        const lat = Number(results[0].lat);

        if (Number.isNaN(lon) || Number.isNaN(lat)) {
            return null;
        }

        // GeoJSON siempre sigue el orden [longitud, latitud]
        return [lon, lat];
    } catch (error) {
        Logging.error(error);
        return null;
    }
};

export default {
    geocodeAddress
};
