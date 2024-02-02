import bcrypt from "bcrypt";
const saltRounds = 10;

/**
 * Takes a password and returns a hash
 * else returns `null`
 *
 * @param {string} password
 * @return Promise<string | null>
 */
export async function generateHash(password: string): Promise<string | null> {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Takes a password and a hash and returns a boolean
 * if matches then `true` else `false`
 *
 * @param {string} password
 * @param {string} hash
 * @return Promise<boolean>
 */
export async function checkHash(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
}
