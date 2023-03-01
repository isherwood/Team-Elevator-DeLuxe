const Utilities = {
    polarToCartesian: (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    },

    describeSlice: (x, y, radius, startAngle, endAngle) => {
        const start = Utilities.polarToCartesian(x, y, radius, endAngle);
        const end = Utilities.polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", 0, 0, start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    },

    segmentPath: (degrees, radius, order) => {
        degrees = parseFloat(degrees);
        return Utilities.describeSlice(0, 0, radius, degrees * order - degrees, degrees * order) + 'Z';
    }
};

export default Utilities;