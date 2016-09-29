var config = {
    development: {
        //url to be used in link generation

        //mongodb connection settings
        database: {
                host:   'mongodb://52.66.77.153:27017/test',
            // host:   'mongodb://pinglearn:admin@52.66.163.65:27017/test',
            port:   '27017',
            db:     'test'
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '3422'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'site'
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '3421'
        }
    }
};
module.exports = config;