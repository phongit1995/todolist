let Task = require('../models/Task');
let Joi = require('joi');
let index = async (req,res)=>{
   Task.findAll().then(data=>{
    res.render('index',{tasks:data});
   }).catch(error=>{
       res.send("Có Lỗi Xảy Ra:"+ error);
   });
}
let addTask =  (req,res)=>{
    console.log(req.body.taskname);
    let base = Joi.object().keys({
        task_name: Joi.string().required()
    });
    let result = Joi.validate({task_name:req.body.taskname},base);
    if(!result.error){
        Task.create({
                task_name: result.value.task_name,
                status: req.body.status
            })
            .then(sucess => {
                return res.status(200).send({
                    status: "success",
                    message: "Thêm Thành Công"
                })
            }).catch(erro => {
                return res.status(200).send({
                    status: "error",
                    message: "Thêm Không Thành Công"
                })
            })
    }
    else{
        return res.status(200).send({
            status:"error",
            message:"Bạn Nhập Vào Chưa Đúng"
        })
    }
    
}
let listTask =  (req,res)=>{
    Task.findAll().then(data=>{
        res.status(200).send({
            status:"success",
            data:data
        })
    }).catch(error=>{
        res.status(200).send({
            status:"error",
            data:error
        })
    })
}
let deleteTask = (req,res)=>{
    console.log(req.params.id);
    let base = Joi.object().keys({
        id: Joi.number()
    });
    let result = Joi.validate({id:req.params.id},base);
    if(!result.error){
        Task.destroy({
            where:{id_tasks:result.value.id}
        }).then(sucess=>{
            return res.status(200).send({
                status:"success",
                message:"Xóa Thành Công"
            })
        }).catch(erro=>{
            return res.status(200).send({
                status:"error",
                message:"Xóa Không Thành Công"
            })
        })
    }
    else{
        return res.status(200).send({
            status:"error",
            message:"Bạn Nhập Vào Chưa Đúng"
        })
    }
}
let updateTask =(req,res)=>{
    let base = Joi.object().keys({
        task_name: Joi.string().required(),
        id_task: Joi.number().required()
    });
    console.log(req.body);
    let result = Joi.validate({task_name:req.body.taskname,id_task:req.body.id_task},base);
    if(!result.error){
        console.log(result);
        Task.update({
                task_name: result.value.task_name,
                status: req.body.status
            },{
                where:{id_tasks:result.value.id_task}
            })
            .then(sucess => {
                return res.status(200).send({
                    status: "success",
                    message: "Update Thành Công"
                })
            }).catch(erro => {
                console.log(erro);
                return res.status(200).send({
                    status: "error",
                    message: "Update Không Thành Công"
                })
            })
    }
    else{
        return res.status(200).send({
            status:"error",
            message:"Vui Lòng Xem Lại thông Tin"
        })
    }
}
module.exports = {index,addTask,listTask,deleteTask,addTask,updateTask};