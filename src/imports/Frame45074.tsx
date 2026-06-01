import svgPaths from "./svg-qr3xyeltcu";

function Description() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="description">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[28px] min-h-px min-w-px not-italic relative text-[#7e7e7e] text-[18px]">Los estados definen el comportamiento visual y funcional del botón en función de la interacción del usuario o del resultado de una acción. Estos permiten comunicar disponibilidad, prioridad, retroalimentación y riesgo dentro de la interfaz.Los estados definen el comportamiento visual y funcional del botón en función de la interacción del usuario o del resultado de una acción. Estos permiten comunicar disponibilidad, prioridad, retroalimentación y riesgo dentro de la interfaz.</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ol className="block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#7e7e7e] text-[0px] w-full" start="4">
        <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
          <span className="font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[32px] text-[24px]">Estados</span>
        </li>
      </ol>
      <Description />
    </div>
  );
}

function Description1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="description">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-[312px] leading-[0] min-h-px min-w-px not-italic relative text-[#7e7e7e] text-[0px] text-[18px] whitespace-pre-wrap">
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">{`Default: `}</span>
          <span className="leading-[28px]">Estado base del botón cuando no existe interacción. Cada tipo (Primary, Secondary, Neutral y Neutral Outline) se presenta con su estilo estándar y jerarquía definida.</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">{`Hover: `}</span>
          <span className="leading-[28px]">Indica que el usuario pasa el cursor sobre el botón. Refuerza la percepción de interactividad y anticipa la acción que se puede ejecutar.</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Pressed:</span>
          <span className="leading-[28px]">{` Estado que se muestra mientras el botón está siendo presionado. Confirma visualmente la activación del control antes de que se ejecute la acción.`}</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Disabled</span>
          <span className="leading-[28px]">: Indica que el botón no está disponible para interacción. Se utiliza cuando la acción no puede ejecutarse debido a reglas del sistema o validaciones incompletas.</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">{`Success: `}</span>
          <span className="leading-[28px]">Se utiliza para indicar que una acción fue completada correctamente o que llevará a un resultado positivo dentro del flujo.</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">{`Warning: `}</span>
          <span className="leading-[28px]">Advierte sobre una acción que puede implicar riesgo o que requiere confirmación adicional antes de continuar.</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Danger:</span>
          <span className="leading-[28px]">{` Se utiliza para acciones críticas o destructivas que pueden generar consecuencias negativas o errores.`}</span>
        </p>
        <p className="leading-[28px] mb-[18px]">&nbsp;</p>
        <p className="leading-[28px]">&nbsp;</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[43px] items-start relative shrink-0 w-[1722px]">
      <Frame4 />
      <Description1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Primary
      </p>
    </div>
  );
}

function Lines() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Default
      </p>
    </div>
  );
}

function Lines1() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Hover
      </p>
    </div>
  );
}

function Lines2() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pressed
      </p>
    </div>
  );
}

function Lines3() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Disabled
      </p>
    </div>
  );
}

