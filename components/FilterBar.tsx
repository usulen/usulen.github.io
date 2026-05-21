'use client';

interface Props {
  makamlar: string[];
  usuller: string[];
  selectedMakam: string;
  selectedUsul: string;
  onMakamChange: (v: string) => void;
  onUsulChange: (v: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}

const inputStyle: React.CSSProperties = {
  background: '#FFFCF5',
  border: '1px solid #E0D0B0',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  color: '#1C0E0A',
  outline: 'none',
};

export default function FilterBar({
  makamlar, usuller,
  selectedMakam, selectedUsul,
  onMakamChange, onUsulChange,
  search, onSearchChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="search"
        placeholder="Eser, makam, bestekâr ara…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ ...inputStyle, minWidth: 200 }}
      />
      <select
        value={selectedMakam}
        onChange={(e) => onMakamChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">Tüm Makamlar</option>
        {makamlar.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select
        value={selectedUsul}
        onChange={(e) => onUsulChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">Tüm Usûller</option>
        {usuller.map((u) => <option key={u} value={u}>{u}</option>)}
      </select>
    </div>
  );
}
