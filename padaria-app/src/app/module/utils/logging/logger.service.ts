/**
 * Os possíveis níveis de log.
 * LogLevel.Off nunca é emitido e usado apenas com a propriedade Logger.level para desativar os logs.
 */
export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug
}

/**
 * Função de manipulador de saída de log.
 */
export type LogOutput = (source: string | undefined, level: LogLevel, ...objects: unknown[]) => void;

/**
 * Sistema logger simples, com a possibilidade de registrar saídas personalizadas.
 *
 * São fornecidos 4 níveis de log diferentes, com os métodos correspondentes:
 * - debug   : para informações de depuração
 * - info    : para status informativo do aplicativo (sucesso, ...)
 * - warning : para erros não críticos que não impedem o comportamento normal do aplicativo
 * - error   : por erros críticos que impedem o comportamento normal do aplicativo
 *
 * Exemplo de uso:
 *
 * ```ts
 * import { Logger } from '@movtech/menu/logging';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * Para desativar os logs de depuração e informações na produção, adicione este trecho ao seu componente raiz:
 *
 * ```ts
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 * ```
 *
 * Se você deseja processar logs através de outras saídas além do console, você pode adicionar funções LogOutput a Logger.outputs.
 */
export class Logger {

  /**
   * Nível de log atual.
   * Defina-o como LogLevel.Off para desativar completamente os logs.
   */
  static level = LogLevel.Debug;

  /**
   * Saídas de log adicionais.
   */
  static outputs: LogOutput[] = [];

  /**
   * Ativa o modo de produção.
   * Define o nível de log como LogLevel.Warning.
   */
  static enableProdMode(): void {
    Logger.level = LogLevel.Warning;
  }

  constructor(private source?: string) { }

  /**
   * Registra mensagens ou objetos com o nível de depuração.
   * Funciona da mesma forma que console.log().
   */
  debug(...objects: unknown[]): void {
    this.log(console.log, LogLevel.Debug, objects);
  }

  /**
   * Registra mensagens ou objetos com o nível de informação.
   * Funciona da mesma forma que console.info().
   */
  info(...objects: unknown[]): void {
    // tslint:disable-next-line: no-console
    this.log(console.info, LogLevel.Info, objects);
  }

  /**
   * Registra mensagens ou objetos com o nível de aviso.
   * Funciona da mesma forma que console.warn().
   */
  warn(...objects: unknown[]): void {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  /**
   * Registra mensagens ou objetos com o nível de erro.
   * Funciona da mesma forma que console.error().
   */
  error(...objects: unknown[]): void {
    this.log(console.error, LogLevel.Error, objects);
  }

  private log(func: (...args: unknown[]) => void, level: LogLevel, objects: unknown[]): void {
    if (level <= Logger.level) {
      const log = this.source ? (['[' + this.source + ']'] as unknown[]).concat(objects) : objects;
      func.apply(console, log);
      Logger.outputs.forEach(output => output.apply(output, [this.source, level, ...objects]));
    }
  }

}
