let arr=[];
function local(id,username,room){
let user ={id,username,room};

arr.push(user);
return user;
}
function getuser(id){

return arr.find(user=>user.id==id);

}
function leaveroom(id){
const loc = arr.findIndex(user=>user.id==id);

if(loc !==-1){

return arr.splice(loc,1)[0];
}
}
function getroom(room){
    return arr.filter(array=>array.room==room);
}

module.exports = {local,getuser,leaveroom,getroom};