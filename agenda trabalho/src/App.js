import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [events] = useState([
    { id: 1, title: "Show hipotético", type: "show", date: "2025-12-05 20:00", desc: "Concerto hipotético de banda hipotética.", price: "R$ 1 milhão", place: "Circo do mal" },
    { id: 2, title: "Peça: Eu E O Bruno De Luca", type: "teatro", date: "2025-11-28 19:00", desc: "Primeiro ator que veio na cabeça.", price: "R$ 30", place: "A Praça do Carlos Alberto" },
    { id: 3, title: "Exposição: John F. Kennedy", type: "exposicao", date: "2025-11-20 10:00", desc: "Mostra do corpo do ex-presidente.", price: "Grátis", place: "Museu Nacional do RJ" },
    { id: 4, title: "Cinema mudo francês", type: "gratuito", date: "2025-12-01 09:00", desc: "Só vai o povo chato.", price: "Grátis", place: "Parque do Maníaco" },
  ]);

  const [activeFilter, setActiveFilter] = useState("todos");
  const [query, setQuery] = useState("");

  const filteredEvents = events.filter(ev => {
    const matchesType = activeFilter === "todos" || ev.type === activeFilter;
    const matchesSearch = (ev.title + ev.desc + ev.place)
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <>
      <header>
        <div className="container" style={{ display: "flex", alignItems: "center" }}>
          <div className="brand">
            <div className="logo">AC</div>
            <div>
              <div style={{ fontWeight: 800 }}>Agenda Cultural</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>O que tem de bom na sua cidade</div>
            </div>
          </div>

          <nav>
            <a href="#">Início</a>
            <a href="#">Eventos</a>
            <a href="#">Sobre</a>
            <a href="#">Contato</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div style={{ flex: 1 }}>
            <h1>Descubra shows, exposições e peças perto de você ou nem tão perto assim</h1>
            <p>Eventos selecionados com curadoria especializada vulgo eu — filtros por data, tipo e preço.</p>

            <div className="search">
              <input
                placeholder="Buscar por artista, local ou palavra-chave"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setQuery(e.target.value)}
              />
              <button>Buscar</button>
            </div>

            <div className="filters">
              {["todos", "show", "teatro", "exposicao", "gratuito"].map((t) => (
                <div
                  key={t}
                  className={`chip ${activeFilter === t ? "active" : ""}`}
                  onClick={() => setActiveFilter(t)}
                >
                  {t === "todos" && "Todos"}
                  {t === "show" && "Show"}
                  {t === "teatro" && "Teatro"}
                  {t === "exposicao" && "Exposição"}
                  {t === "gratuito" && "Gratuito"}
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 320, flexShrink: 0 }}>
            <div style={{ background: "white", borderRadius: 12, padding: 14, boxShadow: "0 10px 30px rgba(50,30,80,0.06)" }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Próximos destaques</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>Sábado · 20:00 · Casa do Jean</div>
              <div style={{ height: 10 }} />
              <div style={{ fontSize: 13, opacity: 0.9 }}>Domingo · 16:00 · Mansão Neto</div>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: 12 }}>Eventos</h2>

          <div className="grid">
            {filteredEvents.map(ev => (
              <article key={ev.id} className="card">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${ev.id}/600/400)`
                  }}
                />

                <div className="meta">
                  <div>
                    <div className="title">{ev.title}</div>
                    <div className="date">
                      {ev.date} · {ev.place}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800 }}>{ev.price}</div>
                  </div>
                </div>

                <p>{ev.desc}</p>

                <div className="actions">
                  <button
                    className="btn primary"
                    onClick={() => alert(`Ir para página do evento: ${ev.title}`)}
                  >
                    Ver detalhes
                  </button>

                  <button
                    className="btn ghost"
                    onClick={() =>
                      navigator.clipboard.writeText(window.location.href + "#event-" + ev.id)
                    }
                  >
                    Compartilhar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div>© <strong>Agenda Cultural</strong> — feito sob pressão UwU</div>
            <div style={{ opacity: 0.8, fontSize: 13 }}>Rua dos Bobos, 0 - Sorocaba</div>
          </div>
        </footer>
      </main>
    </>
  );
}
