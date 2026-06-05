import { Suspense } from "react";
import { ImageGalleryPage } from "../../../../components/pages/ImageGalleryPage";
import { PrototypeBanner } from "../../../../components/ui/PrototypeBanner";

export async function generateStaticParams() {
  return [
    { moduleId: "notificacion-pliego" },
    { moduleId: "descargos-pruebas" },
    { moduleId: "actos-prueba" },
    { moduleId: "alegatos-conclusion" },
    { moduleId: "hallazgos" },
  ];
}

export default function ImagenesSERRoute() {
  return (
    <Suspense>
      <ImageGalleryPage />
      <PrototypeBanner />
    </Suspense>
  );
}
