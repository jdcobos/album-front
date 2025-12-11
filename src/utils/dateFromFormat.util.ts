export const dateFromFormat = (dateIso: string) => {
    const date = new Date(dateIso);
    const current = new Date();
    const diffMs = current.getTime() - date.getTime();

    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas   = Math.floor(minutos / 60);
    const dias    = Math.floor(horas / 24);
    const meses   = Math.floor(dias / 30);
    const años    = Math.floor(dias / 365);

    if (segundos < 60) return `Hace ${segundos} segundos`;
    if (minutos < 60)  return `Hace ${minutos} minutos`;
    if (horas < 24)    return `Hace ${horas} horas`;
    if (dias < 30)     return `Hace ${dias} días`;
    if (meses < 12)    return `Hace ${meses} meses`;
    return `Hace ${años} años`;
}