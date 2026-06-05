import { Suspense } from "react";
import { DocumentoViewerPage } from "../../../../components/pages/DocumentoViewerPage";
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

export default function DocumentoViewerRoute() {
  return (
    <Suspense>
      <DocumentoViewerPage />
      <PrototypeBanner />
    </Suspense>
  );
}
