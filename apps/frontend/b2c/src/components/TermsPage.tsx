// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { FileText } from "lucide-react";

// export function TermsPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4">
//       <div className="container mx-auto max-w-4xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <Badge className="bg-gradient-to-r from-primary to-accent text-white mb-6">
//             <FileText className="mr-2 h-4 w-4" />
//             Legal
//           </Badge>
//           <h1 className="mb-4">Terms & Conditions</h1>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Last updated: November 22, 2025
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="space-y-6"
//         >
//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>1. Acceptance of Terms</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 By accessing and using Flybeth.com, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>2. Service Description</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 Flybeth acts as an intermediary between you and travel service providers (airlines, hotels, etc.). We facilitate bookings but do not own, operate, or control the transportation or accommodation services.
//               </p>
//               <p>
//                 All bookings are subject to the terms and conditions of the respective service providers.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>3. Booking and Payment</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 When you make a booking through Flybeth, you agree to:
//               </p>
//               <ul className="list-disc list-inside space-y-2 ml-4">
//                 <li>Provide accurate and complete information</li>
//                 <li>Pay all charges associated with your booking</li>
//                 <li>Comply with the terms of the travel provider</li>
//                 <li>Review all details before confirming your purchase</li>
//               </ul>
//               <p>
//                 Prices displayed include all mandatory taxes and fees unless otherwise stated. Prices are subject to change until payment is complete.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>4. Cancellations and Refunds</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 Cancellation and refund policies vary by booking type and service provider. Please review our Refund Policy and the specific terms of your booking before canceling.
//               </p>
//               <p>
//                 Flybeth will process refunds according to our refund policy, but the final decision rests with the service provider.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>5. User Responsibilities</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 You are responsible for:
//               </p>
//               <ul className="list-disc list-inside space-y-2 ml-4">
//                 <li>Ensuring you have valid travel documents (passport, visa, etc.)</li>
//                 <li>Arriving at check-in and departure times as specified</li>
//                 <li>Complying with airline baggage policies</li>
//                 <li>Following all rules and regulations of travel providers</li>
//                 <li>Maintaining the security of your account credentials</li>
//               </ul>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>6. Limitation of Liability</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 Flybeth is not liable for:
//               </p>
//               <ul className="list-disc list-inside space-y-2 ml-4">
//                 <li>Flight delays, cancellations, or schedule changes by airlines</li>
//                 <li>Lost or damaged baggage</li>
//                 <li>Denied boarding or entry to destinations</li>
//                 <li>Acts of God, natural disasters, or force majeure events</li>
//                 <li>Service quality issues with third-party providers</li>
//               </ul>
//               <p className="pt-2">
//                 Our liability is limited to the amount paid for the booking service fee, excluding amounts paid to third-party providers.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>7. Intellectual Property</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 All content on Flybeth.com, including logos, text, graphics, and software, is the property of Flybeth and protected by copyright and trademark laws. Unauthorized use is prohibited.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>8. Privacy</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 Your use of Flybeth is also governed by our Privacy Policy. We collect and use personal information as described in that policy.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>9. Modifications to Terms</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 Flybeth reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>10. Governing Law</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 These Terms and Conditions are governed by the laws of the State of Delaware, United States. Any disputes shall be resolved in the courts of Delaware.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/90 backdrop-blur-lg border-2">
//             <CardHeader>
//               <CardTitle>11. Contact Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3 text-muted-foreground">
//               <p>
//                 For questions about these Terms and Conditions, contact us at:
//               </p>
//               <p className="pl-4">
//                 Email: legal@flybeth.com<br />
//                 Phone: 1-800-FLYBETH<br />
//                 Address: 123 Travel Lane, Suite 100, Wilmington, DE 19801
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
