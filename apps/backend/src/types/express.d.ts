declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        type: 'user';
      };
      business?: {
        id: string;
        email: string;
        companyName: string;
        type: 'business';
      };
      admin?: {
        id: string;
        email: string;
        type: 'admin';
      };
    }
  }
}

export {};