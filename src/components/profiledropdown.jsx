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
          <div className="inline-block bg-[#28B083] font-semibold p-1 rounded-full text-white hover:bg-green-700 transition-colors shadow">
            <User className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold max-w-[50px] truncate">
            {user.name || "User"}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>
              <UserRoundPen />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSupport}>
            Support
            <DropdownMenuShortcut>
              <Headset />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMyorder}>
            My Orders
            <DropdownMenuShortcut>
              <ScrollText />
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
