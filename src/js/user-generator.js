const userGenerator = (function userGenerator() {
  function generate(url) {
    return new Promise((resolve, reject) => {
      const reqUrl = url;
      /* jquery ajax request with given url */
      const req = $.ajax({
        url: reqUrl,
        dataType: 'json'
      });
      /* generate the template, when jq ajax promise is resolved */
      req.then((usersArr) => {
        const emails = ['gmail', 'yahoo', 'outlock', 'inbox', 'wmail'];
        let id = 1;
        const template = [];
        usersArr.results.forEach((user, idx, array) => {
          /* resolve Promise when the loop is end */
          if (idx === array.length - 1) resolve(template);
          const date = user.dob.split(' ');
          const num = Math.floor(Math.random() * 5);
          const currTemplate = `
            <tr>
              <th scope="row" data-field="def"><span>${id++}</span></th>
              <td><figure><img src="${user.picture.thumbnail}" alt="" class="user-img img-thumbnail"></figure></td>
              <td data-field="first-name"><span>${user.name.first}</span></td>
              <td data-field="last-name"><span>${user.name.last}</span></td> 
              <td data-field="email"><span>${user.name.first}.${user.name.last}@${emails[num]}.com</span></td>
              <td><span>${user.cell}</span></td>
              <td data-field="bth"><span>${date[0]}</span></td>
            </tr>
          `;
          template.push(currTemplate);
        });
      });
      /* reject the Promise when jq ajax is failed */
      req.catch(err => reject(err));
    });
  }
  /* return public API */
  return {
    generate
  };
}());
export default userGenerator;
