let contador = 0;

const incrementarContador = () => {
  contador += 1;
  console.log(`La función se ha ejecutado ${contador} veces`);
  return contador;
};

export default incrementarContador;
