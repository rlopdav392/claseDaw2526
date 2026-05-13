import { useEffect, useState } from 'react';

function badgeClass(estado) {
  const e = (estado || '').toUpperCase();
  if (e.includes('PROGRESO')) return 'badge badge-progreso';
  if (e.includes('RESUELTA')) return 'badge badge-resuelta';
  return 'badge badge-pendiente';
}

function formatFecha(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/incidencias.json')
      .then((r) => {
        if (!r.ok) throw new Error('No se pudo cargar el JSON');
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function toggleRow(inc) {
    setSelected((prev) => (prev?.id === inc.id ? null : inc));
  }

  return (
    <>
      <h1>Incidencias (demo)</h1>
      <p className="sub">
        En pantallas ≤500px la tabla muestra 2 columnas resumen; el resto aparece
        en el panel tipo <strong>show</strong> al pulsar la fila.
      </p>

      {loading && <p className="sub">Cargando…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th className="col-desktop">Propiedad</th>
                <th className="col-desktop">Tipo</th>
                <th>Estado</th>
                <th className="col-desktop">Fecha</th>
                <th aria-hidden="true" className="hint">
                  ›
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((inc) => (
                <tr
                  key={inc.id}
                  className={selected?.id === inc.id ? 'is-selected' : ''}
                  onClick={() => toggleRow(inc)}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                      ev.preventDefault();
                      toggleRow(inc);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={selected?.id === inc.id}
                >
                  <td className="truncate" title={inc.descripcion}>
                    {inc.descripcion}
                  </td>
                  <td className="col-desktop">{inc.propiedad}</td>
                  <td className="col-desktop">{inc.tipo}</td>
                  <td>
                    <span className={badgeClass(inc.estado)}>{inc.estado}</span>
                  </td>
                  <td className="col-desktop">{formatFecha(inc.fecha)}</td>
                  <td className="hint">›</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selected && (
            <section className="detail" aria-live="polite">
              <h2>Detalle incidencia #{selected.id}</h2>
              <dl className="dl">
                <dt>Descripción</dt>
                <dd>{selected.descripcion}</dd>
                <dt>Propiedad</dt>
                <dd>{selected.propiedad}</dd>
                <dt>Tipo</dt>
                <dd>{selected.tipo}</dd>
                <dt>Estado</dt>
                <dd>
                  <span className={badgeClass(selected.estado)}>{selected.estado}</span>
                </dd>
                <dt>Fecha</dt>
                <dd>{formatFecha(selected.fecha)}</dd>
              </dl>
              <button type="button" className="btn-close" onClick={() => setSelected(null)}>
                Cerrar detalle
              </button>
            </section>
          )}
        </div>
      )}

      <p className="hint" style={{ marginTop: 16 }}>
        Redimensiona la ventana por debajo de 500px de ancho para ver el modo móvil.
      </p>
    </>
  );
}
