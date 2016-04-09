var riffle = require('jsriffle');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

domain.onJoin = function() {
    this.register("echo", riffle.want(function(msg) {
        console.log("Echo: " + msg);
        return msg + " - server says hi";
    }, String));

    this.register("get-point", riffle.want(function() {
        return [2, 3];
    }));  
};

domain.join()
