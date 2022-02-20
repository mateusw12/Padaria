import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipCodeAddresses } from '@models/src';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeAddressesService {
  constructor(private httpCliente: HttpClient) {}

  getZipCodeAddresses(zipCodeAddresses: string) {
    return this.httpCliente.get<ZipCodeAddresses>(
      `https://viacep.com.br/ws/${zipCodeAddresses}/json/`
    );
  }
}
