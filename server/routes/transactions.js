const express = require('express');
const router = express.Router();
const { parent, child } = require('../data/initialData');

const sortById = (a, b) => a.id - b.id;
const paginate = (array, size, page) => array.slice((page - 1) * size, page * size);

const parentData = parent.data.sort(sortById).map(item => ({ ...item, totalPaidAmount: child.data.reduce((a, el) => el.parentId == item.id ? a + el.paidAmount : a, 0) }));
const childData = child.data.sort(sortById);


// Route for task 1
router.get('/', (req, res) => {
  const size = req.query.size || 2;
  const page = req.query.page || 1;
  res.send(({ items: paginate(parentData, size, page), totalPages: Math.ceil(parentData.length / size), totalItems: parentData.length, currentPage: page }));
});

// Route for task 2
router.get('/:parentId', (req, res) => {
  const data = childData.filter(row => row.parentId == req.params.parentId);
  res.send(data);
});


module.exports.router = router;