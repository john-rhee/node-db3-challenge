const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    addStep,
    remove
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

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then(ids => {
            const [id] = ids;

            return findById(id);
        });
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
}

function addStep(stepData, id) {
    return db("schemes")
        .where({ id })
        .update(stepData)
}

function remove(id) {
    return db("schemes")
        .where({ id })
        .del();
}