
//Metodo biseccion
function getMetodoBiseccion() {
  //Obteniendo variables
  var Xa = document.getElementById("limiteInferior").value;
  var Xb = document.getElementById("limiteSuperior").value;
  var expression = document.getElementById("eq").value;

  var head = `<table>
      <thead>
          <th scope="col">Iteración</th>
          <th scope="col">Xa</th>
          <th scope="col">Xb</th>
          <th scope="col">Xr</th>
          <th scope="col">f(Xa)</th>
          <th scope="col">f(Xr)</th>
          <th scope="col">f(Xa)f(Xr)</th>
          <th scope="col">Error</th>
      </thead>
      <tbody id="tableRows">

      </tbody>
    </table>`;

  //Para ver en donde se van a meter las tablas
  var table = document.getElementById("buildTable");
  table.innerHTML = head;
  //Ahora que se creo deberiamos poder agarrar este ID
  var rows = document.getElementById("tableRows");

  //Inicio iteración
  let i = 0;

  //Calcular Xr
  var Xr = (parseFloat(Xa) + parseFloat(Xb)) / 2;
  console.log("Xa : " + Xa);
  console.log("Xb : " + Xb);
  console.log("Xr : " + Xr);

  //Calculado funcion en F(Xa)
  var scope = {
    x: Xa,
  };
  console.log("fXa : " + math.evaluate(expression, scope));
  var fXa = math.evaluate(expression, scope);

  //Calcular funcion en F(Xr)
  scope = {
    x: Xr,
  };
  console.log("fXr : " + math.evaluate(expression, scope));
  var fXr = math.evaluate(expression, scope);

  //Multiplicar f(Xa)f(Xr)
  var fXaXr = fXa * fXr;
  console.log("f(Xa)f(Xr) : " + fXaXr);

  var row = `<tr class="bg-secondary">
  <td class="font-weight-bold">${i}</td>
  <td>${parseFloat(Xa).toFixed(6)}</td>
  <td>${parseFloat(Xb).toFixed(6)}</td>
  <td>${parseFloat(Xr).toFixed(6)}</td>
  <td>${parseFloat(fXa).toFixed(6)}</td>
  <td>${parseFloat(fXr).toFixed(6)}</td>
  <td>${parseFloat(fXaXr).toFixed(6)}</td>
  <td>${parseFloat(Ea).toFixed(6)}</td>
      </tr>`;
  //Añadiento rows
  rows.innerHTML += row;
  //contando iteraciones
  i += 1;
  console.log(i);

  //DO
  do {
    //Nuevos valores de Xa y Xb en la nueva iteracion
    Xa = fXaXr < 0 ? Xa : Xr;
    Xb = fXaXr > 0 ? Xb : Xr;

    //Calcular Xr
    var XrAnterior = Xr;
    Xr = (parseFloat(Xa) + parseFloat(Xb)) / 2;
    console.log("Xa : " + Xa);
    console.log("Xb : " + Xb);
    console.log("Xr : " + Xr);

    //Calculado funcion en F(Xa)
    scope = {
      x: Xa,
    };
    console.log("fXa : " + math.evaluate(expression, scope));
    fXa = math.evaluate(expression, scope);

    //Calcular funcion en F(Xr)
    scope = {
      x: Xr,
    };
    console.log("fXr : " + math.evaluate(expression, scope));
    fXr = math.evaluate(expression, scope);

    //Multiplicar f(Xa)f(Xr)
    fXaXr = fXa * fXr;
    console.log("f(Xa)f(Xr) : " + fXaXr);

    //Error
    var Ea = math.abs(((Xr - XrAnterior) / Xr) * 100);
    console.log("Ea : " + Ea);

    //Cuando se llegue al minimo error lo marque en verde
    var sucesss = parseFloat(Ea) > 0.001 ? "bg-secondary" : "bg-success";

    //Reescribiendo
    var row = `<tr class=${sucesss}>
        <td class="font-weight-bold">${i}</td>
        <td>${parseFloat(Xa).toFixed(6)}</td>
        <td>${parseFloat(Xb).toFixed(6)}</td>
        <td>${parseFloat(Xr).toFixed(6)}</td>
        <td>${parseFloat(fXa).toFixed(6)}</td>
        <td>${parseFloat(fXr).toFixed(6)}</td>
        <td>${parseFloat(fXaXr).toFixed(6)}</td>
        <td>${parseFloat(Ea).toFixed(6)}</td>
      </tr>`;
    //Añadiento rows
    rows.innerHTML += row;
    //contando iteraciones
    i += 1;
    console.log("iteracion : " + i);
  } while (parseFloat(Ea) > 0.001);
}
