import svgPaths from "./svg-oqwnyuikt9";

function Content() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        States
      </p>
    </div>
  );
}

function Lines() {
  return (
    <div className="content-stretch flex h-[336px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-0.24%_0_-0.24%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 337.6">
                <path d={svgPaths.p29702880} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[336px]" data-name="brackets">
      <Content />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines />
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Default
      </p>
    </div>
  );
}

function Lines1() {
  return (
    <div className="content-stretch flex h-[52px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-1.54%_0_-1.54%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 53.6">
                <path d={svgPaths.p14318500} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets1() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
      <Content1 />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines1 />
        </div>
      </div>
    </div>
  );
}

function CalendarCheck() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar-check">
          <path d={svgPaths.p13d206a0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px]">Ej: Correo</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <CalendarCheck />
      <Frame />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M7 10L12.0008 14.58L17 10" id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame10 />
      <ChevronDown />
    </div>
  );
}

function Dropdowns() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function Inputs() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Inputs">
      <Dropdowns />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <div className="flex h-[52px] items-center justify-center relative shrink-0 w-[48px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Brackets1 />
        </div>
      </div>
      <Inputs />
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Hover
      </p>
    </div>
  );
}

function Lines2() {
  return (
    <div className="content-stretch flex h-[52px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-1.54%_0_-1.54%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 53.6">
                <path d={svgPaths.p14318500} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets2() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
      <Content2 />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines2 />
        </div>
      </div>
    </div>
  );
}

function CalendarCheck1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar-check">
          <path d={svgPaths.p13d206a0} id="Icon" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#7e7e7e] text-[18px]">Ej: Correo</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <CalendarCheck1 />
      <Frame1 />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M7 10L12.0008 14.58L17 10" id="Vector" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Dropdowns1() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#0b0b0b] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame11 />
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Component 2">
      <Dropdowns1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <div className="flex h-[52px] items-center justify-center relative shrink-0 w-[48px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Brackets2 />
        </div>
      </div>
      <Component />
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Active
      </p>
    </div>
  );
}

function Lines3() {
  return (
    <div className="content-stretch flex h-[52px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-1.54%_0_-1.54%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 53.6">
                <path d={svgPaths.p14318500} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets3() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
      <Content3 />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines3 />
        </div>
      </div>
    </div>
  );
}

function CalendarCheck2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar-check">
          <path d={svgPaths.p13d206a0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#0b0b0b] text-[18px]">|</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <CalendarCheck2 />
      <Frame2 />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M7 10L12.0008 14.58L17 10" id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Dropdowns2() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#3f51b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame12 />
          <ChevronDown2 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#3f51b5] text-[12px]">Titulo de input</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Dropdowns2 />
      <Frame3 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col h-[51px] items-start relative shrink-0 w-[336px]" data-name="Component 3">
      <Frame14 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <div className="flex h-[52px] items-center justify-center relative shrink-0 w-[48px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Brackets3 />
        </div>
      </div>
      <Component1 />
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Write
      </p>
    </div>
  );
}

function Lines4() {
  return (
    <div className="content-stretch flex h-[52px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-1.54%_0_-1.54%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 53.6">
                <path d={svgPaths.p14318500} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets4() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
      <Content4 />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines4 />
        </div>
      </div>
    </div>
  );
}

function CalendarCheck3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar-check">
          <path d={svgPaths.p13d206a0} id="Icon" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#0b0b0b] text-[18px]">Ingresar texto input</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <CalendarCheck3 />
      <Frame4 />
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M7 10L12.0008 14.58L17 10" id="Vector" stroke="var(--stroke-0, #BDBDBD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Dropdowns3() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#3f51b5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame13 />
          <ChevronDown3 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#3f51b5] text-[12px]">Titulo de input</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Dropdowns3 />
      <Frame5 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col h-[51px] items-start relative shrink-0 w-[336px]" data-name="Component 3">
      <Frame15 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <div className="flex h-[52px] items-center justify-center relative shrink-0 w-[48px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Brackets4 />
        </div>
      </div>
      <Component2 />
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Disabled
      </p>
    </div>
  );
}

