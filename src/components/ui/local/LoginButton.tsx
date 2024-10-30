import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../button";
import { signIn } from "@/auth";

const LoginButon = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit">
        <GitHubLogoIcon />
        Sign in with GitHub
      </Button>
    </form>
  );
};

export default LoginButon;
