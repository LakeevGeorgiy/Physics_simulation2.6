let inductance_text = document.getElementById("inductance_id");
let resistence_text = document.getElementById("resistence_id");
let capacitor_text = document.getElementById("capacitor_id");
let charge_text = document.getElementById("charge_id");
let button = document.getElementById("button_id");

let inductance = inductance_text.value;
let resistence = resistence_text.value;
let capacitor = capacitor_text.value;
let charge = charge_text.value;

function PlotEMF() {

    let time_coordinates = [];
    let charge_coordinates = [];
    let current_coordinates = [];
	let voltage_coordinates = [];

    let b = resistence / 2 / inductance;
	let w_0 = 1 / Math.sqrt(inductance * capacitor);
	let w = Math.sqrt(Math.pow(w_0, 2) - Math.pow(b, 2));
	console.log(charge, b, w_0, w);

    for (let i = 0; i < 100; ++i){
		time_coordinates[i] = i / 10;
		charge_coordinates[i] = charge * Math.exp(-b * time_coordinates[i]) * Math.cos(w * time_coordinates[i]);
		current_coordinates[i] = (-charge * Math.exp(-b * time_coordinates[i]) * (b * Math.cos(w * time_coordinates[i]) + w*Math.sin(w * time_coordinates[i])));
		voltage_coordinates[i] = charge_coordinates[i] / capacitor;
	}

	console.log(time_coordinates);
	console.log(charge_coordinates);
	console.log(current_coordinates);
	console.log(voltage_coordinates);

    let emf = {
        x: time_coordinates, 
        y: charge_coordinates, 
        mode: 'lines',
		name: 'Сила заряда'
    };

    let current = {
        x: time_coordinates,
        y: current_coordinates,
        mode: 'lines',
        xaxis: 'x2',
        yaxis: 'y2',
		name: 'Сила тока'
    };

    let together1 = {
        x: time_coordinates,
        y: voltage_coordinates,
        mode: 'lines',
        xaxis: 'x3',
        yaxis: 'y3',
		name: 'Напряжения'
    };

    let data = [emf, current, together1];

    let layout = {
        grid: { rows: 1, columns: 3, pattern: 'independent'},
        annotations: [ 
            { 
				text: "График зависимости силы заряда от времени)",
				font: { size: 16, color: 'blue' },
				showarrow: false,
				align: 'center',
				x: 0,
				y: 1.2,
				xref: 'paper',
				yref: 'paper',
            },
			{ 
				text: 'График зависимости силы тока от времени',
                font: { size: 16, color: 'blue' },
				showarrow: false,
				align: 'center',
				x: 0.5,
				y: 1.2,
				xref: 'paper',
				yref: 'paper',
            },
			{ 
                text: 'График зависимости напряжения от времени',
                font: { size: 16, color: 'blue' },
				showarrow: false,
				align: 'center',
				x: 1.1,
				y: 1.2,
				xref: 'paper',
				yref: 'paper',
            },
			{
				xref: 'paper',
				yref: 'paper',
				x: 0,
				xanchor: 'right',
				y: 1,
				yanchor: 'bottom',
				text: 'Кл',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.26,
				xanchor: 'left',
				y: 0.45,
				yanchor: 'top',
				text: 'с',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.38,
				xanchor: 'right',
				y: 1,
				yanchor: 'bottom',
				text: 'А',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.62,
				xanchor: 'left',
				y: 0.45,
				yanchor: 'top',
				text: 'с',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.38,
				xanchor: 'right',
				y: 1,
				yanchor: 'bottom',
				text: 'А',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.62,
				xanchor: 'left',
				y: 0.45,
				yanchor: 'top',
				text: 'с',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 0.72,
				xanchor: 'right',
				y: 1,
				yanchor: 'bottom',
				text: 'В',
				showarrow: false
			},
			{
				xref: 'paper',
				yref: 'paper',
				x: 1,
				xanchor: 'left',
				y: 0.5,
				yanchor: 'top',
				text: 'с',
				showarrow: false
			}
        ],
    };

	Plotly.newPlot('tester', data, layout);
}

button.addEventListener("click", function(e){
	inductance = inductance_text.value;
	if (inductance < 0) {
		alert("Индуктивность меньше 0!");
		return;
	}

	resistence = resistence_text.value;
	if (resistence < 0) {
		alert("Сопротивления меньше 0!");
		return;
	}

	capacitor = capacitor_text.value;
	if (capacitor < 0) {
		alert("Ёмкость конденсатора меньше 0!");
		return;
	}

	charge = charge_text.value;
	if (charge < 0) {
		alert("Изначальный заряд меньше 0!");
		return;
	}
	
    PlotEMF();
});