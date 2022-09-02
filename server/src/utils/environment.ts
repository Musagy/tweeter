import * as dotenv from 'dotenv'

dotenv.config()
const env = {
  SALT_ROUNDS: !!process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 0,
  KEY_SECRET: process.env.KEY_SECRET ? process.env.KEY_SECRET : "",
  ENV_TEST: process.env.ENV_TEST
}
export default env