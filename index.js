const slicer = async (url, headers={}, file, sizechunk=1024*1024, data={}, callback=f=>f, stopObj={})=>{
    if(file){
        let formData = new FormData();
        let reader = new FileReader();
        let blob;
        let progress;
        for (let key in data) {
            formData.set(key, data[key]);
        }       
        formData.set('name',file.name);
        formData.set('type',file.name.split('.').pop());
        formData.set('size',file.size);
        formData.set('sizeChank',sizechunk)
        let req = await request(url+'/status', headers, formData);
        let position = await req.json();
        if(position.status !== file.size){
            let start = position.status || 0;  
            reader.onload = async (e) => {
                if(stopObj.stop) return;
                let index = e.target.result.indexOf(",");
                let chunk = e.target.result.substring(index+1);
                formData.set('chunk', chunk);
                const result = await request(url + '/upload', headers, formData);
                if(result.status === 200){
                    start += sizechunk;
                    if((start*100)/file.size > 100){
                        progress = 100
                    }else{
                        progress = (start*100)/file.size
                    }
                    let dataResult = await result.json();
                    callback({
                        name: file.name,
                        progress: progress,
                        data: dataResult
                    })
                    if(start < file.size){
                        blob = file.slice(start,start + sizechunk);
                        reader.readAsDataURL(blob);
                    }
                }else{
                    let dataResult = await result.json()
                    callback({
                        error: true,
                        name: file.name,
                        progress: progress,
                        data: dataResult
                    })
                    return;
                }
            }; 
            blob = file.slice(start,sizechunk);
            reader.readAsDataURL(blob);
        }else{
            callback({
                name: file.name,
                progress: 100,
            })
            return;
        }
    }
}

const request = async (url,headers, data)=>{
    const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: headers
    });
    return response;
}

const support = () => {
    if(window.File && window.FileReader && window.FileList && window.Blob) {
        return true;
    } else {
        return false;
    }
}
export {slicer, support};