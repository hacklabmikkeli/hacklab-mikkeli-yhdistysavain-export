/*jshint esversion: 6 */
/* global __dirname */

(function () {
  'use strict';

  const conf = require(__dirname + '/config.json');
  const XLSX = require('xlsx');
  const fs = require('fs');
  const util = require('util');
  const casper_nodejs = require('casper-nodejs');
  const casper = casper_nodejs.create('https://hacklabmikkeli.yhdistysavain.fi/@Session/Loginform', {});

  casper.then([function (settings) {
    this.fillSelectors('form[name="login"]', {
      '#u_id': settings.username,
      '#u_password': settings.password
    }, true);
  }, [conf]], (ret) => {
    console.log('form filled');
  });

  casper.then([function (settings) {
    this.download(settings.exporturl, 'data.xlsx');
  }, [conf]], (ret) => {
    console.log('File downloaded');
  });

  casper.then(function () {
    casper.exit();
    var workbook = XLSX.readFile('data.xlsx');
    var sheetName = Object.keys(workbook.Sheets)[0];
    var worksheet = workbook.Sheets[sheetName];
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    var results = '';
    for (var row = 1; row <= range.e.r; row++) {
      var fname = worksheet[XLSX.utils.encode_cell({ c: 0, r: row })].v;
      var lname = worksheet[XLSX.utils.encode_cell({ c: 1, r: row })].v;
      var phone = worksheet[XLSX.utils.encode_cell({ c: 4, r: row })].v;
      phone = phone.replace(/ /g, '');
      if (phone.startsWith('0')) {
        phone = '+358' + phone.substring(1);
      }
      results += util.format('%s %s\n%s\n\n', fname, lname, phone);
    }
    fs.writeFile('whitelist.txt', results, () => {
      console.log('done');
    });
  });

  casper.run();
})();