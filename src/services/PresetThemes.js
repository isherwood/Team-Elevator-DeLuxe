const presetThemes = [
    {name: 'Classic Dickens', start: 'e42f2f', end: '47e133'},
    {name: 'Glorious Springtime', start: 'e42fd5', end: '64cb20'},
    {name: 'Spook O\' Lantern', start: '6f2fe4', end: 'cb6d20'},
    {name: 'Party Parrot', start: '4F95F8', end: 'F99C1A'},
    {name: 'Bunny Candy', start: '7c0c92', end: 'ff70ae'},
    {name: 'Charred Winter', start: '696969', end: 'c4c4c4'},
    {name: 'Tropical Surf', start: '3456fe', end: '33e1cc'},
    {name: 'Sweet Treat', start: '67edfe', end: 'e13367'},
    {name: 'Old West', start: 'e1aa33', end: '7f5757'}
];

// export array sorted by name property
export default presetThemes.sort((a, b) => a.name.localeCompare(b.name));