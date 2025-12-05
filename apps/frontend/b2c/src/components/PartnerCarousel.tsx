import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Handshake } from "lucide-react";

const partners = [
  { id: 1, name: "Delta Airlines", logo: "https://logo.clearbit.com/delta.com" },
  { id: 2, name: "United Airlines", logo: "https://logo.clearbit.com/united.com" },
  { id: 3, name: "American Airlines", logo: "https://logo.clearbit.com/aa.com" },
  { id: 4, name: "British Airways", logo: "https://logo.clearbit.com/britishairways.com" },
  { id: 5, name: "Emirates", logo: "https://logo.clearbit.com/emirates.com" },
  { id: 6, name: "Lufthansa", logo: "https://logo.clearbit.com/lufthansa.com" },
  { id: 7, name: "Air France", logo: "https://logo.clearbit.com/airfrance.com" },
  { id: 8, name: "Qatar Airways", logo: "https://logo.clearbit.com/qatarairways.com" },
  { id: 9, name: "Singapore Airlines", logo: "https://logo.clearbit.com/singaporeair.com" },
  { id: 10, name: "Cathay Pacific", logo: "https://logo.clearbit.com/cathaypacific.com" },
];

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110 border border-gray-200"
    >
      <ChevronRight className="h-5 w-5 text-primary" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110 border border-gray-200"
    >
      <ChevronLeft className="h-5 w-5 text-primary" />
    </button>
  );
}

export function PartnerCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-primary/20">
            <Handshake className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm">Trusted Partners</span>
          </div>
          <h2 className="mb-3">We Partner With The Best</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Collaborating with world-class airlines to bring you the best travel experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative px-12"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-10 shadow-md border border-gray-100">
            {/* Inline styles for react-slick */}
            <style>{`
              .slick-slider { position: relative; display: block; box-sizing: border-box; user-select: none; touch-action: pan-y; }
              .slick-list { position: relative; display: block; overflow: hidden; margin: 0; padding: 0; }
              .slick-list:focus { outline: none; }
              .slick-list.dragging { cursor: pointer; }
              .slick-slider .slick-track, .slick-slider .slick-list { transform: translate3d(0, 0, 0); }
              .slick-track { position: relative; top: 0; left: 0; display: flex; margin-left: auto; margin-right: auto; }
              .slick-track:before, .slick-track:after { display: table; content: ''; }
              .slick-track:after { clear: both; }
              .slick-loading .slick-track { visibility: hidden; }
              .slick-slide { display: none; float: left; height: 100%; min-height: 1px; }
              .slick-slide > div { display: flex; }
              .slick-slide.slick-loading img { display: none; }
              .slick-slide.dragging img { pointer-events: none; }
              .slick-initialized .slick-slide { display: block; }
              .slick-loading .slick-slide { visibility: hidden; }
              .slick-vertical .slick-slide { display: block; height: auto; border: 1px solid transparent; }
            `}</style>
            
            <Slider {...settings}>
              {partners.map((partner) => (
                <div key={partner.id} className="px-4">
                  <div className="flex items-center justify-center h-20 group cursor-pointer">
                    <div className="w-full h-full flex items-center justify-center bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/30 transition-all hover:shadow-lg group-hover:scale-105">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
                        onError={(e) => {
                          // Fallback if logo fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<div class="text-sm text-muted-foreground text-center">${partner.name}</div>`;
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </div>
    </section>
  );
}