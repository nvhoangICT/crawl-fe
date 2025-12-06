"use client";

import {ChevronsUpDown, KeyRound, LogOut, UserRound} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {formatLastWord} from "@/lib/utils";
import useAuth from "@/store/useAuth";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {authService} from "@/services/authService";
import {toast} from "react-toastify";
import {DialogConfirm} from "./common/DialogConfirm";
import { getCurrentUser } from "@/store/useAuth";
// import { ChangePassWord } from "@/pages/auth/change-password";

export function NavUser() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {isMobile} = useSidebar();
  const {currentUser} = useAuth();
  const navigation = useNavigate();

  const [openChangePassword, setOpenChangePassword] = useState(false);
  
  // Cleanup pointer-events khi component unmount hoặc dialog đóng
  useEffect(() => {
    if (!openConfirm) {
      // Xóa style pointer-events: none khỏi body khi dialog đóng
      const body = document.body;
      if (body.style.pointerEvents === "none") {
        body.style.pointerEvents = "";
      }
    }
    
    // Cleanup khi component unmount
    return () => {
      const body = document.body;
      if (body.style.pointerEvents === "none") {
        body.style.pointerEvents = "";
      }
    };
  }, [openConfirm]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Đóng dialog trước
      setOpenConfirm(false);
      
      // Xóa style pointer-events: none khỏi body ngay lập tức
      const body = document.body;
      if (body.style.pointerEvents === "none") {
        body.style.pointerEvents = "";
      }
      
      // Đợi một chút để dialog đóng hoàn toàn
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const { logout } = useAuth.getState();
      await authService.logout();
      logout(); // Clear auth state
      toast.success("Đăng xuất thành công");
      navigation("/auth/login");
    } catch (error) {
      console.log(error);
      // Vẫn logout dù có lỗi
      const { logout } = useAuth.getState();
      logout();
      
      // Đảm bảo xóa style pointer-events
      const body = document.body;
      if (body.style.pointerEvents === "none") {
        body.style.pointerEvents = "";
      }
      
      navigation("/auth/login");
    } finally {
      setIsLoading(false);
      setOpenConfirm(false);
      
      // Đảm bảo xóa style pointer-events trong finally
      const body = document.body;
      if (body.style.pointerEvents === "none") {
        body.style.pointerEvents = "";
      }
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={currentUser?.avatar}
                  alt={currentUser?.fullName}
                />
                <AvatarFallback className="rounded-lg">
                  {formatLastWord(currentUser?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentUser?.fullName || "shadcn"}
                </span>
                <span className="truncate text-xs">
                  {currentUser?.email || "m@example.com"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={currentUser?.avatar}
                    alt={currentUser?.fullName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {formatLastWord(currentUser ? currentUser?.fullName : "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentUser?.fullName || "shadcn"}
                  </span>
                  <span className="truncate text-xs">
                    {currentUser?.email || "m@example.com"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigation("account")}>
                <UserRound />
                Thông tin tài khoản
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setOpenChangePassword(true)}>
                <KeyRound />
                Đổi mật khẩu
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenConfirm(true)}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      {/* <ChangePassWord
        onClose={() => setOpenChangePassword(false)}
        open={openChangePassword}
      /> */}
      <DialogConfirm
        onConfirm={handleLogout}
        title="Xác nhận đăng xuất"
        description="Bạn có chắc chắn muốn đăng xuất"
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        isLoading={isLoading}
      />
    </SidebarMenu>
  );
}
