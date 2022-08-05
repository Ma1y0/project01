const express = require('express')
const director = require('../models/director')
const router = express.Router()
const Director = require('../models/director')

router.get('/', async (req, res) => {
  let searchOptions = { }
  if (req.query != null && req.query !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

  try {
    const directors = await Director.find(searchOptions)
    res.render('directors/index', { 
      directors: directors, 
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/new', (req, res) => {
    res.render('directors/new', { director: new Director() })
})

router.post('/', async (req, res) => {
  const director = new Director({
    name: req.body.name
  })
  try {
    const newDirector = await director.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`directors`)
  } catch {
    res.render('directors/new', {
      director: director,
      errorMessage: 'Something went wrong'
    })
  }
})

module.exports = router