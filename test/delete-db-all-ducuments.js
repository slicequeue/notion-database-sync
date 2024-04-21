const { notion } = require('../src/notion');
const config = require('../config');


// 데이터베이스의 모든 페이지 가져오기
async function getDatabaseAllPages(databaseId) {
  const pages = [];
  let cursor = undefined;

  while (true) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });

    pages.push(...response.results);

    if (!response.has_more) {
      break;
    }

    cursor = response.next_cursor;
  }

  return pages;
}

// 페이지 아카이브 처리
async function archivePages(pages) {
  const archivePromises = pages.map(page => {
    return notion.pages.update({
      page_id: page.id,
      archived: true,
    });
  });

  await Promise.all(archivePromises);

  console.log('모든 페이지가 아카이브 처리되었습니다.');
}

const main = async () => {
  try {
    const pages = await getDatabaseAllPages();
    await archivePages(pages);
  } catch (error) {
    console.error('페이지 아카이브 처리 중 오류 발생:', error);
  }
}

main().catch(console.error);
