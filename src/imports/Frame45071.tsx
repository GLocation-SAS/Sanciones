import svgPaths from "./svg-f6rj8xa00r";

function Description() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="description">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[28px] min-h-px min-w-px not-italic relative text-[#7e7e7e] text-[18px]">Las propiedades definen las variantes disponibles del input y establecen las reglas para su uso consistente dentro del sistema. Permiten adaptar el componente a distintos contextos de interacción sin perder coherencia visual ni accesibilidad.</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <ol className="block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#7e7e7e] text-[0px] w-full" start="2">
        <li className="ms-[calc(var(--list-marker-font-size,0)*1.5*1)] whitespace-pre-wrap">
          <span className="font-['Inter:Bold_Italic',sans-serif] font-bold italic leading-[32px] text-[24px]">Propiedades</span>
        </li>
      </ol>
      <Description />
    </div>
  );
}

function Description1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="description">
      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#7e7e7e] text-[0px] text-[18px]">
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">{`State: `}</span>
          <span className="leading-[28px]">define el estado visual del input. Incluye los estados por defecto, hover, activo y disabled, los cuales comunican retroalimentación al usuario durante la interacción.</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Size:</span>
          <span className="leading-[28px]">{` controla el tamaño del componente para adaptarse a diferentes layouts y densidades de interfaz.`}</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Left icon:</span>
          <span className="leading-[28px]">{` permite mostrar u ocultar el icono izquierdo según el contexto de uso.`}</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Right icon:</span>
          <span className="leading-[28px]">{` ontrola la presencia de iconos de acción o indicadores al final del campo.`}</span>
        </p>
        <p className="mb-[18px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">Floating label:</span>
          <span className="leading-[28px]">{` activa o desactiva la etiqueta superior flotante del input.`}</span>
        </p>
        <p>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic">{`Error: `}</span>
          <span className="leading-[28px]">permite mostrar mensajes de apoyo o validación debajo del campo cuando sea necesario.</span>
        </p>
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

function Content() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        States
      </p>
    </div>
  );
}

function Lines() {
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

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame11 />
      <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
          <div className="absolute inset-[-21.83%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
              <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame3 />
    </div>
  );
}

function Dropdowns1() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#0b0b0b] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame12 />
          <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
              <div className="absolute inset-[-21.83%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
                  <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#0b0b0b] text-[18px] whitespace-nowrap">|</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame6 />
    </div>
  );
}

function Dropdowns2() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#3f51b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame13 />
          <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
              <div className="absolute inset-[-21.83%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
                  <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#3f51b5] text-[12px] whitespace-nowrap">Titulo de input</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Dropdowns2 />
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#e1e1e1] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame8 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame14 />
      <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
          <div className="absolute inset-[-21.83%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
              <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns3() {
  return (
    <div className="bg-[#f6f6f6] h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#f6f6f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#f6f6f6] text-[12px] whitespace-nowrap">Titulo de input</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[336px]">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="brackets">
        <Content />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Inputs">
        <Dropdowns />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Component 2">
        <Dropdowns1 />
      </div>
      <div className="content-stretch flex flex-col h-[51px] items-start relative shrink-0 w-[336px]" data-name="Component 3">
        <Frame15 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Component 5">
        <Dropdowns3 />
        <Frame9 />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Size
      </p>
    </div>
  );
}

function Lines1() {
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

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame10 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame16 />
      <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
          <div className="absolute inset-[-21.83%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
              <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns4() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Dropdowns4 />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame24 />
    </div>
  );
}

function Dropdowns5() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#0b0b0b] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame23 />
          <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
              <div className="absolute inset-[-21.83%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
                  <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#0b0b0b] text-[18px] whitespace-nowrap">|</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame27 />
    </div>
  );
}

function Dropdowns6() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#3f51b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame26 />
          <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
              <div className="absolute inset-[-21.83%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
                  <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#3f51b5] text-[12px] whitespace-nowrap">Nombre asunto</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Dropdowns6 />
      <Frame28 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#e1e1e1] text-[18px] whitespace-nowrap">Ej_ Correo</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame31 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame30 />
      <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
          <div className="absolute inset-[-21.83%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
              <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns7() {
  return (
    <div className="bg-[#f6f6f6] h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#f6f6f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#f6f6f6] text-[12px] whitespace-nowrap">Nombre Asunto</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="brackets">
        <Content1 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines1 />
          </div>
        </div>
      </div>
      <Frame21 />
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Dropdowns5 />
      </div>
      <div className="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Frame25 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Component 4">
        <Dropdowns7 />
        <Frame32 />
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Left icon
      </p>
    </div>
  );
}

