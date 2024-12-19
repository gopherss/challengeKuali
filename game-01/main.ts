/* 
Juego 01
Sea M un conjunto no vacío de números enteros, 
encuentre el primer subconjunto de 2 números de M que sumen N. 
Por ejemplo, digamos que tenemos un conjunto de números [2, 5, 8, 14, 0] y N = 10, 
el subconjunto resultante debería ser [2, 8].

Desafío
Debe crear una función que reciba una matriz (M) y un valor entero (N). 
Esta función debe devolver una matriz de la primera solución posible.
*/

const c = console.log;
const subconjunto: number[] = [2, 5, 8, 14, 0];
const valorEntero: number = 10;

const calcularSubConjunto = (subconjunto: number[], valorEntero: number): number[] => {

    let primero: number = subconjunto[0];
    let matriz: number[] = [];

    for (let i = 0; i < subconjunto.length; i++) {
        if (subconjunto[i] + primero === valorEntero) {
            matriz.push(primero, subconjunto[i]);
        }
    }

    return matriz;
}


const resultado = calcularSubConjunto(subconjunto, valorEntero);

c(resultado);