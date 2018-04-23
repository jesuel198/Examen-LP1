function add(){
    var tabla = document.getElementById("data");
    var producto = document.getElementById("select").value;
    var cantidad = parseFloat(document.getElementById("cant").value);
    var subtotal1 = 0;
    var subtotal2 = document.getElementById("sub2");
    var total = document.getElementById("tot");
    var igv = document.getElementById("igv");
    
    var precio = calcularPrecio();
    subtotal1 = precio * cantidad;
    
    var fila = "<tr><td>" + producto + "</td><td>" + precio + "</td><td>" + cantidad + "</td><td>" + subtotal1.toFixed(2) + "</td><td><a href='#' onclick='delet(this)'><img src='../img/delete.png'></td></tr>";
    
    var fil = document.createElement("tr");
    fil.innerHTML = fila;
    
    if(evaluarRepetidos(producto, tabla, cantidad)){
        if(!producto == "" && !cantidad<=0){
            tabla.appendChild(fil);
        } else{
            alert("¡Llene los datos!");
        }
    }
    subtotal2.value = calcularSubtotal2(tabla).toFixed(2);
    igv.value = calcularIGV(tabla).toFixed(2);
    total.value = calcularTotal(parseFloat(subtotal2.value), parseFloat(igv.value)).toFixed(2);
    clean();
}



function clean(){
    document.getElementById("select").value = blank;
    document.getElementById("cant").value = "";
}

function calcularPrecio(){
    var prod = document.getElementById("select").value;
    
    if(prod === 'Carpa'){
        return 349.9;
    } else if(prod === 'Sleeping'){
        return 89.9;
    } else if(prod === 'Cantimplora'){
        return 15.9;
    }
    
    return 0;
}

function calcularSubtotal2(ob){
    var x = 0;
    for(i=1; i < ob.rows.length; i++){
        var y = parseFloat(ob.rows[i].cells[3].innerText);
        x = x+y;
    }
    return x;
}

function calcularIGV(ob){
    var x = 0;
    for(i=1; i < ob.rows.length; i++){
        var y = parseFloat(ob.rows[i].cells[3].innerText);
        x = x+y;
    }
    var z = x * 0.18;
    return z;
}

function calcularTotal(a, b){
    return a+b;
}

function evaluarRepetidos(str, tbl, cant){
    if(tbl.rows.length > 1){
        for(i=1; i < tbl.rows.length; i++){
            var cond = tbl.rows[i].cells[0].innerText;
            if(str == cond){
                tbl.rows[i].cells[2].innerHTML = parseFloat(tbl.rows[i].cells[2].innerText) + cant;
                var subtotal1 = 0;
                var precio = calcularPrecio();
                subtotal1 = precio * cant;
                tbl.rows[i].cells[3].innerHTML = (parseFloat(tbl.rows[i].cells[3].innerText)+subtotal1).toFixed(2);
                return false;
            }
        }
    }
    
    return true;
}

function delet(ob){
    var opc = confirm("¿Desea sacar del carrito de compras?");
    if (opc == true) {
        var n = ob.parentNode.parentNode.rowIndex;
        document.getElementById("data").deleteRow(n);
    }
    var tabla = document.getElementById("data");
    var subtotal2 = document.getElementById("sub2");
    var total = document.getElementById("tot");
    var igv = document.getElementById("igv");
    subtotal2.value = calcularSubtotal2(tabla).toFixed(2);
    igv.value = calcularIGV(tabla).toFixed(2);
    total.value = calcularTotal(parseFloat(subtotal2.value), parseFloat(igv.value)).toFixed(2);
}