export interface User {
  id: string,
  firstName: string,
  lastName: string,
  phone: number,
  role: "user" | "admin" | "super-admin",
  email: string,
  country: string,
  dateOfBirth: string
}
