import "@ecustodio123/kafka-commerce/styles.css";
import { CommerceStore } from "@ecustodio123/kafka-commerce";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const storeId = import.meta.env.VITE_STORE_ID;
const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE;

const isConfigured = Boolean(
  supabaseUrl && supabaseKey && storeId && whatsappPhone,
);

const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function App() {
  if (!supabase) {
    return (
      <main className="setup-shell">
        <section className="setup-panel" aria-labelledby="setup-title">
          <p className="setup-kicker">Nutri Andes</p>
          <h1 id="setup-title">Configura las variables de la tienda</h1>
          <p>
            Agrega tus valores públicos de Supabase, el identificador de tienda
            y el teléfono de WhatsApp en <code>.env.local</code> para publicar
            el catálogo.
          </p>
          <pre>{`VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu_publishable_key_publica
VITE_STORE_ID=uuid_de_la_tienda
VITE_WHATSAPP_PHONE=519XXXXXXXX`}</pre>
        </section>
      </main>
    );
  }

  return (
    <main className="store-shell">
      <CommerceStore
        supabase={supabase}
        storeId={storeId}
        storeName="Nutri Andes"
        title="Nutri Andes"
        description="Cremas artesanales, snacks saludables y productos naturales para disfrutar todos los dias."
        checkout={{
          type: "whatsapp",
          phone: whatsappPhone,
        }}
        theme={{
          background: "#F8F1E3",
          surface: "#FFF9EC",
          text: "#2F261D",
          mutedText: "#7A6753",
          primary: "#7A4A22",
          primaryText: "#FFFFFF",
          border: "#E5D6BE",
          radius: "18px",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
        features={{
          search: true,
          filters: true,
          cart: true,
        }}
        layout="sections"
        columns={3}
        gap="18px"
      />
    </main>
  );
}

export default App;
