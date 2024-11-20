import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();

  if (session.id) {
    const user = db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }

  notFound();
};

const profilePage = async () => {
  const user = await getUser();
  const logOut = async () => {
    "use server";

    const session = await getSession();
    session.destroy();
    redirect("/");
  }
  return (
    <div>
      <h1>어서오세요! {user?.username}</h1>
      <form action={logOut}>
        <button>로그아웃</button>
      </form>
    </div>
  );
};

export default profilePage;
