import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

/**
 * Columnas que se van quitando si falta sitio (en este orden).
 * La flecha › no cuenta: solo se muestra cuando ya falta alguna de estas.
 */
const OPTIONAL_HIDE_ORDER = ['fecha', 'estado', 'tipo'];

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

function isOptionalHidden(hiddenCount, key) {
  return OPTIONAL_HIDE_ORDER.slice(0, hiddenCount).includes(key);
}

/** Número de columnas visibles en thead (para colSpan del acordeón). */
function visibleColumnCount(hiddenCount, detailAvail) {
  let n = 2;
  if (!isOptionalHidden(hiddenCount, 'tipo')) n += 1;
  if (!isOptionalHidden(hiddenCount, 'estado')) n += 1;
  if (!isOptionalHidden(hiddenCount, 'fecha')) n += 1;
  if (detailAvail) n += 1;
  return n;
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hiddenOptionalCount, setHiddenOptionalCount] = useState(0);

  const wrapRef = useRef(null);
  const tableRef = useRef(null);

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

  useLayoutEffect(() => {
    if (loading || error) return;

    const wrap = wrapRef.current;
    const table = tableRef.current;
    if (!wrap || !table) return;

    const fit = () => {
      const max = OPTIONAL_HIDE_ORDER.length;
      let h = 0;
      for (; h <= max; h += 1) {
        flushSync(() => setHiddenOptionalCount(h));
        if (table.scrollWidth <= wrap.clientWidth + 1) break;
      }
      const finalH = Math.min(h, max);
      flushSync(() => setHiddenOptionalCount(finalH));
      if (finalH === 0) {
        setSelected(null);
      }
    };

    fit();

    const ro = new ResizeObserver(() => {
      fit();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [loading, error, items]);

  const detailAvailable = hiddenOptionalCount > 0;

  function toggleRow(inc) {
    if (!detailAvailable) return;
    setSelected((prev) => (prev?.id === inc.id ? null : inc));
  }

  const isMinimal = hiddenOptionalCount >= OPTIONAL_HIDE_ORDER.length;
  const accordionColSpan = visibleColumnCount(hiddenOptionalCount, detailAvailable);

  return (
    <>
      <h1>Incidencias (demo)</h1>
      <p className="sub">
        Sin scroll horizontal: si falta sitio se ocultan en este orden: fecha, estado y
        tipo. Con todas visibles no hay acordeón ni flecha; si falta alguna, pulsa la fila
        para desplegar el resto de datos debajo. Al mínimo solo quedan{' '}
        <strong>Descripción</strong> y <strong>Propiedad</strong> (ambas al completo,
        con saltos de línea si hace falta).
      </p>

      {loading && <p className="sub">Cargando…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="card">
          <div
            className={`table-wrap${detailAvailable ? ' table-wrap--interactive' : ''}`}
            ref={wrapRef}
          >
            <table ref={tableRef} className={isMinimal ? 'table-minimal' : ''}>
              <thead>
                <tr>
                  <th className="col-desc">Descripción</th>
                  <th className="col-prop">Propiedad</th>
                  {!isOptionalHidden(hiddenOptionalCount, 'tipo') && (
                    <th className="col-opt col-opt-tipo">Tipo</th>
                  )}
                  {!isOptionalHidden(hiddenOptionalCount, 'estado') && (
                    <th className="col-opt col-opt-estado">Estado</th>
                  )}
                  {!isOptionalHidden(hiddenOptionalCount, 'fecha') && (
                    <th className="col-opt col-opt-fecha">Fecha</th>
                  )}
                  {detailAvailable && (
                    <th className="col-opt col-chev" aria-hidden="true" scope="col" />
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((inc) => (
                  <Fragment key={inc.id}>
                    <tr
                      className={
                        detailAvailable && selected?.id === inc.id ? 'is-selected' : ''
                      }
                      onClick={() => toggleRow(inc)}
                      onKeyDown={(ev) => {
                        if (!detailAvailable) return;
                        if (ev.key === 'Enter' || ev.key === ' ') {
                          ev.preventDefault();
                          toggleRow(inc);
                        }
                      }}
                      tabIndex={detailAvailable ? 0 : -1}
                      role={detailAvailable ? 'button' : undefined}
                      aria-expanded={
                        detailAvailable ? selected?.id === inc.id : undefined
                      }
                    >
                      <td className="col-desc">{inc.descripcion}</td>
                      <td className="col-prop">{inc.propiedad}</td>
                      {!isOptionalHidden(hiddenOptionalCount, 'tipo') && (
                        <td className="col-opt col-opt-tipo">{inc.tipo}</td>
                      )}
                      {!isOptionalHidden(hiddenOptionalCount, 'estado') && (
                        <td className="col-opt col-opt-estado">
                          <span className={badgeClass(inc.estado)}>{inc.estado}</span>
                        </td>
                      )}
                      {!isOptionalHidden(hiddenOptionalCount, 'fecha') && (
                        <td className="col-opt col-opt-fecha">{formatFecha(inc.fecha)}</td>
                      )}
                      {detailAvailable && (
                        <td className="hint col-opt col-chev" aria-hidden="true">
                          <span className="accordion-chev">
                            {selected?.id === inc.id ? '▲' : '▼'}
                          </span>
                        </td>
                      )}
                    </tr>
                    {detailAvailable && selected?.id === inc.id && (
                      <tr className="accordion-row" aria-live="polite">
                        <td colSpan={accordionColSpan}>
                          <div className="accordion-panel">
                            <h2 className="accordion-title">Incidencia #{inc.id}</h2>
                            <dl className="dl">
                              <dt>Descripción</dt>
                              <dd>{inc.descripcion}</dd>
                              <dt>Propiedad</dt>
                              <dd>{inc.propiedad}</dd>
                              <dt>Tipo</dt>
                              <dd>{inc.tipo}</dd>
                              <dt>Estado</dt>
                              <dd>
                                <span className={badgeClass(inc.estado)}>{inc.estado}</span>
                              </dd>
                              <dt>Fecha</dt>
                              <dd>{formatFecha(inc.fecha)}</dd>
                            </dl>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {detailAvailable && (
        <p className="hint" style={{ marginTop: 16 }}>
          Pulsa una fila para desplegar u ocultar el acordeón con el resto de datos.
        </p>
      )}
    </>
  );
}
