const slicer = async (url, files, sizechunk=1024*1024, data={})=>{
    if(files){
        let formData = new FormData();
        let reader = new FileReader();
        let blob;
        for (let key in data) {
            formData.set(key, data[key]);
        }
        for(let i = 0; i < files.length; i++) { 
            let file = files[i];        
            formData.set('name',file.name);
            formData.set('type',file.name.split('.').pop());
            formData.set('size',file.size);
            formData.set('sizeChank',sizechunk)
            let req = await request(url+'/status',formData);
            let position = await req.json();
            if(position.status !== file.size){
                let start = position.status || 0;  
                reader.onload = async (e) => {
                    let index = e.target.result.indexOf(",");
                    let chunk = e.target.result.substring(index+1);
                    formData.set('chunk', chunk);
                    const result = await request(url + '/upload',formData);
                    if(result.status === 200){
                        start += sizechunk;
                        if(start < file.size){
                            blob = file.slice(start,start + sizechunk);
                            reader.readAsDataURL(blob);
                        }
                    }
                }; 
                blob = file.slice(start,sizechunk);
                reader.readAsDataURL(blob);
            }
        }
    }
    
}

const request = async (url,data)=>{
    const response = await fetch(url, {
        method: 'POST',
        body: data
    });
    return await response;
}

const support = () => {
    if(window.File && window.FileReader && window.FileList && window.Blob) {
        return true;
    } else {
        return false;
    }
}
export {slicer, support};
