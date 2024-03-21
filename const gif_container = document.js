const gif_container = document.getElementById("gif-container");

const searchGifBox = document.querySelector("#search_gif");
const submit = document.querySelector("#submit_search");
submit.addEventListener('click', (e) => {
    e.preventDefault();
    search_data(searchGifBox.value);
   
});

const trending=document.getElementById('trending').addEventListener('click',()=>trending_data())
const search=document.getElementById('search').addEventListener('click',()=>search_data('animals'))
const emoji=document.getElementById('emoji').addEventListener('click',()=>emoji_data())


const api_key = "tod4to7L1tkCbruT8wPCgKMxRzDrP58b";
const search_api = "https://api.giphy.com/v1/gifs/search";
const trending_api='https://api.giphy.com/v1/gifs/trending';
const emoji_api="https://api.giphy.com/v2/emoji";

//loader
const loader = document.createElement('h1');
loader.appendChild(document.createTextNode("Loading..."));
loader.style.color = "white";

// no data found 
const dataNotFound = document.createElement('h1');
dataNotFound.appendChild(document.createTextNode("Result not found !!"));
dataNotFound.style.color = "white";

function display_data(data) {   
    gif_container.appendChild(loader); // to show loading till data is not displayed

    const createGifDiv = ({url, height, width}) => {
        const newDiv = document.createElement("div");
        const newImg = document.createElement("img");
        newImg.setAttribute("src", url);
        newImg.setAttribute("height", height);
        newImg.setAttribute("width", width);
        newImg.setAttribute('id',url)
        newDiv.appendChild(newImg);
        newDiv.className = "gif";

        const svg_div=document.createElement('div')
        
        svg_div.style.width='fit-content'
     
        svg_div.innerHTML=`<svg class='svg' id=${url} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
        
        svg_div.style.cursor='pointer'
        newDiv.appendChild(svg_div);
        gif_container.appendChild(newDiv);
        
    };

    if (data.length === 0)
        gif_container.appendChild(dataNotFound);

    data.map((item) => {
        const gif_image = item.images.fixed_height;
        createGifDiv(gif_image);
    });

    gif_container.removeChild(loader);  // remove loading on displaying data on view 

    const svg = document.querySelectorAll('.svg')
    svg.forEach((svg)=>{
        const a=document.createElement('a')
            a.href=svg.id;
            a.download=''
            a.style.display='none'

            svg.addEventListener('click',(e)=>{  
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a);            

        }
        )
    })
}

async function search_data(search_parameter) {
    try {
        searchGifBox.value=`${search_parameter}`
        gif_container.innerHTML = '';  // clear previous data on view
        gif_container.appendChild(loader);  // show loading...
        const response = await fetch(`${search_api}?api_key=${api_key}&q=${search_parameter}`);
        const json_data = await response.json();
        const data = json_data.data;
        display_data(data);
    } catch(error) {
        gif_container.removeChild(loader); 
        alert(error);
    }
}



async function trending_data()
{
    try {
        searchGifBox.value=""
        gif_container.innerHTML = '';  // clear previous data on view
        gif_container.appendChild(loader);  // show loading...
        const response=await fetch(`${trending_api}?api_key=${api_key}`)
        const json_data = await response.json();
        const data = json_data.data;
        display_data(data)
    } catch(error) {
        gif_container.removeChild(loader); 
        alert(error);
    }
}


async function emoji_data()
{
    try {
        searchGifBox.value=""
        gif_container.innerHTML = '';  // clear previous data on view
        gif_container.appendChild(loader);  // show loading...
        const response=await fetch(`${emoji_api}?api_key=${api_key}`)
        const json_data = await response.json();
        const data = json_data.data;
        display_data(data)
    } catch(error) {
        gif_container.removeChild(loader); 
        alert(error);
    }
}
