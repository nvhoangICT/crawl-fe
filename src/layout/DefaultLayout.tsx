import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useAuth, { getCurrentUser } from "@/store/useAuth";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}
const DefaultLayout = ({ children }: Props) => {
  const { currentUser, isRefreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [isRefreshUser]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      await getCurrentUser();
    } catch (error) {
      console.log("Error fetching user:", error);
      // Error đã được xử lý trong getCurrentUser (redirect to login)
    } finally {
      setIsLoading(false);
    }
  };
  
  // Hiển thị loading khi đang fetch user hoặc chưa có user
  if (isLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="loader-sun-and-moon"></div>
          <span className="text-2xl">Loading...</span>
        </div>
      </div>
    );
  }

  // Hiển thị layout khi đã có user
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden no-scrollbar ">
        <div className="flex flex-col h-screen overflow-y-auto no-scrollbar ">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b sticky top-[0px] bg-white z-[50] bg-[image:linear-gradient(to_right,white_0%,white_70%,transparent_100%),url(/images/thumbnail-sidebar.jpg)] bg-[size:100%_100%,30%_100%] bg-[position:0_0,right_center] bg-no-repeat">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
              {/* <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-sidebar pt-4">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DefaultLayout;
