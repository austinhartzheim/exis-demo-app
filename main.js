var riffle = require('jsriffle');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cities = [
    [-73.9352, 40.7357],  // New York
    [116.3833, 39.9166],  // Bejing
    [-0.0731, 51.5069],  // London
];

domain.onJoin = function() {
    this.register("get-point", riffle.want(function() {
        return [Math.random()*180-90, Math.random()*180-90];
    }));

    this.register("get-city", riffle.want(function() {
        return cities[randInt(0, cities.length - 1)];
    }));
};

domain.join();
