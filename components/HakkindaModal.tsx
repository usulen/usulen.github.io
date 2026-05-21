'use client';

import { useState } from 'react';

const logoLink: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  opacity: 0.85,
  transition: 'opacity 0.15s',
};

function IconYok() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/yok-academic-logo.png" alt="YÖK Akademik" height={22} style={{ height: 22, width: 'auto' }} />
  );
}

function IconScholar() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/google-scholar.svg" alt="Google Scholar" height={22} style={{ height: 22, width: 'auto' }} />
  );
}

function IconAcademia() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/academia-logo-2021.svg" alt="Academia" height={22} style={{ height: 22, width: 'auto' }} />
  );
}

export default function HakkindaModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium"
        style={{ color: '#C9963A' }}
      >
        Hakkında
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28,10,10,0.55)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full rounded-2xl p-6 md:p-8 overflow-y-auto"
            style={{
              maxWidth: 620,
              maxHeight: '90vh',
              background: '#F5EDD8',
              border: '1px solid #D4C4A0',
              boxShadow: '0 8px 48px rgba(28,10,10,0.18)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapat */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-5 text-lg leading-none"
              style={{ color: '#9A7B5A' }}
            >
              ✕
            </button>

            {/* Başlık */}
            <h2 className="font-playfair text-2xl font-bold mb-1" style={{ color: '#1C0E0A' }}>
              Hakkında
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #C9963A88, transparent)' }} />
              <span style={{ color: '#C9963A' }}>❖</span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #C9963A88, transparent)' }} />
            </div>

            <div className="space-y-5">

              {/* 1 — Sitenin amacı */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A7B5A' }}>
                  Sitenin Amacı
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1C0E0A' }}>
                  Bu site, Türk müziği repertuvar ve nazariyat dersleri kapsamındaki eserlerin usûl ve solfej öğretimine yönelik bir eğitim kaynağıdır. Nota, usûl portesi ve ses örneklerini tek ekranda bir araya getiren site, sınıf içi kullanım için optimize edilmiştir.
                </p>
              </section>

              <div className="h-px" style={{ background: '#D4C4A0' }} />

              {/* 2 — Nasıl kullanılır */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A7B5A' }}>
                  Nasıl Kullanılır
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1C0E0A' }}>
                  Ana sayfada eserler makam ve usûle göre filtrelenebilir. Bir esere tıklandığında nota görüntüsü, usûl portesi, ses çalar ve karar sesi butonu tek ekranda sunulur. Usûl portesi, seçilen eserin ritmik yapısını darb adlarıyla birlikte gösterir. Dinle bölümünde eserin kaydı ve makamın karar perdesinin frekansı çalar.
                </p>
              </section>

              <div className="h-px" style={{ background: '#D4C4A0' }} />

              {/* 3 — İçerik */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9A7B5A' }}>
                  İçerik
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1C0E0A' }}>
                  Site; 60 eser, 17 usûl deseni ve her esere ait nota görüntüsü içermektedir. Eserler Rast, Uşşak, Bayati, Hüseynî, Muhayyer, Hicaz, Uzzâl, Zirgüleli Hicaz, Humâyûn, Buselik, Kürdî ve Nevâ makamlarından seçilmiş olup Nim Sofyan&apos;dan Lenk Fahte&apos;ye kadar olan usûlleri kapsamaktadır.
                </p>
              </section>

              <div className="h-px" style={{ background: '#D4C4A0' }} />

              {/* 4 — Hazırlayanlar */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: '#9A7B5A' }}>
                  Hazırlayanlar
                </h3>
                <div className="space-y-4">

                  {/* Bedirhan Büyükduman */}
                  <div>
                    <p className="text-sm font-semibold mb-1.5" style={{ color: '#1C0E0A' }}>
                      Dr. Öğr. Üyesi Bedirhan BÜYÜKDUMAN
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <a href="https://akademik.yok.gov.tr/AkademikArama/AkademisyenGorevOgrenimBilgileri?islem=direct&sira=_D2bDdARDMCOgjHVGzFVZw&authorId=2D4680874E990B87"
                         target="_blank" rel="noopener noreferrer" style={logoLink}>
                        <IconYok />
                      </a>
                      <a href="https://scholar.google.com/citations?user=X3okHHwAAAAJ&hl=tr"
                         target="_blank" rel="noopener noreferrer" style={logoLink}>
                        <IconScholar />
                      </a>
                      <a href="https://iszu.academia.edu/BedirhanBuyukduman"
                         target="_blank" rel="noopener noreferrer" style={logoLink}>
                        <IconAcademia />
                      </a>
                    </div>
                  </div>

                  {/* Bekir Şahin Baloğlu */}
                  <div>
                    <p className="text-sm font-semibold mb-1.5" style={{ color: '#1C0E0A' }}>
                      Doç. Dr. Bekir Şahin BALOĞLU
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <a href="https://akademik.yok.gov.tr/AkademikArama/AkademisyenGorevOgrenimBilgileri?islem=direct&sira=_D2bDdARDMCOgjHVGzFVZw&authorId=60A927F336BB2F5F"
                         target="_blank" rel="noopener noreferrer" style={logoLink}>
                        <IconYok />
                      </a>
                      <a href="https://scholar.google.com/citations?user=q5QLnE4AAAAJ&hl=tr&oi=ao"
                         target="_blank" rel="noopener noreferrer" style={logoLink}>
                        <IconScholar />
                      </a>
                      <a href="https://yildiz.academia.edu/BekirŞahinBaloğlu"
                         target="_blank" rel="noopener noreferrer" style={logoLink}>
                        <IconAcademia />
                      </a>
                    </div>
                  </div>

                  {/* Diğerleri */}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1C0E0A' }}>Paşa GÜVEN</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1C0E0A' }}>Yusuf İzeddin MESÇİ</p>
                  </div>

                </div>
              </section>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
