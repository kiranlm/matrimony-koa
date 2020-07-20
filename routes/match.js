const request = require('superagent');

module.exports = ({ matchRouter }) => {
  // getting the dogs route
  matchRouter.get('/', async (ctx, next) => {
    await request
      .get('https://localhost/list/all')
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
