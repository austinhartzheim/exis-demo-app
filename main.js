var riffle = require('jsriffle');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

var city_elevations = [
    [46.3338, 48.0219],
    [41.3317, 19.8172],
    [48.2092, 16.3728],
    [53.9678, 27.5766]
];

domain.onJoin = function() {
    this.register("echo", riffle.want(function(msg) {
        console.log("Echo: " + msg);
        return msg + " - server says hi";
    }, String));

    this.register("get-point", riffle.want(function() {
        return [Math.random()*180-90, Math.random()*180-90];
    }));

    this.register("get-city-elevation", riffle.want(function(i) {
        return city_elevations[i];
    }, Number));
};

domain.join();
