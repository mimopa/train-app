const yargs = require('yargs');

const train = require('./train/train')

var mes;

const argv = yargs
  .options({
    r: {
      demand: true,
      alias: 'railway',
      describe: '鉄道の路線名を入れてね！'+'\n'+'以下の路線は次の路線名じゃないと検索できないから注意です！'+'\n'+'「中央・総武各駅停車」'+'\n'+'「京浜東北線・根岸線」'+'\n'+'「埼京線・川越線」'+'\n'+'「日暮里・舎人ライナー」',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

train.getRaiway(argv.railway, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // console.log(results);
    train.getTrainInformation(results.railwayId, (errorMessage, trainInforResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        // JSON書き出し？
        console.log(trainInforResult.trainInformationText.replace('います','あまちゅ'));
        mes = trainInforResult.trainInformationText.replace('います','あまちゅ');
      }
    })
  }
});
console.log(mes);