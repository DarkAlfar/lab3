//import axios
// import axios from 'axios';

//define function
const hhAPI = async () => {
    try {
        //make the request
        const response = await axios.get('https://api.hh.ru/vacancies');
        //extract the data from response
        const data = response.data;
        //do something with data
        console.log(data);
        // const widget = document.querySelector("#widget");
        // widget.innerHTML = data;
        const items = response.data.items;
        const list = document.createElement("ul");
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const li = document.createElement("li");
            li.innerHTML = item.name;
            list.appendChild(li);
        }
        const widget = document.querySelector("#widget");
        widget.appendChild(list);
    } catch (error) {
        console.log(error);
    }
};

hhAPI();