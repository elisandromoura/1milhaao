import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const gridRef = useRef(null);
  const [selected, setSelected] = useState(new Set());
  const [searchId, setSearchId] = useState("");

  const total = 1000000;
  const cols = 1000;
  const rows = 1000;

  const handleSquareClick = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const scrollToId = () => {
    const id = parseInt(searchId);
    if (id >= 1 && id <= total) {
      const x = (id - 1) % cols;
      const y = Math.floor((id - 1) / cols);
      const square = document.getElementById(`square-${id}`);
      square?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      square?.classList.add("highlight");
      setTimeout(() => square?.classList.remove("highlight"), 2000);
    }
  };

  return (
    <div style={{ background: "black", color: "white", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center" }}>Rumo a 1 Milhão</h1>
      <p style={{ textAlign: "center" }}>Faltam {total - selected.size} quadrados disponíveis</p>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <input type="number" placeholder="Digite o número do quadrado (1 a 1.000.000)" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <button onClick={scrollToId}>Localizar</button>
      </div>
      <div ref={gridRef} style={{ flex: 1, overflow: "auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 10px)`,
          gridAutoRows: "10px",
          width: cols * 10,
          height: rows * 10,
        }}>
          {Array.from({ length: total }).map((_, i) => {
            const id = i + 1;
            return (
              <div
                key={id}
                id={`square-${id}`}
                onClick={() => handleSquareClick(id)}
                title={`Quadrado ${id}`}
                style={{
                  width: 10,
                  height: 10,
                  border: "1px solid #222",
                  backgroundColor: selected.has(id) ? "blue" : "black",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}