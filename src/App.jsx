import { useState, useMemo, useEffect } from "react";

// ── CREDENCIAIS ── altere aqui usuário e senha
const USERS = [
  { username: "admin", password: "cana2026" },
];

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = () => {
    const match = USERS.find(u => u.username === username.trim() && u.password === password);
    if (match) {
      onLogin(username.trim());
    } else {
      setError("Usuário ou senha incorretos.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(160deg,#14532d 0%,#166534 50%,#15803d 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Trebuchet MS','Gill Sans',sans-serif",
    }}>
      {/* Background pattern */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 400,
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)", overflow: "hidden",
        animation: shaking ? "shake 0.4s ease" : "none",
      }}>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
          @keyframes fadeIn {
            from{opacity:0;transform:translateY(12px)}
            to{opacity:1;transform:translateY(0)}
          }
        `}</style>

        {/* Header verde */}
        <div style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", padding: "32px 32px 28px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "rgba(255,255,255,0.15)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 14px" }}>🌿</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "Georgia,serif" }}>Gestão Muda de Cana</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Acesso restrito — faça login para continuar</p>
        </div>

        {/* Formulário */}
        <div style={{ padding: "28px 32px 32px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.8 }}>Usuário</label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                onKeyDown={handleKey}
                placeholder="Digite seu usuário"
                autoFocus
                style={{ border: `1.5px solid ${error ? "#fca5a5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 14px", fontSize: 15, color: "#111827", background: error ? "#fff5f5" : "#f9fafb", outline: "none", fontFamily: "inherit", transition: "border-color 0.15s" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.8 }}>Senha</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={handleKey}
                  placeholder="Digite sua senha"
                  style={{ border: `1.5px solid ${error ? "#fca5a5" : "#e5e7eb"}`, borderRadius: 10, padding: "11px 44px 11px 14px", fontSize: 15, color: "#111827", background: error ? "#fff5f5" : "#f9fafb", outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box", transition: "border-color 0.15s" }}
                />
                <button
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9ca3af", padding: 0, lineHeight: 1 }}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(22,163,74,0.35)", marginTop: 4, letterSpacing: 0.3 }}
            >
              Entrar →
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: 11, color: "#d1d5db", marginTop: 24, marginBottom: 0 }}>
            Sistema privado · Apenas usuários autorizados
          </p>
        </div>
      </div>
    </div>
  );
}


const STATUS_PEDIDO = [
  "Negociando muda",
  "O.S aberta para retirada",
  "Medição topografia",
  "O.S encerrada",
  "Contrato em andamento",
  "Contrato em validação",
  "Contrato em assinatura",
  "Entregue para o pagamento",
];

