export interface Startup {
  id?: string,
  companyName: string,
  logo: string,
  sector: string[];
  city: string,
  founder?: string,
  numOfEmployees?: string,
  yearOfEstablishment?: string,
  website?: string,
  email?: string,
  phone?: string,
  location?: {
    latitude: string,
    longitude: string
  }
}
