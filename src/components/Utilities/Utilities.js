const Utilities = {
    polarToCartesian: (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    },

    describeSlice: (radius, startAngle, endAngle, largeArcFlag, sweepFlag) => {
        const start = Utilities.polarToCartesian(0, 0, radius, startAngle);
        const end = Utilities.polarToCartesian(0, 0, radius, endAngle);

        return [
            'M', 0, 0, start.x, start.y,
            // 'Arc', x radius, y radius, x-axis rotation...
            'A', radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
        ].join(' ');
    },

    segmentPath: (degrees, radius, order, reverse) => {
        let startAngle = degrees * order - degrees;
        let endAngle = degrees * order;
        let largeArcFlag = startAngle - startAngle <= 180 ? '0' : '1';
        let sweepFlag = 1;
        degrees = parseFloat(degrees);

        if (reverse) {
            startAngle = degrees * order;
            endAngle = degrees * order - degrees;
            largeArcFlag = startAngle - endAngle <= 180 ? '0' : '1';
            sweepFlag = 0;
        }

        return Utilities.describeSlice(radius, startAngle, endAngle, largeArcFlag, sweepFlag) + 'Z';
    }
};

export default Utilities;