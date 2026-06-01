function ChevronLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-left">
          <path d="M15 17L10 12L15 7" id="Icon" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[85px]">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[28px] min-h-px min-w-px relative text-[#0b0b0b] text-[18px] whitespace-pre-wrap">Label</p>
    </div>
  );
}

function DropdownsCampus() {
  return (
    <div className="bg-[#fdfdfd] relative shrink-0 w-full" data-name="Dropdowns campus">
      <div aria-hidden="true" className="absolute border-2 border-[#fdfdfd] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <ChevronLeft />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function ChevronLeft1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-left">
          <path d="M15 17L10 12L15 7" id="Icon" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[85px]">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[28px] min-h-px min-w-px relative text-[#0b0b0b] text-[18px] whitespace-pre-wrap">Label 2</p>
    </div>
  );
}

function DropdownsCampus1() {
  return (
    <div className="bg-[#fdfdfd] relative shrink-0 w-full" data-name="Dropdowns campus">
      <div aria-hidden="true" className="absolute border-2 border-[#fdfdfd] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <ChevronLeft1 />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function ChevronLeft2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-left">
          <path d="M15 17L10 12L15 7" id="Icon" stroke="var(--stroke-0, #0B0B0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[85px]">
      <p className="flex-[1_0_0] font-['Nunito:Medium',sans-serif] font-medium leading-[28px] min-h-px min-w-px relative text-[#0b0b0b] text-[18px] whitespace-pre-wrap">Label 3</p>
    </div>
  );
}

function DropdownsCampus2() {
  return (
    <div className="bg-[#fdfdfd] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Dropdowns campus">
      <div aria-hidden="true" className="absolute border-2 border-[#fdfdfd] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <ChevronLeft2 />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[12px] shadow-[0px_4px_5.6px_0px_rgba(11,11,11,0.14)] size-full">
      <DropdownsCampus />
      <DropdownsCampus1 />
      <DropdownsCampus2 />
    </div>
  );
}