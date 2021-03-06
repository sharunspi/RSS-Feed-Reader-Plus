const parser = require('./feedparse.js');
const settings = require('electron-settings');

module.exports = {

    send: (obj) => {

        return new Promise((resolve, reject) => {

            let feed = parser.specificHead(obj.id);

            feed.then((theFeed) => {


                //check for title change
                var titler = new Promise((_, reject) => {});
    
                if (obj.title != theFeed.title) {
        
                    titler = parser.titleChange(obj.link, obj.title);
        
                }
        
                titler.then((resolved) => {
        
                    if (resolved) {
        
                        resolve(resolved);
        
                    }
        
                });

                //change max number of feeds

                var max = settings.get('feeds.' + obj.id + '.max')

                if (max != obj.max) {

                    settings.set('feeds.' + obj.id + '.max', obj.max);
                    resolve(true);

                }

                //change notifications

                var notifications = settings.get('feeds.' + obj.id + '.notifications');

                if (notifications != obj.notifications) {

                    settings.set('feeds.' + obj.id + '.notifications', obj.notifications);
                    resolve(true);

                }

            });

            

        });

        

    }

}