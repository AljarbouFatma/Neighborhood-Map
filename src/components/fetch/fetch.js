export const fetchApi = ({url,body,method="GET"},callback) => {
	fetch(url,{
		method,
		body:JSON.stringify(body),
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
		}
	}).then(response => {
		if(response.ok){
			response.json().then(data => {
				callback(null,data)
			})
		} else {
			callback(new Error("Response not OK"))
		}
	}).catch(error => {
		console.log(error)
		callback(error)
	})
}
