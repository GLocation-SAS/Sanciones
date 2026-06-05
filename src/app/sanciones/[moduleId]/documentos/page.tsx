import { Suspense } from "react";
import { DocumentosPage } from "../../../../components/pages/DocumentosPage";
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

export default function DocumentosRoute() {
  return (
    <Suspense>
      <DocumentosPage />
      <PrototypeBanner />
    </Suspense>
  );
}
