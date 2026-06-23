export const formatearCantidad = (cantidad) => {
    return Number(cantidad).toLocaleString('en-US', {
        style: 'currency', 
        currency: 'USD'
    });
};

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
};