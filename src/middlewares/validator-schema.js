const { StatusCodes } = require('http-status-codes');
const validateSchema = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);

  if (error)
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send({
        status: 'FAIL',
        error: error.details.map(i => i.message).join(','),
      });
  return next();
};
module.exports = validateSchema;
