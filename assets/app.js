const terkonfirmasi = document.getElementById('terkonfirmasi'),
	  dalamPerawatan = document.getElementById('dalamPerawatan'),
	  sembuh = document.getElementById('sembuh'),
	  meninggal = document.getElementById('meninggal'),
	  searchForm = document.getElementById('searchForm'),
	  searchOption = document.getElementById('searchOption'),
	  title = document.getElementById('title');

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
	const indonesia = d
	console.log(indonesia)
	dataCovidWorld(d)
}




const requestCovid = async () => {
	try {
		let response = await fetch('https://covid-193.p.rapidapi.com/countries', options)
		response = await response.json()
		const nameCountry = response.response
		for(nc of nameCountry) {
			const optionList = document.createElement('option');
			optionList.setAttribute('value', nc)
			optionList.innerText = '';
			optionList.innerText = nc;
			searchOption.append(optionList)
		}

		searchForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const selected = searchOption.options[searchOption.selectedIndex]
			getNameCountry(selected.value)
		})
	}catch(err) {
		console.log(err)
	}
}

requestCovid()


const getNameCountry = (d) => {
	let nameCountry = d;
	let url = `https://covid-193.p.rapidapi.com/statistics?country=${nameCountry}`
	fetchRequestCovid(url)
}


const fetchRequestCovid = async (dataRequest) => {
	const d = dataRequest;
	try {
		let response = await fetch(d, options);
		response = await response.json();
		ambilCounntry(response)
	}catch(err) {
		console.log(err)
	}
}


const ambilCounntry = (d) => {
	const nameCountry = d
	dataCovidWorld(d)
}

function dataCovidWorld(d) {
	const formatNumber = /(\d)(?=(\d{3})+(?!\d))/g;
	const { active, recovered, total } = d.response[0].cases,
		new_cases = d.response[0].cases.new,
	 	total_deaths = d.response[0].deaths.total,
	 	country = d.response[0].country,
     	day = d.response[0].day,
     	new_deaths = d.response[0].deaths.new,
     	population = d.response[0].population,
     	tests = d.response[0].tests.total,
     	countries = d.parameters.country

    terkonfirmasi.innerText = total.toString().replace(formatNumber, '$1.');
    dalamPerawatan.innerText = active.toString().replace(formatNumber, '$1.');
    sembuh.innerText = recovered.toString().replace(formatNumber, '$1.');
    meninggal.innerText = total_deaths.toString().replace(formatNumber, '$1.');
    title.innerText = countries;

	let persenTerkonfirmasi = parseInt(total) / parseInt(tests) * 100,
		persenSembuh = parseInt(recovered) / parseInt(tests) * 100,
		persenMeninggal =  parseInt(total_deaths) / parseInt(total) * 100

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

