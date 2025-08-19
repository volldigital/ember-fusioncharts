import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const dataSource = {
  data: null,
  caption: {
    text: 'Sales Analysis'
  },
  subcaption: {
    text: 'Grocery & Footwear'
  },
  series: 'Type',
  yAxis: [
    {
      plot: 'Sales Value',
      title: 'Sale Value',
      format: {
        prefix: '$'
      }
    }
  ]
};

const jsonify = res => res.json();
// This is the remote url to fetch the data.
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json'
).then(jsonify);
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json'
).then(jsonify);

export default class timeSeriesViewer extends Component {
  @tracked title = 'TimeSeries V2 Addon Test';
  @tracked width = 600;
  @tracked height = 400;
  @tracked type = 'timeseries';
  @tracked dataFormat = 'json';
  @tracked dataSource = null;
  @tracked isLoading = true;

  constructor() {
    super(...arguments);
    this.createDataTable();
  }
  
  createDataTable() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      
      if (window.FusionCharts && window.FusionCharts.DataStore) {
        // First we are creating a DataStore
        const fusionDataStore = new window.FusionCharts.DataStore();
        // After that we are creating a DataTable by passing our data and schema as arguments
        const fusionDataTable = fusionDataStore.createDataTable(data, schema);
        // After that we simply mutated our timeseries datasource by attaching the above
        // DataTable into its data property.
        dataSource.data = fusionDataTable;
        this.dataSource = dataSource;
        this.isLoading = false;
      } else {
        console.warn('FusionCharts TimeSeries not available');
        this.isLoading = false;
      }
    }).catch(error => {
      console.error('Error loading timeseries data:', error);
      this.isLoading = false;
    });
  }

  @action
  onClick() {
    if (this.dataSource) {
      const prevDs = { ...this.dataSource };
      prevDs.caption.text = 'Updated TimeSeries - ' + new Date().toLocaleTimeString();
      prevDs.subcaption.text = 'Data updated via v2 addon';
      this.dataSource = prevDs;
    }
  }
}
