export interface User {
    name: string;
    phone: string;
    account: {
      email: string;
      confirm: string;
    }
}