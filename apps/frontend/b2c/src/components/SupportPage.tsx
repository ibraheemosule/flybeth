// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { motion } from "framer-motion";
// import {
//   Search,
//   ChevronDown,
//   ChevronUp,
//   MessageCircle,
//   Mail,
//   Phone,
//   Clock,
//   HelpCircle,
//   Plane,
//   CreditCard,
//   Calendar,
//   Users,
// } from "lucide-react";

// const faqs = [
//   {
//     category: "Booking & Reservations",
//     icon: Plane,
//     questions: [
//       {
//         q: "How do I book a flight on Flybeth?",
//         a: "Booking a flight is easy! Simply enter your departure and destination cities, select your travel dates, and click search. Browse through available flights, select your preferred option, and follow the checkout process. You can book as a guest or sign in for faster checkout and rewards.",
//       },
//       {
//         q: "Can I book flights for multiple passengers?",
//         a: "Yes! During the search process, you can specify the number of passengers (adults, children, and infants). All passengers will be included in a single booking with one confirmation number.",
//       },
//       {
//         q: "What payment methods do you accept?",
//         a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and PayPal. All payments are processed securely through our encrypted payment gateway.",
//       },
//       {
//         q: "How soon will I receive my booking confirmation?",
//         a: "You'll receive an instant confirmation email as soon as your payment is processed. The email includes your booking reference, flight details, and e-ticket. If you don't see it in your inbox, please check your spam folder.",
//       },
//     ],
//   },
//   {
//     category: "Cancellations & Changes",
//     icon: Calendar,
//     questions: [
//       {
//         q: "What is your cancellation policy?",
//         a: "Cancellations made within 24 hours of booking are eligible for a full refund, as long as the departure date is at least 7 days away. After 24 hours, cancellation fees may apply depending on the airline's policy and fare type.",
//       },
//       {
//         q: "Can I change my flight dates?",
//         a: "Yes, flight changes are possible but subject to availability and fare differences. Change fees vary by airline and ticket type. You can manage your booking through 'My Trips' or contact our support team for assistance.",
//       },
//       {
//         q: "What if my flight is cancelled by the airline?",
//         a: "If the airline cancels your flight, you're entitled to a full refund or rebooking on the next available flight at no extra cost. We'll notify you immediately and help you with alternative arrangements.",
//       },
//     ],
//   },
//   {
//     category: "Payment & Refunds",
//     icon: CreditCard,
//     questions: [
//       {
//         q: "Is my payment information secure?",
//         a: "Absolutely! We use industry-standard SSL encryption and comply with PCI DSS standards. Your credit card information is never stored on our servers and is processed through secure payment gateways.",
//       },
//       {
//         q: "How long do refunds take?",
//         a: "Refunds are typically processed within 5-7 business days after approval. The time it takes to appear in your account depends on your bank or card issuer, usually 7-10 business days.",
//       },
//       {
//         q: "Can I get a refund for a non-refundable ticket?",
//         a: "Non-refundable tickets generally cannot be refunded, but you may be able to use the value as credit towards a future booking (minus any change fees). Contact us to explore your options.",
//       },
//     ],
//   },
//   {
//     category: "Account & Rewards",
//     icon: Users,
//     questions: [
//       {
//         q: "Do I need an account to book?",
//         a: "No, you can book as a guest. However, creating an account allows you to track bookings easily, save preferences, and earn rewards on every booking.",
//       },
//       {
//         q: "How does the rewards program work?",
//         a: "Earn 1 point for every dollar spent on bookings. Accumulate points to redeem for discounts on future trips, upgrades, and exclusive perks. Points never expire as long as your account remains active.",
//       },
//       {
//         q: "I forgot my password. How do I reset it?",
//         a: "Click 'Sign In' and then 'Forgot Password'. Enter your email address, and we'll send you a secure link to reset your password. The link expires after 24 hours for security.",
//       },
//     ],
//   },
// ];

// export function SupportPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

//   const toggleItem = (key: string) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const filteredFaqs = faqs.map((category) => ({
//     ...category,
//     questions: category.questions.filter(
//       (faq) =>
//         faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         faq.a.toLowerCase().includes(searchQuery.toLowerCase())
//     ),
//   })).filter((category) => category.questions.length > 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4">
//       <div className="container mx-auto max-w-5xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-4 border border-primary/20">
//             <HelpCircle className="h-4 w-4 text-primary" />
//             <span className="text-primary text-sm">We're Here to Help</span>
//           </div>
//           <h1 className="mb-4">Frequently Asked Questions</h1>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Find answers to common questions about booking, payments, and more. Can't find what you're looking for? Contact our support team.
//           </p>
//         </motion.div>

//         {/* Search */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="mb-12"
//         >
//           <Card className="border-2 bg-white/80 backdrop-blur-sm shadow-xl">
//             <CardContent className="pt-6">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   type="text"
//                   placeholder="Search for answers..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 h-12 text-base"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* FAQ Categories */}
//         <div className="space-y-8">
//           {filteredFaqs.map((category, categoryIndex) => {
//             const Icon = category.icon;
//             return (
//               <motion.div
//                 key={category.category}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + categoryIndex * 0.1 }}
//               >
//                 <Card className="border-2 bg-white/90 backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//                         <Icon className="h-6 w-6 text-white" />
//                       </div>
//                       {category.category}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {category.questions.map((faq, index) => {
//                       const key = `${category.category}-${index}`;
//                       const isExpanded = expandedItems[key];

//                       return (
//                         <div
//                           key={key}
//                           className="border border-gray-200 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
//                         >
//                           <button
//                             onClick={() => toggleItem(key)}
//                             className="w-full p-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
//                           >
//                             <span className="pr-4">{faq.q}</span>
//                             {isExpanded ? (
//                               <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                             )}
//                           </button>
//                           {isExpanded && (
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{ height: "auto", opacity: 1 }}
//                               exit={{ height: 0, opacity: 0 }}
//                               className="px-4 pb-4 text-muted-foreground"
//                             >
//                               {faq.a}
//                             </motion.div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Contact Support */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="mt-12"
//         >
//           <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-lg shadow-xl">
//             <CardHeader className="text-center">
//               <CardTitle className="flex items-center justify-center gap-2">
//                 <MessageCircle className="h-6 w-6 text-primary" />
//                 Still Need Help?
//               </CardTitle>
//               <CardDescription>
//                 Our support team is available 24/7 to assist you
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-3 gap-4">
//                 <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                     <Phone className="h-6 w-6 text-primary" />
//                   </div>
//                   <h4 className="mb-1">Call Us</h4>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     1-800-FLYBETH
//                   </p>
//                   <Badge variant="outline" className="bg-white">
//                     24/7 Available
//                   </Badge>
//                 </div>

//                 <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
//                   <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
//                     <Mail className="h-6 w-6 text-accent" />
//                   </div>
//                   <h4 className="mb-1">Email Us</h4>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     support@flybeth.com
//                   </p>
//                   <Badge variant="outline" className="bg-white">
//                     Response in 2-4 hours
//                   </Badge>
//                 </div>

//                 <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                     <MessageCircle className="h-6 w-6 text-primary" />
//                   </div>
//                   <h4 className="mb-1">Live Chat</h4>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     Chat with an agent
//                   </p>
//                   <Button
//                     size="sm"
//                     className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
//                   >
//                     Start Chat
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
