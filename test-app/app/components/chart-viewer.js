import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const dataSource = {
    chart: {
        caption: "Harry's SuperMart",
        subCaption: 'Top 5 stores in last month by revenue',
        numberPrefix: '$',
        theme: 'ocean'
    },
    data: [
        {
            label: 'Bakersfield Central',
            value: '880000'
        },
        {
            label: 'Garden Groove harbour',
            value: '730000'
        },
        {
            label: 'Los Angeles Topanga',
            value: '590000'
        },
        {
            label: 'Compton-Rancho Dom',
            value: '520000'
        },
        {
            label: 'Daly City Serramonte',
            value: '330000'
        }
    ]
};

function getRandomNumber() {
    var max = 900000,
        min = 150000;
    return Math.round((max - min) * Math.random() + min);
}

export default class FusionChartsViewers extends Component {
    @tracked title = 'FusionCharts V2 Addon Test';
    @tracked width = 600;
    @tracked height = 400;
    @tracked type = 'column2d';
    @tracked dataFormat = 'json';
    @tracked dataSource = dataSource;
    @tracked chartConfig = {
        containerBackgroundColor: '#ffffff'
    };
    @tracked events = {
        'dataplotClick': (event) => {
            this.actualValue = event.data.categoryLabel + ': $' + event.data.displayValue;
        }
    };
    @tracked actualValue = 'Click on a data point to see value';

    @action
    onClick() {
        const prevDs = { ...this.dataSource };
        prevDs.data[2].value = getRandomNumber();
        prevDs.data[3].value = getRandomNumber();
        prevDs.chart.caption = 'Updated Data - ' + new Date().toLocaleTimeString();
        this.dataSource = prevDs;
    }

    @action
    changeType() {
        const types = ['column2d', 'pie2d', 'bar2d', 'line'];
        const currentIndex = types.indexOf(this.type);
        const nextIndex = (currentIndex + 1) % types.length;
        this.type = types[nextIndex];
    }

    @action
    resizeChart() {
        this.width = this.width === 600 ? 800 : 600;
        this.height = this.height === 400 ? 500 : 400;
    }
}
