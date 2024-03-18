export class CalculosMatematicos {
  // Método para somar dois números
  static somar(
    a: number | null | undefined,
    b: number | null | undefined
  ): number {
    if (a === null || a === undefined || b === null || b === undefined) {
      return 0;
    }
    return a + b;
  }

  // Método para subtrair dois números
  static subtrair(
    a: number | null | undefined,
    b: number | null | undefined
  ): number | string {
    if (a === null || a === undefined || b === null || b === undefined) {
      return '';
    }

    const resultado = a - b;
    return parseFloat(resultado.toFixed(2));
  }

  // Método para multiplicar dois números
  static multiplicar(
    a: number | null | undefined,
    b: number | null | undefined
  ): number | undefined {
    if (a === null || a === undefined || b === null || b === undefined) {
      return undefined;
    }

    const resultado = a * b;
    return parseFloat(resultado.toFixed(2));
  }

  // Método para dividir dois números
  static dividir(
    a: number | null | undefined,
    b: number | null | undefined
  ): number {
    if (
      a === null ||
      a === undefined ||
      b === null ||
      b === undefined ||
      b === 0
    ) {
      return 0;
    }
    return a / b;
  }

  // Método para calcular o quadrado de um número
  static quadrado(numero: number | null | undefined): number {
    if (numero === null || numero === undefined) {
      return 0;
    }
    return numero * numero;
  }

  // Método para calcular a raiz quadrada de um número
  static raizQuadrada(numero: number | null | undefined): number {
    if (numero === null || numero === undefined || numero < 0) {
      return 0;
    }
    return Math.sqrt(numero);
  }
}
