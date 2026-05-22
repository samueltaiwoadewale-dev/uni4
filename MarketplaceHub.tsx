import React, { useState } from "react";
import { 
  ShoppingBag, 
  Briefcase, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  DollarSign, 
  Tag, 
  Zap, 
  Plus,
  ArrowRight,
  TrendingUp,
  Star,
  MessageSquare,
  ExternalLink,
  Info,
  Layers,
  Award
} from "lucide-react";

// --- TYPES ---

interface MarketplaceItem {
  id: string;
  type: "item" | "gig";
  category: string;
  title: string;
  seller: {
    name: string;
    handle: string;
    avatar?: string;
    verified: boolean;
    rating: number;
    completedOrders: number;
  };
  price: number;
  location: string;
  description: string;
  features?: string[];
  status: "available" | "busy" | "sold";
  deliveryTime?: string; // e.g. "2 hours", "1 day"
  isPromoted?: boolean;
  mediaUrl?: string;
}

// --- SEED DATA (NO PLACEHOLDERS) ---

const CAMPUS_ITEMS: MarketplaceItem[] = [];

const CAMPUS_GIGS: MarketplaceItem[] = [];

// --- COMPONENT ---

interface MarketplaceHubProps {
  triggerHapticFeedback: (freq: number, type?: any, duration?: number) => void;
  marketplaceItems?: MarketplaceItem[];
  setMarketplaceItems?: React.Dispatch<React.SetStateAction<MarketplaceItem[]>>;
  userProfile?: any;
  onPurchaseComplete?: (item: MarketplaceItem) => void;
}

