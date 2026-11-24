import { IUser } from './models/User';
import { IActivity } from './models/Activity';
import { IReport } from './models/Report';

// Datos iniciales de las cuentas y sus permisos.
// La contraseña de administrador se cifra antes de guardarse.
export const DEFAULT_ADMIN: Partial<IUser> = {
    name: 'Administrador',
    email: 'admin@backoffice.com',
    password: 'admin123',
    role: 'ADMIN',
    bio: 'Administrador principal del Backoffice'
};

export const SEED_USERS: Partial<IUser>[] = [
    DEFAULT_ADMIN,
    {
        name: 'Goblin Games Store',
        email: 'tienda@goblingames.com',
        password: 'sprint1',
        role: 'STORE_HOST',
        bio: 'Tienda especializada en TCG y juegos de mesa'
    },
    {
        name: 'Marc R.',
        email: 'marc@usuario.com',
        password: 'sprint1',
        role: 'USER',
        bio: 'Aficionado al baloncesto y running'
    },
    {
        name: 'Laura S.',
        email: 'laura@usuario.com',
        password: 'sprint1',
        role: 'USER',
        bio: 'Jugadora de cartas coleccionables'
    }
];

// Crea actividades de ejemplo y las relaciona con las cuentas del seed.
export const getSeedActivities = (adminId: string, storeId: string, userId: string): Partial<IActivity>[] => [
    {
        creatorId: userId,
        title: 'Pachanga 3v3 Baloncesto UPC',
        description: 'Buscamos 2 personas más para completar partido casual de basket en las pistas exteriores.',
        category: 'SPORT',
        subcategory: 'BASKETBALL',
        modality: 'CASUAL',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [1.986612, 41.275648],
            addressName: "Carrer d'Esteve Terradas 7, 08860, Castelldefels, Cataluña",
            isStoreLocation: false
        },
        schedule: {
            startTime: new Date(Date.now() + 86400000), // +1 día
            endTime: new Date(Date.now() + 93600000)
        },
        capacity: {
            minParticipants: 4,
            maxParticipants: 6
        },
        pricing: {
            price: 0
        },
        participants: [
            {
                userId: userId,
                name: 'Marc R.',
                joinedAt: new Date()
            }
        ]
    },
    {
        creatorId: storeId,
        title: 'Torneo Local One Piece TCG',
        description: 'Torneo semanal en tienda física. Construido a 50 cartas. Premios para el TOP 4.',
        category: 'LEISURE',
        subcategory: 'TCG_BOARDGAMES',
        modality: 'ORGANIZED',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [2.159421, 41.392483],
            addressName: 'Carrer de Balmes 100, 08008, Barcelona, Cataluña',
            isStoreLocation: true
        },
        schedule: {
            startTime: new Date(Date.now() + 172800000), // +2 días
            endTime: new Date(Date.now() + 187200000)
        },
        capacity: {
            minParticipants: 8,
            maxParticipants: 16
        },
        pricing: {
            price: 5.0,
            prizeInfo: 'Sobres de expansión para los mejores clasificados'
        },
        participants: []
    },
    {
        creatorId: userId,
        title: 'Entrenamiento Running 5K Paseo Marítimo',
        description: 'Salida suave a ritmo de 5:30 min/km por el paseo marítimo.',
        category: 'SPORT',
        subcategory: 'RUNNING',
        modality: 'CASUAL',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [1.732453, 41.217723],
            addressName: 'Passeig Marítim 45, 08800, Vilanova i la Geltrú, Cataluña',
            isStoreLocation: false
        },
        route: {
            distanceKm: 5.2,
            paceTarget: '5:30 min/km',
            path: {
                type: 'LineString',
                coordinates: [
                    [1.732453, 41.217723],
                    [1.73812, 41.21941],
                    [1.74458, 41.22105]
                ]
            }
        },
        schedule: {
            startTime: new Date(Date.now() + 259200000), // +3 días
            endTime: new Date(Date.now() + 262800000)
        },
        capacity: {
            minParticipants: 2,
            maxParticipants: 10
        },
        pricing: {
            price: 0
        },
        participants: []
    },
    {
        creatorId: storeId,
        title: 'Noche Retro Arcade & Street Fighter',
        description: 'Sesión libre de recreativas clásicas y mini torneo eliminatorio de Street Fighter III.',
        category: 'LEISURE',
        subcategory: 'ARCADE',
        modality: 'ORGANIZED',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [2.174401, 41.398371],
            addressName: 'Carrer de Marina 165, 08013, Barcelona, Cataluña',
            isStoreLocation: true
        },
        schedule: {
            startTime: new Date(Date.now() + 345600000), // +4 días
            endTime: new Date(Date.now() + 356400000)
        },
        capacity: {
            minParticipants: 4,
            maxParticipants: 12
        },
        pricing: {
            price: 3.5,
            prizeInfo: 'Vale de 15€ en consumiciones y fichas extra'
        },
        participants: [
            {
                userId: storeId,
                name: 'GameZone Store',
                joinedAt: new Date()
            }
        ]
    },
    {
        creatorId: adminId,
        title: 'Torneo Relámpago 5v5 Baloncesto',
        description: 'Competición amateur por equipos en pabellón cubierto. Plazas completas.',
        category: 'SPORT',
        subcategory: 'BASKETBALL',
        modality: 'ORGANIZED',
        status: 'FULL',
        location: {
            type: 'Point',
            coordinates: [2.114952, 41.380896],
            addressName: 'Avinguda Diagonal 695, 08028, Barcelona, Cataluña',
            isStoreLocation: false
        },
        schedule: {
            startTime: new Date(Date.now() + 432000000), // +5 días
            endTime: new Date(Date.now() + 446400000)
        },
        capacity: {
            minParticipants: 2,
            maxParticipants: 2
        },
        pricing: {
            price: 10,
            prizeInfo: 'Trofeo y equipación deportiva para el equipo ganador'
        },
        participants: [
            {
                userId: userId,
                name: 'Marc R.',
                joinedAt: new Date()
            },
            {
                userId: adminId,
                name: 'Admin',
                joinedAt: new Date()
            }
        ]
    },
    {
        creatorId: storeId,
        title: 'Tarde de Juegos de Mesa: Catan y Carcassonne',
        description: 'Trae tus juegos o prueba los de la ludoteca de la tienda. Ideal para principiantes.',
        category: 'LEISURE',
        subcategory: 'TCG_BOARDGAMES',
        modality: 'CASUAL',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [1.978122, 41.280145],
            addressName: 'Avinguda de la Constitució 112, 08860, Castelldefels, Cataluña',
            isStoreLocation: true
        },
        schedule: {
            startTime: new Date(Date.now() + 518400000), // +6 días
            endTime: new Date(Date.now() + 529200000)
        },
        capacity: {
            minParticipants: 3,
            maxParticipants: 8
        },
        pricing: {
            price: 0
        },
        participants: []
    },
    {
        creatorId: userId,
        title: 'Series en Pista Atletismo 10x400m',
        description: 'Entrenamiento interválico exigente para preparar 10K sub-40.',
        category: 'SPORT',
        subcategory: 'RUNNING',
        modality: 'CASUAL',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [2.04421, 41.32154],
            addressName: 'Carrer de la Muntañeta 1, 08830, Sant Boi de Llobregat, Cataluña',
            isStoreLocation: false
        },
        route: {
            distanceKm: 8.0,
            paceTarget: '4:05 min/km',
            path: {
                type: 'LineString',
                coordinates: [
                    [2.04421, 41.32154],
                    [2.0451, 41.3223]
                ]
            }
        },
        schedule: {
            startTime: new Date(Date.now() + 604800000), // +7 días
            endTime: new Date(Date.now() + 610200000)
        },
        capacity: {
            minParticipants: 2,
            maxParticipants: 6
        },
        pricing: {
            price: 0
        },
        participants: []
    },
    {
        creatorId: storeId,
        title: 'Draft Magic: The Gathering',
        description: 'Formato Booster Draft con 3 sobres por jugador. Rondas suizas.',
        category: 'LEISURE',
        subcategory: 'TCG_BOARDGAMES',
        modality: 'ORGANIZED',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [2.159421, 41.392483],
            addressName: 'Carrer de Balmes 100, 08008, Barcelona, Cataluña',
            isStoreLocation: true
        },
        schedule: {
            startTime: new Date(Date.now() + 691200000), // +8 días
            endTime: new Date(Date.now() + 705600000)
        },
        capacity: {
            minParticipants: 6,
            maxParticipants: 8
        },
        pricing: {
            price: 15,
            prizeInfo: 'Sobres Promo Foil para los 3 primeros'
        },
        participants: []
    },
    {
        creatorId: userId,
        title: 'Quedada Pinball y Ritmo (DDR / Pump It Up)',
        description: 'Tarde casual probando máquinas de baile y pinballs clásicos.',
        category: 'LEISURE',
        subcategory: 'ARCADE',
        modality: 'CASUAL',
        status: 'OPEN',
        location: {
            type: 'Point',
            coordinates: [2.126891, 41.358742],
            addressName: 'Avinguda de la Granvia 75, 08908, L’Hospitalet de Llobregat, Cataluña',
            isStoreLocation: false
        },
        schedule: {
            startTime: new Date(Date.now() + 777600000), // +9 días
            endTime: new Date(Date.now() + 788400000)
        },
        capacity: {
            minParticipants: 2,
            maxParticipants: 6
        },
        pricing: {
            price: 0
        },
        participants: []
    },
    {
        creatorId: adminId,
        title: 'Entrenamiento Tiro Libre y Triple Basket',
        description: 'Sesión pasada realizada la semana anterior para probar historial completado.',
        category: 'SPORT',
        subcategory: 'BASKETBALL',
        modality: 'CASUAL',
        status: 'COMPLETED',
        location: {
            type: 'Point',
            coordinates: [1.986612, 41.275648],
            addressName: "Carrer d'Esteve Terradas 7, 08860, Castelldefels, Cataluña",
            isStoreLocation: false
        },
        schedule: {
            startTime: new Date(Date.now() - 172800000), // Hace 2 días
            endTime: new Date(Date.now() - 165600000)
        },
        capacity: {
            minParticipants: 2,
            maxParticipants: 8
        },
        pricing: {
            price: 0
        },
        participants: [
            {
                userId: userId,
                name: 'Marc R.',
                joinedAt: new Date(Date.now() - 259200000)
            }
        ]
    },
    {
        creatorId: userId,
        title: 'Trail Nocturno Montjuïc',
        description: 'Actividad cancelada por previsión de lluvia fuerte.',
        category: 'SPORT',
        subcategory: 'RUNNING',
        modality: 'ORGANIZED',
        status: 'CANCELLED',
        location: {
            type: 'Point',
            coordinates: [2.152694, 41.364133],
            addressName: 'Passeig Olímpic 15, 08038, Barcelona, Cataluña',
            isStoreLocation: false
        },
        schedule: {
            startTime: new Date(Date.now() + 86400000),
            endTime: new Date(Date.now() + 93600000)
        },
        capacity: {
            minParticipants: 5,
            maxParticipants: 20
        },
        pricing: {
            price: 2.0
        },
        participants: []
    },
    {
        creatorId: storeId,
        title: 'Campeonato Tekken 8 en Recreative Hub',
        description: 'Torneo presencial 1v1 a doble eliminación.',
        category: 'LEISURE',
        subcategory: 'ARCADE',
        modality: 'ORGANIZED',
        status: 'FULL',
        location: {
            type: 'Point',
            coordinates: [2.174401, 41.398371],
            addressName: 'Carrer de Marina 165, 08013, Barcelona, Cataluña',
            isStoreLocation: true
        },
        schedule: {
            startTime: new Date(Date.now() + 864000000), // +10 días
            endTime: new Date(Date.now() + 878400000)
        },
        capacity: {
            minParticipants: 4,
            maxParticipants: 4
        },
        pricing: {
            price: 6.0,
            prizeInfo: 'Mando Arcade Stick personalizado para el campeón'
        },
        participants: []
    }
];

