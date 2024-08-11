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
            case 'hsb':
                result = color.toHsvString(); // HSB is the same as HSV
                break;
            case 'hsi':
                result = toHsiString(color);
                break;
            case 'hwb':
                result = toHwbString(color);
                break;
            case 'cielab':
                result = toCIELABString(color);
                break;
            case 'cienxyz':
                result = toCIEXYZString(color);
                break;
            case 'vec4':
                result = toVec4String(color);
                break;
            case 'decimal':
                result = toDecimalString(color);
                break;
            case 'hexint':
                result = toHexIntString(color);
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

// Custom conversion functions

function toHsiString(color) {
    const rgb = color.toRgb();
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const intensity = (r + g + b) / 3;
    const min = Math.min(r, g, b);
    const saturation = (intensity === 0) ? 0 : 1 - (min / intensity);
    const hue = tinycolor.rgbToHsv(rgb).h;
    return `hsi(${hue.toFixed(2)}, ${(saturation * 100).toFixed(2)}%, ${(intensity * 100).toFixed(2)}%)`;
}

function toHwbString(color) {
    const hwb = color.toHwb();
    return `hwb(${hwb.h.toFixed(2)}, ${hwb.w.toFixed(2)}%, ${hwb.b.toFixed(2)}%)`;
}

function toCIELABString(color) {
    const lab = color.toLab();
    return `CIELAB(${lab.l.toFixed(2)}, ${lab.a.toFixed(2)}, ${lab.b.toFixed(2)})`;
}

function toCIEXYZString(color) {
    const xyz = color.toXyz();
    return `CIEXYZ(${xyz.x.toFixed(2)}, ${xyz.y.toFixed(2)}, ${xyz.z.toFixed(2)})`;
}

function toVec4String(color) {
    const rgba = color.toRgb();
    return `vec4(${(rgba.r / 255).toFixed(2)}, ${(rgba.g / 255).toFixed(2)}, ${(rgba.b / 255).toFixed(2)}, ${rgba.a.toFixed(2)})`;
}

function toDecimalString(color) {
    const rgba = color.toRgb();
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

function toHexIntString(color) {
    return color.toHex8();
}
