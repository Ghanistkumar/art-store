// types/razorpay.d.ts

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    handler: (response: any) => void;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    notes: {
      address: string;
    };
    theme: {
      color: string;
    };
  }
  
  interface RazorpayInstance {
    open: () => void;
    on: (event: string, handler: (response: any) => void) => void;
  }
  
  declare global {
    interface Window {
      Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
  }
  
  export {};
  