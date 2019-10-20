export default class TemperatureModel {
  public id?: number;
  public date?: string;
  public time?: string; 
  public zipcode?: string;
  public city_name?: string;
  public district?: string;
  public address?: string;
  public temperature?: number;
  public unit?: string;

  constructor(
    id: number,
    date: string,
    time: string, 
    zipcode: string,
    city_name: string,
    district: string,
    address: string,
    temperature: number,
    unit: string,
  ){
    this.id = id;
    this.date = date;
    this.time = time;
    this.zipcode = zipcode;
    this.city_name = city_name;
    this.district = district;
    this.address = address;
    this.temperature = temperature;
    this.unit = unit;
  }
}