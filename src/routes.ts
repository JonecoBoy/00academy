import { Router } from 'express';
// import publicRoutes from './routes/publicRoutes'
// import privateRoutes from './routes/privateRoutes'
// import adminRoutes from './routes/adminRoutes'
// import { verifyLogin, verifyAdmin } from './utils/middlewares'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version, name, author } = require(`../package.json`);

const routes = Router();

// health check
routes.get(``, (req, res, next) => {
  return res.send({
    name,
    version,
    author,
  });
});
// routes.use('/', publicRoutes)
// routes.use('/', verifyLogin, privateRoutes)
// routes.use('/', verifyLogin, verifyAdmin, adminRoutes)

export default routes;
