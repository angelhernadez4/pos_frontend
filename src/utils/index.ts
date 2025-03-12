export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(quantity)
}

export function formatDate(dateString: string) {
    let date: Date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        // Extraer año, mes y día manualmente
        const [year, month, day] = dateString.split('-').map(Number);
        date = new Date(year, month - 1, day); // Meses en JS van de 0 a 11
    } else {
        date = new Date(dateString);
    }

    const formatter = new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return formatter.format(date);
}

export function isValidPage(value: number) {
    if (value == null) {
        return false;
    }

    if (typeof value !== 'number' && isNaN(value)) {
        return false;
    }
    if (value <= 0) {
        return false;
    }

    if (!Number.isInteger(value)) {
        return false;
    }

    return true;
}

export function getImagePath(image: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if (image.startsWith(cloudinaryBaseUrl)) {
        return image
    } else {
        if (process.env.API_URL) {
            return `${process.env.API_URL}/img/${image}`
        } else {
            return `${process.env.NEXT_PUBLIC_API_URL}/img/${image}`
        }
    }
}

export const isAvailable = (inventory:number) => inventory > 0