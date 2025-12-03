import { Request, Response } from 'express'
import { hotelHelper } from '../hotel-shared/hotel.helper'
import { 
  businessHotelSearchSchema, 
  businessHotelBookingSchema,
  bulkBookingSchema 
} from './hotel-business.schemas'

export class HotelBusinessController {
  private hotelHelper: typeof hotelHelper

  constructor() {
    this.hotelHelper = hotelHelper
  }

  // Search hotels with business features
  searchHotels = async (req: Request, res: Response) => {
    try {
      const filters = businessHotelSearchSchema.parse(req.query)
      
      const hotels = await this.hotelHelper.searchHotels(filters)
      
      // Add business-specific enhancements
      const businessHotels = hotels.map(hotel => ({
        ...hotel,
        corporateRates: {
          standardDiscount: 15, // 15% corporate discount
          volumeDiscount: hotel.totalRooms > 100 ? 25 : 20, // Volume discount based on hotel size
          longStayDiscount: 30 // 30% for stays over 7 nights
        },
        businessAmenities: hotel.amenities.filter(amenity => 
          ['Business Center', 'Conference Rooms', 'WiFi', 'Concierge'].includes(amenity)
        ),
        meetingRooms: Math.floor(hotel.totalRooms / 20), // Estimate meeting rooms
        maxGroupSize: Math.min(hotel.totalRooms * 2, 200)
      }))

      res.json({
        success: true,
        hotels: businessHotels,
        count: businessHotels.length,
        corporateFeatures: {
          volumeDiscounts: true,
          corporateRates: true,
          bulkBooking: true,
          invoicing: true,
          dedicatedSupport: true
        },
        message: 'Business hotels retrieved successfully'
      })
    } catch (error) {
      console.error('Business hotel search error:', error)
      res.status(400).json({
        success: false,
        message: 'Invalid search parameters',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Get hotel details with corporate pricing
  getHotelDetails = async (req: Request, res: Response) => {
    try {
      const { hotelId } = req.params
      const { checkIn, checkOut, guests, corporateId } = req.query

      const hotel = await this.hotelHelper.getHotelById(hotelId)
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: 'Hotel not found'
        })
      }

      let pricing = null
      if (checkIn && checkOut && guests) {
        const guestCount = parseInt(guests as string)
        if (guestCount > 100) {
          return res.status(400).json({
            success: false,
            message: 'Maximum 100 guests allowed per booking. For larger groups, please use bulk booking.'
          })
        }

        const basePricing = await this.hotelHelper.getHotelPricing(
          hotelId,
          checkIn as string,
          checkOut as string,
          guestCount
        )

        if (basePricing) {
          // Apply corporate discounts
          let discount = 15 // Base corporate discount
          if (corporateId) discount += 5 // Additional 5% for registered corporate clients
          if (basePricing.totalNights >= 7) discount += 10 // Long stay discount
          if (guestCount >= 20) discount += 5 // Group discount

          const discountAmount = Math.round(basePricing.totalPrice * (discount / 100))
          
          pricing = {
            ...basePricing,
            corporateDiscount: discount,
            discountAmount,
            corporatePrice: basePricing.totalPrice - discountAmount,
            finalPrice: basePricing.totalPrice - discountAmount + basePricing.taxesAndFees
          }
        }
      }

      res.json({
        success: true,
        hotel: {
          ...hotel,
          corporateFeatures: {
            meetingRooms: Math.floor(hotel.totalRooms / 20),
            maxGroupSize: Math.min(hotel.totalRooms * 2, 200),
            businessServices: ['Concierge', 'Business Center', 'Event Planning', 'Catering'],
            corporateRates: true,
            invoicing: true
          }
        },
        pricing,
        businessLimits: {
          maxGuests: 100,
          bulkBookingAvailable: true,
          customRatesAvailable: true
        }
      })
    } catch (error) {
      console.error('Get business hotel details error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to get hotel details'
      })
    }
  }