function Lines5() {
  return (
    <div className="content-stretch flex h-[52px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-1.54%_0_-1.54%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 53.6">
                <path d={svgPaths.p14318500} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets5() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[52px]" data-name="brackets">
      <Content5 />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines5 />
        </div>
      </div>
    </div>
  );
}

function CalendarCheck4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar-check">
          <path d={svgPaths.p13d206a0} id="Icon" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#e1e1e1] text-[18px]">Ej: Correo</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <CalendarCheck4 />
      <Frame6 />
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M7 10L12.0008 14.58L17 10" id="Vector" stroke="var(--stroke-0, #E1E1E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame19 />
      <ChevronDown4 />
    </div>
  );
}

function Dropdowns4() {
  return (
    <div className="bg-[#f6f6f6] h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#f6f6f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#f6f6f6] text-[12px]">Titulo de input</p>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Component 5">
      <Dropdowns4 />
      <Frame7 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <div className="flex h-[52px] items-center justify-center relative shrink-0 w-[48px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Brackets5 />
        </div>
      </div>
      <Component3 />
    </div>
  );
}

function Content6() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-start px-[11px] relative rounded-[50px] shrink-0" data-name="content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[22px] relative shrink-0 text-[#4b4b4b] text-[14px] tracking-[0.28px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Error
      </p>
    </div>
  );
}

function Lines6() {
  return (
    <div className="content-stretch flex h-[76px] items-center relative w-full" data-name="lines">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <div className="h-full relative w-[17px]">
            <div className="absolute inset-[-1.05%_0_-1.05%_-4.71%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8 77.6">
                <path d={svgPaths.p2c7d8c80} id="Vector 1" stroke="var(--stroke-0, black)" strokeWidth="1.6" />
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

function Brackets6() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative w-[76px]" data-name="brackets">
      <Content6 />
      <div className="flex h-[25.625px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "42" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none w-full">
          <Lines6 />
        </div>
      </div>
    </div>
  );
}

function CalendarCheck5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="calendar-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="calendar-check">
          <path d={svgPaths.p13d206a0} id="Icon" stroke="var(--stroke-0, #D93428)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#d93428] text-[18px]">Ej: Correo</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[216px]">
      <CalendarCheck5 />
      <Frame8 />
    </div>
  );
}

function AlertCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="alert-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="alert-circle">
          <path d={svgPaths.p3bc79280} id="Icon" stroke="var(--stroke-0, #D93428)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-[20px] relative shrink-0 w-[2px]" data-name="Divider">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Work_Sans:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] left-0 text-[#d93428] text-[14px] top-[8px] w-[4px]">
        <p className="leading-[20px] whitespace-pre-wrap">|</p>
      </div>
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M7 10L12.0008 14.58L17 10" id="Vector" stroke="var(--stroke-0, #D93428)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <AlertCircle />
      <Divider />
      <ChevronDown5 />
    </div>
  );
}

function Dropdowns5() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#d93428] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative size-full">
          <Frame20 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#0b0b0b] text-[12px]">Titulo de input</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-0 px-[4px] top-[63px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#d93428] text-[12px]">Nota error</p>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[336px]" data-name="Component 6">
      <Dropdowns5 />
      <Frame9 />
      <Frame22 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[37px] items-start relative shrink-0">
      <div className="flex h-[76px] items-center justify-center relative shrink-0 w-[48px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "63" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Brackets6 />
        </div>
      </div>
      <Component4 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[37px] items-end relative shrink-0 w-[421px]">
      <Brackets />
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
    </div>
  );
}

export default function Showcase() {
  return (
    <div className="bg-white content-stretch flex items-center px-[111px] py-[64px] relative rounded-[8px] size-full" data-name="showcase">
      <Frame17 />
    </div>
  );
}