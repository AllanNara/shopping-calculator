const color1 = "#6BD1BB";

export const alertSuccessResponse = async(title) => {
  if(!title) return null;
  await Swal.fire({
    title,
    icon: "success",
    background: color1,
    color: "#000",
    confirmButtonColor: "#fff",
    iconColor: "#eee",
  });
}

export const alertError = async(title = "Error") => {
  await Swal.fire({
    title,
    icon: "error",  
    background: color1,
    color: "#000",
    confirmButtonColor: "#fff",
    iconColor: "#eee",
  });
  return false
}


export const alertConfirmAction = async (action = "confirmar la acción", info, reset = false) => {
	const { value: result } = await Swal.fire({
		title: reset ? action : "¿Estas seguro que desea " + action + "?",
		text: info ?? "¡Una vez confirmado, no podrá revertirlo!",
		icon: "info",
    iconColor: "#eee",
		background: color1,
		showCancelButton: true, 
		confirmButtonText: "Si, confirmo",
		cancelButtonText: "Cancelar",
		confirmButtonColor: "#FFF",
		cancelButtonColor: "#FFD6BE",
	});
  return Boolean(result)
};

export const inputNewDisc = async(disc) => {
  if(disc !== "percent" && disc !== "coupon") throw new Error("Missing discount parameter in f(disc)'addNewDisc'")
  const { value: desc } = await Swal.fire({
    title: disc === "percent" ? "Ingresa el porcentaje de descuento" : "Ingresa el valor del cupon",
    input: "number",
    background: color1,
    color: "#000",
    inputValue: 10,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Ingresar',
    confirmButtonColor: "#FFF",
    cancelButtonColor: "#dfefdf",
    inputValidator: (value) => {
      if (!value) return "Debe ingresar un valor";
      if(disc === "percent" && (value > 100 || value < 1)) return "Valor no permitido";
      else if(value < 1) return "Valor no permitido"
    }
  });
  return desc
}

export const inputGeneric = async(title, ph) => {
  const { value: result } = await Swal.fire({
    title,
    input: "text",
    background: color1,
    color: "#000",
    inputValue: ph ? ph : "Usuario",
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Ingresar',
    confirmButtonColor: "#FFF",
    cancelButtonColor: "#dfefdf",
    inputValidator: (value) => {
      if(!value || !/^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value)) return "Nombre invalido";
    }
  });
  return result
}
