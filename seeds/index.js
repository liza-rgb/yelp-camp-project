const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62f64517f20506e4a343cc58',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${sample(cities).city}, ${sample(cities).state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmvmjhpgz/image/upload/v1660670518/YelpCamp/sbygpjla1xnf1pclyjbr.jpg',
                    filename: 'YelpCamp/sbygpjla1xnf1pclyjbr'
                },
                {
                    url: 'https://res.cloudinary.com/dmvmjhpgz/image/upload/v1660670518/YelpCamp/oaysbj2t3ptsebzrfj30.jpg',
                    filename: 'YelpCamp/oaysbj2t3ptsebzrfj30'
                }            
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil veritatis magni quibusdam dicta sunt animi explicabo distinctio voluptatum illum rem, atque ullam quam sequi facilis minus quaerat voluptatem. Saepe, dolore.',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => { mongoose.connection.close() });