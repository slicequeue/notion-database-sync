
const convertDailyTypeCode = (dailyTypeCode) => {
  switch (dailyTypeCode) {
    case '01':
      return '평일';
    case '02':
      return '토요일';
    case '03': 
      return '공휴일';
    default:
      throw new Error(`convertDailyTypeCode 없는 형식: ${dailyTypeCode}`);
  }
}

const convertUpDownTypeCode = (upDownTypeCode) => {
  switch (upDownTypeCode) {
    case 'U': //, 'u':
      return '상행';
    case 'D', 'd':
      return '하행';
    default:
      throw new Error(`convertUpDownTypeCode 없는 형식: ${upDownTypeCode}`)
  }
}

const stationTimetableItemMapper = {
  toNotionProperties: (stationTimetableItem) => {
    /* 
      arrTime: 152200,
      dailyTypeCode: '01',
      depTime: 152230,
      endSubwayStationId: 'MTRKR1159',
      endSubwayStationNm: '도원',
      subwayRouteId: 'MTRKR1',
      subwayStationId: 'MTRKR10142',
      subwayStationNm: '구일',
      upDownTypeCode: 'U'
    */
    return {
      "구일역도착시간(HHMMSS)": {
        title: [
          {
            text: {
              content: typeof (stationTimetableItem.arrTime) === 'string' ? stationTimetableItem.arrTime : String(stationTimetableItem.arrTime),
            },
          },
        ],
      },
      "구일역출발시간(HHMMSS)": {
        rich_text: [
          {
            text: {
              content: typeof (stationTimetableItem.depTime) === 'string' ? stationTimetableItem.depTime : String(stationTimetableItem.depTime),
            },
          },
        ],
      },
      "평일/토요일/공휴일": {
        select: {
          name: convertDailyTypeCode(stationTimetableItem.dailyTypeCode),
        },
      },
      "상행/하행": {
        select: {
          name: convertUpDownTypeCode(stationTimetableItem.upDownTypeCode),
        },
      },
      "종착지": {
        rich_text: [
          {
            text: {
              content: stationTimetableItem.endSubwayStationNm ? stationTimetableItem.endSubwayStationNm : stationTimetableItem.endSubwayStationId,
            },
          },
        ],
      },
    }
  }
}

module.exports = {
  stationTimetableItemMapper,
}
