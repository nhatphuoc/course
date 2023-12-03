const Course = require('../models/Course')
const {mongooseToObject}= require('../../util/mongoose')
class CourseController {
    
    show(req, res,next) {
        Course.findOne({slug: req.params.slug })
            .then(course =>
                res.render('courses/show', { course: mongooseToObject(course) })
            )
            .catch(next)

    }
    //[GET]
    create(req,res, next){
        res.render('courses/create')
    }
    //[POST]
    store(req,res, next){
        const formData = req.body;
        formData.image = `http://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`
        const course = new Course(formData);
        course.save()
            .then(()=> res.redirect('/'))
            .catch(error=>{})
    }
    //[GET]
    edit(req,res, next){
        Course.findById(req.params.id)
            .then(course=>res.render('courses/edit',{
                course: mongooseToObject(course)
            }))
            .catch(next)
        
    }

    //[PUT]
    update(req, res, next){
        
        Course.updateOne({_id: req.params.id }, req.body)
            .then(()=>res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[DELETE]
    delete(req, res, next){
        Course.deleteOne({_id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }

}

module.exports = new CourseController();
