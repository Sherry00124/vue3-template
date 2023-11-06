const SidebarKey = "sidebar";

export function getSidebar() {
  return sessionStorage.getItem(SidebarKey);
}

export function setSidebar(sidebar: any) {
  return sessionStorage.setItem(SidebarKey, sidebar);
}

export function removeSidebar() {
  return sessionStorage.removeItem(SidebarKey);
}
