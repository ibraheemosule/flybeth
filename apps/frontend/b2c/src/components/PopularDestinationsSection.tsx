// "use client";

// import { motion } from "framer-motion";
// import { Card } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { MapPin, TrendingUp } from "lucide-react";
// import { ImageWithFallback } from "./ui/ImageWithFallback";

// const destinations = [
//   {
//     id: 1,
//     name: "Paris",
//     country: "France",
//     image:
//       "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
//     startingPrice: "$599",
//     trend: "+12%",
//   },
//   {
//     id: 2,
//     name: "Tokyo",
//     country: "Japan",
//     image:
//       "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
//     startingPrice: "$899",
//     trend: "+8%",
//   },
//   {
//     id: 3,
//     name: "Dubai",
//     country: "UAE",
//     image:
//       "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
//     startingPrice: "$749",
//     trend: "+15%",
//   },
//   {
//     id: 4,
//     name: "New York",
//     country: "USA",
//     image:
//       "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
//     startingPrice: "$349",
//     trend: "+5%",
//   },
//   {
//     id: 5,
//     name: "London",
//     country: "UK",
//     image:
//       "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
//     startingPrice: "$499",
//     trend: "+10%",
//   },
//   {
//     id: 6,
//     name: "Bali",
//     country: "Indonesia",
//     image:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
//     startingPrice: "$679",
//     trend: "+20%",
//   },
// ];

// export function PopularDestinationsSection() {
//   return (
//     <section className="py-16 px-4 bg-white relative overflow-hidden">
//       {/* Glass effect background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

//       <div className="container mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-primary/20">
//             <TrendingUp className="h-4 w-4 text-primary" />
//             <span className="text-primary text-sm">Trending Now</span>
//           </div>
//           <h2 className="mb-3">Popular Destinations</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Explore the world's most sought-after destinations with unbeatable
//             prices
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {destinations.map((dest, index) => (
//             <motion.div
//               key={dest.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card className="group cursor-pointer overflow-hidden border-2 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/90 backdrop-blur-lg">
//                 <div className="relative h-40 overflow-hidden">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <ImageWithFallback
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//                   {/* Trend badge */}
//                   <Badge className="absolute top-2 right-2 bg-accent text-white text-xs">
//                     {dest.trend}
//                   </Badge>

//                   {/* Destination info */}
//                   <div className="absolute bottom-0 left-0 right-0 p-3">
//                     <h3 className="text-white mb-1 text-sm">{dest.name}</h3>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-1 text-white/80 text-xs">
//                         <MapPin className="h-3 w-3" />
//                         <span>{dest.country}</span>
//                       </div>
//                       <div className="text-white text-sm">
//                         {dest.startingPrice}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
