
const result = document.querySelector('.result');

const fetchData = async() => {
    try {
        const data = axios.get("/.netlify/functions/1-hello");
    } catch (error) {
        console.log(error.response);
    }
}

fetchData();