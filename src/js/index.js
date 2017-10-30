import 'bootstrap';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';
import sortModule from './sorter';
import userGenerator from './user-generator';

/* custom imports */
const sortObj = (function sortObj() {
  /* generate() return a promise with array of DOM elements, generated from ajax req */
  const userGen = userGenerator.generate('https://randomuser.me/api/?results=30&nat=gb');

  /* wait for the users array, then start the DOM manipulation  */
  userGen.then((usersArr) => {
    /* cache DOM elements */
    const $el = $('.main-table');
    const $tableBody = $el.find('tbody');
    /* generate rows with users */
    $tableBody.append(usersArr);
    const $tableRow = $el.find('tbody tr');
    const $filterDropdown = $el.find('.filter-dropdown');
    const $filterAttr = $el.find('[data-filter]');
    const $dynamicSort = $('.dynamic-sort');

    /* function to add curent filter name to table head */
    const showFilterName = (sortTarget, sortType) => {
      $filterAttr.each((index, el) => {
        if ($(el).attr('data-filter') === sortTarget) {
          el.innerHTML = ` (${sortType})`;
          if (sortType === 'dsc') el.innerHTML = ' (z-a)';
          if (sortType === 'asc') el.innerHTML = ' (a-z)';
          if (sortType === 'def') el.innerHTML = '';
        } else { el.innerHTML = ''; }
      });
    };

    /* sortUsers() is a function which filters rows depends on DOM attr */
    const sortUsers = (event) => {
      /* reset input value */
      $dynamicSort.val('');
      /* prepare parameters for custom or email search */
      let sortedRows = null;
      const sortTarget = $(event.target).parent().attr('data-field');
      const sortType = $(event.target).attr('filter-type');
      /* chck if dropdown has class 'email-sort', then run email function */
      if ($(event.target).hasClass('email-sort')) {
        sortedRows = sortModule.emailSort($tableRow, sortTarget, sortType);
      } else {
        sortedRows = sortModule.customSort($tableRow, sortTarget, sortType);
      }
      $tableBody.html(sortedRows);
      /* add curent filter name to table head */
      showFilterName(sortTarget, sortType);
    };

    /* Search user wihich last name contains input value */
    const dynamicSort = (event) => {
      /* prepare parameters for dynamic search */
      const value = $(event.target).val();
      const sortTarget = $(event.target).attr('data-field');
      const $noResult = '<tr><th scope="row">Not found</th></tr>';
      /* dynamic search */
      const sortedRows = sortModule.dynamicSort(value, $tableRow, sortTarget);
      /* if result array is empty render $noResult template */
      const resultRows = sortedRows.length === 0 ? $noResult : sortedRows;
      $tableBody.html(resultRows);
    };

    /* Binding events */
    $filterDropdown.on('click', sortUsers);
    $dynamicSort.on('keyup', dynamicSort);
  });

  /* log error on Promise reject */
  userGen.catch((err) => {
    console.log(err);
  });
}());

