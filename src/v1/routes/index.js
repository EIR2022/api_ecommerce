const router = require('express').Router();

router.get('/', (_req, res) => {
  res.status(200).send({ data: 'Estas conectado a api-ecommerce' });
});

module.exports = router;
