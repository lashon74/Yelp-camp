// Used to catch errors in async routes
module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
