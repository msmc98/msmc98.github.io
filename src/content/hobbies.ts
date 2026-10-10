export interface HobbyItem { id: string; title: { es: string; en: string }; kind: 'photo' | 'poster' | 'art'; }
export interface HobbyGroup { id: string; title: { es: string; en: string }; items: HobbyItem[]; }
const item = (id: string, es: string, en = es, kind: HobbyItem['kind'] = 'photo'): HobbyItem => ({ id, title: { es, en }, kind });
export const hobbies: HobbyGroup[] = [
  { id: 'cinema', title: { es: 'Películas y series', en: 'Films & series' }, items: [item('marvel', 'Marvel', 'Marvel', 'poster'), item('lotr', 'El señor de los anillos', 'The Lord of the Rings', 'poster'), item('got', 'Juego de tronos', 'Game of Thrones', 'poster'), item('mandalorian', 'El Mandaloriano', 'The Mandalorian', 'poster')] },
  { id: 'anime', title: { es: 'Anime', en: 'Anime' }, items: [item('attack-on-titan', 'Attack on Titan', 'Attack on Titan', 'poster'), item('demon-slayer', 'Demon Slayer', 'Demon Slayer', 'poster'), item('naruto', 'Naruto', 'Naruto', 'poster'), item('solo-leveling', 'Solo Leveling', 'Solo Leveling', 'poster')] },
  { id: 'travel', title: { es: 'Viajes', en: 'Travel' }, items: [item('tokyo', 'Tokio', 'Tokyo'), item('london', 'Londres', 'London'), item('paris', 'París', 'Paris'), item('barcelona', 'Barcelona')] },
  { id: 'sports', title: { es: 'Deporte', en: 'Sport' }, items: [item('boxing', 'Boxeo', 'Boxing'), item('gym', 'Gimnasio', 'Gym'), item('running', 'Correr', 'Running')] },
  { id: 'animals', title: { es: 'Perros y gatos', en: 'Dogs & cats' }, items: [item('labrador', 'Labrador'), item('collie', 'Collie'), item('rottweiler', 'Rottweiler'), item('cats', 'Gatos', 'Cats')] },
  { id: 'games', title: { es: 'Videojuegos', en: 'Video games' }, items: [item('lol', 'League of Legends', 'League of Legends', 'art'), item('pokemon', 'Pokémon', 'Pokémon', 'art'), item('gta', 'GTA', 'GTA', 'art'), item('sekiro', 'Sekiro', 'Sekiro', 'art'), item('elden-ring', 'Elden Ring', 'Elden Ring', 'art')] },
  { id: 'music', title: { es: 'Música', en: 'Music' }, items: [item('arde-bogota', 'Arde Bogotá'), item('ultraligera', 'Ultraligera'), item('hey-kid', 'Hey Kid')] },
  { id: 'passions', title: { es: 'Aficiones', en: 'Passions' }, items: [item('kawasaki', 'Kawasaki Z125'), item('cordoba-cf', 'Córdoba CF')] },
];
