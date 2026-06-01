import svgPaths from "./svg-jyc3reoume";

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
      <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#0b0b0b] text-[18px]">Selecciona una opción</p>
    </div>
  );
}

function Frame2() {
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

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame2 />
      <ChevronDown />
    </div>
  );
}

function Dropdowns1() {
  return (
    <div className="h-[52px] relative rounded-[8px] shrink-0 w-full" data-name="Dropdowns">
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[11px] px-[4px] top-[-10px]">
      <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#0b0b0b] text-[12px]">Titulo del selector</p>
    </div>
  );
}

export default function Dropdowns() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Dropdowns">
      <Dropdowns1 />
      <Frame1 />
    </div>
  );
}