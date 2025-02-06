const presetThemes = [
    {name: 'Classic Dickens', start: 'ba0b0b', end: '209d10'},
    {name: 'Glorious Springtime', start: 'e42fd5', end: '64cb20'},
    {name: 'Spook O\' Lantern', start: '101820', end: 'F2AA4C'},
    {name: 'Party Parrot', start: '1554ac', end: 'f96e1a'},
    {name: 'Bunny Candy', start: '7c0c92', end: 'ff70ae'},
    {name: 'Charred Winter', start: '696969', end: 'c4c4c4'},
    {name: 'Tropical Surf', start: '3456fe', end: '33e1cc'},
    {name: 'Sweet Treat', start: '67edfe', end: 'e13367'},
    {name: 'Olde West', start: 'e1aa33', end: '7f5757'},
    {name: 'Bumbling Bee', start: '222222', end: 'F4DF4E'},
    {name: 'Scuba Sea', start: '42EADD', end: 'CDB599'},
    {name: 'Skol Vikes', start: '4F2683', end: 'FFC62F'},
    {name: 'Lime Breezes', start: 'D6ED17', end: '606060'},
    {name: 'Mossy Moss', start: '2C5F2D', end: '97BC62'},
    {name: 'Raspberry Meringue', start: 'D198C5', end: 'E0C568'},
    {name: 'Bubblegum Sidewalk', start: '777777', end: 'EA738D'},
    {name: 'Cherry Licorice', start: 'E94B3C', end: '2D2926'},
    {name: 'Strawberry Cream', start: '990011', end: 'FCF6F5'}
];

// export array sorted by name property
export default presetThemes.sort((a, b) => a.name.localeCompare(b.name));
