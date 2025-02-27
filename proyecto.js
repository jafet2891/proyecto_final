// ------------------------------------------------------
// Algoritmo para cotización de seguros TK-U
// Versión "muy Junior" con validaciones básicas, 
// comentarios explicativos y nuevas funcionalidades:
//   1) Se solicita realizar múltiples cotizaciones hasta que 
//      el usuario ingrese la palabra "Salir".
//   2) Se agregan recargos extra basados en:
//        a) Cantidad de propiedades: 35% de la cotización base por propiedad.
//        b) Ingresos (salario) del asegurado: 5% del salario del asegurado.
//
// ------------------------------------------------------

// ------------------------------------------------------
// 1. Definición de variables globales base y porcentajes
// ------------------------------------------------------

// Precio base de la cotización en quetzales
var precio_base = 2000 

// Porcentajes de recargo por edad (asegurado y cónyuge)
var edad_18 = 0.1  // 10% si la edad está entre 18 y 24
var edad_25 = 0.2  // 20% si la edad está entre 25 y 49
var edad_50 = 0.3  // 30% si la edad es >= 50

// Porcentaje de recargo por cada hijo (independientemente de la edad)
var hijos_recargo = 0.2 // 20%

// Porcentaje de recargo por propiedades
var propiedades_recargo = 0.35 // 35% de la cotización base por cada propiedad

// Porcentaje de recargo sobre el salario
var salario_recargo = 0.05 // 5% del salario del asegurado

// ------------------------------------------------------
// 2. Bucle principal para solicitar cotizaciones 
//    hasta que se ingrese "Salir"
// ------------------------------------------------------
var continuar = true

