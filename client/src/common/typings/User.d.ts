type Role = 'CS' | 'ADMIN';
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  address: string;
  password: string;
  isActive: boolean;
}
