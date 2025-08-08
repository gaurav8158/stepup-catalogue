"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Headset, LogOut, ScrollText, User, UserRoundPen } from "lucide-react";

export function ProfileDropdown({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("usertoken");
    router.push("/login");
  };

  const handleSupport = () => {
    router.push("/user/support");
  };
  const handleMyorder = () => {
    router.push("/user");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <div className="inline-block font-semibold p-1 rounded-full text-black transition-colors ">
            <User className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold max-w-[50px] truncate">
            Profile
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44" align="end">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuLabel className="truncate">
          Hello {user.name || "User"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>
              <UserRoundPen />
            </DropdownMenuShortcut>
          </DropdownMenuItem> */}

          <DropdownMenuItem onClick={handleMyorder}>
            My Orders
            <DropdownMenuShortcut>
              <ScrollText />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSupport}>
            Support
            <DropdownMenuShortcut>
              <Headset />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
