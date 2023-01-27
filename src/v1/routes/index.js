const router = require('express').Router();
const routerAuth = require('./auth-router');

router.use('/auth', routerAuth);
router.get('/', (_req, res) => {
  res.status(200).send({ data: 'Estas conectado a api-ecommerce.' });
});

module.exports = router;
