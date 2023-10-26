import decline from './img/decline.jpg';
import forest from './img/forest.jpg';
import house from './img/house.jpg';

export const posts = [
  {
    id: '1',
    img: forest,
    title: 'Ліс',
    country: 'Ukraine',
    region: "Ivano-Frankivs'k Region",
    comment: [],
    rating: 153,
    location: { latitude: 48.36180277609808, longitude: 24.40477226883714 },
  },
  {
    id: '2',
    img: decline,
    title: 'Захід на Чорному морі',
    country: 'Ukraine',
    region: 'Crimea',
    comment: [
      {
        id: 1,
        text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        date: '09 червня, 2020 | 08:40',
        user: '',
      },
      {
        id: 2,
        text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
        date: '09 червня, 2020 | 09:14',
        user: 'I`m',
      },
      {
        id: 3,
        text: 'Thank you! That was very helpful!',
        date: '09 червня, 2020 | 09:20',
        user: '',
      },
    ],
    rating: 200,
    location: { latitude: 45.416004014588495, longitude: 34.50752422132909 },
  },
  {
    id: '3',
    img: house,
    title: 'Старий будиночок у Венеції',
    country: 'Italy',
    region: 'Venice',
    comment: [],
    rating: 200,
    location: { latitude: 45.482028331152584, longitude: 12.302573780758442 },
  },
];
