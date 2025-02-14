const ColorGradientService = {
    getHexPair: function(pair) {
        const hexChars = '0123456789abcdef';
        let pairInt = parseInt(pair);

        if (pairInt === 0 || isNaN(pair))
            return "00";

        pairInt = Math.round(Math.min(Math.max(0, pairInt), 255));
        return hexChars.charAt((pairInt - pairInt % 16) / 16) + hexChars.charAt(pairInt % 16);
    },

    /* Convert an RGB triplet to a hex string */
    convertToHex: function(rgbStr) {
        return this.getHexPair(rgbStr[0]) + this.getHexPair(rgbStr[1]) + this.getHexPair(rgbStr[2]);
    },

    /* Convert a hex string to an RGB triplet */
    convertToRGB: function(hexStr) {
        let rgbVal = [];

        rgbVal[0] = parseInt(hexStr.substring(0, 2), 16);
        rgbVal[1] = parseInt(hexStr.substring(2, 4), 16);
        rgbVal[2] = parseInt(hexStr.substring(4, 6), 16);

        return rgbVal;
    },

    generateColors: function(colors, colorCount) {
        const colorStart = colors[0];
        const colorEnd = colors[1];

        // The beginning of your gradient
        let start = this.convertToRGB(colorStart);

        // The end of your gradient
        let end = this.convertToRGB(colorEnd);

        // The number of colors to compute
        let len = colorCount - 2;

        // Alpha blending amount
        let alpha = 0.0;

        let colorArr = [colorEnd];

        for (let i = 0; i < len; i++) {
            let c = [];
            alpha += (1.0 / len);

            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];

            colorArr.push(this.convertToHex(c));
        }

        colorArr.push(colorStart);

        return colorArr.reverse();
    }
};

export default ColorGradientService;