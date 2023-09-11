const express = require('express');
const { addSubject, getSubjects, editSubject, deleteSubject } = require('../services/subjects');
const router = express.Router();


router.route('/').post(addSubject);

router.route('/').get(getSubjects);

router.route('/:id').put(editSubject);

router.route('/:id').delete(deleteSubject);

module.exports = router;