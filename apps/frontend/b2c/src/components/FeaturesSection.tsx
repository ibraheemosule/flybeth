// "use client";

// import {
//   Shield,
//   Compass,
//   Heart,
//   Rocket,
//   Award,
//   Headphones,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const features = [
//   {
//     id: 1,
//     icon: Compass,
//     title: "Navigate with Ease",
//     description:
//       "Smart search technology that finds exactly what you're dreaming of",
//     color: "bg-primary",
//   },
//   {
//     id: 2,
//     icon: Heart,
//     title: "Love at First Flight",
//     description:
//       "Handpicked recommendations tailored to your unique travel style",
//     color: "bg-accent",
//   },
//   {
//     id: 3,
//     icon: Rocket,
//     title: "Lightning-Fast Booking",
//     description: "From search to confirmation in under 60 seconds. Seriously.",
//     color: "bg-primary",
//   },
//   {
//     id: 4,
//     icon: Shield,
//     title: "Travel with Peace of Mind",
//     description: "24/7 support and our price match guarantee have your back",
//     color: "bg-accent",
//   },
//   {
//     id: 5,
//     icon: Award,
//     title: "Best Price Guarantee",
//     description:
//       "Found a better price? We'll match it and give you an extra 10% off",
//     color: "bg-primary",
//   },
//   {
//     id: 6,
//     icon: Headphones,
//     title: "Expert Support Team",
//     description: "Real humans ready to help, not bots. Available 24/7.",
//     color: "bg-accent",
//   },
// ];

// export function FeaturesSection() {
//   return (
//     <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-primary/5">
//       {/* Decorative background elements */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
//       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

//       {/* Animated circles */}
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="absolute top-1/4 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
//       />
//       <motion.div
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2,
//         }}
//         className="absolute bottom-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
//       />

//       <div className="container mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="mb-3">Why Travelers Choose Flybeth</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             We're not just another booking site. We're your travel companion,
//             dedicated to making every journey unforgettable.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={feature.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="text-center group"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.color} mb-6 shadow-lg relative`}
//                 >
//                   <Icon className="h-10 w-10 text-white" />
//                   <motion.div
//                     animate={{
//                       scale: [1, 1.2, 1],
//                       opacity: [0.5, 0, 0.5],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                       delay: index * 0.3,
//                     }}
//                     className={`absolute inset-0 rounded-2xl ${feature.color} opacity-50`}
//                   />
//                 </motion.div>
//                 <h3 className="mb-3 group-hover:text-primary transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
