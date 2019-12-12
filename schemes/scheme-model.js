const db = require("../data/db-config.js");

module.exports = {
    
};

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .first();
}

function findSteps(id) {
    return db("steps as st")
        .select("sc.scheme_name", "st.step_number","st.instructions")
        .join("schemes as sc", "sc.id", "st.scheme_id")
        .where("sc.id", id)
        .orderBy("st.step_number");
}