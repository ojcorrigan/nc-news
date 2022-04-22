const sortFunc = require("../helper-funcs");

describe("sortFunc", () => {
  test("sorts an array of objects with the key of votes in to descending order", () => {
    let input = [{ votes: 3 }, { votes: 2 }, { votes: 4 }, { votes: 1 }];
    let expected = [{ votes: 4 }, { votes: 3 }, { votes: 2 }, { votes: 1 }];
    let actual = sortFunc(input, "DESC");

    expect(actual).toEqual(expected);
  });
  test("sorts an array of objects with key votes in to ascending order", () => {
    let input = [{ votes: 3 }, { votes: 2 }, { votes: 4 }, { votes: 1 }];
    let expected = [{ votes: 1 }, { votes: 2 }, { votes: 3 }, { votes: 4 }];
    let actual = sortFunc(input, "ASC");

    expect(actual).toEqual(expected);
  });
  test("sorts an array of objects with the key of votes in to descending order by default", () => {
    let input = [{ votes: 3 }, { votes: 2 }, { votes: 4 }, { votes: 1 }];
    let expected = [{ votes: 4 }, { votes: 3 }, { votes: 2 }, { votes: 1 }];
    let actual = sortFunc(input);

    expect(actual).toEqual(expected);
  });
});
