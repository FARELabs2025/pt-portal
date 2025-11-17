export interface User {
  _id?: string;
  username: string;
  email: string;
  name: string;
  labName: string;
  accreditationNo?: string;
  mobileNo: string;
  county?: string;
  postalZipCode: string;
  city?: string;
  address?: string;
  labCode?: string;
  role: 'user' | 'admin';
  registrationStatus: 'pending' | 'approved' | 'rejected';
  isEmailSent?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  token?: string;
}