while (continuar) {
  // ------------------------------------------------------
  // 2.1. Preguntamos si el usuario quiere salir antes de iniciar
  //      una nueva cotización
  // ------------------------------------------------------
  var opcionSalida = prompt(
    "Para iniciar una nueva cotización presione Enter. Para salir, escriba 'Salir':"
  )
  if (opcionSalida && opcionSalida.toUpperCase() === "SALIR") {
    // Si el usuario escribe "Salir", rompemos el ciclo
    continuar = false
    // Mensaje opcional de despedida
    alert("Saliendo del sistema de cotizaciones. ¡Gracias!")
    break
  }

  // ------------------------------------------------------
  // 2.2. Variables de cálculo para la cotización actual
  // ------------------------------------------------------
  var recargo = 0         // Se almacenará cada recargo parcial
  var recargo_total = 0   // Acumulará la suma de todos los recargos
  var precio_final = 0     // Almacena el resultado final (precio_base + recargos)

  // ------------------------------------------------------
  // 3. Solicitud de datos al usuario con validaciones básicas
  // ------------------------------------------------------

  // a) Solicitar nombre
  var nombre = prompt("Ingrese su nombre, por favor:")

  // b) Solicitar edad con validación sencilla
  var edad = prompt("¿Cuántos años tiene? Ingrese solamente números:")
  var edad_numero = parseInt(edad)

  // Validación básica de edad
  if (isNaN(edad_numero) || edad_numero <= 0) {
    alert("Ha ingresado una edad inválida. Se asignará 18 años por defecto.")
    edad_numero = 18
  }

  // c) Verificar si el usuario está casado
  var casado = prompt("¿Está casado(a) actualmente? (Responda SI o NO)")
  var edad_conyuge_numero = 0 // Valor por defecto para la edad del cónyuge

  // Si está casado, pedir la edad del cónyuge y validar
  if (casado.toUpperCase() === "SI") {
    var edad_conyuge = prompt("¿Qué edad tiene su esposo(a)? Ingrese solamente números:")
    edad_conyuge_numero = parseInt(edad_conyuge)

    if (isNaN(edad_conyuge_numero) || edad_conyuge_numero <= 0) {
      alert("Ha ingresado una edad de cónyuge inválida. Se asignará 18 años por defecto.")
      edad_conyuge_numero = 18
    }
  }

  // d) Solicitar si tiene hijos y cuántos
  var hijos = prompt("¿Tiene hijos o hijas? (Responda SI o NO)")
  var cantidad_hijos = 0 // Valor por defecto para la cantidad de hijos

  if (hijos.toUpperCase() === "SI") {
    var cantHijosStr = prompt("¿Cuántos hijos/hijas tiene? Ingrese solamente números:")
    cantidad_hijos = parseInt(cantHijosStr)
    if (isNaN(cantidad_hijos) || cantidad_hijos < 0) {
      alert("Ha ingresado un número de hijos inválido. Se asignará 0 por defecto.")
      cantidad_hijos = 0
    }
  }

  // e) Solicitar la cantidad de propiedades
  var cantidad_propiedades_str = prompt("¿Cuántas propiedades tiene? Ingrese solamente números:")
  var cantidad_propiedades = parseInt(cantidad_propiedades_str)

  if (isNaN(cantidad_propiedades) || cantidad_propiedades < 0) {
    alert("Ha ingresado un valor inválido para las propiedades. Se asignará 0 por defecto.")
    cantidad_propiedades = 0
  }

  // f) Solicitar el salario del asegurado
  var salario_str = prompt("Ingrese su salario mensual (solo números):")
  var salario_numero = parseFloat(salario_str)

  if (isNaN(salario_numero) || salario_numero < 0) {
    alert("Ha ingresado un valor inválido para el salario. Se asignará Q0 por defecto.")
    salario_numero = 0
  }

  // ------------------------------------------------------
  // 4. Cálculo de recargos estándar (igual que en la versión previa)
  // ------------------------------------------------------

  // a) Recargo por edad del asegurado
  if (edad_numero >= 18 && edad_numero < 25) {
    recargo = precio_base * edad_18
    recargo_total += recargo
  } else if (edad_numero >= 25 && edad_numero < 50) {
    recargo = precio_base * edad_25
    recargo_total += recargo
  } else if (edad_numero >= 50) {
    recargo = precio_base * edad_50
    recargo_total += recargo
  }

  // b) Recargo por edad del cónyuge
  if (casado.toUpperCase() === "SI") {
    if (edad_conyuge_numero >= 18 && edad_conyuge_numero < 25) {
      recargo = precio_base * edad_18
      recargo_total += recargo
    } else if (edad_conyuge_numero >= 25 && edad_conyuge_numero < 50) {
      recargo = precio_base * edad_25
      recargo_total += recargo
    } else if (edad_conyuge_numero >= 50) {
      recargo = precio_base * edad_50
      recargo_total += recargo
    }
  }

  // c) Recargo por la cantidad de hijos
  if (cantidad_hijos > 0) {
    recargo = (precio_base * hijos_recargo) * cantidad_hijos
    recargo_total += recargo
  }

  // ------------------------------------------------------
  // 5. Cálculo de recargos adicionales (nuevos requisitos)
  // ------------------------------------------------------

  // a) Recargo por propiedades (35% de la cotización base por cada propiedad)
  if (cantidad_propiedades > 0) {
    var recargo_propiedades = precio_base * propiedades_recargo * cantidad_propiedades
    recargo_total += recargo_propiedades
  }

  // b) Recargo sobre el salario (5% del salario del asegurado)
  //    Si el salario es mayor a 0, se aplica el recargo.
  if (salario_numero > 0) {
    var recargo_salario_total = salario_numero * salario_recargo
    recargo_total += recargo_salario_total
  }

  // ------------------------------------------------------
  // 6. Cálculo del precio final
  // ------------------------------------------------------
  precio_final = precio_base + recargo_total

  // ------------------------------------------------------
  // 7. Variaciones de escenario (ejemplo "junior-level")
  // ------------------------------------------------------
  // * Si el usuario tiene más de 100 años, se podría aplicar un recargo especial
  //   de 10% del precio base (por ejemplo).
  if (edad_numero > 100) {
    var recargo_longevidad = precio_base * 0.1
    recargo_total += recargo_longevidad
    precio_final += recargo_longevidad
    alert("Se ha aplicado un recargo adicional del 10% por tener más de 100 años.")
  }

  // * Si el usuario tiene más de 5 propiedades, se podría considerar 
  //   un recargo adicional. (Solo a modo de ejemplo)
  if (cantidad_propiedades > 5) {
    var recargo_propiedades_extra = precio_base * 0.05
    recargo_total += recargo_propiedades_extra
    precio_final += recargo_propiedades_extra
    alert("Se ha aplicado un recargo extra del 5% adicional por tener más de 5 propiedades.")
  }

  // ------------------------------------------------------
  // 8. Mostrar resultados de la cotización actual
  // ------------------------------------------------------
  alert("Cotización para el asegurado(a): " + nombre)
  alert("Recargo total: Q" + recargo_total)
  alert("Precio final de la póliza: Q" + precio_final)

  // ------------------------------------------------------
  // 9. Comentarios "junior level":
  // ------------------------------------------------------
  // - Se mantienen variables 'var' para simplicidad.
  // - Se usan if/else if para rangos de edad y validaciones.
  // - Se incluyen prompts y alerts para interactuar con el usuario.
  // - Se agregan recargos adicionales (propiedades y salario).
  // - Se repite el proceso en un bucle while hasta que el usuario 
  //   decida salir.
  // - Se contemplan casos extra, como usuarios con edad > 100 años 
  //   o con más de 5 propiedades, con recargos adicionales opcionales.
}