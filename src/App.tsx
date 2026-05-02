import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChevronRight, 
  CheckCircle2,
  AlertCircle,
  Menu as MenuIcon,
  X,
  ChefHat
} from 'lucide-react';
import { MENU_ITEMS, TIME_SLOTS, MenuItem, Category, Booking } from './data';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Book', href: '#book' },
    { name: 'Story', href: '#story' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex flex-col">
          <span className="font-serif text-2xl tracking-widest text-ochre leading-none">OCHRE & ASH</span>
          <span className="text-[10px] tracking-[0.4em] text-bone/60 uppercase mt-1">Modern Indian</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-[0.3em] text-bone/80 hover:text-ochre transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#book" className="px-6 py-2 border border-ochre/50 text-ochre text-xs uppercase tracking-[0.2em] hover:bg-ochre hover:text-charcoal transition-all duration-300">
            Reservations
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ochre" onClick={() => setMobileMenuOpen(true)}>
          <MenuIcon size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-charcoal z-[60] flex flex-col items-center justify-center gap-12"
          >
            <button className="absolute top-8 right-8 text-ochre" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl text-bone hover:text-ochre transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-charcoal/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070" 
          alt="Hero background" 
          className="w-full h-[120%] object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-20 text-center px-6"
      >
        <span className="text-ochre uppercase tracking-[0.5em] text-xs mb-6 block">Est. 2024</span>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-bone mb-8 leading-tight">
          Modern Indian, <br /> 
          <span className="italic text-ochre">Rooted in Tradition.</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
          <a href="#book" className="group relative px-10 py-4 overflow-hidden border border-ochre">
            <span className="relative z-10 text-ochre group-hover:text-charcoal transition-colors duration-300 uppercase tracking-widest text-sm">Experience O&A</span>
            <div className="absolute inset-0 bg-ochre translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a href="#menu" className="text-xs uppercase tracking-[0.3em] text-bone/60 hover:text-bone transition-colors underline underline-offset-8">
            Explore the Menu
          </a>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 border border-bone/20 p-2 rounded-full"
      >
        <div className="w-1 h-8 bg-ochre/50 rounded-full" />
      </motion.div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Small Plates');
  
  const categories: Category[] = ['Small Plates', 'Mains', 'Desserts'];
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-32 bg-bone text-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="text-ochre uppercase tracking-widest text-xs mb-4 block">The Collections</span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none">The Chef's Table</h2>
          </div>
          <div className="flex flex-wrap gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-[0.2em] transition-all relative pb-2 ${
                  activeCategory === cat ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 right-0 h-0.5 bg-ochre" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-8">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-3xl">{item.title}</h3>
                  <span className="text-ochre font-serif text-xl">£{item.price}</span>
                </div>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-6 font-light">{item.description}</p>
                {item.allergens && (
                  <div className="flex gap-2">
                    {item.allergens.map(a => (
                      <span key={a} className="text-[10px] uppercase tracking-wider text-ochre/80 border border-ochre/20 px-2 py-1">
                        Contains {a}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const BookingEngine = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Booking>>({
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    occasion: 'None',
    allergies: []
  });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleToggleAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies?.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...(prev.allergies || []), allergy]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate "Generating Digital Invite" logic
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 3000);
  };

  const occasions = ['Birthday', 'Anniversary', 'Business', 'None'];
  const commonAllergies = ['Peanuts', 'Gluten', 'Dairy', 'Shellfish'];

  if (confirmed) {
    return (
      <div className="bg-charcoal p-12 border border-ochre/30 text-center max-w-2xl mx-auto">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-ochre rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={40} className="text-charcoal" />
        </motion.div>
        <h3 className="font-serif text-4xl mb-4">You're Invited.</h3>
        <p className="text-bone/60 mb-8 max-w-md mx-auto">
          We've prepared your digital invitation. A confirmation has been sent to {formData.email}.
        </p>
        <div className="bg-bone/5 border border-bone/10 p-8 text-left space-y-6">
          <div className="flex justify-between border-b border-bone/10 pb-4">
            <span className="text-[10px] uppercase tracking-widest text-bone/40">Reference</span>
            <span className="text-sm font-serif">OA-7721-X</span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bone/40 block mb-2">Guest</span>
              <span className="text-xl font-serif">Mr/Ms {formData.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bone/40 block mb-2">Party Size</span>
              <span className="text-xl font-serif">{formData.guests} Persons</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bone/40 block mb-2">Date</span>
              <span className="text-xl font-serif">{formData.date}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bone/40 block mb-2">Time</span>
              <span className="text-xl font-serif">{formData.time}</span>
            </div>
          </div>
          {formData.occasion === 'Anniversary' && (
            <div className="bg-ochre/10 border border-ochre/30 p-4 flex gap-4 items-center">
              <div className="w-2 h-2 bg-ochre rounded-full animate-pulse" />
              <p className="text-xs text-ochre italic">We'll prepare a special candle-lit table for your anniversary.</p>
            </div>
          )}
        </div>
        <button 
          onClick={() => { setConfirmed(false); setStep(1); }}
          className="mt-12 text-[10px] uppercase tracking-[0.4em] text-ochre hover:text-bone transition-colors"
        >
          New Reservation
        </button>
      </div>
    );
  }

  return (
    <section id="book" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-ochre uppercase tracking-widest text-xs mb-4 block">Reservations</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">Secure Your Place <br />at Our Hearth.</h2>
            <p className="text-bone/60 max-w-md leading-relaxed mb-12">
              Join us for an evening that transcends dining. For parties larger than 8, we recommend our Private Oak Suite experience.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-bone/10 flex items-center justify-center group-hover:border-ochre/50 transition-colors">
                  <MapPin size={18} className="text-ochre" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-bone/40 block">Location</span>
                  <span className="text-sm">42 Heritage Walk, Kensington, London</span>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-bone/10 flex items-center justify-center group-hover:border-ochre/50 transition-colors">
                  <Clock size={18} className="text-ochre" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-bone/40 block">Opening Hours</span>
                  <span className="text-sm">Tue – Sun: 17:00 – 23:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bone shadow-2xl p-8 md:p-12 text-charcoal">
            {loading ? (
              <div className="py-20 text-center space-y-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-16 h-16 border-2 border-ochre border-t-transparent rounded-full mx-auto"
                />
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl tracking-wide">Curating Your Experience</h4>
                  <p className="text-charcoal/40 text-[10px] uppercase tracking-[0.3em]">Generating your Digital Invite...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 block ml-1">Party Size</label>
                        <div className="relative">
                          <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                          <select 
                            value={formData.guests}
                            onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                            className="w-full bg-charcoal/5 border-b border-charcoal/10 p-4 pl-12 text-sm focus:outline-none focus:border-ochre appearance-none"
                          >
                            {[1,2,3,4,5,6,7,8,9,10,12].map(n => (
                              <option key={n} value={n}>{n} Guests</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 block ml-1">Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                          <input 
                            type="date" 
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full bg-charcoal/5 border-b border-charcoal/10 p-4 pl-12 text-sm focus:outline-none focus:border-ochre"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-charcoal/40 block ml-1">Available Slots</label>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {TIME_SLOTS.map(t => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setFormData({...formData, time: t})}
                            className={`py-3 text-[10px] transition-all border ${
                              formData.time === t 
                                ? 'bg-ochre border-ochre text-bone' 
                                : 'bg-transparent border-charcoal/10 text-charcoal hover:border-ochre/50'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.guests && formData.guests >= 8 && (
                      <div className="bg-charcoal/5 p-6 border-l-4 border-ochre flex gap-4">
                        <ChefHat size={20} className="text-ochre shrink-0" />
                        <div>
                          <h5 className="font-serif text-sm mb-1">Private Dining Room</h5>
                          <p className="text-[10px] text-charcoal/60 leading-relaxed uppercase tracking-wider">
                            For parties of 8+, we offer our Private Oak Suite at no additional cover.
                          </p>
                        </div>
                      </div>
                    )}

                    <button 
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-charcoal text-bone py-5 text-xs uppercase tracking-[0.4em] hover:bg-ochre transition-all duration-500"
                    >
                      Next Details
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 flex items-center justify-between">
                          FullName
                          <span className="text-[8px] opacity-40">Required</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          required
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-charcoal/5 border-b border-charcoal/10 p-4 text-sm focus:outline-none focus:border-ochre"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 block ml-1">Email</label>
                        <input 
                          type="email" 
                          placeholder="your@email.com"
                          required
                          value={formData.email || ''}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-charcoal/5 border-b border-charcoal/10 p-4 text-sm focus:outline-none focus:border-ochre"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-charcoal/40 block ml-1">Any Occasion?</label>
                      <div className="flex flex-wrap gap-3">
                        {occasions.map(o => (
                          <button
                            type="button"
                            key={o}
                            onClick={() => setFormData({...formData, occasion: o as any})}
                            className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all border rounded-full ${
                              formData.occasion === o 
                                ? 'bg-ochre border-ochre text-bone shadow-lg shadow-ochre/20' 
                                : 'bg-transparent border-charcoal/10 text-charcoal hover:border-ochre/30'
                            }`}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                      {formData.occasion === 'Anniversary' && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-ochre italic mt-2">
                          "We'll prepare a special table for you."
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-charcoal/40 block ml-1">Special Requirements</label>
                      <div className="grid grid-cols-2 gap-3">
                        {commonAllergies.map(a => (
                          <button
                            type="button"
                            key={a}
                            onClick={() => handleToggleAllergy(a)}
                            className={`p-3 text-[10px] uppercase tracking-widest text-left border flex items-center justify-between ${
                              formData.allergies?.includes(a) 
                                ? 'bg-charcoal/5 border-ochre text-charcoal' 
                                : 'bg-transparent border-charcoal/10 text-charcoal/40'
                            }`}
                          >
                            {a}
                            {formData.allergies?.includes(a) && <CheckCircle2 size={12} className="text-ochre" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={handlePrev}
                        className="w-1/3 border border-charcoal/20 text-charcoal py-5 text-xs uppercase tracking-[0.2em] hover:bg-charcoal hover:text-bone transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="w-2/3 bg-charcoal text-bone py-5 text-xs uppercase tracking-[0.4em] hover:bg-ochre transition-all shadow-xl"
                      >
                        Confirm Experience
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ochre/5 -z-0" />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal py-24 border-t border-bone/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <a href="#" className="flex flex-col mb-8">
              <span className="font-serif text-3xl tracking-widest text-ochre leading-none">OCHRE & ASH</span>
              <span className="text-[11px] tracking-[0.5em] text-bone/40 uppercase mt-2">Modern Indian Heritage</span>
            </a>
            <p className="text-bone/50 max-w-sm text-sm leading-relaxed mb-12">
              Deeply rooted in traditional Indian flavors, Ochre & Ash is a modern homage to heritage. Join us to experience the intersection of spice, smoke, and sophistication.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-bone/40 hover:text-ochre transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-bone/40 hover:text-ochre transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-bone/40 hover:text-ochre transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-8">Information</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Our Story</a></li>
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Privileged Access</a></li>
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Career</a></li>
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-8">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Cookie Settings</a></li>
              <li><a href="#" className="text-bone/60 hover:text-bone text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-bone/10 gap-8">
          <span className="text-[10px] tracking-[0.2em] text-bone/30">© 2024 Ochre & Ash. All Rights Reserved.</span>
          <span className="text-[10px] tracking-[0.4em] text-ochre uppercase">Handcrafted in Kensington</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <section id="story" className="py-32 flex items-center justify-center bg-charcoal">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-px h-24 bg-ochre/30 mx-auto"
            />
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              An alchemical blend of <br />
              <span className="italic text-ochre">ancient spices</span> and <br />
              modern curiosity.
            </h2>
            <p className="text-bone/60 text-lg leading-relaxed max-w-2xl mx-auto font-light">
              We travel the length of the silk road to bring you the rare, the forgotten, and the extraordinary. Each plate is a story, meticulously crafted to honor the hands that came before us.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="h-px w-32 bg-ochre/30 mx-auto"
            />
          </div>
        </section>
        <Menu />
        
        {/* Parallax Interstitial */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-charcoal/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1974" 
            alt="Interior" 
            className="w-full h-full object-cover parallax-bg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h3 className="font-serif text-5xl md:text-7xl text-bone italic tracking-tight">The Art of Stillness.</h3>
          </div>
        </div>
        
        <BookingEngine />
      </main>
      <Footer />
    </div>
  );
}
