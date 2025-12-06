
import {
  useSidebar
} from "@/components/ui/sidebar";
import { LOGO_URL } from "@/constants";

export function TeamSwitcher() {
  const sideBarStore = useSidebar();
  return (
    <div className={`flex  ${sideBarStore?.open ? 'size-16' : 'size-12'} px-3 items-center justify-center text-sidebar-primary-foreground`}>
      <img src={`${sideBarStore?.open ? LOGO_URL : LOGO_URL}`} alt="logo" />
    </div>
  )
}
