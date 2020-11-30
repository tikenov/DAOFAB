const express = require('express');
const router = express.Router();
const {parent, child} = require('../data/initialData');

const sortById = (a,b) => a.id - b.id;
const paginate = (array, size, page) =>  array.slice((page - 1) * size, page * size);

const parentData = parent.data.sort(sortById);
const childData = child.data.sort(sortById);

router.get('/', (req, res) => {
  const size = req.query.size || 2;
  const page = req.query.page || 1;
  res.send(paginate(parentData, size, page));
});

router.get('/:parentId', (req, res) => {
  const data = childData.filter(row => row.parentId == req.params.parentId);
  res.send(data);
});


module.exports.router = router;