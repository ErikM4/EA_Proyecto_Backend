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
            startTime: new Date(Date.now() + 86400000), // Empieza dentro de un día.
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
            startTime: new Date(Date.now() + 172800000), // Empieza dentro de dos días.
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
            startTime: new Date(Date.now() + 259200000), // Empieza dentro de tres días.
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
