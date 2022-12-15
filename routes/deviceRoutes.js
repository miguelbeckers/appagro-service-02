const router = require('express').Router()
const Device = require('../models/Device')

router.get('/hello', (_req, res) => {
  res.json({ message: 'hello' })
})

router.get('/', async (_req, res) => {
  try {
    const devices = await Device.find()
    res.status(200).json(devices)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const device = await Device.findOne({ _id: id })
    if (!device) {
      res.status(404).json({ message: "dispositivo não encontrado" })
      return
    }
    res.status(200).json(device)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.post('/', async (req, res) => {
  const { name, area, coordinate } = req.body

  if (!name) {
    res.status(400).json({ error: 'o nome é obrigatório' })
    return
  }

  if (!area) {
    res.status(400).json({ error: 'a área é obrigatória' })
    return
  }

  if (!coordinate) {
    res.status(400).json({ error: 'a coordenada é obrigatória' })
    return
  }

  const device = { name, area, coordinate }

  try {
    const created = await Device.create(device)
    res.status(201).json(created)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name, coordinate } = req.body
  const device = { name, coordinate, updatedAt: Date.now }

  try {
    const updated = await Device.updateOne({ _id: id }, device)
    if(updated.matchedCount === 0){
      res.status(404).json({ message: "dispositivo não encontrado" })
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
    const device = await Device.findOne({ _id: id })
    if (!device) {
      res.status(404).json({ message: "instrumento não encontrado" })
      return
    }
    await Device.deleteOne({ _id: id })
    res.status(200).json({message: "instrumento excluído"})
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router