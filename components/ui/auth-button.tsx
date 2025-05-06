import { FaArrowRightFromBracket, FaGithub } from "react-icons/fa6";

import { signIn, signOut } from "@/actions/auth";
import SubmitButton from "@/components/ui/submit-button";
import { getSession } from "@/lib/session";

export default async function AuthButton() {
  const session = await getSession();

  if (session) {
    return (
      <form action={signOut}>
        <SubmitButton
          icon={<FaArrowRightFromBracket />}
          text="Log out"
          loadingText="Logging out..."
          variant="subtle"
          colorPalette="red"
        />
      </form>
    );
  }

  return (
    <form action={signIn}>
      <SubmitButton
        icon={<FaGithub />}
        text="Log in with GitHub"
        loadingText="Logging in..."
        variant="solid"
      />
    </form>
  );
}
