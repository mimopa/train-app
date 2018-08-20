const request = require('request');

/* API Key  */
// const consumerKey = ''
const consumerKey = process.env.CONSUMER_API_KEY;

var headers = {
  'Content-Type':'application/json'
}

// railwayは路線名を入力する。例：東西線
var getRaiway = async (railway, callback) => {
  var encodeRailway = encodeURIComponent(railway);

  await request({
    url: `https://api-tokyochallenge.odpt.org/api/v4/odpt:Railway?dc:title=${encodeRailway}&acl:consumerKey=${consumerKey}`,
    headers: headers,
    json: true
  },  (error, response, body) => {
    if (error) {
      callback('Unable to connect to TokyoChallenge APIs.');
    } else if (response.statusCode === 400) {
      callback('Illegal Parameter');
    } else if (response.statusCode === 200) {
      // console.log(body.length);
      if (body.length === 0) {
        callback('There is no search result');
      } else {
        callback(undefined, {
          railwayId: body[0]['owl:sameAs'],
          raiwaiName: body[0]['dc:title']
        });
      }
    }
  });
}

// raiway_idは路線名から取得した路線IDを入力する。例：TokyoMetro.Tozai
var getTrainInformation = async (railwayId, callback) => {
  await request({
    url: `https://api-tokyochallenge.odpt.org/api/v4/odpt:TrainInformation?odpt:railway=${railwayId}&acl:consumerKey=${consumerKey}`,
    headers: headers,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to TokyoChallenge APIs.');
    } else if (response.statusCode === 400) {
      callback('Illegal Parameter');
    } else if (response.statusCode === 200) {
      // console.log(body);
      if (body.length === 0) {
        callback('There is no search result');
      } else {
        callback(undefined, {
          trainInformationText: body[0]['odpt:trainInformationText'].ja
        });
      }
    }
  });
}

module.exports = {
  getRaiway: getRaiway,
  getTrainInformation: getTrainInformation
}