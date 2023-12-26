export enum AccountRoles {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  Staff = 'staff',
  Guest = 'guest'
}

export type Account = {
  name: string;
  username: string;
  password: string;
  role: AccountRoles;
}