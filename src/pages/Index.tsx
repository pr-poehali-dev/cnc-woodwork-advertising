import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/abd754a0-df0f-4474-9470-75cdc014dcc0/files/35749c5d-3d47-4a24-9e9e-cd2b1ec2b595.jpg",
  catalog: [
    {
      id: 1,
      src: "https://cdn.poehali.dev/projects/abd754a0-df0f-4474-9470-75cdc014dcc0/files/352da83d-a6a5-4609-bfe4-4ad155f769b9.jpg",
      title: "Обеденный стол из дуба",
      category: "Мебель",
      desc: "Массив дуба, ручная обработка, масло-воск",
    },
    {
      id: 2,
      src: "https://cdn.poehali.dev/projects/abd754a0-df0f-4474-9470-75cdc014dcc0/files/7fd065e3-95aa-4b78-8e7e-3231e2ffff97.jpg",
      title: "Стеллаж книжный",
      category: "Мебель",
      desc: "Берёза + металл, открытые полки",
    },
    {
      id: 3,
      src: "https://cdn.poehali.dev/projects/abd754a0-df0f-4474-9470-75cdc014dcc0/files/b85eb9f2-b097-4183-9bc0-8bb42d1ddbb0.jpg",
      title: "Разделочная доска из ореха",
      category: "Кухня",
      desc: "Американский орех, пищевое масло",
    },
    {
      id: 4,
      src: "https://cdn.poehali.dev/projects/abd754a0-df0f-4474-9470-75cdc014dcc0/files/da679bca-4d67-43f6-af9e-e900feed51b0.jpg",
      title: "Кресло из ясеня",
      category: "Мебель",
      desc: "Массив ясеня, льняная обивка",
    },
  ],
};

const SERVICES = [
  {
    icon: "Sofa",
    title: "Мебель на заказ",
    desc: "Столы, стулья, шкафы, кровати — любая мебель по вашим размерам и эскизам. От чертежа до готового изделия.",
    price: "от 15 000 ₽",
  },
  {
    icon: "Utensils",
    title: "Кухонные изделия",
    desc: "Разделочные доски, подносы, посуда из натурального дерева. Покрытие пищевым маслом, безопасно для еды.",
    price: "от 1 500 ₽",
  },
  {
    icon: "Gift",
    title: "Подарки с гравировкой",
    desc: "Именные изделия, корпоративные сувениры, свадебные подарки с лазерной гравировкой.",
    price: "от 2 000 ₽",
  },
  {
    icon: "Paintbrush",
    title: "Реставрация",
    desc: "Восстановление старой мебели, замена деталей, перекраска, обновление покрытия.",
    price: "от 3 000 ₽",
  },
];