export default function MarketplaceHub({ 
  triggerHapticFeedback, 
  marketplaceItems, 
  setMarketplaceItems,
  userProfile,
  onPurchaseComplete
}: MarketplaceHubProps) {
  const [activeTab, setActiveTab] = useState<"items" | "gigs">("items");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [checkoutItem, setCheckoutItem] = useState<MarketplaceItem | null>(null);

  // Fallback to initial seeds if none provided by parent state
  const parentItems = marketplaceItems || [...CAMPUS_ITEMS, ...CAMPUS_GIGS];

  const filteredItems = parentItems.filter(item => item.type === activeTab);

  const categories = ["All", ...new Set(filteredItems.map(i => i.category))];

  const filteredData = filteredItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const PLATFORM_FEE_PERCENT = 5; // UniVerse transaction fee

  const formatNaira = (amount: number) => {
    return "₦" + amount.toLocaleString();
  };

  const handleCheckout = (item: MarketplaceItem) => {
    triggerHapticFeedback(700, "sine", 0.1);
    setCheckoutItem(item);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-br from-[#1E1B4B] to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Sessional Commerce Engine
              </span>
            </div>
            <h2 className="text-2xl font-black text-white font-display tracking-tight uppercase italic">
              Campus {activeTab === "items" ? "Marketplace" : "Gigs Hub"}
            </h2>
            <p className="text-xs text-zinc-450 max-w-xl leading-relaxed">
              Securely buy essentials or hire talented peers. UniVerse Escrow protects every transaction between Nigerian campers and verified student vendors.
            </p>
          </div>

            <div className="flex bg-black/40 rounded-xl p-1 border border-white/10 gap-1 select-none">
              <button 
                onClick={() => { triggerHapticFeedback(440); setActiveTab("items"); setSelectedCategory("All"); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${activeTab === 'items' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-white'}`}
              >
                <Tag className="w-4 h-4" />
                Market
              </button>
              <button 
                onClick={() => { triggerHapticFeedback(440); setActiveTab("gigs"); setSelectedCategory("All"); }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${activeTab === 'gigs' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-500 hover:text-white'}`}
              >
                <Briefcase className="w-4 h-4" />
                Gigs & GIS
              </button>
            </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
          <input 
            type="text" 
            placeholder={`Search ${activeTab === 'items' ? 'products, textbooks, gadgets...' : 'tutors, photographers, cleaners...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F172A] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder-zinc-600 shadow-inner"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => { triggerHapticFeedback(300); setSelectedCategory(cat); }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS / GIGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredData.map((item) => (
          <div 
            key={item.id}
            className={`bg-[#111827] border rounded-2xl overflow-hidden transition-all group relative ${item.isPromoted ? 'border-emerald-500/30 ring-1 ring-emerald-500/5' : 'border-white/5 hover:border-white/20'}`}
          >
            {item.isPromoted && (
              <div className="absolute top-3 left-3 z-10 bg-emerald-500 text-black text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest font-mono flex items-center gap-1 shadow-2xl">
                <Zap className="w-2.5 h-2.5" /> PROMOTED
              </div>
            )}
            
            <div className="h-44 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center relative overflow-hidden">
              {item.status === "sold" && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center text-rose-400 font-black text-xs tracking-widest z-10 uppercase font-mono">
                  🔒 Sold Out
                </div>
              )}
              {item.mediaUrl ? (
                <img 
                  src={item.mediaUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                  {item.type === 'item' ? (
                    <ShoppingBag className={`w-16 h-16 ${item.isPromoted ? 'text-emerald-400' : 'text-zinc-700'} transition-transform group-hover:scale-110 duration-500`} />
                  ) : (
                    <Briefcase className={`w-16 h-16 ${item.isPromoted ? 'text-indigo-400' : 'text-zinc-700'} transition-transform group-hover:scale-110 duration-500`} />
                  )}
                </>
              )}
              
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-mono text-emerald-400 font-bold border border-white/5 z-10">
                {item.category}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors uppercase font-display leading-tight line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-mono font-black text-lg text-white">{formatNaira(item.price)}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 h-8">
                {item.description}
              </p>

              {item.features && (
                <div className="flex flex-wrap gap-1.5 min-h-[16px]">
                  {item.features.map(f => (
                    <span key={f} className="text-[9px] font-mono text-zinc-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase font-bold">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/10 text-[10px] font-bold text-emerald-400 overflow-hidden relative">
                    {item.seller.avatar ? <img src={item.seller.avatar} alt="Seller" /> : item.seller.name[0]}
                    {item.seller.verified && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#070B16] flex items-center justify-center">
                        <CheckCircle className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="leading-none">
                    <span className="text-[10px] font-bold text-white block">@{item.seller.handle}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-[9px] text-zinc-500 font-mono">{item.seller.rating} • {item.seller.completedOrders} orders</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleCheckout(item)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1 ${activeTab === 'items' ? 'bg-emerald-500 text-black border-transparent shadow shadow-emerald-500/20 hover:scale-105' : 'bg-indigo-500 text-white border-transparent shadow shadow-indigo-500/20 hover:scale-105'}`}
                >
                  {activeTab === 'items' ? 'Buy Now' : 'Hire'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
            <Search className="w-8 h-8 text-zinc-700" />
          </div>
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest font-mono">No campus results found.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="text-xs text-emerald-400 font-black uppercase underline cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* CHECKOUT / TRANSACTION MODAL */}
      {checkoutItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-scaleIn">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white uppercase font-display leading-none tracking-tight">Order Request</h3>
                  <p className="text-[11px] text-zinc-500 font-mono tracking-wider uppercase font-bold">Ref: #UNIV-{checkoutItem.id.toUpperCase()}</p>
                </div>
                <button onClick={() => setCheckoutItem(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer text-zinc-500 hover:text-white">
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Service/Item Cost:</span>
                  <span className="text-white font-mono font-bold tracking-tight">{formatNaira(checkoutItem.price)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-wider">Direct P2P Order</h4>
                    <p className="text-[10px] text-emerald-400/70 leading-relaxed italic">
                      To place an order, you must chat with the seller directly. Please note: Sellers must have recharged at least twice on the app to access their messages.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <button 
                      onClick={() => {
                        triggerHapticFeedback(800, "triangle", 0.15);
                        alert(`Redirecting to chat with @${checkoutItem.seller.handle}...`);
                        setCheckoutItem(null);
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase py-3.5 rounded-2xl transition-all cursor-pointer shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95"
                    >
                      Chat Seller (@{checkoutItem.seller.handle})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER INFO - MONETIZATION REALITY */}
      <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest">Sessional Growth Metrics</span>
          </div>
          <h4 className="text-sm font-black text-white uppercase tracking-tight">Transparent Sessional Economy</h4>
          <p className="text-[11px] text-zinc-500 max-w-xl leading-relaxed">
            Revenue from the **5% Sessional Fee** and **Business Promos** directly funds our low-latency server nodes and free AI Academic tools. Every transaction strengthens the Nigerian campus software ecosystem.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-center p-3 bg-white/5 border border-white/5 rounded-2xl min-w-[100px]">
             <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none mb-1 font-bold">Peer Trust</span>
             <span className="text-lg font-black text-white font-mono tracking-tight leading-none italic">98.4%</span>
          </div>
          <div className="text-center p-3 bg-white/5 border border-white/5 rounded-2xl min-w-[100px]">
             <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none mb-1 font-bold">Node Rev</span>
             <span className="text-lg font-black text-emerald-400 font-mono tracking-tight leading-none italic">+₦1.4M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
