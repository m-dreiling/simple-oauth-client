import { FaGithub } from 'react-icons/fa6';

import SubmitButton from '@/components/ui/submit-button';

export default async function AuthButton() {
  return (
    <SubmitButton
      icon={<FaGithub />}
      text="Log in with GitHub"
      loadingText="Logging in..."
      variant="solid"
    />
  );
}
