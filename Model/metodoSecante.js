//Metodo de secante
function getMetodoSecante(){
  //Obteniendo variables
  var XiAnterior = document.getElementById("limiteInferior").value;
  var XiPresente = document.getElementById("limiteSuperior").value;
  var expression = document.getElementById("eq").value;

  var head = `<table>
      <thead>
          <th scope="col">Iteración</th>
          <th scope="col">Xi</th>
          <th scope="col">(Xi-Xi-1)</th>
          <th scope="col">f(Xi)</th>
          <th scope="col">f(Xi-1)</th>
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

  var row = `<tr class="bg-secondary">
  <td class="font-weight-bold">${i}</td>
  <td>${parseFloat(XiAnterior).toFixed(6)}</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
      </tr>`;
  //Añadiento rows
  rows.innerHTML += row;
  //contando iteraciones
  i += 1;
  console.log(i);

  //Segunda iteracion
    //traemos XiPresente
    //Calculado funcion en F(Xi)
    scope = {
      x: XiPresente,
    };
    console.log("fXi : " + math.evaluate(expression, scope));
    var fXiPresente = math.evaluate(expression, scope);

    //Calcular f(Xi-1)
    scope = {
      x: XiAnterior,
    };
    var fXiAnterior = math.evaluate(expression, scope);

    //Calcular Xi-Xi-1
    var fXiXiMinusONe = XiPresente - XiAnterior;

    //Reescribiendo
    var row = `<tr class="bg-secondary">
    <td class="font-weight-bold">${i}</td>
    <td>${parseFloat(XiPresente).toFixed(6)}</td>
    <td>${parseFloat(fXiPresente).toFixed(6)}</td>
    <td>${parseFloat(fXiAnterior).toFixed(6)}</td>
    <td>${parseFloat(fXiXiMinusONe).toFixed(6)}</td>
    <td></td>
      </tr>`;
    //Añadiento rows
    rows.innerHTML += row;
    //contando iteraciones
    i += 1;
    console.log("iteracion : " + i);

  //DO
  do {
    //Calcular Xi
    XiAnterior = XiPresente;
    XiPresente = XiAnterior - (fXiPresente * fXiXiMinusONe)/(fXiPresente-XiAnterior); 

    //Calculado funcion en F(Xi)
    scope = {
      x: XiPresente,
    };
    console.log("fXi : " + math.evaluate(expression, scope));
    var fXiPresente = math.evaluate(expression, scope);

    //Calcular f(Xi-1)
    scope = {
      x: XiAnterior,
    };
    var fXiAnterior = math.evaluate(expression, scope);

    //Calcular Xi-Xi-1
    var fXiXiMinusONe = XiPresente - XiAnterior;

    //Error
    var Ea = math.abs(((XiPresente - XiAnterior) / XiPresente) * 100);
    console.log("Ea : " + Ea);

    //Cuando se llegue al minimo error lo marque en verde
    var sucesss = parseFloat(Ea) > 0.001 ? "bg-secondary" : "bg-success";

    //Reescribiendo
    var row = `<tr class=${sucesss}>
    <td class="font-weight-bold">${i}</td>
    <td>${parseFloat(XiPresente).toFixed(6)}</td>
    <td>${parseFloat(fXiPresente).toFixed(6)}</td>
    <td>${parseFloat(fXiAnterior).toFixed(6)}</td>
    <td>${parseFloat(fXiXiMinusONe).toFixed(6)}</td>
    <td>${parseFloat(Ea).toFixed(6)}</td>
      </tr>`;
    //Añadiento rows
    rows.innerHTML += row;
    //contando iteraciones
    i += 1;
    console.log("iteracion : " + i);
  } while (parseFloat(Ea) > 0.001 || i > 150);
}