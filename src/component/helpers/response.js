import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
    // autoClose: 500,
});

function isLoginResponse(history) {
    const isLogin = localStorage.getItem("access_token") || false;

    if (isLogin === null) {
        history.push("/login");
    }
    if (isLogin === false) {
        history.push("/login");
    }
}
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function isError(error) {
    var errors = Object.keys(error);
    if (errors) {
         var allDivsCollections = document.getElementsByClassName('errorMsg');
         var arr = Array.from(allDivsCollections);
         arr.forEach((singleElement)=>{
            singleElement.previousSibling.classList.remove("is-invalid");
            singleElement.remove();
         })          
        
        errors.forEach((err) => {
            var el = document.createElement("span");
            el.classList.add("errorMsg");
            el.innerHTML = err + " is required.";
            var div = document.getElementById(err);
            if(div.nextSibling){
                div.nextSibling.remove()
            }
            div.classList.add("is-invalid");
            insertAfter(div, el);
        });
    }

}
function configHeaderAxios() {
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Referrer-Policy': '*',
            'Referrer': '*',
            'content-type': 'application/json',
            'authorization': localStorage.getItem('access_token')
        }
    }
    return config;
}
function errorResponse(error) {
    if (error.response.status === 422) {
        let errorData = error.response.data.error;
        if (errorData) {
            var errors = Object.values(errorData);
            if (errors) {
                errors.forEach((err) => {
                    toast.error(err);
                });
            }
        }
    }
    if (error.response.status === 401) {

        let errorData = error.response.data.Unauthorized;
        toast.error(errorData);
        localStorage.removeItem('access_token');
        localStorage.removeItem('admin_profile');
    }
    if (error.response.data.message) {
        toast.error(error.response.data.message);
    }
}
function successResponse(response) {
    if (response.status === 200) {
        if (response.data.message) {
            toast.success(response.data.message);
        }
    }
}


export { errorResponse, successResponse, isLoginResponse, configHeaderAxios, isError };