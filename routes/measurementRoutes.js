const router = require('express').Router()
const Measurement = require('../models/Measurement')
const Device = require('../models/Device')

router.get('/hello', (_req, res) => {
  res.json({ message: 'hello' })
})

router.get('/', async (_req, res) => {
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

router.post('/:id', async (req, res) => {
  const { value } = req.body
  const id = req.params.id

  if (!value) {
    res.status(400).json({ error: 'o valor é obrigatório' })
    return
  }

  try {
    var device = await Device.findOne({ _id: id })

    if (!device) {
      res.status(404).json({ message: "dispositivo não encontrado" })
      return
    }

    const measurement = { value }
    const created = await Measurement.create(measurement);

    device.measurements = [created];

    const updated = await Device.updateOne({ _id: id }, device);
    if (updated.matchedCount === 0) {
      res.status(404).json({ message: "falha ao atualizar o dispositivo" })
      return
    }

    res.status(201).json(created);

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { value } = req.body
  const measurement = { value, updatedAt: Date.now() }

  try {
    const updated = await Measurement.updateOne({ _id: id }, measurement)
    if (updated.matchedCount === 0) {
      res.status(404).json({ message: "medição não encontrada" })
      return
    }
    res.status(200).json({ message: "medição atualizada com sucesso" })
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
    res.status(200).json({ message: "medição excluída" })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router