import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";

export const metadata: Metadata = {
  title: "Error 404",
};

export default function NotFound() {
  return (
    <NotFoundComponent
      title="Error 404!"
      description="Oopsies! This page does not exist on zakariamirinioui.surge.sh. While you're here, check out my projects or learn more about me."
    />
  );
}
