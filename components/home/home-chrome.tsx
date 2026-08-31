import { CatalogViewportSync } from "@/components/home/catalog-viewport-sync";
import { LayoutSwitch } from "@/components/home/layout-switch";

export function HomeChrome() {
  return (
    <>
      <CatalogViewportSync />
      <LayoutSwitch />
    </>
  );
}
