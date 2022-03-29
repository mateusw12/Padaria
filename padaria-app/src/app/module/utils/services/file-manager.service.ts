import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileManagerService {

    public arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    public downloadFile(binaryObject: string, fileName: string): void {
        const blob = this.convertFileToBlob(binaryObject);
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', blobUrl);
        link.setAttribute('download', fileName);
        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }

    private convertFileToBlob(b64Data: string): Blob {
        const sliceSize = 512;
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: 'octet/stream' });
    }
    
}
