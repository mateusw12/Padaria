export interface AppFile extends Blob {
  arrayBuffer: () => Promise<ArrayBuffer>;
}
