import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipCodeAddresses } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeAddressesService {
  constructor(private httpCliente: HttpClient) {}

  getZipCodeAddresses(zipCodeAddresses: string) {
    console.log('service', zipCodeAddresses);
    return this.httpCliente.get<ZipCodeAddresses>(
      `https://viacep.com.br/ws/${zipCodeAddresses}/json/`
    );
  }
}
