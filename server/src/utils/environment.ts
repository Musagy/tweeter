import * as dotenv from 'dotenv'

dotenv.config()
const env = {
  KEY_SECRET: process.env.KEY_SECRET ? process.env.KEY_SECRET : "",
  ENV_TEST: process.env.ENV_TEST
}
export default env