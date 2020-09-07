function getPuntoFijo() {
  //Obteniendo variables
  var Xi = document.getElementById("limiteInferior").value;
  var expression = document.getElementById("eq").value;

  var head = `<table>
      <thead>
          <th scope="col">Iteración</th>
          <th scope="col">Xi</th>
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

  //Calculado funcion en F(Xi)
  scope = {
    x: Xi,
  };
  console.log("fXi : " + math.evaluate(expression, scope));
  var fXi = math.evaluate(expression, scope);

  //Error
  var Ea = math.abs(((fXi - Xi) / fXi) * 100);
  console.log("Ea : " + Ea);

  var row = `<tr class="bg-secondary">
  <td class="font-weight-bold">${i}</td>
  <td>${parseFloat(Xi).toFixed(6)}</td>
  <td></td>
      </tr>`;
  //Añadiento rows
  rows.innerHTML += row;
  //contando iteraciones
  i += 1;
  console.log(i);

  //Reescribiendo
  var row = `<tr class="bg-secondary">
    <td class="font-weight-bold">${i}</td>
    <td>${parseFloat(fXi).toFixed(6)}</td>
    <td>${parseFloat(Ea).toFixed(6)}</td>
      </tr>`;
  //Añadiento rows
  rows.innerHTML += row;
  //contando iteraciones
  i += 1;
  console.log("iteracion : " + i);

  //DO
  do {
    Xi = fXi;
    //Calculado funcion en F(Xi)
    scope = {
      x: Xi,
    };
    console.log("fXi : " + math.evaluate(expression, scope));
    fXi = math.evaluate(expression, scope);

    //Error
    Ea = math.abs(((fXi - Xi) / fXi) * 100);
    console.log("Ea : " + Ea);

    //Cuando se llegue al minimo error lo marque en verde
    var sucesss = parseFloat(Ea) > 0.001 ? "bg-secondary" : "bg-success";

    //Reescribiendo
    row = `<tr class=${sucesss}>
    <td class="font-weight-bold">${i}</td>
    <td>${parseFloat(fXi).toFixed(6)}</td>
    <td>${parseFloat(Ea).toFixed(6)}</td>
      </tr>`;
    //Añadiento rows
    rows.innerHTML += row;
    //contando iteraciones
    i += 1;
    console.log("iteracion : " + i);
  } while (parseFloat(Ea) > 0.001 || i > 150);
}
