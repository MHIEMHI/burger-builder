import authReducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';


describe('<NavigationItems />', () =>
{
	it('should return the initial state', () =>
	{
		expect(authReducer(undefined, {})).toEqual(
			{
				token: null,
				userId: null,
				error: null,
				loading: false,
				authRedirect: '/'
			});
	});

	it('should store the token upon login', () =>
	{
		expect(authReducer(
			{
				token: null,
				userId: null,
				error: null,
				loading: false,
				authRedirect: '/'
			},
			{
				type: actionTypes.AUTH_SUCCESS,
				token: 'token',
				userId: 'userId'
			}))
			.toEqual(
				{
					token: 'token',
					userId: 'userId',
					error: null,
					loading: false,
					authRedirect: '/'
				});
	});
});