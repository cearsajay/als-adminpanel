import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Redirect,
} from "react-router-dom";
toast.configure({
    // autoClose: 500,
});

function customStylesDataTable() {
    const customStyles = {
        headCells: {
            style: {
                '&:last-child': {
                    justifyContent: "center"
                },
                whiteSpace: "normal",
                textOverflow:"inherit"
            },
        },
        cells:{
            style: {
                // '&:first-child': {
                //     justifyContent: "center"
                // },
                '&:last-child': {
                    justifyContent: "center"
                },
            },
        }
    }
    return customStyles;


}
function isLoginResponse(history) {
    const isLogin = localStorage.getItem("access_token") || false;

    if (isLogin === null) {
        history.push("/securitysiteaccess/login");
    }
    if (isLogin === false) {
        history.push("/securitysiteaccess/login");
    }
}
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function isErrorMessage(name, message) {
    var el = document.createElement("span");
    el.classList.add("errorMsg");
    el.innerHTML = humanize(name) + ' ' + message;
    var div = document.getElementById(name);
    if (div.nextSibling) {
        div.nextSibling.remove()
    }
    div.classList.add("is-invalid");
    insertAfter(div, el);
}
function humanize(str) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}
function isError(error) {
    var errors_entries = Object.entries(error);
    if (errors_entries) {
        var allDivsCollections = document.getElementsByClassName('errorMsg');
        var arr = Array.from(allDivsCollections);
        arr.forEach((singleElement) => {
            singleElement.previousSibling.classList.remove("is-invalid");
            singleElement.remove();
        })
        errors_entries.forEach((errorAll) => {
            let type = errorAll[1].type;
            let name = errorAll[1].ref.name;
            let message = '';

            if (type === 'required') {
                message = 'is required.';
                isErrorMessage(name, message);
            } else if (type === 'minLength') {
                message = 'min length is 6.';
                isErrorMessage(name, message);
            } else if (type === 'maxLength') {
                message = 'Max length exceeded';
                isErrorMessage(name, message);
            } else if (type === 'validate') {
                message = errorAll[1].message;
                isErrorMessage(name, message);
            } else if (type === 'min') {
                message = 'min number is 0';
                isErrorMessage(name, message);
            } else if (type === 'max') {
                message = 'max number is 100';
                isErrorMessage(name, message);
            } else if (type === 'validate') {
                message = errorAll[1].message;
                isErrorMessage(name, message);
            
            } else if (type === 'pattern') {
                message = errorAll[1].message;
                isErrorMessage(name, message);
            }
            else {
                message = 'required.';
                isErrorMessage(name, message);
            }
        });
    }



    // var errors = Object.keys(error);
    // if (errors) {
    //     var allDivsCollections = document.getElementsByClassName('errorMsg');
    //     var arr = Array.from(allDivsCollections);
    //     arr.forEach((singleElement) => {
    //         singleElement.previousSibling.classList.remove("is-invalid");
    //         singleElement.remove();
    //     })

    //     errors.forEach((err, val) => {
    //         var el = document.createElement("span");
    //         el.classList.add("errorMsg");
    //         el.innerHTML = err + " is required.";
    //         var div = document.getElementById(err);
    //         if (div.nextSibling) {
    //             div.nextSibling.remove()
    //         }
    //         div.classList.add("is-invalid");
    //         insertAfter(div, el);
    //     });
    // }

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
        localStorage.removeItem('access_token');
        localStorage.removeItem('admin_profile');
        <Redirect
            to={{
                pathname: "/securitysiteaccess/login",
            }}
        />
        toast.error(errorData);
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
function HasRole(response) {
    if (response.status === 200) {
        if (response.data.message) {
            toast.success(response.data.message);
        }
    }
}

export { errorResponse, successResponse, isLoginResponse, configHeaderAxios, isError ,customStylesDataTable };