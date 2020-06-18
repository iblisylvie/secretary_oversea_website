/**
 * Find the English response with error code
 *
 * Usage:
 *
 * import findResponse from '~/services/getErrorResponse'
 * findResponse('100')  OR  findResponse(100)     // Invalid request parameter.
 */

const ERROR_CODE_MAP_MSG = {
  '0': 'success',
  '-1': 'Server error, please try later.',
  '-100': 'Invalid request parameter.',
  '-101': 'Request wechat service meets exception.',
  '-102': 'Device info error.',
  '-103': 'Db operator fail.',
  '-104': 'Qrcode task is running.',
  '1001': 'Invalid request.',
  '1002': 'This phone number already exsits.',
  '1003': 'This phone number already exsits，please unbind it first.',
  '1004': 'Please subscribe first in order to sign-up.',
  '1005': 'This dialogue already exsits.',
  '1006':
    'The number you have provided is already binded as the main number to this account.',
  '1007':
    'The number you have provided is already binded as the main number to another account.',
  '1008':
    'The number you have provided is already binded as the sub-number to this account.',
  '1009':
    'The number you have provided is already binded as the sub-number to another account.',
  '1010':
    'The sub-number you have provided does not match with the numbers you have binded to your account.',
  '1011':
    'The account you provided has already binded with other phone numbers.',
  '1012': 'The number you provided has already binded with another account.',
  '1013': 'This Mobvoi account is in use.',
  '1014': 'The number you have provided is already in use as a sub-number.',
  '1015': 'The number you have provided is not binded with a Mobvoi account.',
  '1016': 'ww_token doest not exist.',
  '1017': 'Invalid open_id.',
  '1018': 'Invalid ww_token.',
  '1019': 'wwid is not available.',
  '1020': 'Failed to update the customized tts, please try again.',
  '1021': 'This voice cannot be upgraded at this moment.',
  '1022': 'Bound not exist.',
  '1023': 'Invalid voice.',

  // '-2001': 'Your Mobvoi account is not binded with this account.',
  '-2002': 'Call history does not exist or has been deleted.',
  '2003': 'Nickname is limited to 20 characters.',
  '2004': 'Invalid voice.',
  '2005': 'Username cannot contain sensitive information.',
  '2006': 'Invalid HeyTico nickname.',
  '2007': 'Invalid tag, tag is limited to 1-4 characters.',
  '2008': 'You can only use the customized reply after setting it.',
  '2010': 'Must select another reply before deleting customized reply',
  '2011': 'The selected mode is not supported.',
  '2012': 'The make of customized voice is still in process or it fails.',
  '2013': 'Invalid speed.',

  '3001': 'The number you have entered is in the wrong format',
  '3002': 'Failed to get captcha.',
  '3003': 'Please login first.',
  '3004': 'Incorrect captcha.',

  '4001': 'This activity does not exist.',
  '4002': 'This question has already been answered',
  '4003': 'Audio error.',
  '4004': 'This answer does not exist.',
  '4005': 'This ranking does not exist.',

  '5001': 'The membership is still in use, cannot be renewed.',
  '5002': 'Payment failed.',
  '5003': 'VIP information cannot be empty.',
  '5004': 'Connection is poor, please try again.',
  '5005': 'You need to upgrade to premium account to use this feature.',
  '5006': 'You need to activate your HeyTico service in order to go premium.',

  '6001': 'This code does not exist.',
  '6002': 'This code has expired.',
  '6003': 'This code has already been used.',
  '6004': 'This code does not exist.',
  '6005': 'This code has already been used.',
  '6006': 'You cannot invite yourself.',
  '6007':
    'You are an existing user, go and invite your friends to get more days of premium account.',

  '7001': 'Voice not exist.',
  '7002': 'Cannot delete the voice you are using.',
  '7003': 'Voice name already exists.',

  '11001': 'Access denied.',
  '2009':
    'Input should not exceed 60 characters (punctuation, line breaks, numbers, spaces, and letters only)',
  // '2014':
  // 'Input should not exceed 60 characters (punctuation, line breaks, numbers, spaces, and letters only)',
  '5010': 'Order does not exist.',
  '5011': 'Order is already paid for.',
  '5012': 'Payment failed.',
  '8001': 'This phone number is already in the do-not-answer phone list.',
  '9001': 'This voice is already purchased.',

  // Auth Endpoint
  // '100': 'User not exists',
  '101': 'User already exists, please login',
  '102': 'The phone number already exists',
  '103': 'The email already exists',
  '104': 'Email type not supported',
  '105': 'The account has already been authorized',
  '106': 'Illegal request parameter',
  '107': 'Unknown account type',
  '108': 'Image upload failed',
  '109': 'The account has already bind to other account',
  '110': 'Binding failed, phone or email already exists',
  '301': 'Username or password incorrect, please try again',
  '302': 'Captcha is invalid, please check and try again',
  '303': 'Expired captcha',
  '304': 'Frequent attempts, please try again later',
  '305': 'Unauthorized SMS number',
  '306': 'Token is expired or not exist',
  '307': 'Frequent requests, please try again later',
  '308': 'Failed to send SMS, please try again later',
  '309': 'Please provide captcha',
  '310': 'Unknown captcha type',
  '311': 'The phone number has already been registered, please use another one',
  '312': 'Password is invalid, please check your input',
  '313': 'Nickname already exists',
  '314': 'The email has already been registered',
  '315': 'The account has already bound to a phone or email',
  '317': 'Username already exists',
  '318': 'The account has already bound to an email',
  '319': 'The account has already bound to a username',
  '320': 'The account has already bound to a phone number',
  '321': 'Invalid token',
  '322': 'Invalid token usage',
  '323': 'Failed to generate token',
  '324': 'Failed to send email， please try again later',
  '331': 'Failed to login with third party account',
  '401': 'Internal error',
  '402': 'Email not received, please try later',
  '403': 'Email blacklist, please use other email',
  '501': 'Request is processing, please do not resubmit',
  '1101': 'Third party account exists, but need bind phone or email',
  '1102':
    'The phone or email has already bound this kind of third party account',
  '1201': 'Visit restricted',
  '1301': 'Captcha record not exist',
  '1302': 'Token is unauthorized',
  '1303': 'Request content too large',
  '1304': 'Search condition cannot be empty',
  '1305': 'Search condition is invalid',
  '1306': 'Failed to retrieve data',
  '2001': 'Too many attempts, please try again in 5 minutes',
  '2002': 'Unsupported captcha usage',
  '100001': 'User data is auditing'
}

export { ERROR_CODE_MAP_MSG }
