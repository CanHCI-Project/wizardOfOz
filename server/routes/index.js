const routes = require('express').Router();
const UserRoute = require('./UserRoute');
const AdminRoute = require('./AdminRoute');
const ProjectRoute = require('./ProjectRoute');
const TextRoute = require('./TextRoute');

routes.use('/user', UserRoute);
routes.use('/admin', AdminRoute);
routes.use('/project', ProjectRoute);
routes.use('/text', TextRoute);

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected to API'})
})

module.exports = routes;