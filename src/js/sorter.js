const sorter = (function sorter() {
  /* return Array of DOM elements sorted by input value
  * @param {string} value = The value of the searched el
  * @param {string} sortParent = DOM wrapper of sorted el
  * @param {string} sortTaget = name of searched attr - data-field
  */
  const dynamicSort = (value, sortParent, sortTaget) => {
    const resultArr = [];
    sortParent.each((index, item) => {
      const sortedText = $(item).find(`[data-field=${sortTaget}]`);
      if (sortedText.text().indexOf(value) >= 0) resultArr.push(sortedText.parent());
    });
    return resultArr;
  };
  /* return Array of sorted DOM elements by given sortTarget
  * @param {string} sortType = name of specific text fragment to search
  */
  const emailSort = (sortParent, sortTaget, sortType) => {
    const req = new RegExp(`${sortType}`, 'i');
    const resulArr = [];
    sortParent.each((index, value) => {
      const currMail = $(value).find(`[data-field=${sortTaget}]`);
      if (req.test(currMail.text())) resulArr.push(value);
    });
    return resulArr;
  };
  /* return Array of sorted DOM elements by given sortTarget
  * @param {string} sortType = type of sorting
  * types : 'bth' - Date sorting with string format
  * types : 'asc' - ascending order of results
  * types : 'dsc' - descending order of results
  * types : 'def' - sortiong numbers types inputs
  */
  const customSort = (sortParent, sortTaget, sortType) => {
    /* if the sort type  == 'default' change the sortTarget variable */
    if (sortType === 'def') sortTaget = 'def';
    /* return sorted array od DOM elements */
    return sortParent.sort((a, b) => {
      /* set the sorted elements */
      const prev = $(a).find(`[data-field='${sortTaget}']`).text();
      const next = $(b).find(`[data-field='${sortTaget}']`).text();
      /* if sortType == 'bth' use  Date.parse() to format data */
      if (sortType === 'bth') { currText = Date.parse(prev); nextText = Date.parse(next); }
      if (sortType === 'asc') return prev > next ? 1 : -1;
      if (sortType === 'dsc') return next > prev ? 1 : -1;
      if (sortType === 'def') return Number(prev) - Number(next);
    });
  };
  /* return public API */
  return {
    customSort,
    emailSort,
    dynamicSort
  };
}());
export default sorter;