type Section = "home" | "services" | "catalog" | "contacts";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("Все");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setZoomed(false);
    }
  }, [lightboxImg]);

  const closeLightbox = useCallback(() => {
    setLightboxImg(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  const navItems: { label: string; id: Section }[] = [
    { label: "Главная", id: "home" },
    { label: "Услуги", id: "services" },
    { label: "Каталог", id: "catalog" },
    { label: "Контакты", id: "contacts" },
  ];

  const categories = ["Все", ...Array.from(new Set(IMAGES.catalog.map((i) => i.category)))];
  const filteredItems =
    filterCat === "Все" ? IMAGES.catalog : IMAGES.catalog.filter((i) => i.category === filterCat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="font-display text-xl font-light tracking-widest text-foreground/90 hover:text-foreground transition-colors"
          >
            ДРЕВО
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`nav-link font-body text-sm tracking-wider uppercase transition-colors ${
                  activeSection === item.id
                    ? "text-foreground active"
                    : "text-foreground/60 hover:text-foreground/90"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-foreground/70"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-4 font-body text-sm tracking-wider uppercase border-b border-border/50 transition-colors ${
                  activeSection === item.id ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =================== HOME =================== */}
      {activeSection === "home" && (
        <main>
          {/* Hero */}
          <section className="relative h-screen overflow-hidden">
            <img
              src={IMAGES.hero}
              alt="Мастерская"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-wood-950/60 via-wood-950/30 to-wood-950/70" />

            <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16 max-w-6xl mx-auto">
              <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
                <p className="font-body text-wood-200/70 text-xs tracking-[0.3em] uppercase mb-4">
                  Авторская мастерская
                </p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-wood-50 leading-none mb-6">
                  Дерево,
                  <br />
                  <em className="italic">ожившее</em>
                  <br />в руках
                </h1>
                <p className="font-body text-wood-200/80 text-base md:text-lg max-w-md mb-10 leading-relaxed font-light">
                  Создаём мебель и изделия из массива дерева. Каждый предмет — единственный в своём роде.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="px-8 py-3 bg-wood-100 text-wood-900 font-body text-sm tracking-widest uppercase hover:bg-white transition-colors duration-200"
                  >
                    Смотреть работы
                  </button>
                  <button
                    onClick={() => setActiveSection("contacts")}
                    className="px-8 py-3 border border-wood-200/60 text-wood-100 font-body text-sm tracking-widest uppercase hover:border-wood-100 hover:text-white transition-colors duration-200"
                  >
                    Связаться
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 md:gap-20">
              {[
                { num: "12+", label: "лет опыта" },
                { num: "300+", label: "выполненных заказов" },
                { num: "100%", label: "натуральное дерево" },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="font-display text-5xl md:text-6xl font-light text-wood-700 mb-2">
                    {stat.num}
                  </div>
                  <div className="font-body text-sm text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Preview catalog */}
          <section className="py-8 pb-24 px-6 md:px-16 max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-body text-xs text-muted-foreground tracking-[0.25em] uppercase mb-2">Наши работы</p>
                <h2 className="font-display text-4xl md:text-5xl font-light">Избранное</h2>
              </div>
              <button
                onClick={() => setActiveSection("catalog")}
                className="hidden md:flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                Весь каталог
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {IMAGES.catalog.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: i === 0 ? "1/1.4" : "1/1" }}
                  onClick={() => setLightboxImg({ src: item.src, title: item.title })}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-wood-950/0 group-hover:bg-wood-950/40 transition-all duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <p className="font-body text-xs text-wood-200/70 tracking-wider uppercase mb-1">{item.category}</p>
                    <p className="font-display text-wood-50 text-lg font-light">{item.title}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-wood-50/90 flex items-center justify-center">
                      <Icon name="ZoomIn" size={14} className="text-wood-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* =================== SERVICES =================== */}
      {activeSection === "services" && (
        <main className="pt-28 pb-24 px-6 md:px-16 max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-body text-xs text-muted-foreground tracking-[0.25em] uppercase mb-3">Чем мы занимаемся</p>
            <h1 className="font-display text-5xl md:text-6xl font-light mb-6">Услуги</h1>
            <div className="w-12 h-px bg-wood-400" />
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="bg-background p-10 md:p-12 group hover:bg-wood-50 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-wood-300 transition-colors">
                    <Icon name={service.icon} size={18} className="text-wood-600" fallback="Package" />
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{service.price}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">{service.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                <button
                  onClick={() => setActiveSection("contacts")}
                  className="mt-8 flex items-center gap-2 font-body text-xs tracking-wider uppercase text-wood-600 hover:text-wood-800 transition-colors group/btn"
                >
                  Заказать
                  <Icon name="ArrowRight" size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="mt-20">
            <h2 className="font-display text-3xl md:text-4xl font-light mb-12">Как мы работаем</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", label: "Обсуждение", desc: "Рассказываете о задаче, мы предлагаем решения" },
                { step: "02", label: "Эскиз", desc: "Делаем чертёж и согласуем с вами" },
                { step: "03", label: "Изготовление", desc: "Работаем с деревом в мастерской" },
                { step: "04", label: "Доставка", desc: "Доставляем и устанавливаем на месте" },
              ].map((step, i) => (
                <div key={i}>
                  <div className="font-display text-5xl font-light text-wood-200 mb-4">{step.step}</div>
                  <div className="w-8 h-px bg-wood-300 mb-4" />
                  <h4 className="font-body text-sm font-medium tracking-wider uppercase mb-2">{step.label}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =================== CATALOG =================== */}
      {activeSection === "catalog" && (
        <main className="pt-28 pb-24 px-6 md:px-16 max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-body text-xs text-muted-foreground tracking-[0.25em] uppercase mb-3">Портфолио</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h1 className="font-display text-5xl md:text-6xl font-light">Каталог работ</h1>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-4 py-2 font-body text-xs tracking-wider uppercase transition-colors ${
                      filterCat === cat
                        ? "bg-wood-800 text-wood-50"
                        : "border border-border text-muted-foreground hover:border-wood-400 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-12 h-px bg-wood-400 mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, i) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setLightboxImg({ src: item.src, title: item.title })}
              >
                <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 pb-2 flex items-start justify-between">
                  <div>
                    <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-1">{item.category}</p>
                    <h3 className="font-display text-xl font-light">{item.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                  <div className="mt-1 w-8 h-8 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <Icon name="ZoomIn" size={14} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-body text-sm text-muted-foreground mb-6">
              Не нашли нужное? Изготовим по вашему заказу
            </p>
            <button
              onClick={() => setActiveSection("contacts")}
              className="px-10 py-3 bg-wood-800 text-wood-50 font-body text-sm tracking-widest uppercase hover:bg-wood-700 transition-colors"
            >
              Обсудить проект
            </button>
          </div>
        </main>
      )}

      {/* =================== CONTACTS =================== */}
      {activeSection === "contacts" && (
        <main className="pt-28 pb-24 px-6 md:px-16 max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-body text-xs text-muted-foreground tracking-[0.25em] uppercase mb-3">Свяжитесь с нами</p>
            <h1 className="font-display text-5xl md:text-6xl font-light mb-6">Контакты</h1>
            <div className="w-12 h-px bg-wood-400" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-light mb-8">Оставить заявку</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full bg-transparent border-b border-border pb-3 font-body text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-wood-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                    Телефон или Email
                  </label>
                  <input
                    type="text"
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-transparent border-b border-border pb-3 font-body text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-wood-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                    Расскажите о задаче
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Что именно хотите сделать, размеры, пожелания..."
                    className="w-full bg-transparent border-b border-border pb-3 font-body text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-wood-500 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-wood-800 text-wood-50 font-body text-sm tracking-widest uppercase hover:bg-wood-700 transition-colors"
                >
                  Отправить заявку
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 className="font-display text-2xl font-light mb-8">Наши координаты</h2>
              <div className="space-y-8">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "hello@example.ru" },
                  { icon: "MapPin", label: "Адрес мастерской", value: "Москва, ул. Лесная, 42" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00" },
                ].map((contact, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={contact.icon} size={16} className="text-wood-600" fallback="Info" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-1">{contact.label}</p>
                      <p className="font-body text-base text-foreground">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-border">
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-4">Мы в соцсетях</p>
                <div className="flex gap-4">
                  {["Instagram", "Youtube", "MessageCircle"].map((net, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 border border-border flex items-center justify-center hover:border-wood-400 hover:bg-wood-50 transition-colors"
                    >
                      <Icon name={net} size={16} className="text-muted-foreground" fallback="Link" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-wood-950/95 flex items-center justify-center p-4"
          onClick={() => !zoomed && closeLightbox()}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-wood-200 hover:text-wood-50 border border-wood-700 hover:border-wood-400 transition-colors z-10"
            onClick={closeLightbox}
          >
            <Icon name="X" size={18} />
          </button>

          <div
            className={`relative transition-all duration-400 ${
              zoomed ? "w-full h-full" : "max-w-4xl max-h-[85vh] w-full"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(!zoomed);
            }}
          >
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className={`mx-auto transition-all duration-400 ${
                zoomed
                  ? "w-full h-screen object-contain cursor-zoom-out"
                  : "max-h-[75vh] object-contain w-full cursor-zoom-in"
              }`}
            />
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p className="font-display text-wood-200/80 text-lg font-light">{lightboxImg.title}</p>
            <p className="font-body text-wood-400/60 text-xs tracking-wider uppercase mt-1">
              {zoomed ? "Нажмите для уменьшения" : "Нажмите для увеличения"}
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg font-light tracking-widest">ДРЕВО</p>
          <p className="font-body text-xs text-muted-foreground">
            © 2024 Авторская мастерская. Все права защищены.
          </p>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="font-body text-xs text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;