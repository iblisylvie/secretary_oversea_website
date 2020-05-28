/**
 * Find the English response with error code
 *
 * Usage:
 *
 * import findResponse from '~/services/getErrorResponse'
 * findResponse('100')  OR  findResponse(100)     // Invalid request parameter.
 */

const wordings = {
  '0': 'success',
  '-1': 'Server error, please try later.',
  '100': 'Invalid request parameter.',
  '101': 'Request wechat service meets exception.',
  '102': 'Device info error.',
  '103': 'Db operator fail.',
  '104': 'Qrcode task is running.',
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
  '2001': 'Your Mobvoi account is not binded with this account.',
  '2002': 'Call history does not exist or has been deleted.',
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
    'Invalid customized reply, it is limited to 280 characters a-zA-Z0-9 :~,.?!\n"\'',
  '2014':
    'Invalid customized reply, it is limited to 280 characters a-zA-Z0-9 :~,.?!\n"\'',
  '5010': 'Order does not exist.',
  '5011': 'Order is already paid for.',
  '5012': 'Payment failed.',
  '8001': 'This phone number is already in the do-not-answer phone list.',
  '9001': 'This voice is already purchased.'
}

export default (target) => wordings[target.toString()]