// Crea reportes de ejemplo relacionados con las cuentas y actividades generadas.
export const getSeedReports = (reporterId: string, activityId: string): Partial<IReport>[] => [
    {
        reporterId: reporterId,
        targetType: 'ACTIVITY',
        targetId: activityId,
        reason: 'SPAM',
        description: 'Evento publicado de forma duplicada varias veces en el mismo día.',
        status: 'PENDING'
    },
    {
        reporterId: reporterId,
        targetType: 'USER',
        targetId: reporterId,
        reason: 'INAPPROPRIATE',
        description: 'Comportamiento inadecuado en el chat del grupo.',
        status: 'REVIEWED',
        adminNotes: 'En revisión por el equipo de soporte.'
    }
];

export const getSeedCategories = (): { name: string; slug: string; subcategories: { name: string; slug: string }[] }[] => [
    {
        name: 'Deportes',
        slug: 'SPORT',
        subcategories: [
            { name: 'Baloncesto', slug: 'BASKETBALL' },
            { name: 'Running', slug: 'RUNNING' }
        ]
    },
    {
        name: 'Ocio',
        slug: 'LEISURE',
        subcategories: [
            { name: 'Arcade', slug: 'ARCADE' },
            { name: 'Juegos de mesa y TCG', slug: 'TCG_BOARDGAMES' }
        ]
    }
];
