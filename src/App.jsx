import React, { useState, useEffect, useCallback } from "react";

const SUPABASE_URL = "https://lcvszvxbszszqikboxeq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdnN6dnhic3pzenFpa2JveGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAyOTEsImV4cCI6MjA5NDY3NjI5MX0.W3yfYh9WWHv_7pBzAh5dTafDr8uOkWTc6LAIZLxCkAE";

const headers = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, { headers, ...options });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #FAF7F2;
    --warm: #F0EAE0;
    --sand: #E8DDD0;
    --dust: #C9B99A;
    --brown: #8B6F5C;
    --deep: #3D2B1F;
    --ink: #1A1008;
    --rose: #C17B6F;
    --sage: #7A9E7E;
    --gold: #B8966E;
  }

  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--ink); }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  .topbar {
    background: var(--deep);
    padding: 0 2rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .topbar-logo {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--cream);
    letter-spacing: .04em;
  }
  .topbar-logo span { color: var(--dust); }

  .tab-bar {
    display: flex;
    gap: 0;
    background: var(--warm);
    border-bottom: 1px solid var(--sand);
    padding: 0 2rem;
  }
  .tab {
    padding: 14px 20px;
    font-size: 13px;
    font-weight: 500;
    color: var(--brown);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all .2s;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    font-family: 'DM Sans', sans-serif;
  }
  .tab:hover { color: var(--deep); }
  .tab.active { color: var(--deep); border-bottom-color: var(--gold); }

  .main { flex: 1; padding: 2rem; max-width: 1100px; margin: 0 auto; width: 100%; }

  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 1.5rem;
    align-items: center;
  }
  .search-input {
    flex: 1;
    padding: 10px 16px;
    border: 1.5px solid var(--sand);
    border-radius: 8px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: white;
    color: var(--ink);
    outline: none;
    transition: border-color .2s;
  }
  .search-input:focus { border-color: var(--gold); }
  .search-input::placeholder { color: var(--dust); }

  .btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s;
    font-family: 'DM Sans', sans-serif;
    border: none;
  }
  .btn-primary { background: var(--deep); color: var(--cream); }
  .btn-primary:hover { background: var(--ink); }
  .btn-ghost { background: transparent; border: 1.5px solid var(--sand); color: var(--brown); }
  .btn-ghost:hover { border-color: var(--dust); color: var(--deep); }
  .btn-danger { background: transparent; border: 1.5px solid #e0b0aa; color: var(--rose); }
  .btn-danger:hover { background: #fdf0ee; }
  .btn-sm { padding: 6px 14px; font-size: 12px; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }

  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--sand);
    cursor: pointer;
    transition: transform .15s, box-shadow .15s;
  }
  .product-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(61,43,31,.1); }

  .product-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    background: var(--warm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
  .product-img img { width: 100%; height: 100%; object-fit: cover; }

  .product-info { padding: 12px 14px; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: var(--deep); margin-bottom: 3px; line-height: 1.3; }
  .product-brand { font-size: 11px; color: var(--brown); text-transform: uppercase; letter-spacing: .06em; }
  .product-count { font-size: 11px; color: var(--dust); margin-top: 6px; }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--brown);
  }
  .empty-state .icon { font-size: 40px; margin-bottom: 12px; opacity: .4; }
  .empty-state p { font-size: 14px; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(26,16,8,.5);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 1rem;
    overflow-y: auto;
  }
  .modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 640px;
    padding: 2rem;
    position: relative;
    margin: auto;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--deep);
    margin-bottom: 1.5rem;
  }
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: var(--warm);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brown);
  }
  .modal-close:hover { background: var(--sand); }

  .form-group { margin-bottom: 1.2rem; }
  .form-label { font-size: 12px; font-weight: 500; color: var(--brown); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 6px; display: block; }
  .form-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid var(--sand);
    border-radius: 8px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    outline: none;
    transition: border-color .2s;
    background: white;
  }
  .form-input:focus { border-color: var(--gold); }
  .form-textarea { min-height: 80px; resize: vertical; }

  .ingredient-row {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--warm);
  }
  .ingredient-pos { width: 24px; font-size: 11px; color: var(--dust); text-align: right; flex-shrink: 0; }
  .ingredient-name { flex: 1; font-size: 13px; color: var(--deep); }
  .ingredient-group {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 20px;
    background: var(--warm);
    color: var(--brown);
    flex-shrink: 0;
  }
  .ingredient-desc { font-size: 11px; color: var(--dust); margin-top: 2px; }

  .product-detail-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    background: var(--warm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    margin-bottom: 1.2rem;
    overflow: hidden;
  }
  .product-detail-img img { width: 100%; height: 100%; object-fit: cover; }

  .ingredients-list { max-height: 360px; overflow-y: auto; }
  .ingredients-list::-webkit-scrollbar { width: 4px; }
  .ingredients-list::-webkit-scrollbar-track { background: var(--warm); }
  .ingredients-list::-webkit-scrollbar-thumb { background: var(--dust); border-radius: 2px; }

  .pill-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
  .pill {
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: all .15s;
    border: 1px solid var(--sand);
    background: white;
    color: var(--brown);
    font-family: 'DM Sans', sans-serif;
  }
  .pill:hover { border-color: var(--gold); color: var(--deep); }
  .pill.active { background: var(--deep); color: var(--cream); border-color: var(--deep); }

  .loading { text-align: center; padding: 3rem; color: var(--dust); font-size: 14px; }
  .error-msg { background: #fdf0ee; border: 1px solid #e0b0aa; color: var(--rose); padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 1rem; }
  .success-msg { background: #f0f7f1; border: 1px solid #a8d4af; color: var(--sage); padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 1rem; }

  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--deep); }
  .count-badge { font-size: 12px; color: var(--dust); }

  .ing-add-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
  .ing-remove { background: none; border: none; color: var(--dust); cursor: pointer; font-size: 16px; padding: 0 4px; line-height: 1; }
  .ing-remove:hover { color: var(--rose); }

  .ref-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .ref-table th { text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--brown); border-bottom: 2px solid var(--sand); font-weight: 500; }
  .ref-table td { padding: 10px 12px; border-bottom: 1px solid var(--warm); color: var(--ink); vertical-align: top; }
  .ref-table tr:hover td { background: var(--cream); }
  .ref-table .td-inci { font-weight: 500; color: var(--deep); }
  .ref-table .td-group { font-size: 11px; }

  .topbar-actions { display: flex; gap: 8px; }
