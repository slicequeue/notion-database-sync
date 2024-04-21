const notionDatabaseService = require('../src/service/NotionDatabaseService');

const { stationTimetableItemMapper } = require('../src/mapper');

const main = async () => {
  await notionDatabaseService.clearDatabaseAllPages();
  // 생성 처리
  await notionDatabaseService.createDatabaseAllPages({
    dataList: [
      {
        arrTime: '152200',
        dailyTypeCode: '01',
        depTime: '152230',
        endSubwayStationId: 'MTRKR1159',
        endSubwayStationNm: '도원',
        subwayRouteId: 'MTRKR1',
        subwayStationId: 'MTRKR10142',
        subwayStationNm: '구일',
        upDownTypeCode: 'U'
      },
      {
        arrTime: 152700,
        dailyTypeCode: '01',
        depTime: 152730,
        endSubwayStationId: 'MTRKR1110',
        endSubwayStationNm: '의정부',
        subwayRouteId: 'MTRKR1',
        subwayStationId: 'MTRKR10142',
        subwayStationNm: '구일',
        upDownTypeCode: 'U'
      }
    ],
    mapper: stationTimetableItemMapper.toNotionProperties
  });

  
}

main().catch(console.error);
