'use client';

import { UsulPattern as UsulPatternType, NoteValue } from '@/lib/types';

// ── Layout sabitleri ─────────────────────────────────────────────────────
const STEM_LEN  = 34;              // stem uzunluğu (px)
const STAFF_Y   = 50;              // portede çizginin y koordinatı
const NRX       = 7.5;             // nota başı yatay yarıçap
const NRY       = 5.5;             // nota başı dikey yarıçap
const LEFT_PAD  = 62;              // zaman işareti için sol boşluk
const RIGHT_PAD = 24;              // sağ kenar boşluğu
const LABEL_Y   = STAFF_Y + STEM_LEN + NRY + 15; // vuruş etiketi y
const SVG_H     = LABEL_Y + 14;   // toplam SVG yüksekliği

// ── Nota değeri → sekizlik birim sayısı ──────────────────────────────────
const NOTE_UNITS: Record<string, number> = {
  'whole':          8,
  'half':           4,
  'dotted-quarter': 3,
  'quarter':        2,
  'dotted-eighth':  1.5,
  'eighth':         1,
  'sixteenth':      0.5,
  'rest-quarter':   2,
  'rest-eighth':    1,
  'rest-sixteenth': 0.5,
};

// Zaman işaretinden ölçüdeki toplam sekizlik birim sayısını hesapla
function measureUnits(ts: string): number {
  const [n, d] = ts.split('/').map(Number);
  return n * (8 / d);
}

// Açık nota başı mı? (yarım nota, tam nota)
function isOpenHead(nv: NoteValue): boolean {
  return nv === 'half' || nv === 'whole';
}

// Kaç bayrak var? (sekizlik=1, onaltılık=2)
function flagCount(nv: NoteValue): number {
  if (nv === 'eighth' || nv === 'dotted-eighth') return 1;
  if (nv === 'sixteenth') return 2;
  return 0;
}

// Kök yukarı mı? Düm → yukarı, diğerleri → aşağı
function stemUp(stroke: string): boolean {
  return stroke === 'Düm';
}

interface Props {
  pattern: UsulPatternType;
}

