



'use strict';





document.addEventListener('DOMContentLoaded', () => {
    while(true){
        setTimeout(async() => {
            const accountService = status_request('https://projectory-account-services.onrender.com/server-status');
            const hyperlinkService = status_request('https://projectory-hyperlink-services.onrender.com/server-status');
            const projectMgmtService = status_request('https://projectory-project-management-services.onrender.com/server-status');
            activate_indicator_light("account-services", await accountService);
            activate_indicator_light("hyperlink-services", await hyperlinkService);
            activate_indicator_light("projectMgmt-services", await projectMgmtService);
            try{
                let response = await fetch('https://projectory-data-removal-services.onrender.com/deletion', {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                if(response.detail){
                    if(response.detail == 'Missing user email'){
                        activate_indicator_light("removal-services", true);
                        return;
                    }
                }
            }catch(error){
                console.log(error);
            }
            activate_indicator_light("removal-services", false);
        }, 2000);
    }
});

const activate_indicator_light = function(id, status){
    const element = document.getElementById(id);
    if(status){
        element.classList.add('active');
        return;
    }
    element.classList.add('inactive');


}

const status_request = async(endpoint) => {
    try{
        let response = await fetch(endpoint, {
            method: "GET", 
            headers: {"Content-type": "application/json"} 
            
        });
        if(response.status){
            if(response.status == 200){
                return true;
            }
        }
    }catch(error){
        console.log(error);
    }
    return false;
}