import Image from "next/image";
import svgPaths from "./svg-jl24v6b9nh";
import Menu from "./Menu";

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[62.925px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.9253 62.9253">
          <svg width="63" height="64" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="31.4626" cy="32.4607" r="20" fill="#3F51B5" />
            <path d="M25.1811 44.0254V22.2072H32.5533C34.2649 22.2072 35.6641 22.5162 36.7507 23.1341C37.8445 23.7449 38.6541 24.5723 39.1797 25.6163C39.7053 26.6603 39.968 27.8251 39.968 29.1106C39.968 30.3961 39.7053 31.5645 39.1797 32.6156C38.6612 33.6667 37.8587 34.5048 36.772 35.1298C35.6854 35.7477 34.2933 36.0566 32.5959 36.0566H27.3118V33.7129H32.5107C33.6825 33.7129 34.6236 33.5105 35.3338 33.1056C36.044 32.7008 36.5589 32.1539 36.8786 31.465C37.2053 30.769 37.3686 29.9842 37.3686 29.1106C37.3686 28.237 37.2053 27.4558 36.8786 26.7669C36.5589 26.0779 36.0405 25.5382 35.3232 25.1475C34.6058 24.7498 33.6541 24.551 32.468 24.551H27.8232V44.0254H25.1811Z" fill="white" />
            <path d="M52.361 7.71471L54.4257 5.56326L54.4347 5.52758C54.0533 5.12594 54.4573 4.46327 54.949 4.70436C55.4196 4.93522 55.2055 5.6981 54.6989 5.68367L53.9606 8.91544L53.9184 8.94954L48.0196 8.9443L47.2711 5.68367C46.7947 5.69758 46.5541 4.99923 46.9752 4.73321C47.4722 4.41946 47.9341 5.10102 47.5354 5.52758L47.5443 5.56326L49.6091 7.71471L50.7154 4.62539C50.7333 4.50367 50.5692 4.44202 50.5371 4.27963C50.3722 3.44119 51.5988 3.43489 51.4327 4.27963C51.4009 4.44202 51.2365 4.50367 51.2544 4.62539L52.3607 7.71471H52.361Z" fill="white" />
          </svg>
        </svg>
      </div>
      <div className="col-1 flex flex-col h-[33.811px] justify-center ml-[22.54px] mt-[15.03px] relative row-1 text-white w-[18.784px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontStyle: "normal", fontSize: "30px" }}></div>
    </div>
  );
}

function Group10() {
  return (
    <div className="col-1 h-[5.301px] ml-0 mt-0 relative row-1 w-[8.453px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.45265 5.30111">
        <g id="Group 48096870">
          <path d={svgPaths.pe947800} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[23.54%] mt-[22.85%] place-items-start relative row-1">
      <Group10 />
    </div>
  );
}

function Group4() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group9 />
    </div>
  );
}

function Group8() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[43px] mt-0 place-items-start relative row-1">
      <Group8 />
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group5 />
      <Group6 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between px-[40px] relative size-full">
      <Image src="/logo.png" alt="TIC ANIA" width={30} height={30} />
      <div className="flex items-center gap-6">
        <Menu />
        <Group7 />
      </div>
    </div>
  );
}