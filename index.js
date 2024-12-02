//1- fetch , load and show catagoried on html

//create loadCatagorie
const loadCatagorie =() =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
.then(data=>displayCatagorie(data.categories));
};
//create displaycatagorie
const displayCatagorie =(items) =>{
    const catagoriesContainer= document.getElementById('category');
// using forEach loop
// items.forEach((item)=>{
//     console.log(item);
// });
    
//using for of loop
for(const item of items){
// console.log(item);

//create button
const buttonContainer = document.createElement("div");
buttonContainer.innerHTML=`
<button id="btn-${item.category_id}" onclick="loadCatagoryVideo(${item.category_id})" class="btn btn-catagory">
${item.category}
</button>
`;


//add button to catagoriesContainer;
catagoriesContainer.append(buttonContainer);
}
};
loadCatagorie();


// videos section
const loadvideo =() =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res=>res.json())
.then(data=>displayvideo(data.videos))
.catch(err=>console.error(err))
};

const displayvideo =(items) =>{
const videoContainer = document.getElementById('videos');
videoContainer.innerHTML="";

if(items.length==0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML=`
    <div class="min-h-[300px] flex flex-col justify-center items-center bg-red-200 ">
    <img src="ph-tube-resources/Icon.png" />
    <h2 class="text-center text-xl font-bold">No content here in this category</h2>
    </div>
      `;
    return;
}
else{
    videoContainer.classList.add("grid");
}

//using for of loop
for(const item of items){
// console.log(item);
//creating card
const card= document.createElement('div');
card.classList="card card-compact";
card.innerHTML=`
 <figure class="h-[200px] relative">
    <img
      src=${item.thumbnail} class="h-full w-full  object-cover">
      ${item.others.posted_date?.length==0?"": `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1 text-sm">${setTime(item.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div><img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}"></div>
    <div>
    <h2 class="font-bold"> ${item.title}</h2>
    
    <div class="flex item-center gap-2">
    <p class="text-gray-400">${item.authors[0].profile_name}</p>
    ${item.authors[0].verified === true? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">`: ""}
    </div>
    
    <P><button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error">Details</button></P>
    </div>
  </div>
`;
videoContainer.append(card);
}
};
loadvideo();


//function for time
function setTime(time){
    const hr=parseInt(time/3600);
    let rtime=time%3600;
    const min= parseInt(rtime/60);
    rtime=rtime%60;

return `${hr} hr ${min} min ${rtime} sec ago`;
}

//loadCatagoryVideo() function for onclick button
const loadCatagoryVideo =(id) =>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
.then(data=>{
    //class e button deactive
    const activebtnClass= document.getElementsByClassName('btn-catagory');
    // console.log(activebtnClass);
    for(let button of activebtnClass){
        button.classList.remove("bg-red-400");
        button.classList.remove("text-white");
    }
    //id er class active
    const activebtn= document.getElementById(`btn-${id}`);
    // console.log(activebtn);
    activebtn.classList.add("bg-red-400");
    activebtn.classList.add("text-white");
    displayvideo(data.category)
})
.catch(err=>console.error(err))
}

//load Details function
const loadDetails= (videoID)=>{
    let url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data.video))
    .catch(err=>console.log(err));
}
const displayDetails= (video)=>{
console.log(video);
const detailContainer = document.getElementById("modal-content");
detailContainer.innerHTML=`
<img src=${video.thumbnail}/>
<P>${video.description}</P>
`;
//way-1
// document.getElementById("showModalData").click();
//way-2
document.getElementById("customModal").showModal();
};