  // Create corporate reservation
  createReservation = async (req: Request, res: Response) => {
    try {
      const bookingData = businessHotelBookingSchema.parse(req.body)
      const businessId = req.business?.id

      if (!businessId) {
        return res.status(401).json({
          success: false,
          message: 'Business authentication required'
        })
      }

      // Validate hotel exists
      const hotel = await this.hotelHelper.getHotelById(bookingData.hotelId)
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: 'Hotel not found'
        })
      }

      // Get corporate pricing
      const basePricing = await this.hotelHelper.getHotelPricing(
        bookingData.hotelId,
        bookingData.checkIn,
        bookingData.checkOut,
        bookingData.guests
      )

      if (!basePricing) {
        return res.status(400).json({
          success: false,
          message: 'Unable to calculate pricing for this booking'
        })
      }

      // Apply corporate discounts
      let discount = 20 // Base corporate discount
      if (bookingData.corporateId) discount += 5
      if (basePricing.totalNights >= 7) discount += 10
      if (bookingData.guests >= 20) discount += 5

      const discountAmount = Math.round(basePricing.totalPrice * (discount / 100))
      const finalPrice = basePricing.totalPrice - discountAmount + basePricing.taxesAndFees

      // Create reservation
      const reservation = await this.hotelHelper.reserveRoom(
        {
          hotelId: bookingData.hotelId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          roomType: bookingData.roomType,
          totalPrice: finalPrice
        },
        businessId
      )

      res.status(201).json({
        success: true,
        reservation: {
          ...reservation,
          bookingType: 'corporate',
          corporateDiscount: discount,
          billingInfo: bookingData.billingInfo,
          eventType: bookingData.eventType
        },
        pricing: {
          ...basePricing,
          corporateDiscount: discount,
          discountAmount,
          finalPrice
        },
        message: 'Corporate hotel reservation created successfully'
      })
    } catch (error) {
      console.error('Create corporate reservation error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to create reservation',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Bulk booking for corporate clients
  createBulkBooking = async (req: Request, res: Response) => {
    try {
      const bulkData = bulkBookingSchema.parse(req.body)
      const businessId = req.business?.id

      if (!businessId) {
        return res.status(401).json({
          success: false,
          message: 'Business authentication required'
        })
      }

      const reservations = []
      let totalAmount = 0
      let totalDiscount = 0

      for (const booking of bulkData.bookings) {
        const basePricing = await this.hotelHelper.getHotelPricing(
          booking.hotelId,
          booking.checkIn,
          booking.checkOut,
          booking.guests
        )

        if (!basePricing) continue

        // Enhanced bulk discount
        let discount = 25 // Base bulk discount
        if (bulkData.corporateDiscount) discount += bulkData.corporateDiscount
        if (bulkData.bookings.length >= 10) discount += 5 // Volume discount
        if (basePricing.totalNights >= 7) discount += 5

        const discountAmount = Math.round(basePricing.totalPrice * (discount / 100))
        const finalPrice = basePricing.totalPrice - discountAmount + basePricing.taxesAndFees

        const reservation = await this.hotelHelper.reserveRoom(
          {
            hotelId: booking.hotelId,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            guests: booking.guests,
            roomType: booking.roomType,
            totalPrice: finalPrice
          },
          businessId
        )

        reservations.push({
          ...reservation,
          booking,
          pricing: {
            ...basePricing,
            discount,
            discountAmount,
            finalPrice
          }
        })

        totalAmount += finalPrice
        totalDiscount += discountAmount
      }

      res.status(201).json({
        success: true,
        bulkBooking: {
          id: `bulk_${Date.now()}`,
          reservations,
          summary: {
            totalBookings: reservations.length,
            totalAmount,
            totalDiscount,
            paymentTerms: bulkData.paymentTerms
          }
        },
        message: 'Bulk booking created successfully'
      })
    } catch (error) {
      console.error('Create bulk booking error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to create bulk booking',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Get corporate rates and analytics
  getCorporateAnalytics = async (req: Request, res: Response) => {
    try {
      const { location, period = '30' } = req.query
      
      // Mock analytics data - replace with actual database queries
      const analytics = {
        bookingStats: {
          totalBookings: 45,
          totalSpent: 125000,
          averageBookingValue: 2780,
          topDestinations: ['New York', 'San Francisco', 'Chicago']
        },
        savingsReport: {
          totalSavings: 18750,
          averageDiscount: 22,
          corporateRateUsage: '89%'
        },
        upcomingBookings: 12,
        pastBookings: 33,
        preferredHotels: [
          { name: 'Grand Palace Hotel', bookings: 15, savings: 4500 },
          { name: 'Business Center Inn', bookings: 12, savings: 3200 }
        ]
      }

      res.json({
        success: true,
        analytics,
        period: `${period} days`,
        location: location || 'All locations',
        message: 'Corporate analytics retrieved successfully'
      })
    } catch (error) {
      console.error('Get corporate analytics error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to get analytics'
      })
    }
  }

  // Request custom corporate rates
  requestCustomRates = async (req: Request, res: Response) => {
    try {
      const { 
        estimatedAnnualVolume, 
        preferredLocations, 
        companyInfo,
        contactDetails 
      } = req.body

      // Mock request processing - replace with actual business logic
      const requestId = `custom_${Date.now()}`
      
      res.status(201).json({
        success: true,
        request: {
          id: requestId,
          status: 'pending',
          estimatedResponse: '3-5 business days',
          companyInfo,
          contactDetails,
          estimatedAnnualVolume,
          preferredLocations
        },
        message: 'Custom rates request submitted successfully. Our corporate team will contact you within 3-5 business days.'
      })
    } catch (error) {
      console.error('Request custom rates error:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to submit custom rates request'
      })
    }
  }
}