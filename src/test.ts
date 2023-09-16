const youtubesearchapi = require("youtube-search-api");

const search = async () => {
  try {
    var res = await youtubesearchapi.GetListByKeyword(
      "marques brownlee iphone 14",
      false,
      1,
      {
        type: "video",
      }
    );
    console.log(` len of results: ${res.items.length}`);
    if (res.items.length > 0) console.log(res.items[0].id);
  } catch (e) {
    console.error("error while searching for video by name. ", e);
  }
};

async function main() {
  await search();
}

main();
