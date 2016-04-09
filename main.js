var riffle = require('jsriffle');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cities = [
    [40.7127, -74.0059],
    [39.9166, 116.3833],
    [51.5072, 0.1275],
];

domain.onJoin = function() {
    this.register("echo", riffle.want(function(msg) {
        console.log("Echo: " + msg);
        return msg + " - server says hi";
    }, String));

    this.register("get-point", riffle.want(function() {
        return [Math.random()*180-90, Math.random()*180-90];
    }));

    this.register("get-city", riffle.want(function() {
        return cities[randInt(0, cities.length - 1)];
    }));
};

domain.join();
