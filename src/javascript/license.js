
const defaultLicenseString = 'Copyright (c) 2019-2021 Bjørn Håkon Frodal';
let licenseString = '';

function GetLicense() {
    if (licenseString === '') {
        try {
            const fs = require('fs');
            const path = require('path');
            licenseString = fs.readFileSync(path.join(__dirname, '../../LICENSE.md'));
        } catch (err) {
            licenseString = defaultLicenseString;
        }
    }
    return licenseString;
};

exports.GetLicense = GetLicense;