import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | fusioncharts-xt', function (hooks) {
  setupRenderingTest(hooks);

  test('It should render the chart in a div element', async function (assert) {
    feedChartConfig(this);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    assert.dom('div').exists();
  });

  test('It should handle the chart dimensions change', async function (assert) {
    feedChartConfig(this);
    this.set('width', '600');
    this.set('height', '400');
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    this.set('width', '500');
    this.set('height', '300');
    assert.strictEqual(this.width, '500');
    assert.strictEqual(this.height, '300');

    this.set('width', '600');
    assert.strictEqual(this.width, '600');

    this.set('height', '400');
    assert.strictEqual(this.height, '400');
  });

  test('It should handle the chart dimensions change if the width is not specified', async function (assert) {
    feedChartConfig(this);
    this.set('width', undefined);
    this.set('height', undefined);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    this.set('width', '600');
    assert.strictEqual(this.width, '600');
  });

  test('It should handle the chart dimensions change if the height is not specified', async function (assert) {
    feedChartConfig(this);
    this.set('width', undefined);
    this.set('height', undefined);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    this.set('height', '400');
    assert.strictEqual(this.height, '400');
  });

  test('It should handle the chart type change for the same value', async function (assert) {
    feedChartConfig(this);
    this.set('type', 'column2d');
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    this.set('type', 'column2d');
    assert.strictEqual(this.type, 'column2d');
  });

  test('It should handle the chart type change for the different value', async function (assert) {
    feedChartConfig(this);
    this.set('type', 'column2d');
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    this.set('type', 'bar2d');
    assert.strictEqual(this.type, 'bar2d');

    this.set('type', undefined);
    assert.strictEqual(this.type, undefined);
  });

  test('It should handle the chart data change for the same value', async function (assert) {
    feedChartConfig(this);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    const newData = Object.assign({}, sampleJSONData);
    this.set('dataSource', newData);
    assert.strictEqual(this.dataSource, newData);
  });

  test('It should handle the chart data change for the different value', async function (assert) {
    feedChartConfig(this);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    const newData = sampleXMLData;
    this.set('dataFormat', 'xml');
    this.set('dataSource', newData);
    assert.strictEqual(this.dataSource, newData);
    assert.strictEqual(this.dataFormat, 'xml');

    this.set('dataSource', undefined);
    assert.strictEqual(this.dataSource, undefined);

    this.set('dataFormat', undefined);
    this.set('dataSource', sampleJSONData);
    assert.strictEqual(this.dataFormat, undefined);
    assert.strictEqual(this.dataSource, sampleJSONData);
  });

  test('It should handle the chart data format change for the undefined value', async function (assert) {
    feedChartConfig(this);
    this.set('dataFormat', 'json');
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} />`);
    this.set('dataFormat', undefined);
    assert.strictEqual(this.dataFormat, undefined);
  });

  test('It should handle the events option change for the same value', async function (assert) {
    feedChartConfig(this);
    const onDataPlotRollOver = function() {};
    this.set('events', {
      dataPlotRollOver: onDataPlotRollOver
    });
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} @events={{this.events}} />`);
    const newEvents = {
      dataPlotRollOver: onDataPlotRollOver
    };
    this.set('events', newEvents);
    assert.strictEqual(this.events, newEvents);
  });

  test('It should handle the events option change for the different value', async function (assert) {
    feedChartConfig(this);
    let onDataPlotRollOver = function() {};
    this.set('events', {
      dataPlotRollOver: onDataPlotRollOver
    });
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} @events={{this.events}} />`);
    onDataPlotRollOver = function() {};
    let newEvents = {
      dataPlotRollOver: onDataPlotRollOver
    };
    this.set('events', newEvents);
    assert.strictEqual(this.events, newEvents);

    newEvents = {
      dataPlotRollOver: onDataPlotRollOver,
      dataplotRollOut: function() {}
    };
    this.set('events', newEvents);
    assert.strictEqual(this.events, newEvents);

    this.set('events', undefined);
    assert.strictEqual(this.events, undefined);

    // Events value transition: undefined to object type
    this.set('events', newEvents);
    assert.strictEqual(this.events, newEvents);
  });

  test('It should handle the link option change for the same value', async function (assert) {
    feedChartConfig(this);
    this.set('link', {});
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} @link={{this.link}} />`);
    const newLink = {};
    this.set('link', newLink);
    assert.strictEqual(this.link, newLink);
  });

  test('It should handle the link option change for the different value', async function (assert) {
    feedChartConfig(this);
    this.set('link', null);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} @link={{this.link}} />`);
    const newLink = {};
    this.set('link', newLink);
    assert.strictEqual(this.link, newLink);
  });

  test('It should handle the rest options change', async function (assert) {
    feedChartConfig(this);
    this.set('chartConfig', undefined);
    await render(hbs`<FusionchartsXt @width={{this.width}} @height={{this.height}} @type={{this.type}} @dataFormat={{this.dataFormat}} @dataSource={{this.dataSource}} @chartConfig={{this.chartConfig}} />`);
    this.set('chartConfig', {
      containerBackgroundColor: '#000000'
    });
    assert.strictEqual(this.chartConfig.containerBackgroundColor, '#000000');

    this.set('chartConfig', Object.assign({}, this.chartConfig, {
      containerBackgroundColor: undefined
    }));
    assert.strictEqual(this.chartConfig.containerBackgroundColor, undefined);
  });

  function feedChartConfig(comp) {
    comp.set('width', 600);
    comp.set('height', 400);
    comp.set('type', 'column2d');
    comp.set('dataFormat', 'json');
    comp.set('dataSource', sampleJSONData);
  }

  const sampleJSONData = {
    "chart": {
      "caption": "Harry's SuperMart",
      "subCaption": "Top 5 stores in last month by revenue",
      "numberPrefix": "$",
      "theme": "ocean"
    },
    "data": [
      {
        "label": "Bakersfield Central",
        "value": "880000"
      },
      {
        "label": "Garden Groove harbour",
        "value": "730000"
      },
      {
        "label": "Los Angeles Topanga",
        "value": "590000"
      },
      {
        "label": "Compton-Rancho Dom",
        "value": "520000"
      },
      {
        "label": "Daly City Serramonte",
        "value": "330000"
      }
    ]
  };

  const sampleXMLData = `<chart caption="Top 10 Most Popular Sports in the World" subcaption="Based on number of viewers" yaxisname="Number of Viewers" plotgradientcolor="" bgcolor="FFFFFF" showplotborder="0" divlinecolor="CCCCCC" showvalues="1" showcanvasborder="0" canvasbordercolor="CCCCCC" canvasborderthickness="1" showyaxisvalues="0" showlegend="1" showshadow="0" labelsepchar=": " basefontcolor="000000" labeldisplay="AUTO" numberscalevalue="1000,1000,1000" numberscaleunit="K,M,B" palettecolors="#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c" showborder="0"  rotateValues="0" placevaluesInside="0" valueFontColor="#909090" theme="ocean">
<set label="Football" value="3500000000" tooltext="Popular in: {br}Europe{br}Africa{br}Asia{br}Americas" />
<set label="Cricket" value="3000000000" tooltext="Popular in: {br}India{br}UK{br}Pakistan{br}Australia" />
<set label="Field Hockey" value="2200000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Australia" />
<set label="Tennis" value="1000000000" color="e44a00" tooltext="Popular in: {br}Europe{br}Americas{br}Asia" />
<set label="Volleyball" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Americas{br}Australia" />
<set label="Table Tennis" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Americas" />
<set label="Baseball" value="500000000" tooltext="Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic" />
<set label="Golf" value="400000000" tooltext="Popular in: {br}US{br}Canada{br}Europe" />
<set label="Basketball" value="400000000" tooltext="Popular in: {br}US{br}Canada" />
<set label="American football" value="390000000" tooltext="Popular in:{br}US" />
</chart>`;
});
