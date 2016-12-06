const express = require('express');
const db = require('../../db/mongodb.cfg');

const router = express.Router();


router.post('/question/add', (req, res)=>{
    db.Topic.Model
        .find({description: req.body.topic})
        .exec()
        .then( (result)=>{
            if(result.length == 0){
                res.json({flag: 0, msg: '话题信息检索失败'})
            }else{
                saveQuestion(result[0]._id, req, res)
            }
        } )
        .catch( (err)=>{
            console.log(err)
            res.json({flag: 0, msg: '数据库异常2'})
        } )

    function saveQuestion(topic_id, req, res) {
        var question = new db.Question.Model({
            owner: req.cookies.signerID,
            title: req.body.title,
            designation: req.body.designation,
            topic: topic_id,
            answers: [],
            createTime: new Date(),
            updateTime: new Date()
        })
            .save()
            .then( ()=>{
                res.json({flag: 1, msg: '问题发布成功！'})
            })
            .catch( (err)=>{
                console.log(err);
                res.json({flag: 0, msg: '问题发布失败'});
            })
    }
})


module.exports = router;