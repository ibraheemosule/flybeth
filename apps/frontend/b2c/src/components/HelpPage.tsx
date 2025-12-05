import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Search, 
  BookOpen, 
  CreditCard, 
  Plane, 
  MapPin,
  Clock,
  HeadphonesIcon
} from "lucide-react";

const faqCategories = [
  {
    id: "booking",
    title: "Booking & Reservations",
    icon: BookOpen,
    faqs: [
      {
        question: "How do I modify or cancel my booking?",
        answer: "You can easily modify or cancel your booking by visiting the 'My Trips' section and selecting your reservation. Click on 'Manage Booking' and follow the prompts. Cancellation policies vary by provider, so please review the specific terms for your booking."
      },
      {
        question: "Can I book for someone else?",
        answer: "Absolutely! When entering traveler details during booking, simply add the information for the person who will be traveling. Make sure all names match exactly as they appear on government-issued IDs."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, PayPal, and Apple Pay. Some properties may also accept additional payment methods."
      },
      {
        question: "How do I know my booking is confirmed?",
        answer: "You'll receive a confirmation email within minutes of completing your booking. This email includes your booking reference number and all reservation details. You can also check your booking status in the 'My Trips' section."
      }
    ]
  },
  {
    id: "payments",
    title: "Payment & Billing",
    icon: CreditCard,
    faqs: [
      {
        question: "When will I be charged for my booking?",
        answer: "Most bookings are charged immediately upon confirmation. However, some hotels offer 'Pay at Property' options where you'll be charged when you check in. Check your booking details for specific payment terms."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes! For bookings over $500, we offer flexible payment plans. You can split your payment into 3 or 4 installments. Look for the payment plan option during checkout."
      },
      {
        question: "How do refunds work?",
        answer: "Refunds are processed according to the cancellation policy of your specific booking. Eligible refunds are typically returned to your original payment method within 7-10 business days."
      }
    ]
  },
  {
    id: "travel",
    title: "Travel Information",
    icon: Plane,
    faqs: [
      {
        question: "What documents do I need for international travel?",
        answer: "For international travel, you'll need a valid passport (with at least 6 months validity), any required visas for your destination, and potentially proof of vaccinations. We recommend checking with the embassy of your destination country for specific requirements."
      },
      {
        question: "Can I add checked baggage to my flight?",
        answer: "Yes! After booking, you can add checked baggage through your airline's website using your booking reference number, or contact our support team for assistance."
      },
      {
        question: "What happens if my flight is delayed or cancelled?",
        answer: "Contact our 24/7 support team immediately. We'll help you rebook on the next available flight at no extra cost if the delay/cancellation is within the airline's control. Your rights may vary based on the airline and jurisdiction."
      }
    ]
  }
];

const quickLinks = [
  {
    title: "Track My Booking",
    description: "Check status and details",
    icon: MapPin,
    action: "Track Now"
  },
  {
    title: "Request a Refund",
    description: "Submit refund request",
    icon: CreditCard,
    action: "Start Request"
  },
  {
    title: "Travel Insurance",
    description: "Protect your journey",
    icon: BookOpen,
    action: "Learn More"
  },
  {
    title: "24/7 Support",
    description: "We're always here",
    icon: HeadphonesIcon,
    action: "Contact Us"
  }
];

export function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">How Can We Help You Today?</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            We're here to make your travel experience smooth and stress-free
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card key={link.title} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-base">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full text-primary">
                    {link.action} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about booking and travel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="booking" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    {faqCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                          <Icon className="h-4 w-4 mr-2 hidden md:inline" />
                          {category.title.split('&')[0].trim()}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {faqCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Choose your preferred way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-primary hover:bg-primary/90" size="lg">
                  <MessageCircle className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div>Live Chat</div>
                    <div className="text-xs text-primary-foreground/80">Avg. response: 2 min</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Phone className="mr-3 h-5 w-5 text-accent" />
                  <div className="text-left">
                    <div>Call Us</div>
                    <div className="text-xs text-muted-foreground">1-800-FLY-BETH</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Mail className="mr-3 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div>Email Support</div>
                    <div className="text-xs text-muted-foreground">Response in 24h</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Live Chat & Phone</span>
                  <span className="text-muted-foreground">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Email Support</span>
                  <span className="text-muted-foreground">24/7</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-lg text-sm w-full justify-center mt-4">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  We're online now
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  We'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="How can we help you?" rows={4} />
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
