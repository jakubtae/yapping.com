import Image from "next/image";
import { Button } from "../button";
import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SignOutButtonProps {
  link: string;
}

const SignOutButton = ({ link }: SignOutButtonProps) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <Image
            src={link}
            width={40}
            height={40}
            alt="Logo"
            className="rounded-full border-black border-[3px] p-0.5"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild className="p-0">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                type="submit"
                className="w-full h-min"
                variant="secondary"
              >
                Log out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SignOutButton;
