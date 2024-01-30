const Ad = require('./models/Ad.model');
const User = require('./models/User.model');

const loadTestData = async () => {
  const data = [
    {
      title: 'Massage at the beach',
      content:
        'This is a massage. It is very relaxing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 1,
      location: 'Warsaw',
      image: 'image1.png',
                      
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Massage at the beach 2',
      content:
        'This is another massage. It is very relaxing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 2,
      location: 'Berlin',
      image: 'image2.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Yoga Retreat in the Mountains',
      content:
        'Join us for a rejuvenating yoga retreat in the breathtaking mountains. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 3,
      location: 'Switzerland',
      image: 'image3.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Sightseeing Tour in Paris',
      content:
        'Explore the iconic landmarks of Paris with our guided sightseeing tour. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 4,
      location: 'Paris',
      image: 'image4.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Scuba Diving Adventure in Bali',
      content:
        'Dive into the vibrant underwater world of Bali with our thrilling scuba diving adventure. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 5,
      location: 'Bali',
      image: 'image5.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Hiking Tour in the Himalayas',
      content:
        'Experience the stunning Himalayas with our hiking tour. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 6,
      location: 'Himalayas',
      image: 'image6.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Camping Trip in the Mountains',
      content:
        'Climb the stunning peaks of the mountains with our camping trip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 7,
      location: 'Mountains',
      image: 'image7.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Hiking Tour in the Mountains',
      content:
        'Experience the stunning Himalayas with our hiking tour. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 8,
      location: 'Himalayas',
      image: 'image8.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Luxury Spa Day in Dubai',
      content:
        'Indulge in a day of ultimate relaxation at our luxurious spa in Dubai. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 4,
      location: 'Dubai',
      image: 'image9.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Cooking Class in Tuscany',
      content:
        'Discover the secrets of authentic Italian cuisine with our hands-on cooking class in Tuscany. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 5,
      location: 'Tuscany',
      image: 'image10.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Hiking Adventure in the Swiss Alps',
      content:
        'Embark on an unforgettable hiking adventure amidst the stunning landscapes of the Swiss Alps. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 6,
      location: 'Swiss Alps',
      image: 'image11.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Sunset Sailing Tour in Santorini',
      content:
        'Experience the breathtaking beauty of a sunset sailing tour in Santorini. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 7,
      location: 'Santorini',
      image: 'image12.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Artisanal Coffee Tasting in Colombia',
      content:
        'Explore the rich flavors of Colombian coffee with our artisanal coffee tasting experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 8,
      location: 'Colombia',
      image: 'image13.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Cultural Tour of Kyoto Temples',
      content:
        'Immerse yourself in the ancient traditions of Kyoto with our cultural tour of historic temples. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 9,
      location: 'Kyoto',
      image: 'image14.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Safari Adventure in Serengeti National Park',
      content:
        'Embark on an unforgettable safari adventure in the heart of Serengeti National Park. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 10,
      location: 'Serengeti',
      image: 'image15.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Mountain Biking Expedition in Moab',
      content:
        'Conquer the rugged trails of Moab with our exhilarating mountain biking expedition. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 11,
      location: 'Moab',
      image: 'image16.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Hot Air Balloon Ride in Cappadocia',
      content:
        'Soar above the otherworldly landscapes of Cappadocia with our thrilling hot air balloon ride. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 12,
      location: 'Cappadocia',
      image: 'image17.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Wine Tasting Tour in Napa Valley',
      content:
        'Savor the flavors of world-class wines with our exclusive wine tasting tour in Napa Valley. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 13,
      location: 'Napa Valley',
      image: 'image18.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Kayaking Adventure in the Amazon Rainforest',
      content:
        'Explore the wonders of the Amazon Rainforest from a different perspective with our kayaking adventure. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 14,
      location: 'Amazon Rainforest',
      image: 'image19.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Skiing Retreat in the Swiss Alps',
      content:
        'Indulge in a winter wonderland experience with our skiing retreat in the breathtaking Swiss Alps. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 15,
      location: 'Swiss Alps',
      image: 'image20.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
    {
      title: 'Street Food Tour in Bangkok',
      content:
        'Embark on a culinary adventure through the bustling streets of Bangkok with our street food tour. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget',
      price: 16,
      location: 'Bangkok',
      image: 'image21.png',
      sellerInfo: '65afdd69de9d4e46a42508b0',
    },
  ];

  // test user
  const userData = [
    {
      _id: "65afdd69de9d4e46a42508b0",
      login: 'Super Events',
      password: 'password123',
    },
  ];

  try {
    let counter = await Ad.countDocuments();
    if (counter === 0) {
      console.log('No ads. Loading example data...');
      await Ad.create(data);
      console.log('Test data has been successfully loaded');
      await User.create(userData);
    }
  } catch (err) {
    console.log(`Couldn't load test data`, err);
  }
};

module.exports = loadTestData;
