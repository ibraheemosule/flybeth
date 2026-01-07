import { jsPDF } from "jspdf";

interface PassengerInfo {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  seatNumber?: string;
}

interface TicketData {
  bookingRef: string;
  type: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  airline?: string;
  flightNumber?: string;
  className?: string;
  duration?: string;
  terminal?: string;
  gate?: string;
  passengers: PassengerInfo[];
  price: string;
  purchaseDate: string;
}

export function generateTicketPDF(ticketData: TicketData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Background gradient effect (using rectangles)
  doc.setFillColor(59, 130, 246); // Primary blue
  doc.rect(0, 0, pageWidth, 40, "F");

  // Header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text("FLYBETH", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text("E-TICKET CONFIRMATION", pageWidth / 2, 30, { align: "center" });

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Booking Reference Box
  doc.setFillColor(34, 197, 94); // Accent green
  doc.roundedRect(margin, 50, pageWidth - 2 * margin, 25, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("BOOKING REFERENCE", pageWidth / 2, 60, { align: "center" });
  doc.setFontSize(20);
  doc.text(ticketData.bookingRef, pageWidth / 2, 70, { align: "center" });

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Flight Information Section
  let yPos = 85;
  
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 60, 3, 3, "F");

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("FLIGHT DETAILS", margin + 5, yPos + 8);
  doc.setFont(undefined, "normal");

  // Route
  doc.setFontSize(24);
  doc.setFont(undefined, "bold");
  doc.text(ticketData.from, margin + 20, yPos + 25);
  doc.setFontSize(16);
  doc.text("→", pageWidth / 2 - 5, yPos + 25);
  doc.setFontSize(24);
  doc.text(ticketData.to, pageWidth - margin - 60, yPos + 25);

  // Flight details in two columns
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.setTextColor(100, 100, 100);

  const col1X = margin + 10;
  const col2X = pageWidth / 2 + 10;
  let detailY = yPos + 35;

  // Column 1
  doc.text("DATE:", col1X, detailY);
  doc.setTextColor(0, 0, 0);
  doc.text(ticketData.departureDate, col1X + 25, detailY);
  
  detailY += 6;
  doc.setTextColor(100, 100, 100);
  doc.text("DEPARTURE:", col1X, detailY);
  doc.setTextColor(0, 0, 0);
  doc.text(ticketData.departureTime, col1X + 25, detailY);
  
  detailY += 6;
  doc.setTextColor(100, 100, 100);
  doc.text("ARRIVAL:", col1X, detailY);
  doc.setTextColor(0, 0, 0);
  doc.text(ticketData.arrivalTime, col1X + 25, detailY);

  // Column 2
  detailY = yPos + 35;
  if (ticketData.airline) {
    doc.setTextColor(100, 100, 100);
    doc.text("AIRLINE:", col2X, detailY);
    doc.setTextColor(0, 0, 0);
    doc.text(ticketData.airline, col2X + 25, detailY);
    detailY += 6;
  }

  if (ticketData.flightNumber) {
    doc.setTextColor(100, 100, 100);
    doc.text("FLIGHT:", col2X, detailY);
    doc.setTextColor(0, 0, 0);
    doc.text(ticketData.flightNumber, col2X + 25, detailY);
    detailY += 6;
  }

  if (ticketData.className) {
    doc.setTextColor(100, 100, 100);
    doc.text("CLASS:", col2X, detailY);
    doc.setTextColor(0, 0, 0);
    doc.text(ticketData.className, col2X + 25, detailY);
  }

  // Passenger Information
  yPos = 155;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("PASSENGER INFORMATION", margin + 5, yPos);
  doc.setFont(undefined, "normal");

  yPos += 5;
  ticketData.passengers.forEach((passenger, index) => {
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 20, 2, 2, "F");

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(
      `${passenger.firstName} ${passenger.lastName}`.toUpperCase(),
      margin + 5,
      yPos + 8
    );
    doc.setFont(undefined, "normal");

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Passenger ${index + 1}`, margin + 5, yPos + 14);
    
    if (passenger.seatNumber) {
      doc.text(`Seat: ${passenger.seatNumber}`, pageWidth - margin - 30, yPos + 14);
    }

    doc.setTextColor(0, 0, 0);
    yPos += 25;
  });

  // Barcode placeholder (simple lines to represent barcode)
  yPos += 5;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 30, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("BOARDING PASS BARCODE", pageWidth / 2, yPos + 8, { align: "center" });

  // Draw barcode-like lines
  const barcodeY = yPos + 12;
  const barcodeWidth = 100;
  const barcodeStartX = (pageWidth - barcodeWidth) / 2;
  
  for (let i = 0; i < 50; i++) {
    const lineWidth = Math.random() > 0.5 ? 0.5 : 1;
    doc.setLineWidth(lineWidth);
    doc.line(barcodeStartX + i * 2, barcodeY, barcodeStartX + i * 2, barcodeY + 12);
  }

  doc.setFontSize(8);
  doc.text(ticketData.bookingRef, pageWidth / 2, yPos + 28, { align: "center" });

  // Important Information
  yPos = pageHeight - 60;
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 35, 3, 3, "F");

  doc.setFontSize(11);
  doc.setFont(undefined, "bold");
  doc.setTextColor(146, 64, 14);
  doc.text("IMPORTANT INFORMATION", margin + 5, yPos + 8);
  doc.setFont(undefined, "normal");

  doc.setFontSize(8);
  doc.setTextColor(120, 53, 15);
  const infoText = [
    "• Please arrive at the airport at least 2 hours before departure for domestic flights, 3 hours for international",
    "• Check-in closes 45 minutes before departure time",
    "• Valid government-issued photo ID required for all passengers",
    "• Carry this e-ticket with you to the airport (digital or printed)",
  ];

  let infoY = yPos + 15;
  infoText.forEach((line) => {
    doc.text(line, margin + 5, infoY);
    infoY += 5;
  });

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  const footerY = pageHeight - 15;
  doc.text("Thank you for choosing Flybeth", pageWidth / 2, footerY, { align: "center" });
  doc.text(`Issued: ${ticketData.purchaseDate}`, pageWidth / 2, footerY + 4, { align: "center" });
  doc.text("For support: support@flybeth.com | +1-800-FLY-BETH", pageWidth / 2, footerY + 8, { align: "center" });

  // Border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

  // Save the PDF
  doc.save(`Flybeth-Ticket-${ticketData.bookingRef}.pdf`);
}
