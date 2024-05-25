import { NextFunction, Request, Response } from 'express';
import { authenticationService } from '../../services/authentication/authentication.service';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import {
	ACCESS_TOKEN_EXP_COOKIE_TIME,
	OK_WITH_NO_RESPONSE,
	REFRESH_TOKEN_EXP_COOKIE_TIME,
} from '../../constants';
// import { serializer } from '../../utils/serializer.utils';

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, password } = req.body;
		const { ACCESS_TOKEN, REFRESH_TOKEN } = await authenticationService(email, password);
		res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
			maxAge: ACCESS_TOKEN_EXP_COOKIE_TIME,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
		res.cookie('REFRESH_TOKEN', REFRESH_TOKEN, {
			maxAge: REFRESH_TOKEN_EXP_COOKIE_TIME,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
		res.status(OK_WITH_NO_RESPONSE).json({});
	} catch (error) {
		errorCatcher(error, next);
	}
};
