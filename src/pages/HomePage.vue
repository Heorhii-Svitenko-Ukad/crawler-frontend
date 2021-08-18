<template>
    <div>
        <h1>
            Tests
        </h1>

        <url-input @onUpdate="getTests"></url-input>

        <hr>

        <b-table class="table" :items="tests" :fields="columns">
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
                    key: 'actions',
                    label: 'Actions'
                }
            ]
        }
    },
    methods: {
        getTests() {
            this.resource.get().then(response => response.json()).then(json => {
                console.log(json)
                if (json.isSuccessful) {
                    this.tests = json.result.map(test => ({
                            'id': test.id,
                            'uri': test.uri,
                            'startTime': new Date(test.startTime),
                            'endTime': new Date(test.endTime)
                    }))
                } else {
                    this.$router.push({name: 'Error', query: {message: json.exceptionMessage}})
                }
            })
        }
    },
    created() {
        this.resource = this.$resource('tests')
        this.getTests()
    }
}
</script>