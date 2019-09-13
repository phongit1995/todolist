function DelteTask(id){
    console.log(id);
    if(confirm("Bạn Muốn Xóa Công Việc Này Không")){
        $.ajax({
            type:'put',
            url:`/deleteTask/${id}`,
            data:{id:id},
            success:(data)=>{
                console.log(data);
                if(data.status=='success'){
                    alert("Xóa Thành Công");
                    LoadTask();
                }
                else{
                    alert("Xóa Chưa Thành Công");
                }
            }
        })
    }
    else{
        return
    }

}
 function mySubmitFunction(e){
 
    let taskname = $('input[name=taskname]').val();
    let status = $('input[name=status]:checked').val();

    let obj={
    }
    obj.taskname = taskname,
    obj.status=status;
    $.ajax({
        type:'post',
        url:`/addTask`,
        data:obj,
        success:(data)=>{
            console.log(data);
            if(data.status=='success'){
                alert("Thêm Thành Công");
                $('input[name=taskname]').val( " ");
                LoadTask();
            }else{
                alert("Thêm Chưa Thành Công");
            }
        }
    })
    e.preventDefault();
}
function LoadTask(){
    $.ajax({
        type:'get',
        url:`/getAllTast`,
        success:(data)=>{
            //console.log(data);
            if(data.status=='success'){
                let result =data.data.map((value,index)=>{
                    let status = value.status==true? "Hoàn  Thành" : "Chưa Hoàn Thành";
                    return `
                    <tr class="text-center">
                    <td scope="row"> ${index+1}</td>
                    <td> ${value.task_name}</td>
                    <td> ${status} </td>
                    <td> <button type="button" class="btn btn-warning" onclick="showPopup('${value.task_name}',${value.status},${value.id_tasks})" >Sửa</button> <button type="button" class="btn btn-danger" onclick="DelteTask(${value.id_tasks})">Xóa</button></td>
                </tr>
                    `
                })
                let results = result.join("");
                $(".content-list-tasks").empty().append(result);

            }
           
        }
    })
}
function  showPopup(name,status,id){
    let statusHoanthanh = status==true ? "checked":"";
    let statusChuaHoanthanh = status==false ? "checked":"";
    let element =  `
 
    <input type="text" value=" ${name}" class="form-control" style="display: inline; width: 30%;" name="updatetaskname">
    <input type="radio" name="statusupdate" value="1"` +  statusHoanthanh  +`> Hoàn thành 
    <input type="radio" name="statusupdate" value="0"` + statusChuaHoanthanh +`> Chưa hoàn thành 
    <td> <button type="submit" class="btn btn-success" onclick="saveUpdate(${id})" >Lưu</button> <button type="button" class="btn btn-danger" onclick="huyUpdate()">Hủy</button></td>  `;
    $(".updatetask").empty().append(element);
}
function huyUpdate(){
    $(".updatetask").empty();
}
function saveUpdate(id){
    let taskname = $('input[name=updatetaskname]').val();
    let status = $('input[name=statusupdate]:checked').val();
    $.ajax({
        type:"put",
        url:"updateTask",
        data:{taskname:taskname,status:status,id_task:id},
        success:(data)=>{
            console.log(data);
            if(data.status=='success'){
                alert("Update Thành Công");
                $(".updatetask").empty();
                LoadTask();
            }else{
                alert("Update Chưa Thành Công");
            }
        }
    })
    console.log(taskname,status);
}