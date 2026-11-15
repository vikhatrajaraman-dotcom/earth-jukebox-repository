
import { useState } from "react";

type FloatingMenuProps = {
  onSelect: (option: string) => void;
};

export default function FloatingMenu({ onSelect }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Air Quality",
    "Air Temperature",
    "Ozone Levels",
    
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: "25px",
      right: "25px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "12px"
    }}>

      {isOpen && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px",
          background: "#172b40",
          borderRadius: "12px",
          minWidth: "180px"
        }}>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              style={{
                padding: "12px",
                border: "none",
                borderRadius: "7px",
                background: "#29435d",
                color: "white",
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "#172b40",
          color: "white",
          fontSize: "25px",
          cursor: "pointer"
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </div>
  );
}




