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
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${sample(cities).city}, ${sample(cities).state}`
        });
        await camp.save();
    }
}

seedDB().then(() => { mongoose.connection.close() });