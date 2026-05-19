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

export default function FilterBar({
  makamlar,
  usuller,
  selectedMakam,
  selectedUsul,
  onMakamChange,
  onUsulChange,
  search,
  onSearchChange,
}: Props) {
  const selectClass =
    'rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200';

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="search"
        placeholder="Eser ara..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`${selectClass} min-w-[180px]`}
      />
      <select
        value={selectedMakam}
        onChange={(e) => onMakamChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Tüm Makamlar</option>
        {makamlar.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select
        value={selectedUsul}
        onChange={(e) => onUsulChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Tüm Usûller</option>
        {usuller.map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>
    </div>
  );
}
