(async function () {
    // ==========================================
    // 1. ESTILOS AESTHETIC (DARK / NEON)
    // ==========================================
    const style = document.createElement('style');
    style.innerHTML = `
    :root {
        --bg-overlay: rgba(9, 9, 11, 0.85);
        --bg-card: rgba(24, 24, 27, 0.95);
        --border: #27272a;
        --text-main: #e4e4e7;
        --text-muted: #a1a1aa;
        --neon-cyan: #00f0ff;
        --neon-pink: #ff0055;
        --neon-green: #00ff66;
    }

    #scrap_modal_wrapper {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--bg-overlay); backdrop-filter: blur(8px);
    z-index: 999999; display: flex; justify-content: center; align-items: center;
    font-family: 'Segoe UI', system-ui, sans-serif;
    animation: fadeIn 0.3s ease-out forwards;
    }

    .scrap-card {
        background: var(--bg-card); padding: 32px; border-radius: 16px; width: 380px;
        border: 1px solid var(--border); box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        transform: translateY(20px); opacity: 0; animation: slideUp 0.4s ease-out 0.1s forwards;
        color: var(--text-main);
    }

    .scrap-title { margin-top: 0; text-align: center; font-size: 22px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 0 10px rgba(0, 240, 255, 0.3); }
    .scrap-subtitle { font-size: 13px; color: var(--text-muted); text-align: center; margin-bottom: 24px; }

    .scrap-input {
        width: 100%; padding: 12px 14px; margin-bottom: 16px; box-sizing: border-box;
        background: #09090b; border: 1px solid var(--border); border-radius: 8px;
        color: white; outline: none; transition: 0.3s;
    }
    .scrap-input:focus { border-color: var(--neon-cyan); box-shadow: 0 0 10px rgba(0, 240, 255, 0.2); }

    .scrap-btn {
        width: 100%; padding: 14px; border: none; border-radius: 8px; cursor: pointer;
        font-weight: 600; font-size: 14px; transition: all 0.3s ease; text-transform: uppercase;
    }
    .btn-primary { background: var(--neon-cyan); color: #000; box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }
    .btn-primary:hover { box-shadow: 0 0 25px rgba(0, 240, 255, 0.6); transform: translateY(-2px); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    .btn-secondary { background: transparent; color: var(--text-muted); border: 1px solid var(--border); margin-top: 10px; }
    .btn-secondary:hover { color: white; border-color: var(--neon-pink); text-shadow: 0 0 8px var(--neon-pink); }

    .btn-success { background: var(--neon-green); color: #000; box-shadow: 0 0 15px rgba(0, 255, 102, 0.4); margin-top: 20px; display: none; }
    .btn-success:hover { box-shadow: 0 0 25px rgba(0, 255, 102, 0.6); }

    .scrap-error { color: var(--neon-pink); font-size: 13px; text-align: center; margin-bottom: 15px; display: none; text-shadow: 0 0 5px rgba(255, 0, 85, 0.5); }

    /* Progress Bar */
    .progress-container { width: 100%; background: #09090b; border: 1px solid var(--border); border-radius: 12px; height: 24px; overflow: hidden; position: relative; margin-bottom: 15px; }
    .progress-bar { width: 0%; height: 100%; background: var(--neon-cyan); box-shadow: 0 0 15px var(--neon-cyan); transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    .progress-text { position: absolute; top: 0; left: 0; width: 100%; line-height: 24px; text-align: center; font-size: 12px; font-weight: 700; color: #fff; mix-blend-mode: difference; }

    .stats-text { font-size: 14px; text-align: center; color: var(--text-muted); margin-bottom: 5px; }
    .stats-text b { color: var(--neon-cyan); font-size: 18px; text-shadow: 0 0 8px rgba(0, 240, 255, 0.4); }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 2. INYECTAR LA INTERFAZ HTML
    // ==========================================
    const modalHtml = `
    <div id="scrap_modal_wrapper">
    <div class="scrap-card">
    <!-- VISTA LOGIN -->
    <div id="scrap_login_view">
    <h3 class="scrap-title">⚡ Unicom Scraper</h3>
    <p class="scrap-subtitle">Extracción automatizada de catálogo</p>

    <input type="text" id="scrap_user" class="scrap-input" placeholder="Usuario" autocomplete="off"/>
    <input type="password" id="scrap_pass" class="scrap-input" placeholder="Contraseña" />

    <div id="scrap_login_error" class="scrap-error"></div>

    <button id="scrap_btn_iniciar" class="scrap-btn btn-primary">Iniciar Extracción</button>
    <button id="scrap_btn_cancelar" class="scrap-btn btn-secondary">Cancelar</button>
    </div>

    <!-- VISTA PROGRESO -->
    <div id="scrap_progress_view" style="display:none;">
    <h3 class="scrap-title">🚀 Extrayendo</h3>
    <p id="scrap_status" class="stats-text" style="margin-bottom: 15px;">Iniciando sistema...</p>

    <div class="progress-container">
    <div id="scrap_bar" class="progress-bar"></div>
    <span id="scrap_pct" class="progress-text">0%</span>
    </div>

    <p class="stats-text">Productos extraídos: <b id="scrap_count">0</b></p>
    <button id="scrap_btn_cerrar" class="scrap-btn btn-success">Guardar JSON y Cerrar</button>
    </div>
    </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Referencias UI
    const wrapper = document.getElementById('scrap_modal_wrapper');
    const viewLogin = document.getElementById('scrap_login_view');
    const viewProgress = document.getElementById('scrap_progress_view');
    const btnIniciar = document.getElementById('scrap_btn_iniciar');
    const btnCancelar = document.getElementById('scrap_btn_cancelar');
    const btnCerrar = document.getElementById('scrap_btn_cerrar');
    const textError = document.getElementById('scrap_login_error');

    // ==========================================
    // 3. FUNCIONES DE UTILIDAD Y EXTRACCIÓN
    // ==========================================

    // Usar un MAP es O(1) de complejidad. Es infinitamente más rápido que Array.find()
    const catalogoMap = new Map();

    function cerrarUI() {
        wrapper.style.opacity = '0';
        setTimeout(() => wrapper.remove(), 300);
    }

    function updateProgress(percent, statusText) {
        document.getElementById('scrap_bar').style.width = `${percent}%`;
        document.getElementById('scrap_pct').innerText = `${Math.floor(percent)}%`;
        document.getElementById('scrap_status').innerText = statusText;
        document.getElementById('scrap_count').innerText = catalogoMap.size;
    }

    // EXTRAER CATEGORÍAS DEL DOM AUTOMÁTICAMENTE
    function obtenerCategoriasDinamicas() {
        const links = document.querySelectorAll('a[href*="CategoryId="]');
        const categoriasSet = new Set();

        links.forEach(link => {
            const url = new URL(link.href, window.location.origin);
            const catId = url.searchParams.get('CategoryId');
            // Tomamos solo las categorías principales (ej: '00', '01') para evitar paginar doble
            if (catId && catId.length === 2) {
                categoriasSet.add(catId);
            }
        });

        const categorias = Array.from(categoriasSet).sort();
        // Fallback por si ejecutan el script en una página sin el menú
        return categorias.length > 0 ? categorias : ['00', '01', '02', '03', '06', '08', '10', '20', '25', '30', '35', '45', '50', '55', '60', '62', '65', '70'];
    }

    // Función segura para hacer fetch con parseo de HTML
    async function fetchHtml(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        return new DOMParser().parseFromString(html, 'text/html');
    }

    // ==========================================
    // 4. LÓGICA PRINCIPAL DEL SCRAPER
    // ==========================================
    async function iniciarProceso(user, pass) {
        btnIniciar.innerText = "Autenticando...";
        btnIniciar.disabled = true;

        const isLogged = document.body.innerHTML.includes('/Account/LogOff') || document.body.innerHTML.includes('Cerrar sesión');

        // LOGIN
        if (!isLogged) {
            let tokenElement = document.querySelector('input[name="__RequestVerificationToken"]');
            if (!tokenElement) {
                textError.innerText = "Error: Falta token de seguridad. Recarga la página (F5) e intenta de nuevo.";
                textError.style.display = "block";
                btnIniciar.innerText = "Iniciar Extracción";
                btnIniciar.disabled = false;
                return;
            }

            let params = new URLSearchParams();
            params.append("__RequestVerificationToken", tokenElement.value);
            params.append("Username", user);
            params.append("Password", pass);

            try {
                await fetch("/Account/Login", { method: 'POST', body: params, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
                let doc = await fetchHtml('/');

                if (!doc.body.innerHTML.includes('/Account/LogOff') && !doc.body.innerHTML.includes('Cerrar sesión')) {
                    textError.innerText = "Credenciales incorrectas o error al iniciar sesión.";
                    textError.style.display = "block";
                    btnIniciar.innerText = "Iniciar Extracción";
                    btnIniciar.disabled = false;
                    return;
                }
            } catch (error) {
                console.error("Error en login", error);
            }
        }

        // TRANSICIÓN A VISTA DE PROGRESO
        viewLogin.style.display = 'none';
        viewProgress.style.display = 'block';

        const categorias = obtenerCategoriasDinamicas();

        for (let i = 0; i < categorias.length; i++) {
            let cat = categorias[i];
            let paginaActual = 1;
            let totalPaginas = 1;

            while (paginaActual <= totalPaginas) {
                // Cálculo preciso del porcentaje
                let basePct = (i / categorias.length) * 100;
                let subPct = ((paginaActual - 1) / Math.max(totalPaginas, 1)) * (100 / categorias.length);
                updateProgress(basePct + subPct, `Analizando Cat. ${cat} (${i+1}/${categorias.length}) - Pág. ${paginaActual}`);

                let url = `/Busqueda?CategoryId=${cat}&SelectedPage=${paginaActual}&ListQuantity=200&Thumbnails=True`;

                try {
                    let doc = await fetchHtml(url);

                    if (paginaActual === 1) {
                        let pagesQtyInput = doc.querySelector('#pages-qty');
                        totalPaginas = pagesQtyInput ? (parseInt(pagesQtyInput.value) || 1) : 1;
                    }

                    let productos = doc.querySelectorAll('.product-item');

                    productos.forEach(item => {
                        let sku = item.querySelector('.btn-add-favorito')?.dataset.code || "";
                        if (!sku || catalogoMap.has(sku)) return; // Evita duplicados al instante O(1)

                    let nombre = item.querySelector('h4 a')?.innerText.trim() || "";
                        let marca = item.querySelector('.product-item-brand')?.innerText.trim() || "";

                        // Parseo robusto de precios
                        let precioContainer = item.querySelector('.product-item-prices');
                        let precioActual = "", precioLista = "";

                        if (precioContainer) {
                            let divPrecio = precioContainer.querySelector('div');
                            let spanPrecio = precioContainer.querySelector('span');

                            if (divPrecio && spanPrecio) {
                                precioActual = divPrecio.innerText.trim();
                                precioLista = spanPrecio.innerText.trim();
                            } else {
                                precioActual = precioContainer.innerText.replace(/[\n\r]+/g, ' ').trim();
                                precioLista = precioActual;
                            }
                        }

                        let stock = item.querySelector('.product-item-has-stock') ? "En Stock" :
                        item.querySelector('.product-item-nostock') ? "Sin Stock" : "Desconocido";

                        let imgEl = item.querySelector('.product-image img');
                        let imagen = imgEl ? (imgEl.getAttribute('src') || "") : "";
                        if (imagen.startsWith('/')) imagen = window.location.origin + imagen;

                        catalogoMap.set(sku, { sku, nombre, marca, precioActual, precioLista, stock, imagen, idCategoriaWeb: cat });
                    });
                } catch (err) {
                    console.error(`Error procesando categoría ${cat} pág ${paginaActual}:`, err);
                }

                paginaActual++;
                await new Promise(r => setTimeout(r, 1200)); // Retraso prudente para evitar bloqueos
            }
        }

        // ==========================================
        // 5. FINALIZAR Y DESCARGAR
        // ==========================================
        updateProgress(100, "¡Extracción Finalizada con Éxito!");
        const bar = document.getElementById('scrap_bar');
        bar.style.background = "var(--neon-green)";
        bar.style.boxShadow = "0 0 15px var(--neon-green)";

        btnCerrar.style.display = "block";
        btnCerrar.addEventListener('click', () => {
            // Transformar el MAP a un Array
            const catalogoFinal = Array.from(catalogoMap.values());

            let jsonStr = JSON.stringify(catalogoFinal, null, 4);
            let blob = new Blob([jsonStr], { type: "application/json" });
            let urlDescarga = URL.createObjectURL(blob);

            let enlace = document.createElement('a');
            enlace.href = urlDescarga;
            enlace.download = `catalogo_unicom_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
            URL.revokeObjectURL(urlDescarga);

            cerrarUI();
        });
    }

    // ==========================================
    // 6. EVENT LISTENERS
    // ==========================================
    btnCancelar.addEventListener('click', cerrarUI);

    let isLoggedInit = document.body.innerHTML.includes('/Account/LogOff') || document.body.innerHTML.includes('Cerrar sesión');
    if (isLoggedInit) {
        // Si ya está logueado, se pasa directo sin pedir usuario/pass
        iniciarProceso(null, null);
    } else {
        btnIniciar.addEventListener('click', () => {
            let user = document.getElementById('scrap_user').value.trim();
            let pass = document.getElementById('scrap_pass').value.trim();
            if(!user || !pass) {
                textError.innerText = "Ingresa usuario y contraseña.";
                textError.style.display = "block";
                return;
            }
            textError.style.display = "none";
            iniciarProceso(user, pass);
        });
    }
})();
