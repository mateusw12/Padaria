import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipCodeAddresses } from '@module/models';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeAddressesRepository {
  constructor(private httpCliente: HttpClient) {}

  getZipCodeAddresses(zipCodeAddresses: string) {
    return this.httpCliente.get<ZipCodeAddresses>(
      `https://viacep.com.br/ws/${zipCodeAddresses}/json/`
    );
  }
}
