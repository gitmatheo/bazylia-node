
const replaceMongoIdWithCustomId = require('../utils/replace');
module.exports = getOne = (model, id) => async (req, res) => {
  try {
    let doc = await model
      .findById(req.params.id)
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    doc = replaceMongoIdWithCustomId(doc, id)

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
module.exports = getMany = (model, id)=> async (req, res) => {
  try {
    let docs = await model
      .find({})
      .lean()
      .exec()

    let docsWithCustomId = []

    docs.forEach(doc => {
      docsWithCustomId.push(replaceMongoIdWithCustomId(doc, id));
    })

    res.status(200).json([...docsWithCustomId] )
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports =  createOne = (model, id) => async (req, res) => {
  try {

    let doc = await model.create({ ...req.body })

    doc = replaceMongoIdWithCustomId(doc, id)

    res.status(201).json({ ...doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

module.exports = updateOne = (model, id) => async (req, res) => {
  try {
    let updatedDoc = await model
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

      updatedDoc = replaceMongoIdWithCustomId(updatedDoc, id)

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
module.exports = removeOne = (model, id) => async (req, res) => {
  try {
    let removed = await model.findOneAndRemove({ _id: req.params.id })

    if (!removed) {
      return res.status(400).end()
    }

    removed = replaceMongoIdWithCustomId(removed, id)
    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


module.exports = crudControllers = (model, id) => ({
  removeOne: removeOne(model, id),
  updateOne: updateOne(model, id),
  getMany: getMany(model, id),
  getOne: getOne(model, id),
  createOne: createOne(model, id)
})