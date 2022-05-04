const Routes = require('./routes.js');
module.exports = function(app, db){
    Routes(app, db);
}