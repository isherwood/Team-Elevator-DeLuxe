const presetThemes = [
    {name: 'Classic Dickens', start: 'e42f2f', end: '47e133'},
    {name: 'Glorious Springtime', start: 'e42fd5', end: '64cb20'},
    {name: 'Spook-o-lantern', start: '6f2fe4', end: 'cb6d20'},
    {name: 'Heap of Autumn', start: '92680c', end: '872626'},
    {name: 'Bunny Candy', start: '7c0c92', end: 'ff70ae'},
    {name: 'Charred Winter', start: '696969', end: 'c4c4c4'},
    {name: 'Tropical Surf', start: '3456fe', end: '33e1cc'},
    {name: 'Sweet Treat', start: '67edfe', end: 'e13367'}
];

// export array sorted by name property
export default presetThemes.sort((a, b) => a.name.localeCompare(b.name));