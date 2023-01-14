export interface Startup {
  id?: string,
  companyName: string,
  logo: string,
  city: string,
  founder?: string,
  numOfEmployees?: number,
  yearOfEstablishment?: number,
  website?: string,
  email?: string,
  phone?: string,
  location?: {
    latitude: number,
    longitude: number
  }
}
