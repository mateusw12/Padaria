import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { ZipCodeAddresses } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeAddressesService implements AfterViewInit {
  constructor(private httpCliente: HttpClient) {}

  ngAfterViewInit(): void {}

  getZipCodeAddresses(zipCodeAddresses: string) {
    return this.httpCliente.get<ZipCodeAddresses>(
      `https://viacep.com.br/ws/${zipCodeAddresses}/json/`
    );
  }
}
