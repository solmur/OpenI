// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

const fse = require('fs-extra');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');


const getNatConfig = filepath => {
  fse.ensureDirSync(path.dirname(filepath));
  const adapter = new FileSync(filepath);
  const db = low(adapter);
  return db;
};

const calculatePort = (db, sshIp) => {
  const num = db.get(sshIp).value().split(',')[0];
  return (parseInt(num || 0)) * 100;
};

const getIntraIp = (db, sshIp) => {
  if (db.has(sshIp).value()) {
    return true;
  }
  return false;

};

const getExtraIp = (db, sshIp) => {
  const ip = db.get(sshIp).value().split(',')[1];
  return ip;
};

const getExtraPort = (db, sshIp, port) => {
  const extraPort = calculatePort(db, sshIp) + parseInt(port);
  return extraPort;
};

module.exports = { getNatConfig, getIntraIp, getExtraIp, getExtraPort };
