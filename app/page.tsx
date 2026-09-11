'use client';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Heart,
  ScanLine,
  Menu,
  X,
  Check,
  Smile,
  Gem,
  HeartHandshake,
  MapPin,
  Clock,
  Star,
  MoveHorizontal,
  Quote,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { clinic } from '@/lib/clinic';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
const nav = [
  ['Tratamentos', '#tratamentos'],
  ['A clínica', '#clinica'],
  ['Sorrisos', '#sorrisos'],
  ['Nossa equipe', '#equipe'],
];
const treatments = [
  {
    name: 'Lentes de contato dental',
    icon: Gem,
    description:
      'Harmonia nos pequenos detalhes. Um novo olhar para a forma e a proporção do seu sorriso.',
    detail:
      'O planejamento estético começa pela escuta e por uma avaliação individual. A indicação de lentes considera a saúde bucal, a estrutura dos dentes e as suas expectativas. Na consulta, você conhece as possibilidades, etapas e cuidados.',
  },
  {
    name: 'Implantes dentários',
    icon: ShieldCheck,
    description:
      'Volte a sorrir com confiança. Cuidado para recuperar função, conforto e bem-estar.',
    detail:
      'A reabilitação com implantes é planejada a partir de uma avaliação clínica e dos exames necessários. Nossa proposta é explicar cada etapa, discutir as alternativas e construir com você um plano de cuidado individual.',
  },
  {
    name: 'Alinhadores invisíveis',
    icon: Smile,
    description:
      'Mais liberdade para a sua rotina. Alinhamento com discrição e acompanhamento próximo.',
    detail:
      'Os alinhadores são uma possibilidade de tratamento ortodôntico. A indicação, o tempo e a rotina de uso são definidos pelo profissional após a avaliação. Agende uma conversa para entender se essa opção faz sentido para você.',
  },
  {
    name: 'Clareamento dental',
    icon: Sparkles,
    description:
      'Ilumine o seu sorriso com um cuidado que respeita a sua naturalidade.',
    detail:
      'A avaliação permite conhecer a saúde dos dentes e conversar sobre suas expectativas. O profissional orienta a técnica, a duração e os cuidados adequados ao seu caso, com acompanhamento durante o processo.',
  },
  {
    name: 'Odontologia preventiva',
    icon: HeartHandshake,
    description:
      'O melhor cuidado começa antes. Saúde bucal presente em todas as fases da vida.',
    detail:
      'Consultas periódicas, avaliação da saúde bucal e orientação de higiene fazem parte do cuidado preventivo. A frequência dos retornos e os procedimentos são definidos de acordo com as necessidades de cada pessoa.',
  },
  {
    name: 'Estética do sorriso',
    icon: ScanLine,
    description:
      'Um planejamento que une saúde, equilíbrio e a beleza de ser você.',
    detail:
      'A estética do sorriso reúne diferentes possibilidades de cuidado. Tudo começa com uma conversa sobre o que você deseja, uma avaliação e um planejamento que considera a sua saúde e as suas características.',
  },
];
const reviews = [
  {
    name: 'Mariana A.',
    initials: 'MA',
    text: 'Eu tinha receio de ir ao dentista. Ser ouvida com calma e entender cada etapa fez toda a diferença. Saí me sentindo realmente cuidada.',
    care: 'Acolhimento e cuidado',
  },
  {
    name: 'Rafael M.',
    initials: 'RM',
    text: 'O que mais gostei foi a atenção aos detalhes. A conversa foi clara, sem pressa, e o planejamento respeitou exatamente o que eu buscava.',
    care: 'Planejamento individual',
  },
  {
    name: 'Beatriz L.',
    initials: 'BL',
    text: 'Um ambiente tranquilo e uma equipe que transmite confiança. É muito bom encontrar um atendimento que olha para a gente de verdade.',
    care: 'Uma experiência tranquila',
  },
  {
    name: 'Lucas P.',
    initials: 'LP',
    text: 'Pude tirar todas as minhas dúvidas e participar das decisões. Esse cuidado tornou a experiência muito mais leve.',
    care: 'Clareza em cada etapa',
  },
];
const faq = [
  [
    'Como funciona a primeira avaliação?',
    'É um momento para conhecer você, ouvir suas expectativas e avaliar sua saúde bucal. A partir dessa conversa, o profissional apresenta as possibilidades de cuidado e orienta os próximos passos.',
  ],
  [
    'Como posso agendar uma consulta?',
    'O agendamento é feito pelo WhatsApp da clínica. Você pode informar o tratamento de interesse e sua preferência de horário. A consulta só é confirmada após o retorno da equipe. Nesta versão demonstrativa, o contato ainda será configurado.',
  ],
  [
    'Tenho medo de dentista. Como é o atendimento?',
    'Você pode compartilhar esse receio logo na primeira conversa. Nossa proposta de atendimento prioriza escuta, explicações claras e respeito ao seu ritmo. Converse com o profissional sobre o que pode deixar sua experiência mais confortável.',
  ],
  [
    'Qual é o valor do tratamento?',
    'O orçamento depende da avaliação e do planejamento individual. A equipe apresenta as etapas, os valores e as condições disponíveis antes de você decidir iniciar o tratamento.',
  ],
  [
    'Vocês atendem convênios?',
    'As informações sobre convênios e formas de pagamento devem ser confirmadas diretamente com a equipe no agendamento.',
  ],
  [
    'Todo mundo pode fazer um tratamento estético?',
    'A indicação depende de uma avaliação profissional. Saúde bucal, características individuais e expectativas são consideradas antes de apresentar qualquer possibilidade de tratamento.',
  ],
];
export default function Home() {
  const [menu, setMenu] = useState(false),
    [appointment, setAppointment] = useState(false),
    [selected, setSelected] = useState<number | null>(null),
    [comparison, setComparison] = useState(50),
    [review, setReview] = useState(0);
  const [interest, setInterest] = useState('Avaliação inicial');
  const [scrolled, setScrolled] = useState(false),
    [activeSection, setActiveSection] = useState('');
  const reviewTouch = useRef<{ x: number; y: number } | null>(null);
  const comparisonTouch = useRef<{
    id: number;
    x: number;
    y: number;
    dragging: boolean;
  } | null>(null);
  const setFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setComparison(
      Math.round(
        Math.max(
          0,
          Math.min(100, ((event.clientX - rect.left) / rect.width) * 100),
        ),
      ),
    );
  };
  const openAppointment = (name = 'Avaliação inicial') => {
    setSelected(null);
    setInterest(name);
    setAppointment(true);
    setMenu(false);
  };
  const message = `Olá! Conheci a Sorria pelo site e gostaria de agendar uma avaliação. Tenho interesse em: ${interest}.`;
  const whatsapp = clinic.whatsapp
    ? `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`
    : null;
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 100) setActiveSection('');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const wide = window.matchMedia('(min-width: 1025px)');
    const onResize = () => {
      if (wide.matches) setMenu(false);
    };
    wide.addEventListener('change', onResize);
    if (!('IntersectionObserver' in window))
      return () => {
        window.removeEventListener('scroll', onScroll);
        wide.removeEventListener('change', onResize);
      };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' },
    );
    items.forEach((el) => {
      if (
        !reduced.matches &&
        el.getBoundingClientRect().top > window.innerHeight
      )
        el.classList.add('reveal-pending');
      revealObserver.observe(el);
    });
    const onMotion = () => {
      if (reduced.matches)
        items.forEach((el) => el.classList.remove('reveal-pending'));
    };
    reduced.addEventListener('change', onMotion);
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection('#' + entry.target.id);
        }),
      { rootMargin: '-15% 0px -60% 0px' },
    );
    document
      .querySelectorAll('main section[id]')
      .forEach((el) => sectionObserver.observe(el));
    return () => {
      window.removeEventListener('scroll', onScroll);
      wide.removeEventListener('change', onResize);
      reduced.removeEventListener('change', onMotion);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      items.forEach((el) => el.classList.remove('reveal-pending'));
    };
  }, []);
  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className={scrolled ? 'header is-scrolled' : 'header'}>
        <div className="container nav-wrap">
          <a href="#" className="brand" aria-label="Sorria, início">
            <Sparkles className="brand-mark" />
            <span>
              sorria<span className="brand-dot">.</span>
              <small>ODONTOLOGIA COM PROPÓSITO</small>
            </span>
          </a>
          <nav className="nav" aria-label="Navegação principal">
            {nav.map(([label, link]) => (
              <a
                key={link}
                href={link}
                aria-current={activeSection === link ? 'location' : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <button className="button nav-cta" onClick={() => openAppointment()}>
            Agende sua avaliação <ArrowUpRight size={17} />
          </button>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger className="menu-toggle" aria-label="Abrir menu">
              <Menu size={23} />
            </SheetTrigger>
            <SheetContent className="mobile-menu" showCloseButton={false}>
              <SheetClose className="dialog-x" aria-label="Fechar menu">
                <X size={22} />
              </SheetClose>
              <SheetTitle className="mobile-menu-brand">
                sorria<span>.</span>
              </SheetTitle>
              <SheetDescription>
                Um cuidado que começa por você.
              </SheetDescription>
              <nav aria-label="Navegação mobile">
                {[...nav, ['Localização', '#localizacao']].map(
                  ([label, link], i) => (
                    <a key={link} href={link} onClick={() => setMenu(false)}>
                      <span>0{i + 1}</span>
                      {label}
                      <ArrowUpRight size={20} />
                    </a>
                  ),
                )}
              </nav>
              <div className="mobile-menu-bottom">
                <button className="button" onClick={() => openAppointment()}>
                  <MessageCircle size={18} /> Agende sua avaliação{' '}
                  <ArrowUpRight size={18} />
                </button>
                <p>
                  Saúde para o seu sorriso.
                  <br />
                  Leveza para a sua vida.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main id="conteudo">
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-dot" /> CUIDADO QUE TRANSFORMA
            </span>
            <h1>
              <span className="headline-line">
                <span>Seu sorriso.</span>
              </span>
              <span className="headline-line">
                <span>Sua essência.</span>
              </span>
              <span className="headline-line">
                <em>Nossa paixão.</em>
              </span>
            </h1>
            <p>
              Odontologia de excelência com um olhar humano.
              <br className="desktop-break" /> Para você sorrir com liberdade,
              confiança
              <br className="desktop-break" /> e ser, cada vez mais, você.
            </p>
            <div className="hero-actions">
              <button className="button" onClick={() => openAppointment()}>
                <MessageCircle size={18} /> Quero cuidar do meu sorriso{' '}
                <ArrowUpRight size={18} />
              </button>
              <a className="text-link" href="#tratamentos">
                Conheça os tratamentos <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <ShieldCheck size={17} /> Cuidado individualizado
              </span>
              <span>
                <Heart size={17} /> Você em primeiro lugar
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-frame">
              <img
                className="hero-photo"
                src="/hero.webp"
                alt="Mulher sorrindo com naturalidade em um ambiente acolhedor"
                width="1400"
                height="933"
                fetchPriority="high"
              />
            </div>
            <span className="image-caption">MAIS DO QUE DENTES. PESSOAS.</span>
            <div className="hero-badge">
              <span className="badge-icon">
                <Sparkles size={25} />
              </span>
              <div>
                <strong>Naturalmente, seu.</strong>
                <p>Um sorriso que combina com você.</p>
              </div>
              <span className="badge-check">
                <Check size={17} />
              </span>
            </div>
            <div className="vertical-note">SAÚDE · ESTÉTICA · BEM-ESTAR</div>
          </div>
        </section>
        <div className="promise-strip">
          <div className="container">
            <span>
              <ScanLine /> Tecnologia e precisão
            </span>
            <i />
            <span>
              <Heart /> Atendimento acolhedor
            </span>
            <i />
            <span>
              <Sparkles /> Beleza com naturalidade
            </span>
            <i />
            <span>
              <ShieldCheck /> Segurança em cada detalhe
            </span>
          </div>
        </div>
        <section className="section container reveal" id="tratamentos">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SEU MELHOR SORRISO COMEÇA AQUI</span>
              <h2>
                Cuidado completo.
                <br />
                <em>Em cada detalhe.</em>
              </h2>
            </div>
            <p>
              Da prevenção à transformação, um plano
              <br /> pensado para o que faz sentido para você.
            </p>
          </div>
          <div className="treatment-preview">
            {treatments.map((t, i) => (
              <button
                onClick={() => setSelected(i)}
                className="treatment-card"
                key={t.name}
              >
                <span className="card-top">
                  <t.icon />
                  <span>0{i + 1}</span>
                </span>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
                <span className="card-bottom">
                  Conheça o tratamento <ArrowUpRight size={19} />
                </span>
              </button>
            ))}
          </div>
          <p className="section-footnote">
            Cada sorriso é único. A indicação de qualquer tratamento depende de
            avaliação profissional.
          </p>
        </section>
        <section className="clinic-section" id="clinica">
          <div className="container clinic-grid reveal">
            <div className="clinic-image">
              <img
                src="/clinic.webp"
                alt="Ambiente odontológico claro com equipamentos modernos — fotografia ilustrativa"
                width="1100"
                height="735"
                loading="lazy"
              />
              <div className="clinic-image-label">
                <HeartHandshake />
                <span>
                  Um espaço pensado
                  <br />
                  <strong>para cuidar de você.</strong>
                </span>
              </div>
            </div>
            <div className="clinic-copy">
              <span className="eyebrow">BEM-VINDO À SORRIA</span>
              <h2>
                Excelência no cuidado.
                <br />
                <em>Leveza na experiência.</em>
              </h2>
              <p>
                Acreditamos que cuidar de um sorriso começa por conhecer a
                pessoa por trás dele. Por isso, cada conversa, cada escolha e
                cada detalhe têm você no centro.
              </p>
              <div className="difference-list">
                {[
                  {
                    icon: ScanLine,
                    title: 'Tecnologia com propósito',
                    text: 'Precisão no planejamento, clareza em cada etapa.',
                  },
                  {
                    icon: Heart,
                    title: 'Tempo para ouvir você',
                    text: 'Um atendimento próximo, com respeito ao seu ritmo.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Cuidado que inspira confiança',
                    text: 'Transparência e atenção do início ao acompanhamento.',
                  },
                ].map((d) => (
                  <div key={d.title}>
                    <span>
                      <d.icon size={22} />
                    </span>
                    <div>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="text-link light-link"
                onClick={() => openAppointment()}
              >
                Venha conhecer nossa forma de cuidar <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </section>
        <section
          className="section container results-grid reveal"
          id="sorrisos"
        >
          <div>
            <span className="eyebrow">O SORRISO CONTA A HISTÓRIA</span>
            <h2>
              Pequenos detalhes.
              <br />
              <em>Novas possibilidades.</em>
            </h2>
            <p>
              Mais do que uma mudança estética, o desejo de se sentir bem ao
              sorrir. Conheça uma representação visual de antes e depois.
            </p>
            <div className="result-chips">
              <span>Antes e depois</span>
              <span>Simulação ilustrativa</span>
            </div>
            <button
              className="text-link"
              onClick={() => openAppointment('Estética do sorriso')}
            >
              Descubra as possibilidades para você <ArrowUpRight size={18} />
            </button>
          </div>
          <figure className="comparison-wrap">
            <div
              className="comparison-image"
              onPointerDown={(event) => {
                if (event.button !== 0 || !event.isPrimary) return;
                const dragging = event.pointerType === 'mouse';
                comparisonTouch.current = {
                  id: event.pointerId,
                  x: event.clientX,
                  y: event.clientY,
                  dragging,
                };
                if (dragging) {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setFromPointer(event);
                }
              }}
              onPointerMove={(event) => {
                const gesture = comparisonTouch.current;
                if (!gesture || gesture.id !== event.pointerId) return;
                const dx = Math.abs(event.clientX - gesture.x);
                const dy = Math.abs(event.clientY - gesture.y);
                if (!gesture.dragging && dx > 8 && dx > dy) {
                  gesture.dragging = true;
                  event.currentTarget.setPointerCapture(event.pointerId);
                }
                if (gesture.dragging) setFromPointer(event);
              }}
              onPointerUp={(event) => {
                const gesture = comparisonTouch.current;
                if (!gesture || gesture.id !== event.pointerId) return;
                if (
                  gesture.dragging ||
                  (Math.abs(event.clientX - gesture.x) <= 8 &&
                    Math.abs(event.clientY - gesture.y) <= 8)
                )
                  setFromPointer(event);
                comparisonTouch.current = null;
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={() => {
                comparisonTouch.current = null;
              }}
              onLostPointerCapture={() => {
                comparisonTouch.current = null;
              }}
              role="img"
              aria-label={`Comparação ilustrativa: ${comparison}% da imagem antes visível`}
            >
              <div className="compare-after" />
              <div
                className="compare-before"
                style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
              />
              <span className="compare-label before">ANTES</span>
              <span className="compare-label after">DEPOIS</span>
              <div
                className="comparison-divider"
                style={{ left: `${comparison}%` }}
              >
                <span>
                  <MoveHorizontal size={21} />
                </span>
              </div>
            </div>
            <div className="compare-control">
              <span id="compare-label">Arraste para comparar</span>
              <Slider
                aria-labelledby="compare-label"
                min={0}
                max={100}
                value={[comparison]}
                onValueChange={(v) =>
                  setComparison(Array.isArray(v) ? v[0] : v)
                }
              />
            </div>
            <figcaption>
              Simulação gerada por IA. Não representa um caso clínico ou uma
              promessa de resultado. Resultados variam de pessoa para pessoa.
            </figcaption>
          </figure>
        </section>
        <section className="reviews-section">
          <div className="container reveal">
            <div className="section-heading">
              <div>
                <span className="eyebrow">CONFIANÇA QUE SE CONSTRÓI</span>
                <h2>
                  Quem sorri, <em>conta.</em>
                </h2>
              </div>
              <div className="review-controls">
                <span
                  className="review-count"
                  aria-label={`Depoimento ${review + 1} de ${reviews.length}`}
                >
                  0{review + 1}
                  <i>/ 0{reviews.length}</i>
                </span>
                <button
                  onClick={() =>
                    setReview((review + reviews.length - 1) % reviews.length)
                  }
                  aria-label="Avaliações anteriores"
                >
                  <ArrowLeft size={19} />
                </button>
                <button
                  onClick={() => setReview((review + 1) % reviews.length)}
                  aria-label="Próximas avaliações"
                >
                  <ArrowRight size={19} />
                </button>
              </div>
            </div>
            <p className="demo-label">
              Depoimentos fictícios para demonstração do projeto.
            </p>
            <div
              className="reviews-grid"
              aria-live="polite"
              onTouchStart={(event) => {
                reviewTouch.current =
                  event.touches.length === 1
                    ? {
                        x: event.touches[0].clientX,
                        y: event.touches[0].clientY,
                      }
                    : null;
              }}
              onTouchEnd={(event) => {
                if (reviewTouch.current === null) return;
                const delta =
                  event.changedTouches[0].clientX - reviewTouch.current.x;
                const vertical =
                  event.changedTouches[0].clientY - reviewTouch.current.y;
                if (
                  Math.abs(delta) > 50 &&
                  Math.abs(delta) > Math.abs(vertical)
                )
                  setReview(
                    (current) =>
                      (current + (delta < 0 ? 1 : reviews.length - 1)) %
                      reviews.length,
                  );
                reviewTouch.current = null;
              }}
              onTouchCancel={() => {
                reviewTouch.current = null;
              }}
            >
              {[0, 1, 2].map((offset) => {
                const r = reviews[(review + offset) % reviews.length];
                return (
                  <article className="review-card" key={`${review}-${r.name}`}>
                    <div
                      className="review-stars"
                      aria-label="Avaliação ilustrativa de 5 estrelas"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} size={15} fill="currentColor" />
                      ))}
                      <Quote size={26} />
                    </div>
                    <blockquote>“{r.text}”</blockquote>
                    <div className="review-person">
                      <span>{r.initials}</span>
                      <div>
                        <strong>{r.name}</strong>
                        <small>{r.care}</small>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section container team-layout reveal" id="equipe">
          <div className="team-copy">
            <span className="eyebrow">PESSOAS CUIDANDO DE PESSOAS</span>
            <h2>
              Mãos que cuidam.
              <br />
              <em>Olhares que acolhem.</em>
            </h2>
            <p>
              Uma equipe conectada pelo mesmo propósito: unir conhecimento,
              sensibilidade e atenção para cuidar do seu sorriso.
            </p>
            <p className="demo-label">
              Apresentação ilustrativa. Nomes, especialidades e registros
              profissionais serão incluídos com os dados reais da clínica.
            </p>
            <button className="text-link" onClick={() => openAppointment()}>
              Conheça a Sorria de perto <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="team-cards">
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/dentist-female.webp"
                  width="900"
                  height="1350"
                  alt="Profissional de odontologia — foto de banco de imagens, sem vínculo com a clínica"
                  loading="lazy"
                />
                <span>FOTOGRAFIA ILUSTRATIVA</span>
              </div>
              <h3>Cuidado e estética</h3>
              <p>Um olhar atento para cada detalhe.</p>
            </article>
            <article className="team-card">
              <div className="team-photo">
                <img
                  src="/dentist-male.webp"
                  width="900"
                  height="1143"
                  alt="Profissional sorrindo — foto de banco de imagens, sem vínculo com a clínica"
                  loading="lazy"
                />
                <span>FOTOGRAFIA ILUSTRATIVA</span>
              </div>
              <h3>Saúde e harmonia</h3>
              <p>Planejamento com você no centro.</p>
            </article>
          </div>
        </section>
        <section className="faq-section">
          <div className="container faq-grid reveal">
            <div>
              <span className="eyebrow">PODE PERGUNTAR</span>
              <h2>
                Mais clareza.
                <br />
                <em>Mais tranquilidade.</em>
              </h2>
              <p>
                Reunimos algumas dúvidas para você
                <br /> chegar à sua consulta com mais confiança.
              </p>
              <button className="text-link" onClick={() => openAppointment()}>
                Ainda tem uma dúvida? Fale com a gente{' '}
                <ArrowUpRight size={17} />
              </button>
            </div>
            <Accordion className="faq-list">
              {faq.map(([q, a], i) => (
                <AccordionItem key={q} value={i}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section
          className="section container location-grid reveal"
          id="localizacao"
        >
          <div className="location-copy">
            <span className="eyebrow">SEU PRÓXIMO SORRISO TEM UM LUGAR</span>
            <h2>
              Vai ser um prazer
              <br />
              <em>receber você.</em>
            </h2>
            <div className="location-detail">
              <MapPin />
              <div>
                <h3>Onde estamos</h3>
                <p>{clinic.address || 'Endereço da clínica a confirmar.'}</p>
                <small>
                  {clinic.address
                    ? 'Planeje sua visita com a nossa equipe.'
                    : 'Localização ilustrativa no mapa ao lado.'}
                </small>
              </div>
            </div>
            <div className="location-detail">
              <Clock />
              <div>
                <h3>Um tempo reservado para você</h3>
                <p>{clinic.hours || 'Atendimento com agendamento.'}</p>
                <small>Consulte os horários disponíveis com a equipe.</small>
              </div>
            </div>
            <button className="text-link" onClick={() => openAppointment()}>
              Planeje sua primeira visita <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="map-wrap">
            <iframe
              title="Mapa de localização — ilustrativo enquanto o endereço não for configurado"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(clinic.address || 'São Paulo, SP')}&z=${clinic.address ? 15 : 12}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className="map-label">
              <MapPin size={16} />
              {clinic.address
                ? 'Encontre a Sorria'
                : 'Mapa ilustrativo · São Paulo'}
            </span>
          </div>
        </section>
        <section className="cta-section">
          <div className="container cta-inner">
            <span className="eyebrow">O PRIMEIRO PASSO É UMA CONVERSA</span>
            <h2>
              O seu próximo sorriso
              <br />
              começa <em>com você.</em>
            </h2>
            <p>Conte o que você deseja. Nós cuidamos dos próximos passos.</p>
            <button
              className="button button-pale"
              onClick={() => openAppointment()}
            >
              <MessageCircle size={20} /> Agendar minha avaliação{' '}
              <ArrowUpRight size={20} />
            </button>
            <span className="cta-note">
              <Heart size={14} /> Sem pressa. Sem julgamentos. Com cuidado.
            </span>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a href="#" className="brand">
              <Sparkles className="brand-mark" />
              <span>
                sorria<span className="brand-dot">.</span>
                <small>ODONTOLOGIA COM PROPÓSITO</small>
              </span>
            </a>
            <p>
              Saúde para o seu sorriso.
              <br />
              Leveza para a sua vida.
            </p>
            <nav aria-label="Navegação do rodapé">
              <a href="#tratamentos">Tratamentos</a>
              <a href="#equipe">Nossa equipe</a>
              <a href="#localizacao">Localização</a>
            </nav>
            <button className="text-link" onClick={() => openAppointment()}>
              Vamos conversar <ArrowUpRight size={19} />
            </button>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Sorria. Projeto conceitual.
            </span>
            <span>Feito para sorrir, em cada detalhe.</span>
          </div>
          <p className="demo-footer">
            Site demonstrativo: marca, depoimentos e apresentação da equipe são
            ilustrativos. Fotos de banco de imagens e IA; não representam
            pacientes ou profissionais vinculados à clínica. Contatos e dados
            profissionais aguardam configuração.
          </p>
        </div>
      </footer>
      <button
        className="floating-whatsapp"
        onClick={() => openAppointment()}
        aria-label="Agendar avaliação pelo WhatsApp"
      >
        <MessageCircle size={26} />
        <span>Vamos conversar?</span>
      </button>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="appointment-dialog" showCloseButton={false}>
          <DialogClose className="dialog-x" aria-label="Fechar detalhes">
            <X size={20} />
          </DialogClose>
          <span className="eyebrow">UM CUIDADO DO SEU JEITO</span>
          <DialogTitle>
            {selected !== null ? treatments[selected].name : ''}
          </DialogTitle>
          <DialogDescription>
            {selected !== null ? treatments[selected].detail : ''}
          </DialogDescription>
          <button
            className="button"
            onClick={() =>
              openAppointment(
                selected !== null ? treatments[selected].name : undefined,
              )
            }
          >
            <MessageCircle size={18} /> Conversar sobre este tratamento
          </button>
        </DialogContent>
      </Dialog>
      <Dialog open={appointment} onOpenChange={setAppointment}>
        <DialogContent className="appointment-dialog" showCloseButton={false}>
          <DialogClose className="dialog-x" aria-label="Fechar agendamento">
            <X size={20} />
          </DialogClose>
          <span className="eyebrow">VAMOS CONVERSAR</span>
          <DialogTitle>
            Seu sorriso merece
            <br />
            esse primeiro passo.
          </DialogTitle>
          <DialogDescription>
            {whatsapp
              ? 'Continue pelo WhatsApp para consultar os horários e agendar sua avaliação.'
              : 'Este site é demonstrativo. O WhatsApp da clínica ainda não foi informado; o agendamento ficará disponível assim que o contato for configurado.'}
          </DialogDescription>
          <div className="interest-note">
            <MessageCircle size={20} />
            <div>
              <small>QUERO SABER MAIS SOBRE</small>
              <strong>{interest}</strong>
            </div>
          </div>
          {whatsapp ? (
            <a
              className="button"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continuar no WhatsApp <ArrowUpRight size={18} />
            </a>
          ) : (
            <div className="contact-pending">
              <Clock size={18} /> Contato em breve
            </div>
          )}
          <p className="dialog-footnote">
            O agendamento é confirmado diretamente pela equipe.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
