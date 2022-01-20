export default class BaseController {
  constructor(model) {
    this.model = model;
  }
  errorHandler = (err, res) => {
    console.error("Error you doofus!", err);
    res.send(err);
  };
}
