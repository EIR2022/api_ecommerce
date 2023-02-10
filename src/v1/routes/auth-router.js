const router = require('express').Router();
const validateSchema = require('../../middlewares/validator-schema');
const authController = require('../../controllers/auth-controller');
const signupSchema = require('../../models/validators/signup-schema');
const validateToken = require('../../middlewares/validate-token');

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
 *                 status:
 *                   type: string
 *                   example: FAIL
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
 *         description: VALIDATE CODE
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    isActive:
 *                      type: string
 *                      example: true
 *                    message:
 *                      type: string
 *                      example: Correo confirmado
 *       422:
 *         description: UNPROCESSABLE ENTITY
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAIL
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

/**
 * @openapi
 * /api/v1/auth/login:
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
 *                  example: "1234"
 *     responses:
 *       201:
 *         description: LOGIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: LOGIN
 *                 data:
 *                   type: object
 *                   properties:
 *                    token:
 *                      type: object
 *                      properties:
 *                        accessToken:
 *                          type: string
 *                          example: qerqwerieupqroiweursdf
 *                        refreshToken:
 *                          type: string
 *                          example: qerqwerieupqroiweursdf
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
  '/login',
  validateSchema(signupSchema, 'body'),
  authController.login,
);

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: LOGIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: LOGIN
 *                 data:
 *                   type: object
 *                   properties:
 *                    token:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: Cerro sesion correctamente
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
router.post('/logout', validateToken, authController.logout);

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 * /api/v1/auth/logoutAll:
 *   post:
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: LOGIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: LOGIN
 *                 data:
 *                   type: object
 *                   properties:
 *                    token:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: Cerro sesion correctamente
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
router.post('/logoutAll', validateToken, authController.logoutAll);

/**
 * @openapi
 * /api/v1/auth/refreshToken:
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
 *                refreshToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaXNyYWVsaHVydGFydGVAZ21haWwuY29tIiwiaWF0IjoxNjc2MDA4ODg3LCJleHAiOjE2NzYwMDk3ODd9.N0JHPx8QVqz4j6DqTGbs9hbK83WGL2ETi1y1f1xxivk
 *     responses:
 *       201:
 *         description: LOGIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: LOGIN
 *                 data:
 *                   type: object
 *                   properties:
 *                    token:
 *                      type: object
 *                      properties:
 *                        accessToken:
 *                          type: string
 *                          example: qerqwerieupqroiweursdf
 *                        refreshToken:
 *                          type: string
 *                          example: qerqwerieupqroiweursdf
 *       401:
 *         description: UNAUTHORIZED
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
 *                        example: token invalido
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
router.post('/refreshToken', authController.fnrefreshToken);

module.exports = router;