`;


export default function App() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIngredients, setProductIngredients] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [filterGroup, setFilterGroup] = useState("");
  const [removeBgKey, setRemoveBgKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const groups = [...new Set(ingredients.map(i => i.grp).filter(Boolean))].sort();

  const loadProducts = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await sbFetch("/products?select=*&order=created_at.desc");
      setProducts(data);
    } catch (e) { setError("Ошибка загрузки средств: " + e.message); }
    finally { setLoading(false); }
  }, []);

  const loadIngredients = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await sbFetch("/ingredients?select=*&order=inci_name.asc&limit=1000");
      setIngredients(data);
    } catch (e) { setError("Ошибка загрузки ингредиентов: " + e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (tab === "products") loadProducts();
    if (tab === "ingredients") loadIngredients();
  }, [tab]);

  const openProduct = async (product) => {
    setSelectedProduct(product);
    try {
      const data = await sbFetch(`/product_ingredients?product_id=eq.${product.id}&select=*,ingredients(inci_name,ru_name,grp,subgroup,description)&order=position.asc`);
      setProductIngredients(data);
    } catch { setProductIngredients([]); }
  };

  const filteredProducts = products.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredIngredients = ingredients.filter(i => {
    const matchSearch = !search || i.inci_name?.toLowerCase().includes(search.toLowerCase()) || i.ru_name?.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (!filterGroup || i.grp === filterGroup);
  });

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="topbar">
          <div className="topbar-logo">INCI<span>base</span></div>
          <div className="topbar-actions">
            {tab === "products" && <button className="btn btn-primary btn-sm" onClick={() => setShowAddProduct(true)}>+ Добавить средство</button>}
            {tab === "ingredients" && <button className="btn btn-primary btn-sm" onClick={() => setShowAddIngredient(true)}>+ Добавить ингредиент</button>}
            <button
              onClick={() => setShowSettings(s => !s)}
              title="Настройки"
              style={{ background: showSettings ? "var(--gold)" : "rgba(255,255,255,.12)", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }}
            >⚙</button>
          </div>
        </div>

        {/* Панель настроек */}
        {showSettings && (
          <div style={{ background: "#2C1F15", padding: "12px 2rem", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "var(--dust)", flexShrink: 0 }}>API-ключ remove.bg:</span>
            <input
              type="password"
              value={removeBgKey}
              onChange={e => setRemoveBgKey(e.target.value)}
              placeholder="Вставьте ключ сюда — он нигде не сохраняется"
              style={{
                flex: 1, minWidth: 260, padding: "7px 12px", borderRadius: 8,
                border: "1px solid #5a4035", background: "#1A1008",
                color: "var(--cream)", fontSize: 13, fontFamily: "monospace", outline: "none"
              }}
            />
            {removeBgKey && <span style={{ fontSize: 12, color: "#7A9E7E" }}>✓ Ключ введён</span>}
            <span style={{ fontSize: 11, color: "#5a4035" }}>Ключ хранится только в памяти вкладки, не передаётся никуда кроме remove.bg</span>
          </div>
        )}

        <div className="tab-bar">
          <button className={`tab ${tab === "products" ? "active" : ""}`} onClick={() => { setTab("products"); setSearch(""); }}>Средства</button>
          <button className={`tab ${tab === "ingredients" ? "active" : ""}`} onClick={() => { setTab("ingredients"); setSearch(""); }}>Справочник INCI</button>
        </div>

        <div className="main">
          {error && <div className="error-msg">{error}</div>}

          {tab === "products" && (
            <>
              <div className="search-bar">
                <input className="search-input" placeholder="Поиск по названию или бренду..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="section-header">
                <div className="section-title">Косметические средства</div>
                <div className="count-badge">{filteredProducts.length} позиций</div>
              </div>
              {loading ? <div className="loading">Загрузка...</div>
               : filteredProducts.length === 0 ? (
                <div className="empty-state"><div className="icon">✦</div><p>{search ? "Ничего не найдено" : "Средства ещё не добавлены"}</p></div>
              ) : (
                <div className="grid">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="product-card" onClick={() => openProduct(p)}>
                      <div className="product-img">{p.image_url ? <img src={p.image_url} alt={p.name} /> : "◈"}</div>
                      <div className="product-info">
                        <div className="product-name">{p.name}</div>
                        {p.brand && <div className="product-brand">{p.brand}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === "ingredients" && (
            <>
              <div className="search-bar">
                <input className="search-input" placeholder="Поиск по INCI или русскому названию..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              {groups.length > 0 && (
                <div className="pill-row">
                  <button className={`pill ${!filterGroup ? "active" : ""}`} onClick={() => setFilterGroup("")}>Все группы</button>
                  {groups.map(g => <button key={g} className={`pill ${filterGroup === g ? "active" : ""}`} onClick={() => setFilterGroup(g)}>{g}</button>)}
                </div>
              )}
              <div className="section-header">
                <div className="section-title">Справочник ингредиентов</div>
                <div className="count-badge">{filteredIngredients.length} записей</div>
              </div>
              {loading ? <div className="loading">Загрузка...</div>
               : filteredIngredients.length === 0 ? (
                <div className="empty-state"><div className="icon">◈</div><p>{search ? "Ничего не найдено" : "Справочник пуст"}</p></div>
              ) : (
                <table className="ref-table">
                  <thead><tr><th>INCI</th><th>Русское название</th><th>Группа</th><th>Подгруппа</th><th>Описание</th></tr></thead>
                  <tbody>
                    {filteredIngredients.map(i => (
                      <tr key={i.id}>
                        <td className="td-inci">{i.inci_name}</td>
                        <td>{i.ru_name || "—"}</td>
                        <td><span className="ingredient-group td-group">{i.grp || "—"}</span></td>
                        <td style={{ fontSize: 12, color: "var(--brown)" }}>{i.subgroup || "—"}</td>
                        <td style={{ fontSize: 12, color: "var(--brown)", maxWidth: 280 }}>{i.description || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct} ingredients={productIngredients}
            onClose={() => setSelectedProduct(null)}
            onDelete={async () => {
              await sbFetch(`/products?id=eq.${selectedProduct.id}`, { method: "DELETE" });
              setSelectedProduct(null); loadProducts();
            }}
          />
        )}
        {showAddProduct && (
          <AddProductModal
            ingredients={ingredients}
            removeBgKey={removeBgKey}
            onClose={() => setShowAddProduct(false)}
            onSaved={() => { setShowAddProduct(false); loadProducts(); }}
          />
        )}
        {showAddIngredient && (
          <AddIngredientModal onClose={() => setShowAddIngredient(false)} onSaved={() => { setShowAddIngredient(false); loadIngredients(); }} />
        )}
      </div>
    </>
  );
}

function ProductModal({ product, ingredients, onClose, onDelete }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="product-detail-img">
          {product.image_url ? <img src={product.image_url} alt={product.name} /> : "◈"}
        </div>
        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--deep)", marginBottom: 4 }}>{product.name}</div>
          {product.brand && <div style={{ fontSize: 13, color: "var(--brown)", textTransform: "uppercase", letterSpacing: ".06em" }}>{product.brand}</div>}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--brown)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>
          Состав — {ingredients.length} ингредиентов
        </div>
        <div className="ingredients-list">
          {ingredients.length === 0
            ? <div style={{ color: "var(--dust)", fontSize: 13, padding: "1rem 0" }}>Состав не добавлен</div>
            : ingredients.map((row, idx) => (
              <div key={row.id} className="ingredient-row">
                <div className="ingredient-pos">{row.position || idx + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="ingredient-name">{row.ingredients?.inci_name || row.raw_inci_name}</div>
                  {row.ingredients?.ru_name && <div className="ingredient-desc">{row.ingredients.ru_name}</div>}
                  {row.ingredients?.description && <div className="ingredient-desc" style={{ marginTop: 2 }}>{row.ingredients.description}</div>}
                </div>
                {row.ingredients?.grp && <div className="ingredient-group">{row.ingredients.grp}</div>}
              </div>
            ))
          }
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>Удалить средство</button>
        </div>
      </div>
    </div>
  );
}

// Парсер INCI-списка
function parseInciList(raw) {
  let s = raw.replace(/[;\n\r]+/g, ", ");
  s = s.replace(/,[ \t]+/g, ", ");
  return s.split(", ").map(t => t.trim()).filter(Boolean);
}

const SIZE = 1200;

// Шаг: загрузить в Supabase Storage
async function uploadToStorage(blob) {
  const filename = `product_${Date.now()}.webp`;
  let resp;
  try {
    resp = await fetch(
      `${SUPABASE_URL}/storage/v1/object/product-images/${filename}`,
      {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "image/webp",
          "x-upsert": "true"
        },
        body: blob
      }
    );
  } catch (e) {
    throw new Error(`[Storage] Сетевая ошибка при загрузке в Supabase: ${e.message}`);
  }
  if (!resp.ok) {
    let detail = "";
    try { const j = await resp.json(); detail = j?.error || j?.message || JSON.stringify(j); } catch { detail = await resp.text().catch(() => resp.statusText); }
    if (resp.status === 400) throw new Error(`[Storage 400] Неверный запрос. Проверьте название bucket "product-images". Детали: ${detail}`);
    if (resp.status === 401 || resp.status === 403) throw new Error(`[Storage ${resp.status}] Нет прав записи в bucket. Проверьте что bucket "product-images" публичный. Детали: ${detail}`);
    if (resp.status === 404) throw new Error(`[Storage 404] Bucket "product-images" не найден — создайте его в Supabase → Storage.`);
    throw new Error(`[Storage ${resp.status}] ${detail}`);
  }
  return {
    url: `${SUPABASE_URL}/storage/v1/object/public/product-images/${filename}`,
    kb: Math.round(blob.size / 1024)
  };
}

// Шаг: масштабировать до SIZE×SIZE → WebP blob
async function resizeToWebP(blob) {
  let img;
  try {
    img = await createImageBitmap(blob);
  } catch (e) {
    throw new Error(`[Resize] Не удалось декодировать изображение: ${e.message}. Попробуйте другой файл или формат.`);
  }
  const canvas = document.createElement("canvas");
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const scale = Math.min(SIZE / img.width, SIZE / img.height);
  const w = img.width * scale, h = img.height * scale;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
  return new Promise((res, rej) => canvas.toBlob(b => b ? res(b) : rej(new Error("[Resize] canvas.toBlob вернул null — браузер не поддерживает WebP?")), "image/webp", 0.88));
}

// Шаг: remove.bg API
async function removeBgApi(blob, apiKey) {
  const form = new FormData();
  form.append("image_file", blob);
  form.append("size", "auto");
  let resp;
  try {
    resp = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: form
    });
  } catch (e) {
    throw new Error(`[remove.bg] Сетевая ошибка: ${e.message}. Проверьте интернет-соединение.`);
  }
  if (!resp.ok) {
    let detail = "";
    try { const j = await resp.json(); detail = j?.errors?.[0]?.title || JSON.stringify(j); } catch { detail = resp.statusText; }
    if (resp.status === 402) throw new Error(`[remove.bg 402] Лимит бесплатных запросов исчерпан. Переключитесь на режим "Без удаления".`);
    if (resp.status === 403) throw new Error(`[remove.bg 403] Неверный API-ключ. Проверьте ключ в настройках ⚙.`);
    throw new Error(`[remove.bg ${resp.status}] ${detail}`);
  }
  return resp.blob();
}

// Шаг: нарисовать blob на 1200×1200 → WebP
async function blobToSizedWebP(blob) {
  let img;
  try { img = await createImageBitmap(blob); }
  catch (e) { throw new Error(`[BlobToWebP] Не удалось прочитать результат remove.bg: ${e.message}`); }
  const canvas = document.createElement("canvas");
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const scale = Math.min(SIZE / img.width, SIZE / img.height);
  const w = img.width * scale, h = img.height * scale;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
  return new Promise((res, rej) => canvas.toBlob(b => b ? res(b) : rej(new Error("[BlobToWebP] canvas.toBlob вернул null")), "image/webp", 0.88));
}

// Шаг: загрузить по URL через прокси
async function fetchImageBlob(url) {
  // Проверяем что URL валидный
  try { new URL(url); } catch { throw new Error("[URL] Некорректный URL. Убедитесь что ссылка начинается с https://"); }
  const proxy = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  let resp;
  try {
    resp = await fetch(proxy);
  } catch (e) {
    throw new Error(`[URL] Не удалось подключиться через прокси: ${e.message}. Попробуйте загрузить файлом с компьютера.`);
  }
  if (!resp.ok) {
    if (resp.status === 403) throw new Error(`[URL 403] Сайт запрещает скачивание картинок. Загрузите файлом с компьютера.`);
    if (resp.status === 404) throw new Error(`[URL 404] Изображение не найдено по этому URL.`);
    throw new Error(`[URL ${resp.status}] Ошибка загрузки. Попробуйте загрузить файлом.`);
  }
  const blob = await resp.blob().catch(e => { throw new Error(`[URL] Не удалось прочитать ответ: ${e.message}`); });
  if (!blob.type.startsWith("image/")) throw new Error(`[URL] Ответ не является изображением (тип: ${blob.type}). Попробуйте другую ссылку.`);
  return blob;
}

// ─── ImagePicker ───────────────────────────────────────────────────────────
function ImagePicker({ onDone, removeBgKey }) {
  const [mode, setMode] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [bgMode, setBgMode] = useState("removebg");
  const [status, setStatus] = useState("idle");
  const [steps, setSteps] = useState([]); // лог шагов
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(null);
  const [kb, setKb] = useState(null);
  const fileRef = React.useRef();

  const log = (msg, state = "active") => setSteps(s => {
    const next = s.map(x => x.state === "active" ? { ...x, state: "done" } : x);
    return [...next, { msg, state }];
  });

  const reset = () => {
    setStatus("idle"); setSteps([]); setErrorMsg(""); setPreview(null); setKb(null);
    setImageUrl("");
    if (fileRef.current) fileRef.current.value = "";
    onDone(null);
  };

  const process = async (getBlob) => {
    setStatus("loading"); setSteps([]); setErrorMsg(""); setPreview(null);
    try {
      log("Загружаю изображение...");
      const srcBlob = await getBlob();
      log(`Изображение получено (${Math.round(srcBlob.size/1024)} КБ, тип: ${srcBlob.type})`);

      let finalWebP;
      if (bgMode === "removebg") {
        if (!removeBgKey?.trim()) throw new Error("[Настройки] Не введён API-ключ remove.bg. Нажмите ⚙ в правом верхнем углу.");
        log("Масштабирую для отправки в remove.bg...");
        const resized = await resizeToWebP(srcBlob);
        log(`Масштабировано (${Math.round(resized.size/1024)} КБ). Отправляю в remove.bg...`);
        const noBgBlob = await removeBgApi(resized, removeBgKey.trim());
        log(`Фон удалён (${Math.round(noBgBlob.size/1024)} КБ). Финальная обработка...`);
        finalWebP = await blobToSizedWebP(noBgBlob);
      } else {
        log("Масштабирую до 1200×1200 WebP...");
        finalWebP = await resizeToWebP(srcBlob);
      }
      log(`Изображение готово (${Math.round(finalWebP.size/1024)} КБ). Загружаю в Storage...`);
      const { url, kb: size } = await uploadToStorage(finalWebP);
      log(`Сохранено в Supabase Storage ✓`, "done");
      setPreview(url); setKb(size); setStatus("done");
      onDone(url);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e.message);
      setSteps(s => s.map((x, i) => i === s.length - 1 ? { ...x, state: "error" } : x));
      onDone(null);
    }
  };

  return (
    <div>
      {/* Переключатели */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", border: "1.5px solid var(--sand)", borderRadius: 8, overflow: "hidden" }}>
          {["url", "file"].map(m => (
            <button key={m} onClick={() => { setMode(m); reset(); }} style={{
              padding: "7px 16px", fontSize: 12, fontWeight: 500,
              background: mode === m ? "var(--deep)" : "white",
              color: mode === m ? "var(--cream)" : "var(--brown)",
              border: "none", cursor: "pointer", fontFamily: "inherit"
            }}>{m === "url" ? "По ссылке" : "С компьютера"}</button>
          ))}
        </div>
        <div style={{ display: "flex", border: "1.5px solid var(--sand)", borderRadius: 8, overflow: "hidden", marginLeft: "auto" }}>
          <button onClick={() => setBgMode("removebg")} style={{
            padding: "7px 12px", fontSize: 11, fontWeight: 500,
            background: bgMode === "removebg" ? "#1D9E75" : "white",
            color: bgMode === "removebg" ? "white" : "var(--brown)",
            border: "none", cursor: "pointer", fontFamily: "inherit"
          }}>remove.bg</button>
          <button onClick={() => setBgMode("nobg")} style={{
            padding: "7px 12px", fontSize: 11, fontWeight: 500,
            background: bgMode === "nobg" ? "var(--brown)" : "white",
            color: bgMode === "nobg" ? "white" : "var(--brown)",
            border: "none", cursor: "pointer", fontFamily: "inherit"
          }}>Без удаления</button>
        </div>
      </div>

      {bgMode === "removebg" && !removeBgKey?.trim() && (
        <div style={{ fontSize: 12, color: "var(--rose)", background: "#fdf0ee", padding: "8px 12px", borderRadius: 8, marginBottom: 10 }}>
          ⚠ Введите API-ключ remove.bg — нажмите ⚙ вверху
        </div>
      )}

      {/* Источник */}
      {status !== "done" && (
        mode === "url" ? (
          <div style={{ display: "flex", gap: 8 }}>
            <input className="form-input" style={{ flex: 1 }} value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://..."
              disabled={status === "loading"}
              onKeyDown={e => e.key === "Enter" && imageUrl.trim() && process(() => fetchImageBlob(imageUrl.trim()))}
            />
            <button className="btn btn-ghost" style={{ flexShrink: 0 }}
              onClick={() => process(() => fetchImageBlob(imageUrl.trim()))}
              disabled={!imageUrl.trim() || status === "loading"}
            >{status === "loading" ? "..." : "Обработать"}</button>
          </div>
        ) : (
          <div onClick={() => fileRef.current?.click()} style={{
            border: "2px dashed var(--sand)", borderRadius: 10, padding: "18px",
            textAlign: "center", cursor: status === "loading" ? "default" : "pointer", background: "var(--warm)"
          }}
            onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.borderColor = "var(--gold)"; }}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--sand)"}
          >
            <div style={{ fontSize: 22, marginBottom: 5 }}>📁</div>
            <div style={{ fontSize: 13, color: "var(--brown)", fontWeight: 500 }}>
              {status === "loading" ? "Обработка..." : "Нажмите чтобы выбрать файл"}
            </div>
            <div style={{ fontSize: 11, color: "var(--dust)", marginTop: 3 }}>JPG, PNG, WebP</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) process(() => Promise.resolve(f)); }} />
          </div>
        )
      )}

      {/* Лог шагов */}
      {steps.length > 0 && (
        <div style={{ marginTop: 10, background: "var(--warm)", borderRadius: 10, padding: "10px 14px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ fontSize: 12, padding: "3px 0", color: s.state === "error" ? "var(--rose)" : s.state === "done" ? "var(--sage)" : "var(--brown)", display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0 }}>{s.state === "done" ? "✓" : s.state === "error" ? "✕" : "⏳"}</span>
              <span>{s.msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Ошибка */}
      {status === "error" && errorMsg && (
        <div style={{ marginTop: 8 }}>
          <div style={{ background: "#fdf0ee", border: "1px solid #e0b0aa", color: "var(--rose)", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 8 }}>
            {errorMsg}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-ghost btn-sm" onClick={reset}>Попробовать снова</button>
            {bgMode === "removebg" && <button className="btn btn-ghost btn-sm" onClick={() => { setBgMode("nobg"); reset(); }}>Попробовать без удаления фона</button>}
            {mode === "url" && <button className="btn btn-ghost btn-sm" onClick={() => { setMode("file"); reset(); }}>Загрузить файлом</button>}
          </div>
        </div>
      )}

      {/* Готово */}
      {status === "done" && preview && (
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "var(--warm)", borderRadius: 10 }}>
          <div style={{ width: 80, height: 80, borderRadius: 8, flexShrink: 0, overflow: "hidden", background: "repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 0 / 10px 10px" }}>
            <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--sage)" }}>{bgMode === "removebg" ? "✓ Фон удалён" : "✓ Сохранено"}</div>
            <div style={{ fontSize: 11, color: "var(--dust)", marginTop: 3 }}>1200×1200 WebP · {kb} КБ</div>
          </div>
          <button onClick={reset} style={{ background: "none", border: "none", fontSize: 18, color: "var(--dust)", cursor: "pointer", padding: "0 4px" }}>×</button>
        </div>
      )}
    </div>
  );
}

function AddProductModal({ ingredients, onClose, onSaved, removeBgKey }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [rawText, setRawText] = useState("");
  const [parsed, setParsed] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handlePaste = (val) => { setRawText(val); setParsed(val.trim() ? parseInciList(val) : []); };
  const removeIngredient = (idx) => setParsed(p => p.filter((_, i) => i !== idx));
  const updateIngredient = (idx, val) => setParsed(p => p.map((x, i) => i === idx ? val : x));
  const insertAfter = (idx) => setParsed(p => { const n = [...p]; n.splice(idx + 1, 0, ""); return n; });

  const save = async () => {
    if (!name.trim()) { setError("Введите название средства"); return; }
    setSaving(true); setError("");
    try {
      const [product] = await sbFetch("/products", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), brand: brand.trim() || null, image_url: finalImageUrl || null })
      });
      const inciRows = parsed.filter(r => r.trim());
      if (inciRows.length > 0) {
        const links = inciRows.map((inciName, i) => {
          const found = ingredients.find(ing => ing.inci_name?.toLowerCase() === inciName.toLowerCase());
          return { product_id: product.id, ingredient_id: found?.id || null, position: i + 1, raw_inci_name: inciName.trim() };
        });
        await sbFetch("/product_ingredients", { method: "POST", body: JSON.stringify(links) });
      }
      onSaved();
    } catch (e) {
      setError("Ошибка сохранения: " + e.message);
    } finally { setSaving(false); }
  };

  const realCount = parsed.filter(s => s.trim()).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Новое средство</div>
        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label className="form-label">Название *</label>
          <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Например: Пенка Madagascar Centella" />
        </div>
        <div className="form-group">
          <label className="form-label">Бренд</label>
          <input className="form-input" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Например: SKIN1004" />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Изображение</span>
            <span style={{ fontWeight: 400, color: "var(--dust)", textTransform: "none", letterSpacing: 0, fontSize: 11 }}>необязательно — можно добавить позже</span>
          </label>
          <ImagePicker onDone={url => setFinalImageUrl(url)} removeBgKey={removeBgKey} />
        </div>

        <div className="form-group">
          <label className="form-label">Состав (вставьте одним текстом)</label>
          <textarea className="form-input form-textarea" style={{ minHeight: 90, fontFamily: "monospace", fontSize: 12 }}
            value={rawText} onChange={e => handlePaste(e.target.value)}
            placeholder="Centella Asiatica Extract (30%), Glycerin, 1,2-Hexanediol, Aqua..." />
          {realCount > 0 && <div style={{ fontSize: 12, color: "var(--sage)", marginTop: 5 }}>✓ Распознано {realCount} ингредиентов</div>}
        </div>

        {parsed.length > 0 && (
          <div className="form-group">
            <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Список ингредиентов</span>
              <span style={{ fontWeight: 400, color: "var(--dust)", textTransform: "none", letterSpacing: 0, fontSize: 11 }}>+ между строками — вставить новую</span>
            </label>
            <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid var(--sand)", borderRadius: 8, padding: "4px 8px" }}>
              {parsed.map((ing, idx) => (
                <div key={idx}>
                  <div className="ing-add-row">
                    <span style={{ fontSize: 11, color: "var(--dust)", width: 22, textAlign: "right", flexShrink: 0 }}>{idx + 1}</span>
                    <input className="form-input" style={{ flex: 1, padding: "6px 10px", fontSize: 13, borderColor: ing.trim() ? "" : "var(--rose)" }}
                      value={ing} onChange={e => updateIngredient(idx, e.target.value)} placeholder="INCI название" />
                    <button className="ing-remove" onClick={() => removeIngredient(idx)}>×</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "1px 0 1px 28px" }}>
                    <button onClick={() => insertAfter(idx)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--dust)", padding: "0 4px", display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ fontSize: 14 }}>+</span><span>вставить</span>
                    </button>
                    <div style={{ flex: 1, height: "0.5px", background: "var(--warm)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: "1rem" }}>
          <button className="btn btn-ghost" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={save} disabled={saving || !name.trim()}>
            {saving ? "Сохранение..." : `Сохранить${realCount > 0 ? ` (${realCount} ингр.)` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddIngredientModal({ onClose, onSaved }) {
  const [inci, setInci] = useState("");
  const [ru, setRu] = useState("");
  const [grp, setGrp] = useState("");
  const [subgroup, setSubgroup] = useState("");
  const [desc, setDesc] = useState("");
  const [sheet, setSheet] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!inci.trim()) { setError("Введите INCI название"); return; }
    setSaving(true);
    setError("");
    try {
      await sbFetch("/ingredients", {
        method: "POST",
        body: JSON.stringify({
          inci_name: inci.trim(),
          ru_name: ru.trim() || null,
          grp: grp.trim() || null,
          subgroup: subgroup.trim() || null,
          description: desc.trim() || null,
          source_sheet: sheet.trim() || null
        })
      });
      onSaved();
    } catch (e) {
      setError("Ошибка: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Новый ингредиент</div>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label className="form-label">INCI название *</label>
          <input className="form-input" value={inci} onChange={e => setInci(e.target.value)} placeholder="Например: Aqua" />
        </div>
        <div className="form-group">
          <label className="form-label">Русское название</label>
          <input className="form-input" value={ru} onChange={e => setRu(e.target.value)} placeholder="Например: Вода" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Группа</label>
            <input className="form-input" value={grp} onChange={e => setGrp(e.target.value)} placeholder="Например: Растворители" />
          </div>
          <div className="form-group">
            <label className="form-label">Подгруппа</label>
            <input className="form-input" value={subgroup} onChange={e => setSubgroup(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Описание</label>
          <textarea className="form-input form-textarea" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Описание по стандарту INCI..." />
        </div>
        <div className="form-group">
          <label className="form-label">Лист-источник</label>
          <input className="form-input" value={sheet} onChange={e => setSheet(e.target.value)} placeholder="Например: Лист 3" />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: "1rem" }}>
          <button className="btn btn-ghost" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Сохранение..." : "Сохранить"}</button>
        </div>
      </div>
    </div>
  );
}
