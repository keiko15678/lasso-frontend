import Vue from 'vue'
import { Doughnut } from 'vue-chartjs'

const registerComponent = function(name, originalComponent) {
    Vue.component(
        name,
        {
            extends: originalComponent,
            props: ['data', 'options'],
            mounted() {
                this.renderChart(this.data, this.options)
            }
        }
    )
}

registerComponent('DoughnutChart', Doughnut);