export default function UsulStaff({ pattern }: Props) {
  const totalUnits = measureUnits(pattern.timeSignature);

  // Birim genişliğini ölçü uzunluğuna göre otomatik ayarla
  const unitW = Math.min(78, Math.max(36, (680 - LEFT_PAD - RIGHT_PAD) / totalUnits));
  const svgW  = LEFT_PAD + totalUnits * unitW + RIGHT_PAD;

  // Vuruşları zaman pozisyonlarına yerleştir
  type Beat = { stroke: string; nv: NoteValue; cx: number; units: number; up: boolean };
  const beats: Beat[] = [];
  let pos = 0;
  for (const b of pattern.beats) {
    const nv = (b.noteValue ?? 'quarter') as NoteValue;
    const units = NOTE_UNITS[nv] ?? 1;
    beats.push({ stroke: b.stroke, nv, cx: LEFT_PAD + pos * unitW, units, up: stemUp(b.stroke) });
    pos += units;
  }

  const [numStr, denStr] = pattern.timeSignature.split('/');

  return (
    <div className="overflow-x-auto">
      <svg
        width={svgW}
        height={SVG_H}
        viewBox={`0 0 ${svgW} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', minWidth: svgW }}
      >
        {/* Zaman işareti */}
        <text
          x={LEFT_PAD / 2} y={STAFF_Y - 3}
          textAnchor="middle" fontSize={18} fontWeight="bold"
          fontFamily="Georgia, serif" fill="black"
        >
          {numStr}
        </text>
        <text
          x={LEFT_PAD / 2} y={STAFF_Y + 15}
          textAnchor="middle" fontSize={18} fontWeight="bold"
          fontFamily="Georgia, serif" fill="black"
        >
          {denStr}
        </text>

        {/* Porte çizgisi */}
        <line
          x1={LEFT_PAD} y1={STAFF_Y}
          x2={svgW - RIGHT_PAD} y2={STAFF_Y}
          stroke="black" strokeWidth={1.5}
        />

        {/* Sol çizgi */}
        <line
          x1={LEFT_PAD} y1={STAFF_Y - 10}
          x2={LEFT_PAD} y2={STAFF_Y + 10}
          stroke="black" strokeWidth={1.5}
        />

        {/* Sağ çizgi */}
        <line
          x1={svgW - RIGHT_PAD} y1={STAFF_Y - 10}
          x2={svgW - RIGHT_PAD} y2={STAFF_Y + 10}
          stroke="black" strokeWidth={2}
        />

        {/* Notalar */}
        {beats.map((b, i) => {
          const { cx, nv, up, stroke } = b;
          const open  = isOpenHead(nv);
          const flags = flagCount(nv);

          // Kök x pozisyonu: yukarı kök → nota başının sağında, aşağı kök → solunda
          const stemX = up ? cx + NRX * 0.75 : cx - NRX * 0.75;
          // Kök uç noktaları
          const stemTopY    = STAFF_Y - NRY * 0.5 - STEM_LEN;
          const stemBotY    = STAFF_Y + NRY * 0.5 + STEM_LEN;

          // Bayrak yolları (Bezier eğrisi)
          const flagPath = (offset: number) => {
            if (up) {
              // Yukarı kökte bayrak: kök tepesinden sağa ve aşağıya
              const fy = stemTopY + offset;
              return `M ${stemX},${fy} C ${stemX + 14},${fy + 10} ${stemX + 16},${fy + 22} ${stemX + 5},${fy + 30}`;
            } else {
              // Aşağı kökte bayrak: kök dibinden sağa ve yukarıya
              const fy = stemBotY - offset;
              return `M ${stemX},${fy} C ${stemX + 14},${fy - 10} ${stemX + 16},${fy - 22} ${stemX + 5},${fy - 30}`;
            }
          };

          const labelText = stroke === '-' ? '' : stroke.toUpperCase();

          return (
            <g key={i}>
              {/* Nota başı */}
              {nv !== 'whole' ? (
                <ellipse
                  cx={cx} cy={STAFF_Y}
                  rx={NRX} ry={NRY}
                  fill={open ? 'white' : 'black'}
                  stroke="black"
                  strokeWidth={open ? 1.8 : 0}
                  transform={`rotate(-12 ${cx} ${STAFF_Y})`}
                />
              ) : (
                /* Tam nota: oval halka */
                <g>
                  <ellipse cx={cx} cy={STAFF_Y} rx={NRX + 1} ry={NRY} fill="white" stroke="black" strokeWidth={1.8} transform={`rotate(-12 ${cx} ${STAFF_Y})`} />
                </g>
              )}

              {/* Nokta (noktalı notalar için) */}
              {(nv === 'dotted-quarter' || nv === 'dotted-eighth') && (
                <circle cx={cx + NRX + 5} cy={STAFF_Y - 2} r={2.5} fill="black" />
              )}

              {/* Kök (tam nota hariç) */}
              {nv !== 'whole' && (
                <line
                  x1={stemX} y1={up ? STAFF_Y - NRY * 0.5 : STAFF_Y + NRY * 0.5}
                  x2={stemX} y2={up ? stemTopY : stemBotY}
                  stroke="black" strokeWidth={1.5}
                />
              )}

              {/* Bayraklar */}
              {flags >= 1 && (
                <path d={flagPath(0)} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />
              )}
              {flags >= 2 && (
                <path d={flagPath(8)} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />
              )}

              {/* Vuruş etiketi */}
              {labelText && (
                <text
                  x={cx} y={LABEL_Y}
                  textAnchor="middle"
                  fontSize={11.5}
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                  fill="black"
                  letterSpacing="0.03em"
                >
                  {labelText}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
