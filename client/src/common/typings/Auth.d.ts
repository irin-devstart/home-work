interface LoginAuth {
  email: string;
  password: string;
}

interface Login {
  token: string;
  user: Omit<User, 'password'>;
}
