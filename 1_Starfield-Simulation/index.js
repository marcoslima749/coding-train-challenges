const canvas = document.getElementById("canvas");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");

  //Los atributos width / height del canvas no están definidos (por default 300 / 150)
  //como quiero que sean del total de la pantalla los seteo con javascript y más adelante pongo un listener para actualizarlo
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let width = canvas.width;
  let height = canvas.height;

  const cantidadEstrellas = 100;
  const tamanioMaximoEstrella = 5;

  const getEstrellas = (cantEstrellas) => {
    return Array.from({ length: cantEstrellas }, () => {
      return {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        z: Math.floor(Math.random() * (tamanioMaximoEstrella - 1) + 1), // El radio es un valor entre 1 y el tamaño máximo
      };
    });
  };

  let arrEstrellas = getEstrellas(cantidadEstrellas);

  //Cuando se cambie la ventana hay que ajustar las dimensiones del canvas y repintar las estrellas
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    arrEstrellas = getEstrellas(cantidadEstrellas);
  });

  //Las estrellas se tienen que mover desde el centro a la periferia y acercarse (aumentar el tamaño => z)
  //A medida que se acercan tienen que acelerar

  let atenuador = 50;
  const moverX = (x) => x + (x - width / 2) / atenuador;
  const moverY = (y) => y + (y - height / 2) / atenuador;

  const starField = (estrellas) => {
    //Acá va la animación

    ctx.fillStyle = "#ffffff";

    let newEstrellas = estrellas.map(({ x, y, z }, index) => {
      ctx.fillRect(
        moverX(x) > width || moverX(x) < 0
          ? Math.floor(Math.random() * width)
          : moverX(x),
        moverY(y) > height || moverY(y) < 0
          ? Math.floor(Math.random() * height)
          : moverY(y),
        z,
        z
      );
      return {
        x:
          moverX(x) > width || moverX(x) < 0
            ? Math.floor(Math.random() * width)
            : moverX(x),
        y:
          moverY(y) > height || moverY(y) < 0
            ? Math.floor(Math.random() * height)
            : moverY(y),
        z,
      };
    });

    //Se llama a sí misma en el siguiente frame para crear la animación.
    window.requestAnimationFrame(() => {
      //Borra todo el canvas para redibujarlo
      ctx.clearRect(0, 0, width, height);
      starField(newEstrellas);
    });
  };

  starField(arrEstrellas);
}
