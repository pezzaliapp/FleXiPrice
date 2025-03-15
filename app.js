let originalPrice = 0;

// Funzione per attivare/disattivare la modalità notte
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Funzione per formattare numeri in stile europeo
function formatNumber(value) {
    return value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Funzione per convertire input stringa in numero
function parseInput(value) {
    if (!value) return NaN;
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

// Calcolo Prezzo Netto
function calculateNetPrice() {
    const price = parseInput(document.getElementById('price').value);
    const discount = parseInput(document.getElementById('discount').value);
    let margin = parseInput(document.getElementById('margin').value);

    if (isNaN(price) || isNaN(discount)) {
        document.getElementById('result').innerText = 'Inserisci tutti i campi correttamente.';
        return;
    }

    if (isNaN(margin)) {
        margin = 0; // Se il margine è vuoto o non valido, considera 0
    }

    originalPrice = price;

    // Calcolo prezzo scontato
    const discountedPrice = price * (1 - discount / 100);

    // Calcolo prezzo netto con margine
    const netPrice = discountedPrice / (1 - margin / 100);

    document.getElementById('result').innerText = `Prezzo Netto: € ${formatNumber(netPrice)}`;
}

// Calcolo Inverso con Margine
function calculateInverseWithMargin() {
    const desiredNetPrice = parseInput(document.getElementById('desiredNetPrice').value);
    let margin = parseInput(document.getElementById('margin').value);

    if (isNaN(desiredNetPrice) || isNaN(originalPrice) || originalPrice === 0) {
        document.getElementById('inverseResult').innerText = 'Assicurati di aver calcolato prima il prezzo netto e inserito un margine valido.';
        return;
    }

    if (isNaN(margin)) {
        margin = 0; // Se il margine è vuoto o non valido, considera 0
    }

    // Calcolo prezzo scontato necessario
    const discountedPrice = desiredNetPrice * (1 - margin / 100);

    // Calcolo sconto necessario
    const discountNeeded = (1 - (discountedPrice / originalPrice)) * 100;

    document.getElementById('inverseResult').innerText = `Sconto Necessario: ${formatNumber(discountNeeded)}% (Prezzo Lordo: € ${formatNumber(originalPrice)})`;
}

// Calcolo Inverso Senza Margine
function calculateInverseNoMargin() {
    const desiredNetPriceNoMargin = parseInput(document.getElementById('desiredNetPriceNoMargin').value);

    if (isNaN(desiredNetPriceNoMargin) || isNaN(originalPrice) || originalPrice === 0) {
        document.getElementById('inverseResultNoMargin').innerText = 'Assicurati di aver inserito un prezzo netto desiderato e un prezzo lordo valido.';
        return;
    }

    // Calcolo sconto necessario senza margine
    const discountNeededNoMargin = (1 - (desiredNetPriceNoMargin / originalPrice)) * 100;

    document.getElementById('inverseResultNoMargin').innerText = `Sconto Necessario (senza margine): ${formatNumber(discountNeededNoMargin)}% (Prezzo Lordo: € ${formatNumber(originalPrice)})`;
}
