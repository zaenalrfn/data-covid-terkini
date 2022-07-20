const terkonfirmasi = document.getElementById('terkonfirmasi'),
	  dalamPerawatan = document.getElementById('dalamPerawatan'),
	  sembuh = document.getElementById('sembuh'),
	  meninggal = document.getElementById('meninggal');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '023f98117fmsh1c2705b6ac9a25fp11f719jsna2f7cf1eb86c',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

// fetch promise
// fetch('https://covid-193.p.rapidapi.com/statistics', options)
// 	.then(response => response.json())
// 	.then(response => ambil(response))
// 	.catch(err => console.error(err));

// fetch async/await
const dataCovid = async () => {
	try {
		let getCovid = await fetch('https://covid-193.p.rapidapi.com/statistics?country=indonesia', options);
		getCovid = await getCovid.json();
		setTimeout(function() {
			ambil(getCovid);
		}, 200)
	} catch(err) {
		console.log(err)
	}
}
dataCovid()

const ambil = (d) => {
	const formatNumber = /(\d)(?=(\d{3})+(?!\d))/g;
	const indonesia = d
	const { active, recovered, total } = d.response[0].cases,
		new_cases = d.response[0].cases.new,
	 	total_deaths = d.response[0].deaths.total,
	 	country = d.response[0].country,
     	day = d.response[0].day,
     	new_deaths = d.response[0].deaths.new,
     	population = d.response[0].population,
     	tests = d.response[0].tests.total

    terkonfirmasi.innerText = total.toString().replace(formatNumber, '$1.');
    dalamPerawatan.innerText = active.toString().replace(formatNumber, '$1.');
    sembuh.innerText = recovered.toString().replace(formatNumber, '$1.');
    meninggal.innerText = total_deaths.toString().replace(formatNumber, '$1.');
	console.log(indonesia) 

	const bagi = 100
	let persenTerkonfirmasi = parseInt(total) / parseInt(tests) * 100
		persenSembuh = parseInt(recovered) / parseInt(tests) * 100
		persenMeninggal =  parseInt(total_deaths) / parseInt(total) * 100


	console.log(persenTerkonfirmasi)
	console.log(persenSembuh)
	console.log(persenMeninggal)
	const data = {
		labels: [
			`terkonfirmasi : ${Math.floor(persenTerkonfirmasi)}%`,
			`Sembuh : ${Math.floor(persenSembuh)}%`,
			`Meninggal : ${Math.floor(persenMeninggal)}%`,
		],
		datasets: [{
			label: 'My First Dataset',
			data: [persenTerkonfirmasi, persenSembuh, persenMeninggal],
			backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)'
			],
			hoverOffset: 4
		}]
	}


	const viewChart = {
		type: 'doughnut',
		data: data,
	}
	const chart = document.getElementById('myChart')
	const myChart = new Chart(chart, viewChart)
}



// chart


