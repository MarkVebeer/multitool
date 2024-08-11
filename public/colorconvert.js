document.getElementById('convertBtn').addEventListener('click', () => {
    const colorInput = document.getElementById('colorInput').value;
    const colorFormat = document.getElementById('colorFormat').value;
    const colorResult = document.getElementById('colorResult');

    if (!colorInput) {
        colorResult.textContent = 'Please enter a color code';
        colorResult.style.display = 'block';
        return;
    }

    try {
        const color = tinycolor(colorInput);
        let result;

        switch (colorFormat) {
            case 'hex':
                result = color.toHexString();
                break;
            case 'rgb':
                result = color.toRgbString();
                break;
            case 'rgba':
                const rgba = color.toRgb();
                result = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
                break;
            case 'hsl':
                result = color.toHslString();
                break;
            case 'hsla':
                const hsla = color.toHsl();
                result = `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
                break;
            case 'hsv':
                result = color.toHsvString();
                break;
            case 'hsva':
                const hsva = color.toHsv();
                result = `hsva(${hsva.h}, ${hsva.s}%, ${hsva.v}%, ${hsva.a})`;
                break;
            case 'name':
                result = getClosestColorName(color);
                break;
            default:
                result = 'Invalid format';
        }

        colorResult.textContent = `Converted Color: ${result}`;
        colorResult.style.display = 'block';
    } catch (error) {
        colorResult.textContent = 'Invalid color code';
        colorResult.style.display = 'block';
    }
});

function getClosestColorName(color) {
    const colorNames = tinycolor.names;
    const inputColorRgb = color.toRgb();
    let closestColorName = null;
    let smallestDistance = Infinity;

    for (const name in colorNames) {
        const namedColorRgb = tinycolor(name).toRgb();
        const distance = getColorDistance(inputColorRgb, namedColorRgb);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestColorName = name;
        }
    }

    return closestColorName ? closestColorName : 'Nem fordítható konkrét szín névre';
}

function getColorDistance(color1, color2) {
    return Math.sqrt(
        Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
}
