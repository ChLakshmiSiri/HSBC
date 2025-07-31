const {Router} = require('express');
const indexController = require('../controllers/index');
const router = Router();
const indexControllerInstance = indexController;
function setRoutes(app) {
    app.use('/api', router);
    router.get('/',indexControllerInstance.getItems.bind(indexControllerInstance));
    router.post('/items', indexControllerInstance.createItem.bind(indexControllerInstance));
}
module.exports = setRoutes;