const STATUS_COLORS_PEDIDO = {
  "Negociando muda":           { bg: "#fef9c3", text: "#713f12", dot: "#ca8a04" },
  "O.S aberta para retirada":  { bg: "#dbeafe", text: "#1e3a8a", dot: "#3b82f6" },
  "Medição topografia":        { bg: "#e0f2fe", text: "#0c4a6e", dot: "#0ea5e9" },
  "O.S encerrada":             { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" },
  "Contrato em andamento":     { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  "Contrato em validação":     { bg: "#ede9fe", text: "#4c1d95", dot: "#7c3aed" },
  "Contrato em assinatura":    { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  "Entregue para o pagamento": { bg: "#dcfce7", text: "#14532d", dot: "#16a34a" },
};

const CONTRACT_TEMPLATE = (r) => `CONTRATO DE COMPRA E VENDA DE MUDA DE CANA-DE-AÇÚCAR

Nº do Pedido: ${r.pedido || "___"}
Data: ${r.proposta || new Date().toLocaleDateString("pt-BR")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PARTES:

VENDEDOR:
Nome/Razão Social: ${r.vendedor || "___________________________"}
Contato: ${r.contatoVendedor || "___________________________"}

COMPRADOR:
Nome/Razão Social: ${r.comprador || "___________________________"}
Contato: ${r.contatoComprador || "___________________________"}
Financeiro: ${r.financeiro || "___________________________"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DO OBJETO:

Pelo presente instrumento, as partes acima qualificadas têm entre si justo e
contratado a compra e venda de muda de cana-de-açúcar, nas seguintes condições:

Fazenda de Origem da Muda: ${r.fazendaMuda || "___________________________"}
Tipo / Variedade da Muda:  ${r.tMuda || "___________________________"}
Código da Muda:            ${r.codMuda || "___________________________"}
Data de Corte:             ${r.dataCorte || "___________________________"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DAS ÁREAS:

Área de Muda Prevista:   ${r.areaMudaPrevista || "___"} ha
Área de Muda Realizada:  ${r.areaMudaRealizada || "___"} ha
Área de Plantio:         ${r.areaPlantio || "___"} ha
Talhão de Plantio:       ${r.talhaoPlantio || "___________________________"}
TCH (Ton. por Hectare):  ${r.tch || "___"}
FA Plantio:              ${r.faPlantio || "___"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DAS CONDIÇÕES DE PAGAMENTO:

[Descrever as condições de pagamento acordadas entre as partes]

Valor Total:        R$ ___________________________
Forma de Pagamento: ___________________________
Prazo:              ___________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DAS OBRIGAÇÕES DO VENDEDOR:

1. Fornecer a muda nas quantidades e especificações descritas neste contrato;
2. Garantir a qualidade fitossanitária da muda fornecida;
3. Disponibilizar a OS de Corte referência: ${r.osCorte || "___"};
4. Apresentar mapa de área da muda conforme acordado.

DAS OBRIGAÇÕES DO COMPRADOR:

1. Efetuar o pagamento nas condições acordadas;
2. Realizar o plantio no prazo estabelecido;
3. Comunicar qualquer inconformidade no prazo de ___ dias após o recebimento.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DAS DISPOSIÇÕES GERAIS:

O presente contrato é firmado em caráter irrevogável e irretratável, obrigando
as partes e seus sucessores. Fica eleito o foro da comarca de _________________
para dirimir quaisquer controvérsias oriundas deste instrumento.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Observações: ${r.obs || "Nenhuma."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Local e Data: ___________________, _____ de _____________ de _______

___________________________________    ___________________________________
           VENDEDOR                               COMPRADOR
  ${(r.vendedor || "").padEnd(33)} ${r.comprador || ""}

___________________________________    ___________________________________
         TESTEMUNHA 1                           TESTEMUNHA 2
`;

const INITIAL_DATA = [
  { id: 1, pedido: 1, proposta: "09/02/2026", rl: "Ok", seraEnviado: "Sim", financeiro: "UC", comprador: "Amauri", contatoComprador: "GQQ", vendedor: "Zé Fernando", contatoVendedor: "Talisma", fazendaMuda: "14039", codMuda: "", tMuda: "IACSP01 5503", variedade: "", dataCorte: "14-17/02/2026", areaMudaPrevista: 1.65, areaMudaRealizada: 1.60, pesoBase: "", areaBase: "", tch: 63.33, faPlantio: 12067, talhaoPlantio: "", areaPlantio: 11.35, avaliacaoMuda: "", osCorte: "123815", mapaArea: "", apontamento: "", entregaCarta: "", obs: "", statusPedido: "Negociando muda" },
  { id: 2, pedido: 2, proposta: "09/02/2026", rl: "Ok", seraEnviado: "Sim", financeiro: "UC", comprador: "Amauri", contatoComprador: "GQQ", vendedor: "Zé Fernando", contatoVendedor: "Talisma", fazendaMuda: "14039", codMuda: "", tMuda: "IACSP01 5503", variedade: "", dataCorte: "14-17/02/2027", areaMudaPrevista: 4.40, areaMudaRealizada: 2.60, pesoBase: "", areaBase: "", tch: 63.33, faPlantio: 12067, talhaoPlantio: "", areaPlantio: 10.93, avaliacaoMuda: "", osCorte: "123815", mapaArea: "", apontamento: "", entregaCarta: "", obs: "", statusPedido: "O.S aberta para retirada" },
];

const EMPTY_FORM = { pedido: "", proposta: "", rl: "", seraEnviado: "", financeiro: "", comprador: "", contatoComprador: "", vendedor: "", contatoVendedor: "", fazendaMuda: "", codMuda: "", tMuda: "", variedade: "", dataCorte: "", areaMudaPrevista: "", areaMudaRealizada: "", pesoBase: "", areaBase: "", tch: "", faPlantio: "", talhaoPlantio: "", areaPlantio: "", avaliacaoMuda: "", osCorte: "", mapaArea: "", apontamento: "", entregaCarta: "", obs: "", statusPedido: "" };

const RL_COLORS = { Ok: { bg: "#d1fae5", text: "#065f46" }, Pendente: { bg: "#fef3c7", text: "#92400e" }, "Não": { bg: "#fee2e2", text: "#991b1b" }, Sim: { bg: "#d1fae5", text: "#065f46" } };
const CONTRACT_STATUS_LABELS = { rascunho: { label: "📝 Rascunho", bg: "#f3f4f6", text: "#374151" }, validacao: { label: "⏳ Em Validação", bg: "#ede9fe", text: "#6d28d9" }, assinatura: { label: "✍️ Em Assinatura", bg: "#dbeafe", text: "#1e3a8a" }, aprovado: { label: "✅ Aprovado", bg: "#d1fae5", text: "#065f46" } };

const inputStyle = { border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 14, color: "#111827", background: "#f9fafb", width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit" };
const btnPrimary = { background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(22,163,74,0.3)", whiteSpace: "nowrap" };
const btnSecondary = { background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" };
const btnPurple = { background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(124,58,237,0.3)", whiteSpace: "nowrap" };
const btnBlue = { background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(37,99,235,0.3)", whiteSpace: "nowrap" };

const Pill = ({ value, colors }) => {
  const s = colors?.[value];
  if (!value) return <span style={{ color: "#9ca3af", fontSize: 12 }}>—</span>;
  return <span style={{ background: s?.bg || "#f3f4f6", color: s?.text || "#374151", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{value}</span>;
};

const StatusDot = ({ value }) => {
  const s = STATUS_COLORS_PEDIDO[value];
  if (!value) return <span style={{ color: "#9ca3af", fontSize: 12 }}>—</span>;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, color: s.text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block", flexShrink: 0 }} />
      {value}
    </span>
  );
};

function FormField({ label, fieldKey, type = "text", options, full, form, set }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, gridColumn: full ? "1 / -1" : undefined }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</label>
      {options ? (
        <select value={form[fieldKey] || ""} onChange={e => set(fieldKey, e.target.value)} style={inputStyle}>
          <option value="">—</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={form[fieldKey] || ""} onChange={e => set(fieldKey, e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input type={type} value={form[fieldKey] || ""} onChange={e => set(fieldKey, e.target.value)} style={inputStyle} />
      )}
    </div>
  );
}

function PedidoModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  useEffect(() => setForm(initial || EMPTY_FORM), [initial, open]);
  if (!open) return null;
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 920, maxHeight: "92vh", overflow: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.22)" }}>
        <div style={{ padding: "22px 32px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 1.5 }}>{initial?.id ? "Editar" : "Novo"} Registro</div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111827", fontFamily: "Georgia, serif" }}>Pedido de Muda de Cana</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#9ca3af" }}>✕</button>
        </div>
        <div style={{ padding: "24px 32px" }}>
          <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>🔖 Status do Pedido</div>
            <select value={form.statusPedido || ""} onChange={e => set("statusPedido", e.target.value)} style={{ ...inputStyle, background: "#fff", fontWeight: 600, fontSize: 15 }}>
              <option value="">Selecione o status...</option>
              {STATUS_PEDIDO.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
            <FormField label="Nº Pedido" fieldKey="pedido" type="number"  form={form} set={set} />
            <FormField label="Proposta" fieldKey="proposta"  form={form} set={set} />
            <FormField label="RL" fieldKey="rl" options={["Ok", "Pendente", "Não"]}  form={form} set={set} />
            <FormField label="Será Enviado" fieldKey="seraEnviado" options={["Sim", "Não"]}  form={form} set={set} />
            <FormField label="Financeiro" fieldKey="financeiro"  form={form} set={set} />
            <FormField label="Comprador" fieldKey="comprador"  form={form} set={set} />
            <FormField label="Contato Comprador" fieldKey="contatoComprador"  form={form} set={set} />
            <FormField label="Vendedor" fieldKey="vendedor"  form={form} set={set} />
            <FormField label="Contato Vendedor" fieldKey="contatoVendedor"  form={form} set={set} />
            <FormField label="Fazenda Muda" fieldKey="fazendaMuda"  form={form} set={set} />
            <FormField label="Cód. Muda" fieldKey="codMuda"  form={form} set={set} />
            <FormField label="T. Muda" fieldKey="tMuda"  form={form} set={set} />
            <FormField label="Variedade" fieldKey="variedade"  form={form} set={set} />
            <FormField label="Data Corte" fieldKey="dataCorte"  form={form} set={set} />
            <FormField label="Área Muda Prevista (ha)" fieldKey="areaMudaPrevista" type="number"  form={form} set={set} />
            <FormField label="Área Muda Realizada (ha)" fieldKey="areaMudaRealizada" type="number"  form={form} set={set} />
            <FormField label="Peso Base" fieldKey="pesoBase"  form={form} set={set} />
            <FormField label="Área Base" fieldKey="areaBase"  form={form} set={set} />
            <FormField label="TCH" fieldKey="tch" type="number"  form={form} set={set} />
            <FormField label="FA Plantio" fieldKey="faPlantio"  form={form} set={set} />
            <FormField label="Talhão Plantio" fieldKey="talhaoPlantio"  form={form} set={set} />
            <FormField label="Área Plantio (ha)" fieldKey="areaPlantio" type="number"  form={form} set={set} />
            <FormField label="Avaliação Muda" fieldKey="avaliacaoMuda"  form={form} set={set} />
            <FormField label="OS Corte Muda" fieldKey="osCorte"  form={form} set={set} />
            <FormField label="Mapa Área Muda" fieldKey="mapaArea" options={["Sim", "Não", "Pendente"]}  form={form} set={set} />
            <FormField label="Apontamento" fieldKey="apontamento"  form={form} set={set} />
            <FormField label="Entrega Carta Gestão PAG" fieldKey="entregaCarta"  form={form} set={set} />
            <FormField label="OBS" fieldKey="obs" type="textarea" full  form={form} set={set} />
          </div>
        </div>
        <div style={{ padding: "16px 32px 24px", display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid #e5e7eb" }}>
          <button onClick={onClose} style={btnSecondary}>Cancelar</button>
          <button onClick={() => onSave(form)} style={btnPrimary}>{initial?.id ? "Salvar Alterações" : "Adicionar Pedido"}</button>
        </div>
      </div>
    </div>
  );
}

function EmailDialog({ open, onClose, onConfirm, record, mailtoLink, emailSent }) {
  const [toEmail, setToEmail] = useState("");
  const [ccEmail, setCcEmail] = useState("");
  const [sendCC, setSendCC] = useState(false);

  useEffect(() => { if (open) { setToEmail(""); setCcEmail(""); setSendCC(false); } }, [open]);
  if (!open) return null;

  // Step 2: file downloaded, now show mailto link with attach instructions
  if (emailSent && mailtoLink) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1300, padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.25)", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", padding: "20px 24px" }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Georgia,serif" }}>✅ Arquivo baixado!</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Contrato — Pedido #{record?.pedido} · {record?.comprador}</p>
          </div>
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 8 }}>📋 Passos para enviar:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>1. O arquivo do contrato já foi baixado para o seu computador.</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>2. Clique em &ldquo;Abrir no E-mail&rdquo; abaixo &mdash; seu cliente de e-mail abrirá com destinatário e assunto prontos.</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>3. Anexe o arquivo baixado ao e-mail.</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>4. Clique em Enviar.</div>
              </div>
            </div>
            <a
              href={mailtoLink}
              style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", borderRadius: 12, padding: "14px 28px", fontWeight: 800, fontSize: 15, textDecoration: "none", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}
            >
              ✉️ Abrir no E-mail
            </a>
            <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
              Não se esqueça de anexar o arquivo antes de enviar!
            </p>
          </div>
          <div style={{ padding: "0 24px 20px", display: "flex", justifyContent: "center" }}>
            <button onClick={onClose} style={btnSecondary}>Fechar</button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: fill in email address
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1300, padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 460, boxShadow: "0 24px 60px rgba(0,0,0,0.25)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", padding: "20px 24px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: 1.5 }}>Envio por E-mail</div>
          <h3 style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Georgia,serif" }}>
            Contrato — Pedido #{record?.pedido} · {record?.comprador}
          </h3>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#6d28d9", lineHeight: 1.5 }}>
            ℹ️ O contrato será baixado como arquivo. Depois, seu e-mail abrirá pronto para você anexá-lo e enviar.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.8 }}>Para (destinatário) <span style={{ color: "#dc2626" }}>*</span></label>
            <input type="email" placeholder="email@destinatario.com.br" value={toEmail} onChange={e => setToEmail(e.target.value)} style={{ ...inputStyle, fontSize: 14 }} />
            <span style={{ fontSize: 11, color: "#9ca3af" }}>Múltiplos destinatários: separe por vírgula</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#374151", userSelect: "none" }}>
              <input type="checkbox" checked={sendCC} onChange={e => setSendCC(e.target.checked)} style={{ width: 15, height: 15, accentColor: "#7c3aed" }} />
              Enviar cópia (CC) para mim
            </label>
            {sendCC && (
              <input type="email" placeholder="meu@email.com.br" value={ccEmail} onChange={e => setCcEmail(e.target.value)} style={{ ...inputStyle, fontSize: 14 }} />
            )}
          </div>
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: 3 }}>Assunto</div>
            <div style={{ fontSize: 13, color: "#374151" }}>Contrato de Muda — Pedido #{record?.pedido} · {record?.comprador}</div>
          </div>
        </div>
        <div style={{ padding: "0 24px 20px", display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => onConfirm(null, null, null)} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>
            Pular, não enviar e-mail
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={btnSecondary}>Cancelar</button>
            <button onClick={() => onConfirm(toEmail, sendCC ? ccEmail : "", "doc")} disabled={!toEmail.trim()}
              style={{ ...btnSecondary, background: "#eff6ff", color: "#2563eb", opacity: toEmail.trim() ? 1 : 0.45, cursor: toEmail.trim() ? "pointer" : "not-allowed" }}>
              📎 Baixar Word + E-mail
            </button>
            <button onClick={() => onConfirm(toEmail, sendCC ? ccEmail : "", "pdf")} disabled={!toEmail.trim()}
              style={{ ...btnPurple, opacity: toEmail.trim() ? 1 : 0.45, cursor: toEmail.trim() ? "pointer" : "not-allowed" }}>
              📎 Baixar TXT + E-mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractModal({ open, onClose, record, contracts, onSaveContract, onSendToValidation }) {
  const existing = record ? contracts[record.id] : null;
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [mailtoLink, setMailtoLink] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (open && record) {
      setContent(existing?.content || CONTRACT_TEMPLATE(record));
      setSaved(false);
      setEmailSent(false);
      setMailtoLink("");
    }
  }, [open, record?.id]);

  if (!open || !record) return null;

  const alreadySent = existing?.status === "validacao" || existing?.status === "assinatura" || existing?.status === "aprovado";
  const ctStatus = existing ? CONTRACT_STATUS_LABELS[existing.status] : null;

  const handleSave = () => {
    onSaveContract(record.id, content, existing?.status || "rascunho");
    setSaved(true);
  };

  const handleSend = () => {
    onSaveContract(record.id, content, "validacao");
    onSendToValidation(record.id);
    setEmailOpen(true);
  };

  const handleEmailConfirm = (toEmail, ccEmail, format) => {
    if (toEmail) {
      // Generate and download the contract file
      const filename = `Contrato_Pedido_${record.pedido}_${(record.comprador||"").replace(/\s+/g,"_")}`;
      if (format === "pdf") {
        // Plain text as .txt (PDF real requer lib externa)
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename + ".txt"; a.click();
        URL.revokeObjectURL(url);
      } else {
        // Word-compatible HTML wrapped as .doc
        const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Contrato</title></head><body><pre style="font-family:Courier New;font-size:11pt;line-height:1.8;">${content.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre></body></html>`;
        const blob = new Blob([html], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = filename + ".doc"; a.click();
        URL.revokeObjectURL(url);
      }
      // mailto without body - user attaches the downloaded file
      const subject = encodeURIComponent(`Contrato de Muda — Pedido #${record.pedido} · ${record.comprador}`);
      const bodyText = encodeURIComponent(`Olá,

Segue em anexo o contrato de compra e venda de muda referente ao Pedido #${record.pedido}.

Fazenda: ${record.fazendaMuda || ""}
Comprador: ${record.comprador || ""}
Vendedor: ${record.vendedor || ""}

Atenciosamente.`);
      const cc = ccEmail ? `&cc=${encodeURIComponent(ccEmail)}` : "";
      setMailtoLink(`mailto:${encodeURIComponent(toEmail)}?subject=${subject}${cc}&body=${bodyText}`);
      setEmailSent(true);
    } else {
      setEmailOpen(false);
      onClose();
    }
  };

  return (
    <>
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 860, height: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 2 }}>Pedido #{record.pedido} · {record.comprador}</div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111827", fontFamily: "Georgia, serif" }}>Contrato de Compra e Venda de Muda</h2>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {ctStatus && <span style={{ background: ctStatus.bg, color: ctStatus.text, padding: "4px 13px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{ctStatus.label}</span>}
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
          </div>
        </div>
        <div style={{ padding: "8px 28px", background: "#fafafa", borderBottom: "1px solid #e5e7eb", display: "flex", gap: 24, fontSize: 12, color: "#6b7280" }}>
          <span>✏️ Edite o contrato diretamente abaixo</span>
          <span>💾 Salve o rascunho antes de enviar para validação</span>
        </div>
        <textarea
          value={content}
          onChange={e => { setContent(e.target.value); setSaved(false); }}
          style={{ flex: 1, border: "none", outline: "none", padding: "24px 32px", fontSize: 13, lineHeight: 1.85, fontFamily: "'Courier New', monospace", color: "#1f2937", resize: "none", background: "#fff" }}
        />
        <div style={{ padding: "14px 28px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            {saved ? "✅ Salvo como rascunho" : existing?.updatedAt ? `Última edição: ${new Date(existing.updatedAt).toLocaleString("pt-BR")}` : "Contrato não salvo"}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={btnSecondary}>Fechar</button>
            <button onClick={handleSave} style={{ ...btnSecondary, background: "#eff6ff", color: "#2563eb" }}>💾 Salvar Rascunho</button>
            {!alreadySent
              ? <button onClick={handleSend} style={btnPurple}>📤 Enviar para Validação</button>
              : <button onClick={() => setEmailOpen(true)} style={{ ...btnPurple, background: "linear-gradient(135deg,#0891b2,#0e7490)", boxShadow: "0 4px 12px rgba(8,145,178,0.3)" }}>✉️ Reenviar E-mail</button>
            }
          </div>
        </div>
      </div>
    </div>
    <EmailDialog open={emailOpen} onClose={() => { setEmailOpen(false); onClose(); }} onConfirm={handleEmailConfirm} record={record} mailtoLink={mailtoLink} emailSent={emailSent} />
    </>
  );
}

function KpiCard({ label, value, sub, color = "#16a34a" }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 900, color: "#111827", margin: "8px 0 4px", fontFamily: "Georgia, serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#9ca3af" }}>{sub}</div>}
    </div>
  );
}

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  const handleLogin = (user) => setLoggedUser(user);
  const handleLogout = () => setLoggedUser(null);

  if (!loggedUser) return <LoginScreen onLogin={handleLogin} />;

  return <AppContent user={loggedUser} onLogout={handleLogout} />;
}

