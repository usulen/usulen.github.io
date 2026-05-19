'use client';

import { UsulPattern as UsulPatternType } from '@/lib/types';

// ── Layout sabitleri ─────────────────────────────────────────────────────
const STEM_LEN  = 34;
const STAFF_Y   = 50;
const NRX       = 7.5;
const NRY       = 5.5;
const LEFT_PAD  = 52;
const RIGHT_PAD = 24;
const BEAT_W    = 72;
const LABEL_Y   = STAFF_Y + STEM_LEN + NRY + 14;
const SVG_H     = LABEL_Y + 14;

// ── Nota değeri hesaplama ────────────────────────────────────────────────
// duration: kaç denominator birimi
// denominator: zaman işaretinin paydası (4, 8 vb.)
// quarterUnits: dörtlük nota cinsinden süre
//   = duration × 4 / denominator
//
// Örnek: 4/4'te duration=2  → 2×4/4 = 2 → yarım nota
//        4/8'te duration=2  → 2×4/8 = 1 → dörtlük nota  ← otomatik uyum

type VisualNote =
  | 'whole' | 'half' | 'dotted-quarter' | 'quarter'
  | 'dotted-eighth' | 'eighth' | 'sixteenth';

function noteFromDuration(duration: number, denominator: number): VisualNote {
  const q = duration * 4 / denominator; // dörtlük birim cinsinden
  if (q >= 4)    return 'whole';
  if (q >= 2)    return 'half';
  if (q >= 1.5)  return 'dotted-quarter';
  if (q >= 1)    return 'quarter';
  if (q >= 0.75) return 'dotted-eighth';
  if (q >= 0.5)  return 'eighth';
  return 'sixteenth';
}

function isOpenHead(n: VisualNote)  { return n === 'whole' || n === 'half'; }
function flagCount(n: VisualNote)   { return n === 'eighth' || n === 'dotted-eighth' ? 1 : n === 'sixteenth' ? 2 : 0; }
function isDotted(n: VisualNote)    { return n === 'dotted-quarter' || n === 'dotted-eighth'; }
function stemUp(stroke: string)     { return stroke === 'Düm'; }

interface Props {
  pattern: UsulPatternType;
  timeSignature?: string; // override (ör. '4/8' farklı eser için)
}

export default function UsulStaff({ pattern, timeSignature }: Props) {
  const ts  = timeSignature ?? pattern.timeSignature;
  const den = parseInt(ts.split('/')[1], 10);
  const [numStr, denStr] = ts.split('/');

  const beatCount = pattern.beats.length;
  const svgW = LEFT_PAD + beatCount * BEAT_W + RIGHT_PAD;

  return (
    <div className="overflow-x-auto">
      <svg
        width={svgW} height={SVG_H}
        viewBox={`0 0 ${svgW} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Zaman işareti */}
        <text x={LEFT_PAD / 2} y={STAFF_Y - 3}  textAnchor="middle" fontSize={18} fontWeight="bold" fontFamily="Georgia,serif" fill="black">{numStr}</text>
        <text x={LEFT_PAD / 2} y={STAFF_Y + 15} textAnchor="middle" fontSize={18} fontWeight="bold" fontFamily="Georgia,serif" fill="black">{denStr}</text>

        {/* Porte çizgisi */}
        <line x1={LEFT_PAD} y1={STAFF_Y} x2={svgW - RIGHT_PAD} y2={STAFF_Y} stroke="black" strokeWidth={1.5} />
        <line x1={LEFT_PAD}             y1={STAFF_Y - 10} x2={LEFT_PAD}             y2={STAFF_Y + 10} stroke="black" strokeWidth={1.5} />
        <line x1={svgW - RIGHT_PAD}     y1={STAFF_Y - 10} x2={svgW - RIGHT_PAD}     y2={STAFF_Y + 10} stroke="black" strokeWidth={2} />

        {/* Notalar */}
        {pattern.beats.map((b, i) => {
          const nv   = noteFromDuration(b.duration, den);
          const cx   = LEFT_PAD + i * BEAT_W + BEAT_W / 2;
          const up   = stemUp(b.stroke);
          const open = isOpenHead(nv);
          const fc   = flagCount(nv);
          const dot  = isDotted(nv);

          const stemX    = up ? cx + NRX * 0.75 : cx - NRX * 0.75;
          const stemTopY = STAFF_Y - NRY * 0.5 - STEM_LEN;
          const stemBotY = STAFF_Y + NRY * 0.5 + STEM_LEN;

          const flagPath = (offset: number) => up
            ? `M ${stemX},${stemTopY + offset} C ${stemX+14},${stemTopY+offset+10} ${stemX+16},${stemTopY+offset+22} ${stemX+5},${stemTopY+offset+30}`
            : `M ${stemX},${stemBotY - offset} C ${stemX+14},${stemBotY-offset-10} ${stemX+16},${stemBotY-offset-22} ${stemX+5},${stemBotY-offset-30}`;

          const label = b.stroke === '-' ? '' : b.stroke.toUpperCase();

          return (
            <g key={i}>
              {/* Susma işareti */}
              {b.rest ? (
                <text x={cx} y={STAFF_Y + 4} textAnchor="middle" fontSize={16} fontFamily="serif" fill="black">𝄾</text>
              ) : (
                <>
                  {/* Nota başı */}
                  <ellipse
                    cx={cx} cy={STAFF_Y} rx={NRX} ry={NRY}
                    fill={open ? 'white' : 'black'}
                    stroke="black" strokeWidth={open ? 1.8 : 0}
                    transform={`rotate(-12 ${cx} ${STAFF_Y})`}
                  />
                  {/* Nokta */}
                  {dot && <circle cx={cx + NRX + 5} cy={STAFF_Y - 2} r={2.5} fill="black" />}
                  {/* Kök */}
                  {nv !== 'whole' && (
                    <line
                      x1={stemX} y1={up ? STAFF_Y - NRY * 0.5 : STAFF_Y + NRY * 0.5}
                      x2={stemX} y2={up ? stemTopY : stemBotY}
                      stroke="black" strokeWidth={1.5}
                    />
                  )}
                  {/* Bayraklar */}
                  {fc >= 1 && <path d={flagPath(0)} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />}
                  {fc >= 2 && <path d={flagPath(8)} fill="none" stroke="black" strokeWidth={2} strokeLinecap="round" />}
                </>
              )}

              {/* Vuruş etiketi */}
              {label && (
                <text x={cx} y={LABEL_Y} textAnchor="middle" fontSize={11.5} fontWeight="700" fontFamily="system-ui,sans-serif" fill="black" letterSpacing="0.03em">
                  {label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
