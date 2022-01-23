export default class BaseController {
  constructor(model, salt) {
    this.model = model;
    this.salt = salt
  }
  /* funny looking codes are to highlight error msg in terminal in red */
  errorHandler = (err, res) => {
    console.error("\x1b[41m%s\x1b[0m","Error you doofus!");
    console.error("\x1b[31m%s\x1b[0m", err)
    res.send(err);
  };
}