function Lines4() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3f51b5] col-1 content-stretch flex gap-[12px] items-center justify-center ml-[107.07px] mt-[73px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-primary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame1 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#3a4aa5] col-1 content-stretch flex gap-[12px] items-center justify-center ml-[108.07px] mt-[195px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-primary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#171f4b] col-1 content-stretch flex gap-[12px] items-center justify-center ml-[107.07px] mt-[317px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-primary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#dde1f4] col-1 content-stretch flex gap-[12px] items-center justify-center ml-[107.07px] mt-[439px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-primary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #B3BBE5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#b3bbe5] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #B3BBE5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col h-[48px] items-center justify-center ml-[106.95px] mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content />
        <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none size-full">
            <Lines />
          </div>
        </div>
      </div>
      <div className="col-1 flex h-[52px] items-center justify-center ml-0 mt-[73px] relative row-1 w-[48px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
            <Content1 />
            <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
              <div className="-rotate-90 flex-none size-full">
                <Lines1 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 flex h-[52px] items-center justify-center ml-0 mt-[195px] relative row-1 w-[48px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
            <Content2 />
            <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
              <div className="-rotate-90 flex-none size-full">
                <Lines2 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 flex h-[52px] items-center justify-center ml-0 mt-[317px] relative row-1 w-[48px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
            <Content3 />
            <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
              <div className="-rotate-90 flex-none size-full">
                <Lines3 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 flex h-[52px] items-center justify-center ml-0 mt-[439px] relative row-1 w-[48px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
            <Content4 />
            <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
              <div className="-rotate-90 flex-none size-full">
                <Lines4 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Secondary
      </p>
    </div>
  );
}

function Lines5() {
  return (
    <div className="content-stretch flex h-[208px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#11386b] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[73px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-secondary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame2 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0f325f] col-1 content-stretch cursor-pointer flex gap-[12px] items-center justify-center ml-px mt-[195px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-secondary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#030d1a] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[317px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-secondary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#cfe1f9] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[439px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-secondary">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #85B2EC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#85b2ec] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #85B2EC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-[0.44px] mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content5 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Neutral
      </p>
    </div>
  );
}

function Lines6() {
  return (
    <div className="content-stretch flex h-[208px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#bdbdbd] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[72px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame3 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#7e7e7e] col-1 content-stretch cursor-pointer flex gap-[12px] items-center justify-center ml-px mt-[194px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#404040] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[316px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6f6] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[438px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral">
        <div aria-hidden="true" className="absolute border-2 border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #CECECE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#cecece] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #CECECE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-px mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content6 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Outline
      </p>
    </div>
  );
}

function Lines7() {
  return (
    <div className="content-stretch flex h-[208px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#f6f6f6] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[72px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral-outline">
        <div aria-hidden="true" className="absolute border-2 border-[#7e7e7e] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #7E7E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame5 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #7E7E7E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#7e7e7e] col-1 content-stretch cursor-pointer flex gap-[12px] items-center justify-center ml-px mt-[194px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral-outline">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#404040] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[316px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral-outline">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6f6] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[438px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-neutral-outline">
        <div aria-hidden="true" className="absolute border-2 border-[#e1e1e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#e1e1e1] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-[0.44px] mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content7 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines7 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Error
      </p>
    </div>
  );
}

function Lines8() {
  return (
    <div className="content-stretch flex h-[208px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#d93428] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[72px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-error/L/Default">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame6 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#c12e23] col-1 content-stretch flex gap-[12px] items-center justify-center ml-px mt-[194px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-error/L/Hover">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#851f18] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[316px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-error/L/Pressed">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9cfcb] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[438px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-error/L/Disabled">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #F3A9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#f3a9a3] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #F3A9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-[0.44px] mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content8 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Success
      </p>
    </div>
  );
}

function Lines9() {
  return (
    <div className="content-stretch flex h-[208px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#00c853] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[72px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-success/L/Default">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame7 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00b048] col-1 content-stretch flex gap-[12px] items-center justify-center ml-px mt-[194px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-success/L/Hover">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#007730] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[316px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-success/L/Pressed">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#c2f2dd] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[438px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-success/L/Disabled">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #8FE6C0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#8fe6c0] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #8FE6C0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-0 mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content9 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines9 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
    </div>
  );
}

function Content10() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Warning
      </p>
    </div>
  );
}

function Lines10() {
  return (
    <div className="content-stretch flex h-[208px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.38%_0_-0.38%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 199.6">
                <path d={svgPaths.p4d1fb80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[8.625px]">
        <div className="absolute inset-[-0.8px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.625 1.6">
            <path d="M0 0.8H8.625" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="bg-[#3f51b5] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[71px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-warning/L/Default">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Frame9 />
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#3a4aa5] col-1 content-stretch cursor-pointer flex gap-[12px] items-center justify-center ml-px mt-[193px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-warning/L/Hover">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#171f4b] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[315px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-warning/L/Pressed">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#fdfdfd] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #FDFDFD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#dde1f4] col-1 content-stretch flex gap-[12px] items-center justify-center ml-0 mt-[437px] px-[40px] py-[12px] relative rounded-[8px] row-1" data-name="button-warning/L/Disabled">
        <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[10px] items-center justify-center left-[calc(50%+0.5px)] top-1/2 w-[5px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "21" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="h-[5px] relative w-[10px]" data-name="Icon">
                <div className="absolute inset-[-20%_-10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                    <path d="M1 6L6 1L11 6" id="Icon" stroke="var(--stroke-0, #B3BBE5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#b3bbe5] text-[18px] whitespace-nowrap">Label</p>
        <div className="relative shrink-0 size-[24px]" data-name="bag-04">
          <div className="absolute inset-[7.5%_10%]" data-name="Icon">
            <div className="absolute inset-[-4.9%_-5.21%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 22.4">
                <path d={svgPaths.p2b27aa00} id="Icon" stroke="var(--stroke-0, #B3BBE5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-px mt-0 relative row-1 w-[198px]" data-name="brackets">
        <Content10 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines10 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  return (
    <div className="bg-white h-[633px] relative rounded-[8px] shrink-0 w-full" data-name="showcase">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[70px] items-start justify-center leading-[0] px-[30px] py-[64px] relative size-full">
          <Group />
          <Group1 />
          <Group2 />
          <Group3 />
          <Group5 />
          <Group6 />
          <Group4 />
        </div>
      </div>
    </div>
  );
}

export default function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative size-full">
      <Frame />
      <Showcase />
    </div>
  );
}