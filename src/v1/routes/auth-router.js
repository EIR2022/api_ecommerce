const router = require('express').Router();
const validateSchema = require('../../middlewares/validator-schema');
const authController = require('../../controllers/auth-controller');
const signupSchema = require('../../models/validators/signup-schema');

/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: "example@gmail.com"
 *                password:
 *                  type: string
 *                  example: "contrasenia"
 *     responses:
 *       201:
 *         description: CREATE USER
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   type: object
 *                   properties:
 *                    user:
 *                      type: object
 *                      properties:
 *                        email:
 *                          type: string
 *                          example: ejemplo@gmail.com
 *                    info:
 *                      type: object
 *                      properties:
 *                        accepted:
 *                          type: array
 *                          items:
 *                            type: string
 *                            example: "ejemplo@gmail.com"
 *                        rejected:
 *                          type: array
 *                          items:
 *                            type: string
 *                          example: []
 *                        envelopeTime:
 *                          type: number
 *                          example: 399
 *                        messageTime:
 *                          type: number
 *                          example: 846
 *                        messageSize:
 *                          type: number,
 *                          example: 9342
 *                        response:
 *                          type: string,
 *                          example: "250 2.0.0 OK  1672378176 h10-20020a5620a284a0b0070383f1b6f1sm1475338q.31 - gsmtp"
 *                        envelope:
 *                          type: object
 *                          properties:
 *                            from:
 *                              type: string
 *                              example: "elphillips11@gmail.com"
 *                            to:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: "ejemplo@gmail.com"
 *                        messageId:
 *                          type: string
 *                          example: "<9a1c102c-71e-75dd-8dace14856b@gmail.com>"
 *       422:
 *         description: UNPROCESSABLE ENTITY
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "\"email\" is required"
 *       5XX:
 *         description: INTERNAL ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                      message:
 *                        type: string
 */

router.post(
  '/signup',
  validateSchema(signupSchema, 'body'),
  authController.signup,
);

/**
 * @openapi
 * /api/v1/auth/signup/validate-code:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: "example@gmail.com"
 *                codeverification:
 *                  type: string
 *                  example: "1234"
 *     responses:
 *       201:
 *         description: CREATE USER
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: CREATED
 *                 data:
 *                   type: object
 *                   properties:
 *                    user:
 *                      type: object
 *                      properties:
 *                        email:
 *                          type: string
 *                          example: ejemplo@gmail.com
 *                    info:
 *                      type: object
 *                      properties:
 *                        accepted:
 *                          type: array
 *                          items:
 *                            type: string
 *                            example: "ejemplo@gmail.com"
 *                        rejected:
 *                          type: array
 *                          items:
 *                            type: string
 *                          example: []
 *                        envelopeTime:
 *                          type: number
 *                          example: 399
 *                        messageTime:
 *                          type: number
 *                          example: 846
 *                        messageSize:
 *                          type: number,
 *                          example: 9342
 *                        response:
 *                          type: string,
 *                          example: "250 2.0.0 OK  1672378176 h10-20020a5620a284a0b0070383f1b6f1sm1475338q.31 - gsmtp"
 *                        envelope:
 *                          type: object
 *                          properties:
 *                            from:
 *                              type: string
 *                              example: "elphillips11@gmail.com"
 *                            to:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: "ejemplo@gmail.com"
 *                        messageId:
 *                          type: string
 *                          example: "<9a1c102c-71e-75dd-8dace14856b@gmail.com>"
 *       422:
 *         description: UNPROCESSABLE ENTITY
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "\"email\" is required"
 *       5XX:
 *         description: INTERNAL ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                      message:
 *                        type: string
 */
router.post('/signup/validate-code', authController.validateCode);

module.exports = router;
