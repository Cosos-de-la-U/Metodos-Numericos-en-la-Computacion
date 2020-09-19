function getMetodoMuller() {
  //Obteniendo variables
  var X0 = document.getElementById("limiteInferior").value;
  var X1 = document.getElementById("limiteSuperior").value;
  var expression = document.getElementById("eq").value;

  var head = `<table>
        <thead>
            <th scope="col">Iteración</th>
            <th scope="col">X0</th>
            <th scope="col">X1</th>
            <th scope="col">X2</th>
            <th scope="col">f(X0)</th>
            <th scope="col">f(X1)</th>
            <th scope="col">f(X2)</th> 
            <th scope="col">h0</th>
            <th scope="col">h1</th>
            <th scope="col">D0</th>
            <th scope="col">D1</th>
            <th scope="col">a</th>
            <th scope="col">b</th>
            <th scope="col">c</th>
            <th scope="col">X3</th>
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

  //Calcular X2
  console.log("X0 : " + X0);
  console.log("X1 : " + X1);
  var X2 = (parseFloat(X1) + parseFloat(X0)) / 2;
  console.log("X2 : " + X2);

  //Inicio iteración
  let i = 0;

  //Calculado funcion en F(X0)
  var scope = {
    x: X0,
  };

  var fX0 = math.evaluate(expression, scope);

  //Calculado funcion en F(X1)
  scope = {
    x: X1,
  };

  var fX1 = math.evaluate(expression, scope);

  //Calculado funcion en F(X2)
  scope = {
    x: X2,
  };

  var fX2 = math.evaluate(expression, scope);

  //Calculando h0
  var h0 = parseFloat(X1 - X0);

  //Calculando h1
  var h1 = parseFloat(X2 - X1);

  //Calculando D0
  var D0 = parseFloat((fX1 - fX0) / (X1 - X0));

  //Calculando D1
  var D1 = parseFloat((fX2 - fX1) / (X2 - X1));

  //calculando A
  var a = parseFloat((D1 - D0) / (h1 - h0));

  //calculando B
  var b = parseFloat(a * h1 + D1);

  //calculando C
  var c = fX2;

  //Calculando X3
  var raiz = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
  console.log("raiz : " + raiz);
  var x3 =
    b >= 0
      ? parseFloat(X2) - (c * 2) / (parseFloat(b) + parseFloat(raiz))
      : parseFloat(X2) - (c * 2) / (parseFloat(b) - parseFloat(raiz));

  var row = `<tr class="bg-secondary">
    <td class="font-weight-bold">${i}</td>
    <td>${parseFloat(X0).toFixed(6)}</td>
    <td>${parseFloat(X1).toFixed(6)}</td>
    <td>${parseFloat(X2).toFixed(6)}</td>
    <td>${parseFloat(fX0).toFixed(6)}</td>
    <td>${parseFloat(fX1).toFixed(6)}</td>
    <td>${parseFloat(fX2).toFixed(6)}</td>
    <td>${parseFloat(h0).toFixed(6)}</td>
    <td>${parseFloat(h1).toFixed(6)}</td>
    <td>${parseFloat(D0).toFixed(6)}</td>
    <td>${parseFloat(D1).toFixed(6)}</td>
    <td>${parseFloat(a).toFixed(6)}</td>
    <td>${parseFloat(b).toFixed(6)}</td>
    <td>${parseFloat(c).toFixed(6)}</td>
    <td>${parseFloat(x3).toFixed(6)}</td>
    <td></td>
        </tr>`;
  //Añadiento rowsgetMetodoMuller
  rows.innerHTML += row;
  //contando iteraciones
  i += 1;
  console.log(i);

  //DO
  do {
    //Calcular X0
    X0 = parseFloat(X1);

    //Calcular X1
    X1 = parseFloat(X2);

    //Calcular X2
    X2 = parseFloat(x3);

    //Calculado funcion en F(X0)
    scope = {
      x: X0,
    };

    fX0 = math.evaluate(expression, scope);

    //Calculado funcion en F(X1)
    scope = {
      x: X1,
    };

    fX1 = math.evaluate(expression, scope);

    //Calculado funcion en F(X2)
    scope = {
      x: X2,
    };

    fX2 = math.evaluate(expression, scope);

    //Calculando h0
    h0 = X1 - X0;

    //Calculando h1
    h1 = X2 - X1;

    //Calculando D0
    D0 = (fX1 - fX0) / (X1 - X0);

    //Calculando D1
    D1 = (fX2 - fX1) / (X2 - X1);

    //calculando A
    a = (D1 - D0) / (h1 - h0);

    //calculando B
    b = a * h1 + D1;

    //calculando C
    c = fX2;

    //Calculando X3
    X3pasado = x3;
    raiz = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
    console.log("raiz : " + raiz);
    x3 =
      b >= 0
        ? parseFloat(X2) - (c * 2) / (parseFloat(b) + parseFloat(raiz))
        : parseFloat(X2) - (c * 2) / (parseFloat(b) - parseFloat(raiz));

    //Error
    Ea = math.abs(((x3 - X3pasado) / x3) * 100);
    console.log("Ea : " + Ea);

    //Cuando se llegue al minimo error lo marque en verde
    var sucesss = parseFloat(Ea) > 0.001 ? "bg-secondary" : "bg-success";

    var row = `<tr class="${sucesss}">
      <td class="font-weight-bold">${i}</td>
      <td>${parseFloat(X0).toFixed(6)}</td>
      <td>${parseFloat(X1).toFixed(6)}</td>
      <td>${parseFloat(X2).toFixed(6)}</td>
      <td>${parseFloat(fX0).toFixed(6)}</td>
      <td>${parseFloat(fX1).toFixed(6)}</td>
      <td>${parseFloat(fX2).toFixed(6)}</td>
      <td>${parseFloat(h0).toFixed(6)}</td>
      <td>${parseFloat(h1).toFixed(6)}</td>
      <td>${parseFloat(D0).toFixed(6)}</td>
      <td>${parseFloat(D1).toFixed(6)}</td>
      <td>${parseFloat(a).toFixed(6)}</td>
      <td>${parseFloat(b).toFixed(6)}</td>
      <td>${parseFloat(c).toFixed(6)}</td>
      <td>${parseFloat(x3).toFixed(6)}</td>
      <td>${parseFloat(Ea).toFixed(6)}</td>
          </tr>`;
    //Añadiento rowsgetMetodoMuller
    rows.innerHTML += row;
    //contando iteraciones
    i += 1;
    console.log(i);

    console.log("iteracion : " + i);
  } while (parseFloat(Ea) > 0.001 || i > 150);
}
