var riffle = require('jsriffle');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cities = [
    [29.3900, 91.0700],
    [12.6530, 7.9864],
    [19.0421, 65.2559],
    [0.2295, 78.5243]
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
