/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/database/user-model');
const random = require('../utils/random');
const transporter = require('../utils/transporter');
const token = require('../utils/token');

const signup = async (req, res) => {
  try {
    const code = random(4);
    req.body.codeverification = await bcrypt.hash(String(code), 10);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    await user.save();
    const info = await transporter.sendMail({
      from: '"Ecommerse" - <elphillips11@gmail.com>',
      to: user.email,
      subject: 'Ecommerce - Valida tu correo electronico',
      html: `
      <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css"/>
<!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		@media (max-width:700px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body style="background-color: #f5f5f5; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1b4b66; background-image: url('images/heasder-bg.png'); background-repeat: no-repeat; background-size: cover; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-top:30px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Bienvenido!</span></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 50px; padding-right: 50px; vertical-align: top; padding-top: 0px; padding-bottom: 40px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
<h3 style="margin: 0; color: #1b4b66; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Codigo de verificacion es</span></h3>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
<h3 style="margin: 0; color: #1b4b66; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder"><strong>${code}</strong></span></h3>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="alignment" style="vertical-align: middle; text-align: center;">
</body>
</html>



      `,
    });
    return res.status(StatusCodes.CREATED).send({
      status: 'CREATED',
      data: {
        user: { email: user.email },
        info,
        message: 'El usuario se creo correctamente',
      },
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

const validateCode = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'FAIL',
        error: { message: 'El correo no esta registrado' },
      });
    const match = await bcrypt.compare(
      req.body.codeverification,
      user.codeverification,
    );
    if (!match) {
      user.validationAttempts += 1;
      if (user.validationAttempts > 5) {
        user.remove();
        return res.status(StatusCodes.GONE).send({
          status: 'FAIL',
          error: {
            attempts: user.validationAttempts,
            isActive: user.isActive,
            message: 'Intentaste mas de 5 veces, registrate nuevamente',
          },
        });
      }
      await user.save();
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'FAIL',
        error: {
          attempts: user.validationAttempts,
          isActive: user.isActive,
          message: 'Codigo incorrecto intenta de nuevo',
        },
      });
    }
    user.validationAttempts = 0;
    user.isActive = true;
    await user.save();
    return res.status(StatusCodes.OK).send({
      status: 'OK',
      data: {
        isActive: user.isActive,
        message: 'Correo confirmado',
      },
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(StatusCodes.OK).send({
        status: 'FAIL',
        error: { message: 'El usuario no existe' },
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(StatusCodes.OK).send({
        status: 'FAIL',
        error: { message: 'Contraseña incorrecta, intenta de nuevo' },
      });
    }

    const accessToken = token.generateAccessToken(user.email);
    const refreshToken = token.generateRefreshToken(user.email);

    user.sessiontoken = user.sessiontoken.concat({ accessToken, refreshToken });
    await user.save();

    return res
      .status(StatusCodes.OK)
      .send({ status: 'OK', data: { accessToken, refreshToken } });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

const logout = async (req, res) => {
  try {
    const tk = req.headers.authorization.replace('Bearer ', '');
    const user = await User.findOne({ email: req.email });

    user.sessiontoken = user.sessiontoken.filter(c => c.accessToken !== tk);
    await user.save();

    return res
      .status(StatusCodes.OK)
      .send({ status: 'OK', data: { message: 'Cerro sesion correctamente' } });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

const logoutAll = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });

    user.sessiontoken.splice(0, user.sessiontoken.length);
    await user.save();

    return res
      .status(StatusCodes.OK)
      .send({ status: 'OK', data: { message: 'Cerro sesion correctamente' } });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

const fnrefreshToken = async (req, res) => {
  try {
    const user = await User.findOne({
      'sessiontoken.refreshToken': req.body.refreshToken,
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        status: 'FAIL',
        error: { message: 'token invalido' },
      });
    }

    const tokens = user.sessiontoken.filter(
      c => c.refreshToken !== req.body.refreshToken,
    );

    const accessToken = token.generateAccessToken(user.email);
    const refreshToken = token.generateRefreshToken(user.email);

    tokens.push({ accessToken, refreshToken });
    user.sessiontoken = tokens;
    await user.save();

    return res
      .status(StatusCodes.OK)
      .send({ status: 'OK', data: { accessToken, refreshToken } });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

module.exports = {
  signup,
  validateCode,
  login,
  logout,
  logoutAll,
  fnrefreshToken,
};