function Lines2() {
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

function Frame36() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame36 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[290px]">
      <Frame35 />
    </div>
  );
}

function Dropdowns8() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame39 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame38 />
    </div>
  );
}

function Dropdowns9() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col h-[47.625px] items-center justify-center relative shrink-0 w-[235px]" data-name="brackets">
        <Content2 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines2 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Dropdowns8 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Dropdowns9 />
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Right Icon
      </p>
    </div>
  );
}

function Lines3() {
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

function Frame43() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame43 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame42 />
      <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
          <div className="absolute inset-[-21.83%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
              <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns10() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame41 />
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px] whitespace-nowrap">Ej: Correo</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame46 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame45 />
    </div>
  );
}

function Dropdowns11() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col h-[47.625px] items-center justify-center relative shrink-0 w-[235px]" data-name="brackets">
        <Content3 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines3 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Dropdowns10 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Dropdowns11 />
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Floating Label
      </p>
    </div>
  );
}

function Lines4() {
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

function Frame53() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#0b0b0b] text-[18px] whitespace-nowrap">|</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame53 />
    </div>
  );
}

function Dropdowns12() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#3f51b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame52 />
          <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
              <div className="absolute inset-[-21.83%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
                  <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#3f51b5] text-[12px] whitespace-nowrap">Filtro mes</p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Dropdowns12 />
      <Frame54 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-[235px]" data-name="Inputs">
        <Frame51 />
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[235px]">
      <Frame50 />
    </div>
  );
}

function Frame55() {
  return <div className="h-[52px] shrink-0 w-[235px]" />;
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[235px]">
      <Frame49 />
      <Frame55 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col h-[47.625px] items-center justify-center relative shrink-0 w-[235px]" data-name="brackets">
        <Content4 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines4 />
          </div>
        </div>
      </div>
      <Frame48 />
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Error
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

function Frame58() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#d93428] text-[18px] whitespace-nowrap">Junio</p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
        <div className="absolute inset-[12.5%_14.58%_12.5%_18.75%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p5b66ec0} id="Icon" stroke="var(--stroke-0, #D93428)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Frame58 />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-[20px] relative shrink-0 w-[2px]" data-name="Divider">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Work_Sans:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] left-0 text-[#d93428] text-[14px] top-[8px] w-[4px]">
        <p className="leading-[20px]">|</p>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="alert-circle">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p3c391300} id="Icon" stroke="var(--stroke-0, #D93428)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <Divider />
      <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.58px] left-1/2 top-[calc(50%+0.29px)] w-[10px]" data-name="Vector">
          <div className="absolute inset-[-21.83%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 6.58001">
              <path d={svgPaths.p275eec80} id="Vector" stroke="var(--stroke-0, #D93428)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdowns13() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#d93428] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame57 />
          <Frame59 />
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#0b0b0b] text-[12px] whitespace-nowrap">Titulo de input</p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-0 px-[4px] top-[63px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#d93428] text-[12px] whitespace-nowrap">El mes seleccionado no existe</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[87px] items-start relative shrink-0 w-[235px]">
      <div className="content-stretch flex flex-col h-[47.625px] items-center justify-center relative shrink-0 w-[235px]" data-name="brackets">
        <Content5 />
        <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "42" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none w-full">
            <Lines5 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Component 5">
        <Dropdowns13 />
        <Frame60 />
        <Frame61 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[57px] h-[341px] items-start px-[64px] relative shrink-0 w-[1922px]">
      <Frame18 />
      <Frame20 />
      <Frame33 />
      <Frame40 />
      <Frame47 />
      <Frame56 />
    </div>
  );
}

function Showcase() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="showcase">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[30px] py-[64px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative size-full">
      <Frame />
      <Showcase />
    </div>
  );
}