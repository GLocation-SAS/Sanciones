import React, { useState } from "react";
import { Scale } from "lucide-react";
import { useNavigate } from "react-router";
import svgPaths from "./svg-vwgelfauz4";

// --- Helper Components ---

function CircleIcon() {
  return (
    <div className="relative shrink-0 size-[13px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <circle cx="6.5" cy="6.5" fill="currentColor" r="6.5" />
      </svg>
    </div>
  );
}

// Icon for opening menu (Chevron)
function IconDespliegue({ isOpen }: { isOpen?: boolean }) {
  return (
    <div className="relative size-[24px]" data-name="icon despliegue">
      <svg 
        className={`block size-full transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 24 24"
      >
        <g id="icon / sort-down">
          <path d={svgPaths.p9a9f800} fill="currentColor" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

// --- Reusable Menu Item Component ---

interface MenuItemProps {
  text: string;
  isActive?: boolean;     // Controls active styling (purple text/bg)
  isOpen?: boolean;       // Controls arrow rotation
  showArrow?: boolean;    // Whether to show the chevron
  onClick?: () => void;
  className?: string;     // For rounded corners, etc.
}

function MenuItem({ 
  text, 
  isActive = false, 
  isOpen = false, 
  showArrow = true, 
  onClick, 
  className = "" 
}: MenuItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        content-stretch flex gap-[40px] h-[64px] items-center px-[40px] relative shrink-0 w-[571px] 
        transition-colors cursor-pointer
        ${isActive 
          ? 'bg-primary/20 text-primary' 
          : 'bg-background text-foreground hover:bg-primary/5 hover:text-foreground'
        }
        ${className}
      `}
      data-name="menu-item"
    >
      <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-center min-h-px min-w-px relative">
        <CircleIcon />
        <div 
          className="flex flex-col justify-center leading-[0] relative shrink-0 text-inherit w-[380px]"
          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-medium)" }}
        >
          <p className="leading-[32px] whitespace-pre-wrap">{text}</p>
        </div>
      </div>
      
      {showArrow && (
        <div className="flex items-center justify-center relative shrink-0 size-[24px]">
          <div className="-rotate-90 flex-none text-inherit">
            <IconDespliegue isOpen={isOpen} />
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Components ---

function ButtonWarning({ onClick, isOpen }: { onClick: () => void, isOpen: boolean }) {
  return (
    <div 
      onClick={onClick} 
      className={`
        content-stretch flex gap-[12px] items-center justify-center px-[40px] py-[12px] cursor-pointer 
        transition-all border-b-2
        ${isOpen 
          ? 'bg-primary/10 text-primary border-primary rounded-none' 
          : 'bg-background text-foreground border-transparent hover:bg-card hover:text-foreground active:bg-muted rounded-none'
        }
      `}
      data-name="button-warning"
    >
      <Scale className="w-[23px] h-[22px]" strokeWidth={2} />
      <span 
        style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--font-weight-medium)", lineHeight: "28px" }}
      >
        SANCIONES
      </span>
    </div>
  );
}

export default function Menu() {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>("Verificación de Notificación del Pliego");
  const navigate = useNavigate();

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
  };

  const handleItemClick = (itemName: string, route: string) => {
    setActiveItem(itemName);
    setIsMainMenuOpen(false);
    navigate(route);
  };

  const modules = [
    { name: "Verificación de Notificación del Pliego", route: "/sanciones/notificacion-pliego" },
    { name: "Verificación de descargos y solicitud de pruebas", route: "/sanciones/descargos-pruebas" },
    { name: "Verificación de comunicación del Acto de Pruebas", route: "/sanciones/actos-prueba" },
    { name: "Verificación de Alegatos de Conclusión", route: "/sanciones/alegatos-conclusion" },
    { name: "Verificación de Cumplimiento", route: "/sanciones/hallazgos" },
  ];

  return (
    <div className="relative group" data-name="Menú">
      <ButtonWarning onClick={toggleMainMenu} isOpen={isMainMenuOpen} />
      
      {isMainMenuOpen && (
        <div className="absolute top-full right-0 mt-2 z-50 flex flex-col shadow-elevation-sm rounded-lg overflow-hidden">
            {/* Menu Items - 5 Modules */}
            <div className="bg-background flex flex-col relative">
              {modules.map((mod, index) => (
                <MenuItem
                  key={mod.name}
                  text={mod.name}
                  showArrow={false}
                  isActive={activeItem === mod.name}
                  onClick={() => handleItemClick(mod.name, mod.route)}
                  className={index === modules.length - 1 ? "rounded-b-lg" : ""}
                />
              ))}
            </div>
        </div>
      )}
    </div>
  );
}