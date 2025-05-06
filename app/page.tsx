import LoginHint from "@/components/ui/login-hint";
import UserInfo from "@/components/ui/user-info";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  if (session) {
    return (
      <UserInfo
        name={session.name}
        avatarUrl={session.avatarUrl}
        location={session.location}
      />
    );
  }

  return <LoginHint />;
}
