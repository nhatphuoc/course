const Course = require('../models/Course')
const {mongooseToObject, mutipleMongooseToObject}= require('../../util/mongoose')
class MeController {
    
    storedCourses(req, res, next) { 
        Course.find({deleteAt: null})
            .then(courses=>res.render('me/stored-courses',
                {courses: mutipleMongooseToObject(courses)}
            ))    
            .catch(next) 
        
    }


    
}

module.exports = new MeController();
