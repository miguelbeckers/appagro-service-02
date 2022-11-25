const router = require('express').Router()
const Measurement = require('../models/Measurement')

router.get('/hello', (req, res) => {
  res.json({ message: 'hello' })
})

router.get('/', async (req, res) => {
  try {
    const measurements = await Measurement.find()
    res.status(200).json(measurements)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const measurement = await Measurement.findOne({ _id: id })
    if (!measurement) {
      res.status(404).json({ message: "medição não encontrada" })
      return
    }
    res.status(200).json(measurement)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { value, date } = req.body

  if (!value) {
    res.status(400).json({ error: 'o valor é obrigatório' })
    return
  }

  if (!date) {
    res.status(400).json({ error: 'a data é obrigatória' })
    return
  }

  const measurement = { value, date }

  try {
    await Measurement.create(measurement)
    res.status(201).json({ message: 'medição criada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { value, date } = req.body
  const measurement = { value, date }

  try {
    const updated = await Measurement.updateOne({ _id: id }, measurement)
    if(updated.matchedCount === 0){
      res.status(404).json({ message: "medição não encontrada" })
      return
    }
    res.status(200).json(measurement)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const measurement = await Measurement.findOne({ _id: id })
    if (!measurement) {
      res.status(404).json({ message: "medição não encontrada" })
      return
    }
    await Measurement.deleteOne({ _id: id })
    res.status(200).json({message: "medição excluída"})
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router