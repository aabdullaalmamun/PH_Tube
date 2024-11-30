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
const button = document.createElement("button");
button.classList="btn";
button.innerText= item.category;

//add button to catagoriesContainer;
catagoriesContainer.append(button);
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
//using for of loop
for(const item of items){
console.log(item);
//creating card
const card= document.createElement('div');
card.classList="card card-compact";
card.innerHTML=`
 <figure class="h-[200px] relative">
    <img
      src=${item.thumbnail} class="h-full w-full object-cover">
      ${item.others.posted_date?.length==0?"": `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${setTime(item.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div><img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}"></div>
    <div>
    <h2 class="font-bold"> ${item.title}</h2>
    
    <div class="flex item-center gap-2">
    <p class="text-gray-400">${item.authors[0].profile_name}</p>
    ${item.authors[0].verified === true? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">`: ""}
    </div>
    
    <P> </P>
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