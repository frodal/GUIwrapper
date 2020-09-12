const fs = require('fs');
const path = require('path');

let licenseString = '';

function GetLicense() {
    if (licenseString === '') {
        try {
            licenseString = fs.readFileSync(path.join(__dirname, '../../LICENSE.md'));
        } catch (err) {
            licenseString = 'Copyright (c) 2019-2020 Bjørn Håkon Frodal';
        }
    }
    return licenseString;
};

exports.GetLicense = GetLicense;