const { pool } = require("../Pool");

// function toArray(tags) {
//   let array = "";
//   let splitTags = tags.split(",");
//   for (let i = 0; i < splitTags.length; i++) {
//     if (i === splitTags.length - 1) {
//       array += `"${splitTags[i].trim()}"`;
//     } else {
//       array += `"${splitTags[i].trim()}",`;
//     }
//   }
//   return array;
// }

module.exports.addBurger = async (req, res, next) => {
  try {
    pool.query(
      `INSERT INTO burgers(name, image, description) VALUES('${req.body.name}', '${req.body.image}', '${req.body.description}');`,
      (error) => {
        if (error) throw error;
        return res.redirect(req.get("referer"));
      },
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllBurgers = async (req, res, next) => {
  try {
    pool.query("SELECT * FROM burgers;", (error, results) => {
      if (error) throw error;
      return res.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBurger = async (req, res, next) => {
  try {
    pool.query(
      `DELETE FROM burgers WHERE name='${req.body.name}';`,
      (error) => {
        if (error) throw error;
        return res.redirect(req.get("referer"));
      },
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.addPizza = async (req, res, next) => {
  try {
    pool.query(
      `INSERT INTO pizza(name, image, description) VALUES('${req.body.name}', '${req.body.image}', '${req.body.description}');`,
      (error) => {
        if (error) throw error;
        return res.redirect(req.get("referer"));
      },
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllPizzas = async (req, res, next) => {
  try {
    pool.query("SELECT * FROM pizza;", (error, results) => {
      if (error) throw error;
      return res.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deletePizza = async (req, res, next) => {
  try {
    pool.query(`DELETE FROM pizza WHERE name='${req.body.name}';`, (error) => {
      if (error) throw error;
      return res.redirect(req.get("referer"));
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addBeverages = async (req, res, next) => {
  try {
    pool.query(
      `INSERT INTO beverages(name, image, description) VALUES('${req.body.name}', '${req.body.image}', '${req.body.description}');`,
      (error) => {
        if (error) throw error;
        return res.redirect(req.get("referer"));
      },
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllBeverages = async (req, res, next) => {
  try {
    pool.query("SELECT * FROM beverages;", (error, results) => {
      if (error) throw error;
      return res.status(200).json(results.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBeverage = async (req, res, next) => {
  try {
    pool.query(
      `DELETE FROM beverages WHERE name='${req.body.name}';`,
      (error) => {
        if (error) throw error;
        return res.redirect(req.get("referer"));
      },
    );
  } catch (error) {
    console.log(error);
  }
};