function AppContent({ user, onLogout }) {
  const [records, setRecords] = useState(() => { try { const s = localStorage.getItem("cana_records_v2"); return s ? JSON.parse(s) : INITIAL_DATA; } catch { return INITIAL_DATA; } });
  const [contracts, setContracts] = useState(() => { try { const s = localStorage.getItem("cana_contracts_v2"); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const [tab, setTab] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [contractRecord, setContractRecord] = useState(null);
  const [contractOpen, setContractOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterVendedor, setFilterVendedor] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { try { localStorage.setItem("cana_records_v2", JSON.stringify(records)); } catch {} }, [records]);
  useEffect(() => { try { localStorage.setItem("cana_contracts_v2", JSON.stringify(contracts)); } catch {} }, [contracts]);

  const nextId = useMemo(() => Math.max(0, ...records.map(r => r.id)) + 1, [records]);

  const filtered = useMemo(() => records.filter(r => {
    const q = search.toLowerCase();
    const m = !q || [r.pedido, r.comprador, r.vendedor, r.fazendaMuda, r.tMuda, r.osCorte].some(v => String(v || "").toLowerCase().includes(q));
    return m && (!filterStatus || r.statusPedido === filterStatus) && (!filterVendedor || r.vendedor === filterVendedor);
  }), [records, search, filterStatus, filterVendedor]);

  const validacaoContracts = useMemo(() =>
    Object.entries(contracts)
      .filter(([, c]) => ["validacao", "assinatura", "aprovado"].includes(c.status))
      .map(([id, c]) => ({ ...c, recordId: Number(id), record: records.find(r => r.id === Number(id)) }))
      .filter(c => c.record)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
    [contracts, records]);

  const vendedores = useMemo(() => [...new Set(records.map(r => r.vendedor).filter(Boolean))], [records]);
  const kpis = useMemo(() => ({
    total: records.length,
    areaTotal: records.reduce((s, r) => s + (parseFloat(r.areaMudaRealizada) || 0), 0),
    areaPrev: records.reduce((s, r) => s + (parseFloat(r.areaMudaPrevista) || 0), 0),
    areaPlantio: records.reduce((s, r) => s + (parseFloat(r.areaPlantio) || 0), 0),
    contratos: Object.keys(contracts).length,
    validacao: validacaoContracts.length,
  }), [records, contracts, validacaoContracts]);

  const byVendedor = useMemo(() => {
    const map = {};
    records.forEach(r => { if (!r.vendedor) return; if (!map[r.vendedor]) map[r.vendedor] = { pedidos: 0, area: 0 }; map[r.vendedor].pedidos++; map[r.vendedor].area += parseFloat(r.areaMudaRealizada) || 0; });
    return Object.entries(map).sort((a, b) => b[1].area - a[1].area);
  }, [records]);

  const handleSave = form => {
    if (editing?.id) setRecords(r => r.map(x => x.id === editing.id ? { ...form, id: editing.id } : x));
    else setRecords(r => [...r, { ...form, id: nextId }]);
    setModalOpen(false); setEditing(null);
  };

  const handleSaveContract = (recordId, content, status) => {
    setContracts(prev => ({ ...prev, [recordId]: { content, status, updatedAt: new Date().toISOString(), createdAt: prev[recordId]?.createdAt || new Date().toISOString() } }));
  };

  const handleSendToValidation = (recordId) => {
    setRecords(r => r.map(x => x.id === recordId ? { ...x, statusPedido: "Contrato em validação" } : x));
  };

  const handleContractStatus = (recordId, newStatus) => {
    setContracts(prev => ({ ...prev, [recordId]: { ...prev[recordId], status: newStatus, updatedAt: new Date().toISOString() } }));
    if (newStatus === "assinatura") setRecords(r => r.map(x => x.id === recordId ? { ...x, statusPedido: "Contrato em assinatura" } : x));
    if (newStatus === "aprovado") setRecords(r => r.map(x => x.id === recordId ? { ...x, statusPedido: "Entregue para o pagamento" } : x));
  };

  const tabStyle = t => ({
    padding: "9px 18px", border: "none",
    background: tab === t ? "#16a34a" : "transparent",
    color: tab === t ? "#fff" : "#a7f3d0",
    fontWeight: tab === t ? 700 : 500,
    borderRadius: 10, cursor: "pointer", fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
  });

  const exportCSV = () => {
    const headers = ["Pedido","Proposta","Status","RL","Enviado","Financeiro","Comprador","Contato Comprador","Vendedor","Contato Vendedor","Fazenda","T Muda","Data Corte","Á.Prevista","Á.Realizada","TCH","Á.Plantio","OS Corte","OBS"];
    const keys = ["pedido","proposta","statusPedido","rl","seraEnviado","financeiro","comprador","contatoComprador","vendedor","contatoVendedor","fazendaMuda","tMuda","dataCorte","areaMudaPrevista","areaMudaRealizada","tch","areaPlantio","osCorte","obs"];
    const rows = [headers, ...records.map(r => keys.map(k => r[k] ?? ""))];
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["\ufeff" + rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n")], { type: "text/csv;charset=utf-8" })); a.download = "gestao_muda_cana.csv"; a.click();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", fontFamily: "'Trebuchet MS','Gill Sans',sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#14532d 0%,#166534 60%,#15803d 100%)", padding: "0 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "15px 0", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🌿</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 2 }}>Sistema de Gestão</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif" }}>Muda de Cana</div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 3, background: "rgba(0,0,0,0.2)", borderRadius: 14, padding: 4 }}>
            {[["dashboard","📊","Dashboard"],["pedidos","📋","Pedidos"],["relatorios","📈","Relatórios"],["validacao","📄","Validação"]].map(([k, icon, lbl]) => (
              <button key={k} style={tabStyle(k)} onClick={() => setTab(k)}>
                {icon} {lbl}
                {k === "validacao" && validacaoContracts.length > 0 && (
                  <span style={{ background: "#f59e0b", color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 800, padding: "1px 6px" }}>{validacaoContracts.length}</span>
                )}
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "7px 12px" }}>
              <div style={{ width: 28, height: 28, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{user}</span>
            </div>
            <button onClick={() => { setEditing(null); setModalOpen(true); }} style={btnPrimary}>+ Novo Pedido</button>
            <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              Sair →
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "26px 28px" }}>

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
              <KpiCard label="Total Pedidos" value={kpis.total} sub="registrados" color="#16a34a" />
              <KpiCard label="Área Realizada" value={`${kpis.areaTotal.toFixed(1)} ha`} sub={`Prevista: ${kpis.areaPrev.toFixed(1)} ha`} color="#2563eb" />
              <KpiCard label="Área Plantio" value={`${kpis.areaPlantio.toFixed(1)} ha`} color="#7c3aed" />
              <KpiCard label="Contratos" value={kpis.contratos} sub={`${kpis.validacao} em validação`} color="#d97706" />
            </div>

            {/* Kanban de status */}
            <div style={{ background: "#fff", borderRadius: 14, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#111827" }}>Pedidos por Status</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STATUS_PEDIDO.map(s => {
                  const count = records.filter(r => r.statusPedido === s).length;
                  const st = STATUS_COLORS_PEDIDO[s];
                  return (
                    <div key={s} onClick={() => { setTab("pedidos"); setFilterStatus(s); }} style={{ background: st.bg, borderRadius: 12, padding: "12px 16px", minWidth: 110, textAlign: "center", border: `1.5px solid ${st.dot}33`, cursor: "pointer", transition: "transform 0.15s" }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: st.text, fontFamily: "Georgia,serif" }}>{count}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: st.text, marginTop: 4, lineHeight: 1.4 }}>{s}</div>
                    </div>
                  );
                })}
                <div style={{ background: "#f3f4f6", borderRadius: 12, padding: "12px 16px", minWidth: 110, textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#9ca3af", fontFamily: "Georgia,serif" }}>{records.filter(r => !r.statusPedido).length}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginTop: 4 }}>Sem status</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: "#111827" }}>Área por Vendedor</h3>
                {byVendedor.map(([v, d]) => (
                  <div key={v} style={{ marginBottom: 13 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>{d.area.toFixed(2)} ha</span>
                    </div>
                    <div style={{ background: "#e5e7eb", borderRadius: 6, height: 7 }}>
                      <div style={{ background: "linear-gradient(90deg,#16a34a,#4ade80)", height: 7, borderRadius: 6, width: kpis.areaTotal > 0 ? `${(d.area / kpis.areaTotal) * 100}%` : "0%" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: "#111827" }}>Últimos Pedidos</h3>
                {records.slice(-6).reverse().map(r => (
                  <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f3f4f6", gap: 8 }}>
                    <div>
                      <span style={{ fontWeight: 800, color: "#16a34a", marginRight: 8 }}>#{r.pedido}</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{r.comprador || "—"}</span>
                    </div>
                    <StatusDot value={r.statusPedido} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PEDIDOS ── */}
        {tab === "pedidos" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="🔍  Buscar..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, width: 250, background: "#fff" }} />
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: 220, background: "#fff" }}>
                <option value="">Todos os Status</option>
                {STATUS_PEDIDO.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={filterVendedor} onChange={e => setFilterVendedor(e.target.value)} style={{ ...inputStyle, width: 170, background: "#fff" }}>
                <option value="">Todos Vendedores</option>
                {vendedores.map(v => <option key={v}>{v}</option>)}
              </select>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button onClick={exportCSV} style={btnSecondary}>⬇ CSV</button>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "7px 12px" }}>
              <div style={{ width: 28, height: 28, background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{user}</span>
            </div>
            <button onClick={() => { setEditing(null); setModalOpen(true); }} style={btnPrimary}>+ Novo Pedido</button>
            <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              Sair →
            </button>
          </div>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
                      {["Ped.","Status","RL","Comprador","Vendedor","Fazenda","T.Muda","Data Corte","Á.Prev","Á.Real","Á.Plant","OS","Contrato","Ações"].map(h => (
                        <th key={h} style={{ padding: "10px 11px", textAlign: "left", fontWeight: 700, color: "#6b7280", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && <tr><td colSpan={14} style={{ padding: 32, textAlign: "center", color: "#9ca3af" }}>Nenhum registro encontrado.</td></tr>}
                    {filtered.map((r, i) => {
                      const ct = contracts[r.id];
                      const ctS = ct ? CONTRACT_STATUS_LABELS[ct.status] : null;
                      return (
                        <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "10px 11px", fontWeight: 800, color: "#16a34a" }}>#{r.pedido}</td>
                          <td style={{ padding: "10px 11px" }}><StatusDot value={r.statusPedido} /></td>
                          <td style={{ padding: "10px 11px" }}><Pill value={r.rl} colors={RL_COLORS} /></td>
                          <td style={{ padding: "10px 11px", fontWeight: 600 }}>{r.comprador || "—"}</td>
                          <td style={{ padding: "10px 11px" }}>{r.vendedor || "—"}</td>
                          <td style={{ padding: "10px 11px" }}>{r.fazendaMuda || "—"}</td>
                          <td style={{ padding: "10px 11px", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.tMuda || "—"}</td>
                          <td style={{ padding: "10px 11px", whiteSpace: "nowrap" }}>{r.dataCorte || "—"}</td>
                          <td style={{ padding: "10px 11px", textAlign: "right" }}>{r.areaMudaPrevista || "—"}</td>
                          <td style={{ padding: "10px 11px", textAlign: "right", fontWeight: 600 }}>{r.areaMudaRealizada || "—"}</td>
                          <td style={{ padding: "10px 11px", textAlign: "right" }}>{r.areaPlantio || "—"}</td>
                          <td style={{ padding: "10px 11px" }}>{r.osCorte || "—"}</td>
                          <td style={{ padding: "10px 11px" }}>
                            {ctS ? <span style={{ background: ctS.bg, color: ctS.text, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{ctS.label}</span>
                              : <span style={{ color: "#d1d5db", fontSize: 11 }}>—</span>}
                          </td>
                          <td style={{ padding: "10px 11px" }}>
                            <div style={{ display: "flex", gap: 4 }}>
                              <button onClick={() => { setEditing(r); setModalOpen(true); }} style={{ background: "#eff6ff", color: "#2563eb", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>Editar</button>
                              <button onClick={() => { setContractRecord(r); setContractOpen(true); }} style={{ background: "#f5f3ff", color: "#7c3aed", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>📄 Contrato</button>
                              <button onClick={() => setDeleteConfirm(r.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 7, padding: "4px 8px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>✕</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "9px 14px", borderTop: "1px solid #e5e7eb", fontSize: 12, color: "#9ca3af", display: "flex", justifyContent: "space-between" }}>
                <span>{filtered.length} de {records.length} registros</span>
                <span>Área realizada: {filtered.reduce((s, r) => s + (parseFloat(r.areaMudaRealizada) || 0), 0).toFixed(2)} ha</span>
              </div>
            </div>
          </div>
        )}

        {/* ── RELATÓRIOS ── */}
        {tab === "relatorios" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: "#111827" }}>Resumo por Vendedor</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  {["Vendedor","Pedidos","Á.Prevista","Á.Realizada","% Execução"].map(h => <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#6b7280", fontSize: 11, textTransform: "uppercase" }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {(() => {
                    const map = {};
                    records.forEach(r => { if (!r.vendedor) return; if (!map[r.vendedor]) map[r.vendedor] = { n: 0, prev: 0, real: 0 }; map[r.vendedor].n++; map[r.vendedor].prev += parseFloat(r.areaMudaPrevista) || 0; map[r.vendedor].real += parseFloat(r.areaMudaRealizada) || 0; });
                    return Object.entries(map).map(([v, d]) => {
                      const pct = d.prev > 0 ? ((d.real / d.prev) * 100).toFixed(1) : null;
                      const color = !pct ? "#9ca3af" : parseFloat(pct) >= 90 ? "#065f46" : parseFloat(pct) >= 70 ? "#92400e" : "#991b1b";
                      const bg = !pct ? "#f3f4f6" : parseFloat(pct) >= 90 ? "#d1fae5" : parseFloat(pct) >= 70 ? "#fef3c7" : "#fee2e2";
                      return <tr key={v} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "9px 12px", fontWeight: 600 }}>{v}</td>
                        <td style={{ padding: "9px 12px" }}>{d.n}</td>
                        <td style={{ padding: "9px 12px" }}>{d.prev.toFixed(2)} ha</td>
                        <td style={{ padding: "9px 12px", fontWeight: 700, color: "#16a34a" }}>{d.real.toFixed(2)} ha</td>
                        <td style={{ padding: "9px 12px" }}>{pct ? <span style={{ background: bg, color, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{pct}%</span> : "—"}</td>
                      </tr>;
                    });
                  })()}
                </tbody>
              </table>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: "#111827" }}>Totais Gerais</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
                {[["Pedidos",records.length,"#374151"],["Á. Prevista",`${kpis.areaPrev.toFixed(2)} ha`,"#2563eb"],["Á. Realizada",`${kpis.areaTotal.toFixed(2)} ha`,"#16a34a"],["Á. Plantio",`${kpis.areaPlantio.toFixed(2)} ha`,"#7c3aed"],["RL Ok",records.filter(r=>r.rl==="Ok").length,"#d97706"],["Contratos",kpis.contratos,"#0891b2"]].map(([l,v,c]) => (
                  <div key={l} style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 18px", borderLeft: `4px solid ${c}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>{l}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: c, marginTop: 4, fontFamily: "Georgia,serif" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── VALIDAÇÃO ── */}
        {tab === "validacao" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 900, color: "#111827", fontFamily: "Georgia,serif" }}>Validação de Contratos</h2>
              <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>Contratos enviados para revisão, assinatura e aprovação.</p>
            </div>

            {validacaoContracts.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 16, padding: "56px 32px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>📄</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#374151" }}>Nenhum contrato em validação</h3>
                <p style={{ color: "#9ca3af", margin: "0 0 20px" }}>Vá em Pedidos → clique em "📄 Contrato" → edite e clique em "Enviar para Validação".</p>
                <button onClick={() => setTab("pedidos")} style={btnPrimary}>Ir para Pedidos</button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {/* Pipeline summary */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[["validacao","⏳ Em Validação","#ede9fe","#6d28d9"],["assinatura","✍️ Em Assinatura","#dbeafe","#1e3a8a"],["aprovado","✅ Aprovados","#d1fae5","#065f46"]].map(([s,l,bg,color]) => (
                    <div key={s} style={{ background: bg, borderRadius: 12, padding: "12px 20px", fontSize: 13, fontWeight: 700, color }}>
                      {l}: {validacaoContracts.filter(c => c.status === s).length}
                    </div>
                  ))}
                </div>

                {validacaoContracts.map(c => {
                  const st = CONTRACT_STATUS_LABELS[c.status];
                  const r = c.record;
                  return (
                    <div key={c.recordId} style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", overflow: "hidden", border: c.status === "validacao" ? "2px solid #c4b5fd" : c.status === "assinatura" ? "2px solid #93c5fd" : c.status === "aprovado" ? "2px solid #6ee7b7" : "1px solid #e5e7eb" }}>
                      <div style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          <div style={{ width: 50, height: 50, background: st.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                            {c.status === "validacao" ? "📋" : c.status === "aprovado" ? "✅" : "✍️"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 16, color: "#111827" }}>Pedido #{r.pedido} — {r.comprador}</div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>Vendedor: {r.vendedor} · {r.fazendaMuda} · {r.tMuda}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{new Date(c.updatedAt).toLocaleString("pt-BR")}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ background: st.bg, color: st.text, padding: "5px 13px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{st.label}</span>
                          <button onClick={() => { setContractRecord(r); setContractOpen(true); }} style={{ ...btnSecondary, fontSize: 12, padding: "7px 14px" }}>👁 Ver / Editar</button>
                          {c.status === "validacao" && (
                            <button onClick={() => handleContractStatus(c.recordId, "assinatura")} style={{ ...btnBlue, fontSize: 12, padding: "7px 14px" }}>✍️ Mover p/ Assinatura</button>
                          )}
                          {c.status === "assinatura" && (
                            <button onClick={() => handleContractStatus(c.recordId, "aprovado")} style={{ ...btnPrimary, fontSize: 12, padding: "7px 14px" }}>✅ Marcar Aprovado</button>
                          )}
                        </div>
                      </div>
                      {/* Prévia do contrato */}
                      <div style={{ padding: "0 22px 16px" }}>
                        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", maxHeight: 90, overflow: "hidden", position: "relative" }}>
                          <pre style={{ margin: 0, fontSize: 11, color: "#9ca3af", fontFamily: "'Courier New',monospace", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{c.content?.substring(0, 300)}...</pre>
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: "linear-gradient(transparent,#f9fafb)" }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 30, maxWidth: 360, width: "100%", margin: 16, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "#111827" }}>Confirmar Exclusão</h3>
            <p style={{ color: "#6b7280", margin: "0 0 22px", fontSize: 14 }}>Esta ação não pode ser desfeita.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={btnSecondary}>Cancelar</button>
              <button onClick={() => { setRecords(r => r.filter(x => x.id !== deleteConfirm)); setDeleteConfirm(null); }} style={{ ...btnPrimary, background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 12px rgba(220,38,38,0.3)" }}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      <PedidoModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} initial={editing} />
      <ContractModal
        open={contractOpen}
        onClose={() => { setContractOpen(false); setContractRecord(null); }}
        record={contractRecord}
        contracts={contracts}
        onSaveContract={handleSaveContract}
        onSendToValidation={handleSendToValidation}
      />
    </div>
  );
}
