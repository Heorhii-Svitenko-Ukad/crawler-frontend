<template>
    <div>
        <h1>
            Tests
        </h1>

        <url-input @onUpdate="getTests"></url-input>

        <hr>

        <b-table class="table" :items="tests" :fields="columns">
            <template #head(actions)>
                <div>
                    <b-form-select @change="getTests" v-model="itemsPerPage" :options="options"></b-form-select>
                </div>
            </template>

            <template #cell(uri)="data">
                <a :href="data.item.uri" target="_blank">{{ data.item.uri }}</a>
            </template>

            <template #cell(startTime)="data">
                <span>{{ `${data.item.startTime.getDate()}/${data.item.startTime.getMonth() + 1}/${data.item.startTime.getFullYear()} ${data.item.startTime.getHours()}:${data.item.startTime.getMinutes()}:${data.item.startTime.getSeconds()}` }}</span>
            </template>

            <template #cell(endTime)="data">
                <span>{{ `${data.item.endTime.getDate()}/${data.item.endTime.getMonth() + 1}/${data.item.endTime.getFullYear()} ${data.item.endTime.getHours()}:${data.item.endTime.getMinutes()}:${data.item.endTime.getSeconds()}` }}</span>
            </template>

            <template #cell(processingTime)="data">
                <span>{{ ((data.item.endTime - data.item.startTime) / 1000).toFixed(2) }}</span>
            </template>

            <template #cell(actions)="data">
                <router-link :to="{name: 'TestDetails', params: {testId: data.item.id}}">
                    <a>Details</a>
                </router-link>
            </template>
        </b-table>

        <b-pagination 
            class="mx-auto"
            style="width: fit-content"
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="itemsPerPage"  
            pills
            first-number
            last-number          
        ></b-pagination>
    </div>
</template>

<script>
import UrlInput from '../components/UrlInput.vue'

export default {
  components: { UrlInput },
    data() {
        return {
            resource: null,
            isLoading: false,
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: 0,
            options: [
                { value: 10, text: '10' },
                { value: 20, text: '20' },
                { value: 30, text: '30' },
                { value: 40, text: '40' }
            ],
            tests: [],
            columns: [
                {
                    key: 'uri',
                    label: 'Uri'
                },
                {
                    key: 'startTime',
                    label: 'Start Time'
                },
                {
                    key: 'endTime',
                    label: 'End Time'
                },
                {
                    key: 'processingTime',
                    label: 'Processing time (s)'
                },
                {
                    key: 'actions'
                }
            ]
        }
    },
    methods: {
        getTests() {
            this.resource.query({itemsPerPage: this.itemsPerPage, currentPage: this.currentPage}).then(response => response.json()).then(json => {
                if (json.isSuccessful) {
                    this.tests = json.result.tests.map(test => ({
                            'id': test.id,
                            'uri': test.uri,
                            'startTime': new Date(test.startTime),
                            'endTime': new Date(test.endTime)
                    }))
                    this.itemsPerPage = json.result.itemsPerPage
                    this.currentPage = json.result.currentPage
                    this.totalItems = json.result.total

                } else {
                    this.$router.push({name: 'Error', query: {message: json.exceptionMessage}})
                }
            })
        }
    },
    created() {
        this.resource = this.$resource('tests')
        this.getTests()
    },
    watch: {
        currentPage: function () {
            this.getTests()
        }
    }
}
</script>