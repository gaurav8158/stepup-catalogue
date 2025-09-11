// "use client";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Headset, LogOut, ScrollText, User, UserRoundPen } from "lucide-react";

// export function ProfileDropdown({ user }) {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("usertoken");
//     router.push("/login");
//   };

//   const handleSupport = () => {
//     router.push("/user/support");
//   };
//   const handleMyorder = () => {
//     router.push("/user");
//   };
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className="flex flex-col justify-center items-center cursor-pointer">
//           <div className="inline-block font-semibold p-1 rounded-full text-black transition-colors ">
//             <User className="w-6 h-6" />
//           </div>
//           <span className="text-sm font-bold max-w-[50px] truncate">
//             Profile
//           </span>
//         </div>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-44" align="end">
//         {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
//         <DropdownMenuLabel className="truncate">
//           Hello {user?.name || "User"}
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />

//         <DropdownMenuGroup>
//           <DropdownMenuItem onClick={handleMyorder}>
//             My Orders
//             <DropdownMenuShortcut>
//               <ScrollText />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={handleSupport}>
//             Support
//             <DropdownMenuShortcut>
//               <Headset />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />

//         <DropdownMenuItem onClick={handleLogout}>
//           Log out
//           <DropdownMenuShortcut>
//             <LogOut />
//           </DropdownMenuShortcut>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }



//  <Link
//                 href="/login"
//                 className="inline-block bg-[#28B083] font-semibold px-4 md:px-6 py-1 text-sm md:text-base rounded-full text-white hover:bg-green-700 transition-colors"
//               >
//                 Login/Register
//               </Link>



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
import { Headset, LogOut, ScrollText, User } from "lucide-react";

export function ProfileDropdown({ user }) {
  const router = useRouter();

  // If no user is logged in, show a dropdown with a Login/Signup prompt.
  if (!user) {
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
        <DropdownMenuContent className="w-60" align="end">
          <div className="p-2">
            <p className="text-base font-semibold leading-none mb-1">Welcome</p>
            <p className="text-xs leading-none text-gray-500 mb-3">
              To access account and manage orders
            </p>
            <Button
              variant="outline"
              className="w-full font-bold text-green-500 border-green-500 hover:text-green-600 hover:border-green-600"
              onClick={() => router.push("/login")}
            >
              LOGIN / SIGNUP
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  //  logged in, show the full  menu 

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
        <DropdownMenuLabel className="truncate">
          Hello, {user?.name || "User"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleMyorder} className="cursor-pointer">
            My Orders
            <DropdownMenuShortcut>
              <ScrollText />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSupport} className="cursor-pointer">
            Support
            <DropdownMenuShortcut>
              <Headset />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

