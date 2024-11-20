import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

const getSession = async () => {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!
  });
}

export default getSession;