interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  isActive: boolean;
}

interface UserForm
  extends Omit<User, 'createdAt' | 'updatedAt' | 'isActive' | 'password'> {}

interface UserStatus extends Pick<User, 'isActive' | 'id'> {}
