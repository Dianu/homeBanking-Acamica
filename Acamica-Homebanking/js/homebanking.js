//Declaración de variables

const nombreUsuario = "Diana M";
let saldoCuenta = 5080;
let limiteExtraccion = 3000;
const codigoSeguridad = 1234;

// Variables de Servicios
const agua = 350;
const telefono = 425;
const luz = 210;
const internet = 570;

// Cuentas amigas para transferencia de dinero
const cuentaAmiga1 = 1234567;
const cuentaAmiga2 = 7654321;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones básicas del homebanking
function sumarDinero(monto) {
    saldoCuenta += monto;
}

function restarDinero(monto) {
	saldoCuenta -= monto;
}

function haySaldoDisponible(monto) {
	return (monto<=saldoCuenta);
}

function noSuperaLimiteExtraccion (monto) {
	return (monto <= limiteExtraccion);
}

function puedePagarCon100 (monto) {
	return ((monto % 100) == 0);
}

function cambiarLimiteDeExtraccion() {
    let nuevoLimite = parseInt(prompt("Ingrese el nuevo límite de extracción:"));
    if (!isNaN(nuevoLimite) && (nuevoLimite > 0)) {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla();
        alert("Su nuevo límite de extracción es: $" + limiteExtraccion);
    }    
}

function extraerDinero() {
    let monto = parseInt(prompt("Ingrese el monto a extraer:"));
    if (!isNaN(monto) && (monto > 0)) {
        if (haySaldoDisponible(monto)) {
            if (noSuperaLimiteExtraccion(monto)) {
                if (puedePagarCon100(monto)) {
    	            let saldoAnterior = saldoCuenta;
    	            restarDinero(monto);
    	            actualizarSaldoEnPantalla();
                    alert("Has retirado: $" + monto + "\nSaldo anterior: $" + saldoAnterior + "\nSaldo actual: $" + saldoCuenta);
                } else {
                    alert("Sólo puedes extraer billetes de $100.");
                }
            } else {
                alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción.");
            }       
        } else {
    		alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.");
        }
    }
}

function depositarDinero() {
    let monto = parseInt(prompt("Ingrese el monto a depositar:"));
    if (!isNaN(monto) && (monto > 0)) { 
	    let saldoAnterior = saldoCuenta;
	    sumarDinero(monto);
        actualizarSaldoEnPantalla();
        alert("Has depositado: $" + monto + "\nSaldo anterior: $" + saldoAnterior + "\nSaldo actual: $" + saldoCuenta);
    }
}


function realizarPagoDelServicio (servicio,nombreServicio) {
    if (haySaldoDisponible(servicio)) {
        let saldoAnterior = saldoCuenta;
        restarDinero(servicio);
        actualizarSaldoEnPantalla();
        alert("Has pagado el servicio " + nombreServicio + ".\nSaldo anterior: $" + saldoAnterior + "\nDinero descontado: $" + servicio + "\nSaldo actual: $" + saldoCuenta);
    } else {
        alert("No hay suficiente saldo en tu cuenta para pagar este servicio.");
    }
}

function pagarServicio() {
    let servicio = parseInt(prompt("Ingrese el número que corresponda con el servicio que querés pagar:\n1 - Agua \n2 - Teléfono \n3 - Luz \n4 - Internet"));
    if (!isNaN(servicio)) {
        switch (servicio) {
            case 1:
                const serv1 = "Agua";
                realizarPagoDelServicio(agua,serv1);
            break;
            case 2:
                const serv2 = "Teléfono";
                realizarPagoDelServicio(telefono,serv2);
            break;
            case 3:
                const serv3 = "Luz";
                realizarPagoDelServicio(luz,serv3);
            break;
            case 4:
                const serv4 = "Internet";
                realizarPagoDelServicio(internet,serv4);
            break;
            default:
                alert("El servicio seleccionado no existe.");
        }
    }
}

function transferirDinero() {
    let monto = parseInt(prompt("Ingrese el monto que desea transferir:"));
    if (!isNaN(monto) && (monto > 0)) {
    if (haySaldoDisponible(monto)) {
        let cuentaAmiga = parseInt(prompt("Ingrese el número de la cuenta a la que desea tranferir el dinero: " +
                                         "\nCuenta amiga 1: " + cuentaAmiga1 + "\nCuenta amiga 2: " + cuentaAmiga2));
        if ((cuentaAmiga === cuentaAmiga1) || (cuentaAmiga === cuentaAmiga2)) {
            restarDinero(monto);
            actualizarSaldoEnPantalla();
            alert("Se han transferido $" + monto + "\nCuenta destino:" + cuentaAmiga);
        } else {
            alert("Sólo puede transferirse dinero a una cuenta amiga.");
        }
    } else {
        alert("Su saldo es insuficiente para realizar esta transferencia.");
    }
    } else {
        alert("Por favor, ingrese un monto válido.");
    }
}

function iniciarSesion() {
    let codigo = parseInt(prompt("Ingrese su código de seguridad:"));
    if (!isNaN(codigo)) {
        if (codigo === codigoSeguridad) {
            alert("Bienvenido/a " + nombreUsuario + ", ya puedes comenzar a realizar operaciones.");
        } else {
            saldoCuenta -= saldoCuenta;
            alert("Código incorrecto. Su dinero ha sido retenido por cuestiones de seguridad.");
        }
    } else {
        saldoCuenta -= saldoCuenta;
        alert("No ha realizado ninguna acción. Su dinero ha sido retenido por cuestiones de seguridad.");
    }
}

iniciarSesion();

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}