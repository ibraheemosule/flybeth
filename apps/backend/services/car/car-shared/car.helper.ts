import { PrismaClient } from '@prisma/client'
import { addDays, format, parseISO } from 'date-fns'

// Car rental interfaces
export interface CarRental {
  id: string
  userId: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  rentalReference: string
  createdAt: string
  updatedAt: string
  
  // Car specific data
  serviceDetails: {
    carId: string
    carType: string
    category: string
    transmission: 'automatic' | 'manual'
    fuelType: string
    seats: number
  }
  
  // Driver information
  drivers: Driver[]
  
  // Rental dates
  dates: {
    pickupDate: string
    returnDate: string
    pickupTime: string
    returnTime: string
  }
  
  // Pickup/Return locations
  locations: {
    pickup: {
      address: string
      city: string
      country: string
      airport?: boolean
    }
    return: {
      address: string
      city: string
      country: string
      airport?: boolean
    }
  }
  
  // Pricing
  pricing: {
    dailyRate: number
    totalDays: number
    basePrice: number
    taxes: number
    fees: number
    insurance?: number
    extras?: number
    discount?: number
    totalPrice: number
    currency: string
  }
  
  // Payment
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod?: string
  transactionId?: string
  
  // Contact info
  contactInfo: {
    email: string
    phone: string
  }
  
  // Special requests and extras
  specialRequests?: string
  extras?: string[]
  insurance?: boolean
  
  // Business rental specific
  corporateInfo?: {
    companyName: string
    corporateId?: string
    billingAddress: string
    taxId?: string
  }
}

export interface Driver {
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth: string
  documentType: 'drivingLicense' | 'passport' | 'nationalId'
  documentNumber: string
  documentExpiry: string
  licenseNumber: string
  licenseIssueDate: string
  licenseExpiryDate: string
  licenseCountry: string
}

interface CarRentalDetails {
  serviceDetails: {
    carId: string
    carType: string
    category: string
  }
  drivers: Driver[]
  dates: {
    pickupDate: string
    returnDate: string
    pickupTime: string
    returnTime: string
  }
  locations: {
    pickup: {
      address: string
      city: string
      country: string
    }
    return: {
      address: string
      city: string
      country: string
    }
  }
  preferences?: {
    insurance?: boolean
    extras?: string[]
    specialRequests?: string
  }
  pricing: {
    dailyRate: number
    totalDays: number
    basePrice: number
    taxes: number
    fees: number
    totalPrice: number
  }
}

interface CarRentalResponse {
  rentalId: string
  status: 'confirmed' | 'pending' | 'cancelled'
  confirmationNumber: string
  drivers: Driver[]
  serviceDetails: any
  pricing: any
  createdAt: string
  expiresAt?: string
}

class CarHelper {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Core car rental functionality
  async createCarRental(details: CarRentalDetails & { userId: string }): Promise<CarRentalResponse> {
    const rentalId = `rent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const confirmationNumber = `CAR-${Date.now().toString().substr(-6)}`

    // Mock car rental creation
    const rental: CarRentalResponse = {
      rentalId,
      status: 'confirmed',
      confirmationNumber,
      drivers: details.drivers,
      serviceDetails: {
        ...details.serviceDetails,
        dates: details.dates,
        locations: details.locations,
        preferences: details.preferences
      },
      pricing: details.pricing,
      createdAt: new Date().toISOString(),
      expiresAt: addDays(new Date(), 1).toISOString()
    }

    return rental
  }

  // Get car rental by ID
  async getCarRentalById(rentalId: string): Promise<CarRentalResponse | null> {
    // Mock implementation - would query database
    return {
      rentalId: rentalId,
      status: 'confirmed',
      confirmationNumber: 'CAR-123456',
      drivers: [],
      serviceDetails: {},
      pricing: {
        dailyRate: 0,
        totalDays: 0,
        basePrice: 0,
        taxes: 0,
        fees: 0,
        totalPrice: 0
      },
      createdAt: new Date().toISOString()
    }
  }

  // Cancel car rental
  async cancelCarRental(rentalId: string, userId: string): Promise<{
    success: boolean
    message: string
    refundAmount?: number
  }> {
    // Mock cancellation logic
    const rental = await this.getCarRentalById(rentalId)
    
    if (!rental) {
      return {
        success: false,
        message: 'Car rental not found'
      }
    }

    // Check cancellation policy
    const pickupDate = new Date(rental.serviceDetails?.dates?.pickupDate || new Date())
    const now = new Date()
    const hoursUntilPickup = (pickupDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    let refundPercentage = 0
    if (hoursUntilPickup > 48) {
      refundPercentage = 1.0 // Full refund
    } else if (hoursUntilPickup > 24) {
      refundPercentage = 0.75 // 75% refund
    } else if (hoursUntilPickup > 6) {
      refundPercentage = 0.5 // 50% refund
    } else {
      refundPercentage = 0 // No refund
    }

    const refundAmount = rental.pricing?.totalPrice * refundPercentage

    return {
      success: true,
      message: 'Car rental cancelled successfully',
      refundAmount: refundAmount
    }
  }

  // Get user car rental history
  async getUserCarRentals(userId: string, limit: number = 10): Promise<CarRental[]> {
    // Mock implementation
    return []
  }

  // Update car rental
  async updateCarRental(rentalId: string, updateData: Partial<CarRental>): Promise<CarRental | null> {
    // Mock implementation
    return null
  }

  // Search available cars
  async searchAvailableCars(searchCriteria: {
    pickupLocation: string
    returnLocation: string
    pickupDate: string
    returnDate: string
    driverAge: number
  }): Promise<any[]> {
    // Mock car search implementation
    return [
      {
        id: 'car_1',
        category: 'economy',
        type: 'Toyota Corolla',
        dailyRate: 45,
        available: true,
        features: ['Air Conditioning', 'Automatic', '4 Doors']
      },
      {
        id: 'car_2', 
        category: 'compact',
        type: 'Honda Civic',
        dailyRate: 55,
        available: true,
        features: ['Air Conditioning', 'Automatic', '4 Doors', 'GPS']
      },
      {
        id: 'car_3',
        category: 'suv',
        type: 'Ford Explorer',
        dailyRate: 85,
        available: true,
        features: ['Air Conditioning', 'Automatic', '7 Seats', 'GPS', '4WD']
      }
    ]
  }

  // Validate driver license
  async validateDriverLicense(licenseNumber: string, country: string): Promise<{
    valid: boolean
    message: string
  }> {
    // Mock validation
    return {
      valid: true,
      message: 'License validated successfully'
    }
  }

  // Calculate rental pricing
  async calculateRentalPricing(carId: string, pickupDate: string, returnDate: string, extras?: string[]): Promise<{
    dailyRate: number
    totalDays: number
    basePrice: number
    taxes: number
    fees: number
    extrasPrice: number
    totalPrice: number
  }> {
    const pickup = new Date(pickupDate)
    const returnDateObj = new Date(returnDate)
    const totalDays = Math.ceil((returnDateObj.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24))
    
    const dailyRate = 50 // Mock rate
    const basePrice = dailyRate * totalDays
    const taxes = basePrice * 0.12 // 12% taxes
    const fees = 25 // Fixed processing fee
    const extrasPrice = (extras?.length || 0) * 15 // $15 per extra per day
    const totalPrice = basePrice + taxes + fees + extrasPrice

    return {
      dailyRate,
      totalDays,
      basePrice,
      taxes: Math.round(taxes),
      fees,
      extrasPrice,
      totalPrice: Math.round(totalPrice)
    }
  }
}

export const carHelper = new CarHelper();